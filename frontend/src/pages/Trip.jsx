import { useState, useEffect } from "react";
import NavigationButton from "../components/NavigationButton";
import { startNewTrip, getActiveTrip, addLocation, endTrip, uploadImage } from "../api/api";
import { useNavigate } from "react-router-dom";
import TripMap from "../components/TripMap";
import BirdImageUploader from "../components/BirdImageUploader";
import BirdCamera from "../components/BirdCamera";
import { useLocation } from "react-router-dom";
import FitnessGoalProgress from "../components/FitnessGoalProgress";
import BirdCountGoalProgress from "../components/BirdCountGoalProgress";
import TripStatistics from "../components/TripStatistics";
import QuizComponent from "../components/QuizComponent";
import {FloatingPanel,SearchBar,Avatar,Space,Card,List,Button} from 'antd-mobile'
const aucklandlat = -36.8484;
const aucklandLng = 174.7633;

export const center = {
    lat: aucklandlat,
    lng: aucklandLng
};


export default function Trip() {
    const [path, setPath] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(center);
    const [speed, setSpeed] = useState(null);
    const [trip, setTrip] = useState(null);
    const [tripForGoal, setTripForGoal] = useState(null);
    const [currentTimestamp, setCurrentTimestamp] = useState(null);
    const [autoCentering, setAutoCentering] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const location = useLocation();
    // Set the default options
    const defaultOptions = {
        isEdugaming: true,
        fitnessLevel: 'mid'
    };
    // If options are provided in the location state, it'll overwrite the default options
    const options = { ...defaultOptions, ...location.state };
    const anchors = [100, window.innerHeight * 0.4, window.innerHeight * 0.8]

    const handlePhotoCaptured = (dataUri) => {
        // Convert Data URI to Blob
        fetch(dataUri)
            .then(res => res.blob())
            .then(blob => {
                // Convert Blob to File
                const file = new File([blob], 'bird-photo.jpg', { type: 'image/jpeg' });

                // upload the image
                uploadImage(localStorage.getItem('token'), file, currentPosition, currentTimestamp)
                    .then(res => {
                        console.log('Successfully uploaded');
                        fetchTripDetails();
                    })
                    .catch(error => {
                        console.error('Error uploading image:', error);
                    });

            });
    };

    const fetchTripDetails = () => {
        return getActiveTrip(token)
            .then(res => {
                if (res.data && res.data.locations) {
                    setTrip(res.data);
                    setTripForGoal(res.data);
                    const existingPath = res.data.locations.map(loc => ({
                        lat: loc.latitude,
                        lng: loc.longitude
                    }));
                    setPath(existingPath);
                } else {
                    return startNewTrip(token, options.isEdugaming, options.fitnessLevel)
                        .then((res) => {
                            setTrip(res.data);
                        });
                }
            });
    };

    useEffect(() => {
        let watchId;

        const trackLocation = () => {
            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(showPosition, (error) => {
                    console.log("Error: " + error.message);
                }, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
            } else {
                alert("Geolocation is not supported.");
            }
        };

        const showPosition = (position) => {
            const latLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(position.coords.latitude, position.coords.longitude)

            // Add the location to the backend every time we get a new location
            const currentTime = new Date().toISOString();
            addLocation(token, latLng.lat, latLng.lng, currentTime)
                .then(res => {
                    const updatedPath = res.data.locations.map(loc => ({
                        lat: loc.latitude,
                        lng: loc.longitude
                    }));

                    if (res.status === 207) {
                        alert('Your goal has been modified based on your current average speed.');
                    }

                    setTripForGoal(res.data);
                    setPath(updatedPath);
                    setCurrentPosition(latLng);
                    setSpeed(position.coords.speed);
                    setCurrentTimestamp(currentTime);
                })
                .catch(error => {
                    console.log(error.response.data);
                    navigate("/start", { replace: true });
                });
        };

        // Try to get the active trip
        getActiveTrip(token)
            .then(res => {
                if (res.data && res.data.locations) {
                    setTrip(res.data);
                    const existingPath = res.data.locations.map(loc => ({
                        lat: loc.latitude,
                        lng: loc.longitude
                    }));
                    setPath(existingPath);
                    trackLocation();
                } else {
                    startNewTrip(token, options.isEdugaming, options.fitnessLevel)
                        .then((res) => {
                            setTrip(res.data);
                            trackLocation();
                        })
                }
            })


        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);

    const handleEndTrip = () => {
        endTrip(token)
            .then(() => {
                navigate("/start", { replace: true });
            })
            .catch(error => {
                console.error("Error ending the trip:", error);
            });
    }

    return (
        <div>
            <NavigationButton path="/start" text="Trip" />
            

            <TripMap
                path={path}
                center={currentPosition}
                autoCentering={autoCentering}
                images={trip?.images}
                trip={trip}
            />
            {tripForGoal && tripForGoal.quiz && <QuizComponent quizData={tripForGoal.quiz} afterSubmit={fetchTripDetails} />}

            <FloatingPanel anchors={anchors}>
                <div className="floatingpanel_box">
                    <div className="margin_bottom">
                        {trip && trip.isEdugaming && <BirdImageUploader
                            onUploadComplete={fetchTripDetails}
                            location={currentPosition}
                            timestamp={currentTimestamp}
                        />}
                    </div>
                    
                        <Button color='primary'  onClick={handleEndTrip}>End Trip</Button>
                        

                        <Button className="margin_left" color='primary'  onClick={() => setAutoCentering(prev => !prev)}>
                            {autoCentering ? "Stop Centering" : "Resume Centering"}
                        </Button>

                        <TripStatistics trip={tripForGoal} realSpeed={speed} />
                        {trip && trip.isEdugaming && <BirdCamera onPhotoCaptured={handlePhotoCaptured} />}
                        <FitnessGoalProgress trip={tripForGoal} />
                        {trip && trip.isEdugaming && <>
                            <BirdCountGoalProgress goals={tripForGoal?.birdCountGoals} /></>}
                </div>
            </FloatingPanel>

           

        </div>
    );
}
