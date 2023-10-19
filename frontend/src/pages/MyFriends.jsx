import UserList from '../components/UserList';
import { useState, useEffect } from 'react';
import NavigationButton from '../components/NavigationButton';
import { useContext } from 'react';
import UserContext from '../../UserContext';
import { getFriends } from "../api/api"
import { useFriendData } from '../hooks/useFriendData';
import Spinner from '../components/Spinner';

export default function MyFriends() {
    const [users, setUsers] = useState([]);
    const { username } = useContext(UserContext);
    const { friends, fetchFriends } = useFriendData();

    useEffect(() => {
        getFriends(localStorage.getItem('token'))
            .then((res) => {
                setUsers(res.data);
            });
    }, []);

    return (
        <div>
            <NavigationButton path="/community" text="Friends" addBl="true"/>
            <br />
            <UserList users={users} allowFriendActions={true} onFriendActionSuccess={fetchFriends} cantAddedFriendUsernames={friends} excludedUsers={[username]} />
        </div>
    );
}
