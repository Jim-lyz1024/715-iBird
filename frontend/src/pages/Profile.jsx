import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/api';
import { useParams, useLocation } from "react-router-dom";
import NavigationButton from '../components/NavigationButton';
import UserContext from '../../UserContext';
import { useContext } from 'react';
import { useFriendData } from '../hooks/useFriendData';
import { useFriendActions } from '../hooks/useFriendActions';
import BirdCollection from '../components/BirdCollection';
import Challenges from '../components/Challenges';
import KiwiInfo from '../components/KiwiInfo';

export default function Profile() {
    const [taragetUser, setTaragetUser] = useState(null);
    const paramUsername = useParams().username;
    const previousPath = useLocation().state?.from?.pathname || '/';
    const { friends, fetchFriends } = useFriendData();
    const { username } = useContext(UserContext);
    const { handleAddFriend, handleRemoveFriend } = useFriendActions();

    useEffect(() => {
        getUserInfo(localStorage.getItem("token"), paramUsername)
            .then((res) => {
                setTaragetUser(res.data);
            })
            .catch((err) => {
                setTaragetUser(null);
            })
    }, []);

    return (
        <div>
            <NavigationButton path={previousPath} text={paramUsername} />
            {taragetUser ?
                <div className='Profile_text_box Text_column_box' style={{ "paddingBottom": "0px" }}>
                    <p>
                        <span className='cloumn_name' style={{ "width": "60%" }}>User Name: </span>
                        <span className='cloumn_content' style={{ "width": "40%" }}>{`${paramUsername}`}</span>
                    </p>
                    <p>
                        <span className='cloumn_name' style={{ "width": "60%" }}>Total Walking Distance: </span>
                        <span className='cloumn_content' style={{ "width": "40%" }}>{`${taragetUser.totalWalkingDistance}`}</span>
                    </p>
                    <p>
                        <span className='cloumn_name' style={{ "width": "60%" }}>Total Elevation Gain: </span>
                        <span className='cloumn_content' style={{ "width": "40%" }}>{`${taragetUser.totalElevationGain.toFixed(1)}`}</span>
                    </p>
                    <p>
                        <span className='cloumn_name' style={{ "width": "60%" }}>Total Correct Quizes: </span>
                        <span className='cloumn_content' style={{ "width": "40%" }}>{`${taragetUser.totalCorrectQuizes}`}</span>
                    </p>
                </div> :
                <p className='Profile_text_box'>Not Found</p>
            }
            <KiwiInfo username={paramUsername} canLevelUp={false} />
            <BirdCollection username={paramUsername} showRemainBird={false} />
            <Challenges username={paramUsername} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {taragetUser && <button
                    style={{
                        display: username === paramUsername ? 'none' : 'block',
                        padding: '3px 3px',
                        margin: '20px 0',
                        fontSize: '18px',
                        borderRadius: '10px',
                        fontSize: '40px'
                    }}
                    onClick={username === paramUsername ?
                        () => { } :
                        friends.includes(paramUsername) ?
                            () => handleRemoveFriend(paramUsername, fetchFriends) :
                            () => handleAddFriend(paramUsername, fetchFriends)}>
                    {username === paramUsername ? '' : friends.includes(paramUsername) ? "❤️" : "🤍"}
                </button>}
            </div>
        </div>
    )
}
