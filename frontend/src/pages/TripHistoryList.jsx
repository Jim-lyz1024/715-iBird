import { useState, useEffect } from "react";
import NavigationButton from "../components/NavigationButton";
import { getInactiveTrips } from '../api/api';
import { useNavigate } from "react-router-dom/dist";
import { List, Switch } from 'antd-mobile'


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
                processedTrips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

                setTrips(processedTrips);
                console.log(processedTrips);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching inactive trips:", err);
                setError(err);
                setIsLoading(false);
            });
    }, [token]);

     


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
            <NavigationButton path="/start" text="TripHistory" />

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading trips. Please try again.</p>
            ) : (
                // <table>
                //     <thead>
                //         <tr>
                //             <th>Index</th>
                //             <th>Start Date</th>
                //             <th>End Date</th>
                //             <th>Duration(minutes)</th>
                //             <th>distance</th>
                //             <th>elevationGain</th>
                //         </tr>
                //     </thead>
                //     <tbody>
                //         {trips.map((trip, index) => (
                //             // round to 2dp
                //             <tr key={index} onClick={() => navigate(`/start/history/${trip._id}`, { replace: true })}>
                //                 <td style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>{index + 1}</td>
                //                 <td>{trip.startDate}</td>
                //                 <td>{trip.endDate}</td>
                //                 <td>{Math.round(trip.duration / 1000 / 60 * 100) / 100}</td>
                //                 <td>{trip.distance}</td>
                //                 <td>{trip.elevationGain}</td>
                //             </tr>
                //         ))}
                //     </tbody>
                // </table>
                <List>
                    {trips.map((trip, index) => ( 
                           <List.Item key={index}  onClick={() => navigate(`/start/history/${trip._id}`, { replace: true })}>
                                <p>{createTime(trip.startDate)}</p>
                            </List.Item>
                        ))}
                </List>
            )}
        </div>
    );
}
