import { addFriend, removeFriend } from '../api/api';

// custom hook for handle user actions like add, remove, etc.
export const useFriendActions = () => {
    const handleAddFriend = (friendUsername, onSuccess, onError) => {
        addFriend(localStorage.getItem('token'), friendUsername)
            .then(res => {
                onSuccess && onSuccess();
                console.log('Friend added successfully');
            })
            .catch(err => {
                onError && onError(err);
                console.error('Error adding friend:', err);
            });
    };

    const handleRemoveFriend = (friendUsername, onSuccess, onError) => {
        removeFriend(localStorage.getItem('token'), friendUsername)
            .then(res => {
                onSuccess && onSuccess();
                console.log('Friend removed successfully');
            })
            .catch(err => {
                onError && onError(err);
                console.error('Error removing friend:', err);
            });
    };

    return { handleAddFriend, handleRemoveFriend };
};
