import { useEffect, useState } from 'react';
import NavigationButton from '../components/NavigationButton';
import { getActiveTrip } from '../api/api';
import { useNavigate } from "react-router-dom";
import { List } from 'antd-mobile';
import Spinner from '../components/Spinner';

export default function Start() {
    const [hasActiveTrip, setHasActiveTrip] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getActiveTrip(localStorage.getItem('token'))
            .then(res => {
                if (res.data && res.data.isActive) {
                    setHasActiveTrip(true);
                }
            })
            .catch(error => {
                console.error("Error fetching active trip:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            {isloading && <Spinner />}
            <NavigationButton path="/" text="Getting Started!" />

            <List>
                {hasActiveTrip ?
                    <List.Item onClick={()=> navigate("/start/trip")}>Resume Trip</List.Item>:
                    <List.Item onClick={()=> navigate("/start/option")}>Start a trip!</List.Item>}   
                <List.Item onClick={()=> navigate("/start/history")}>Trip History</List.Item>
            </List>

        </div>
    )
}
