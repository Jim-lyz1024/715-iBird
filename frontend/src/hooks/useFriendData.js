import { useState, useEffect } from 'react';
import { getFriends } from '../api/api';

// custom hook to get friends data
export const useFriendData = () => {
    const [friends, setFriends] = useState([]);

    const fetchFriends = () => {
        getFriends(localStorage.getItem('token'))
            .then((res) => {
                setFriends(res.data.map(user => user.username));
            })
            .catch(err => {
                console.error("Error fetching friends:", err);
            });
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    return { friends, fetchFriends };
};
