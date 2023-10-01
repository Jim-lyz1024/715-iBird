import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TripMap from '../components/TripMap';
import { getTripById } from '../api/api';
import NavigationButton from '../components/NavigationButton';
import FitnessGoalProgress from '../components/FitnessGoalProgress';
import BirdCountGoalProgress from "../components/BirdCountGoalProgress";
import TripStatistics from '../components/TripStatistics';
import {Swiper } from 'antd-mobile'

export default function TripHistory() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [tripPath, setTripPath] = useState(null);

    const token = localStorage.getItem('token');

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

    const createTime=(date)=>{
        var currentTime=new Date(date);
        let year = currentTime.getFullYear();
        let month = currentTime.getMonth() + 1;
        let day = currentTime.getDate();
        let yfEn=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][ currentTime.getMonth() ];
        let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentTime.getDay()];
        return week+","+day+" "+yfEn;
    }
 
    return (
        <div>

            <NavigationButton path="/start/history" text={trip?createTime(trip.startDate):""} />
            <div className='Margin_box'>
                <Swiper>
                    <Swiper.Item key="1">
                        <TripStatistics trip={trip} realSpeed={-1} />
                        <BirdCountGoalProgress goals={trip?.birdCountGoals} />
                    </Swiper.Item>
                    <Swiper.Item key="2">
                        {trip && <FitnessGoalProgress trip={trip} />}
                    </Swiper.Item>
                </Swiper>

                {trip && <TripMap className="ma_tp" path={
                    tripPath} center={tripPath[0]} images={trip?.images} isHistory={true} trip={trip} />}
            </div>
        </div>
    )
}
