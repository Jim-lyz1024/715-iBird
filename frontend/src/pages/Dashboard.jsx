import React from 'react'
import UserContext from '../../UserContext'
import { useContext } from 'react'
import NavigationButton from '../components/NavigationButton';
import { useLocation } from 'react-router-dom';
import { getUserInfo } from '../api/api';
import { useEffect, useState } from 'react';
import { AutoCenter } from 'antd-mobile'
import { List, Switch,Image } from 'antd-mobile'
import { useNavigate } from "react-router-dom";
import { Button} from 'antd-mobile'


export default function Dashboard() {
    const { username, setUsername } = useContext(UserContext);
    const location = useLocation();
    const [isExpert, setIsExpert] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');

        // Update the user state to null
        setUsername(null);
    };

    useEffect(() => {
        if (!username) return;
        getUserInfo(localStorage.getItem('token'), username)
            .then((res) => {
                setIsExpert(res.data.isExpert);
            })
    }, [username])

    return (
        <div>

                <p className='title'>Welcome, {username}</p>
                <List>
                    <List.Item onClick={()=> navigate("/start")}>Getting Started!</List.Item>
                    <List.Item onClick={()=>  navigate("/community")}>Community</List.Item>
                    <List.Item onClick={()=>  navigate(`/users/${username}`)}>My Profile</List.Item>
                    <List.Item onClick={()=>  navigate("/birds/collection")}>Bird Collection</List.Item>
                    <List.Item onClick={()=>  navigate("/challengesPage")}>Challenges</List.Item>
                    <List.Item onClick={()=>  navigate("/myKiwi")}>My Kiwi</List.Item>
                    
                    {isExpert && <>
                        <List.Item onClick={()=>  navigate("/expertOpinion")}>Expert Opinion</List.Item>
                        <br />
                    </>}
                </List>

                <div className='tx_center_button'>
                    <Button fill='outline' color='primary' onClick={handleLogout}>Logout</Button>
                </div>


                {/* <NavigationButton path="/start" text="Getting Started!" />
                <br />
                <NavigationButton path="/community" text="Community" />
                <br />
                <NavigationButton path={`/users/${username}`} text="My Profile" state={{ from: location }} />
                <br />
                <NavigationButton path="/birds/collection" text="Bird Collection" />
                <br />
                <NavigationButton path="/challengesPage" text="Challenges" />
                <br />
                <NavigationButton path="/myKiwi" text="My Kiwi" />
                <br />
                {isExpert && <>
                    <NavigationButton path="/expertOpinion" text="Expert Opinion" />
                    <br />
                </>} */}


        </div>
    )
}
