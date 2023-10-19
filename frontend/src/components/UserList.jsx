import { useFriendActions } from '../hooks/useFriendActions';
import { useNavigator } from '../hooks/useNavigator';
import { List, Switch, Image } from 'antd-mobile'
import { AddOutline, MinusOutline } from 'antd-mobile-icons'
import { useEffect } from 'react';


export default function UserList({ users, allowFriendActions = false, onFriendActionSuccess = () => { }, cantAddedFriendUsernames = [], excludedUsers = [] }) {
    const navigateWithState = useNavigator();
    const { handleAddFriend, handleRemoveFriend } = useFriendActions();
    return (
        <div>
            <List >
                {users && (users.length !== 0 ? users.map((user, index) => (
                    !excludedUsers.includes(user.username)
                    &&
                    <List.Item key={index} extra={
                        <span onClick={cantAddedFriendUsernames.includes(user.username) ?
                            () => handleRemoveFriend(user.username, onFriendActionSuccess) :
                            () => handleAddFriend(user.username, onFriendActionSuccess)} style={{ cursor: "pointer" }}>
                            {cantAddedFriendUsernames.includes(user.username) ? <MinusOutline /> : <AddOutline />}

                        </span>
                    } prefix={
                        <Image
                            src={`https://ibird-images.s3.ap-southeast-2.amazonaws.com/evolution/${user.kiwiStage}.png`}
                            style={{ borderRadius: 20 }}
                            fit='cover'
                            width={40}
                            height={40}
                            onClick={() => navigateWithState(`/users/${user.username}`, { replace: true })}
                        />
                    }   >
                        <span onClick={() => navigateWithState(`/users/${user.username}`, { replace: true })} style={{ cursor: "pointer" }}>
                            {user.username}
                        </span>
                    </List.Item>

                )) : <p>No friends</p>)}
            </List>
        </div>
    )
}
