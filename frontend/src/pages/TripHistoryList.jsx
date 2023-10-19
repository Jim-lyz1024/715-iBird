import { useState, useEffect } from "react";
import NavigationButton from "../components/NavigationButton";
import { getInactiveTrips } from '../api/api';
import { useNavigate } from "react-router-dom/dist";
import { List, Switch } from 'antd-mobile'
import Spinner from "../components/Spinner";
// import './TripHistoryList.css';


export default function TripHistoryList() {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        getInactiveTrips(token)
            .then(res => {
                const processedTrips = res.data.map(trip => ({
                    ...trip,
                    duration: new Date(trip.endDate) - new Date(trip.startDate)
                }));

                // Sort by startDate
                processedTrips.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

                setTrips(processedTrips);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching inactive trips:", err);
                setError(err);
                setIsLoading(false);
            });
    }, [token]);

    const createTime = (date) => {
        var currentTime = new Date(date);
        let year = currentTime.getFullYear();
        let month = currentTime.getMonth() + 1;
        let day = currentTime.getDate();
        let yfEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][currentTime.getMonth()];
        let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][currentTime.getDay()];
        return week + ", " + day + " " + yfEn;
    }



    return (
        <div>
            <NavigationButton path="/start" text="TripHistory" />

            {isLoading ? (
                <Spinner />
            ) : error ? (
                <p>Error loading trips. Please try again.</p>
            ) : (
                <List>
                    {trips.length !== 0 ? trips.map((trip, index) => (
                        <List.Item key={index} className="list-item" onClick={() => navigate(`/start/history/${trip._id}`, { replace: true })}>
                            <p>{createTime(trip.startDate)}</p>
                        </List.Item>
                    )) : <p>No history trips</p>}
                </List>
            )}
        </div>
    );
}
