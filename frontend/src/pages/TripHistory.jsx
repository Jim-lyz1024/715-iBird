import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import TripMap from '../components/TripMap';
import { getTripById } from '../api/api';
import NavigationButton from '../components/NavigationButton';
import FitnessGoalProgress from '../components/FitnessGoalProgress';
import BirdCountGoalProgress from "../components/BirdCountGoalProgress";
import TripStatistics from '../components/TripStatistics';
import { FloatingPanel } from 'antd-mobile';
import Spinner from '../components/Spinner';


export default function TripHistory() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [tripPath, setTripPath] = useState(null);

    const token = localStorage.getItem('token');

    const [anchors, setAnchors] = useState([60]);

    useEffect(() => {
        if (tripId) {
            getTripById(token, tripId)
                .then(response => {
                    setTrip(response.data);
                    setTripPath(response.data.locations.map(loc => ({
                        lat: loc.latitude,
                        lng: loc.longitude
                    })));
                })
                .catch(error => {
                    console.error("Error fetching trip details:", error);
                });
        }
    }, [tripId, token]);

    const createTime = (date) => {
        var currentTime = new Date(date);
        let year = currentTime.getFullYear();
        let month = currentTime.getMonth() + 1;
        let day = currentTime.getDate();
        let yfEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][currentTime.getMonth()];
        let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentTime.getDay()];
        return week + "," + day + " " + yfEn;
    }

    return (
        <div>
            {(!trip || !tripPath) && <Spinner />}
            <NavigationButton path="/start/history" text={trip ? createTime(trip.startDate) : ""} />
            {trip &&
                <TripMap
                    className="ma_tp"
                    path={
                        tripPath}
                    center={tripPath[0]}
                    images={trip?.images}
                    isHistory={true}
                    trip={trip}
                    onMapHeightChange={(newHeight) => {
                        const mapHeight = newHeight;
                        const windowHeight = window.innerHeight;
                        setAnchors([60, windowHeight - 45 - mapHeight, windowHeight - 45 - mapHeight / 3 * 2]);
                    }}
                />
            }
            <FloatingPanel anchors={anchors}>
                <div className="floatingpanel_box">
                    <TripStatistics trip={trip} realSpeed={-1} />

                    <h3 style={{ paddingTop: "1px", fontSize: "20px" }}>Goals</h3>
                    {trip && <FitnessGoalProgress trip={trip} />}
                    {trip && trip.isEdugaming && <>
                        <BirdCountGoalProgress goals={trip?.birdCountGoals} /></>}
                </div>
            </FloatingPanel>

        </div>
    )
}
