import { useState, useEffect } from "react";
import NavigationButton from "../components/NavigationButton";
import { startNewTrip, getActiveTrip, addLocation, endTrip, uploadImage } from "../api/api";
import { useNavigate } from "react-router-dom";
import TripMap from "../components/TripMap";
import BirdImageUploader from "../components/BirdImageUploader";
import { useLocation } from "react-router-dom";
import FitnessGoalProgress from "../components/FitnessGoalProgress";
import BirdCountGoalProgress from "../components/BirdCountGoalProgress";
import TripStatistics from "../components/TripStatistics";
import QuizComponent from "../components/QuizComponent";
import { FloatingPanel, Button } from 'antd-mobile';
import Spinner from "../components/Spinner";
import './Trip.css';

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
    const [showCropPopup, setShowCropPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const location = useLocation();
    // Set the default options
    const defaultOptions = {
        isEdugaming: true,
        level: '1000 meters'
    };
    // If options are provided in the location state, it'll overwrite the default options
    const options = { ...defaultOptions, ...location.state };

    const [anchors, setAnchors] = useState([60]);


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
                        // setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error uploading image:', error);
                        // setIsLoading(false);
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
                    return startNewTrip(token, options.isEdugaming, options.level)
                        .then((res) => {
                            setTrip(res.data);
                        });
                }
            });
    };

    useEffect(() => {
        let watchId;
        let lastSentTimestamp = null;
        const sendInterval = 5000; // 5 second
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
            const ct = new Date();
            setSpeed(position.coords.speed);

            // Check if enough time has passed since the last sent timestamp
            // Do not upload location when uploading
            if ((lastSentTimestamp && ct - lastSentTimestamp < sendInterval) || isUploading) {
                return; // Do not send update yet
            }

            lastSentTimestamp = ct;
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
                        alert('Based on your current average speed, we reduced your target distance. Have fun!');
                    }

                    setTripForGoal(res.data);
                    setPath(updatedPath);
                    setCurrentPosition(latLng);
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
                    startNewTrip(token, options.isEdugaming, options.level)
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
        setIsLoading(true);
        endTrip(token)
            .then(() => {
                navigate("/start", { replace: true });
            })
            .catch(error => {
                console.error("Error ending the trip:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    return (
        <div>
            {(isLoading || !trip || !tripForGoal) && <Spinner />}
            <NavigationButton path="/start" text="Trip" />

            <TripMap
                path={path}
                center={currentPosition}
                autoCentering={autoCentering}
                images={trip?.images}
                trip={trip}
                onMapHeightChange={(newHeight) => {
                    const mapHeight = newHeight;
                    const windowHeight = window.innerHeight;
                    setAnchors([60, windowHeight - 45 - mapHeight, windowHeight - 45 - mapHeight / 3 * 2]);
                }}
            />
            {tripForGoal && tripForGoal.quiz && <QuizComponent quizData={tripForGoal.quiz} afterSubmit={fetchTripDetails} />}

            <FloatingPanel anchors={anchors} className={`${showCropPopup ? "locked-panel" : ""}`}>
                <div className="floatingpanel_box">
                    <div className="margin_bottom">
                        {trip && trip.isEdugaming && <BirdImageUploader
                            onUploadComplete={fetchTripDetails}
                            location={currentPosition}
                            timestamp={currentTimestamp}
                            showCropPopup={showCropPopup}
                            setShowCropPopup={setShowCropPopup}
                            IsUploading={isUploading}
                            setIsUploading={setIsUploading}
                        />}
                    </div>

                    <Button color='primary' onClick={handleEndTrip}>End Trip</Button>


                    <Button className="margin_left" color='primary' onClick={() => setAutoCentering(prev => !prev)}>
                        {autoCentering ? "Stop Centering" : "Resume Centering"}
                    </Button>

                    <TripStatistics trip={tripForGoal} realSpeed={speed} />

                    <h3 style={{ paddingTop: "1px", fontSize: "20px" }}>Goals</h3>
                    <FitnessGoalProgress trip={tripForGoal} />
                    {trip && trip.isEdugaming && <>
                        <BirdCountGoalProgress goals={tripForGoal?.birdCountGoals} /></>}
                </div>
            </FloatingPanel>
        </div>
    );
}
