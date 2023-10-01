import { useFriendActions } from '../hooks/useFriendActions';
import { useNavigator } from '../hooks/useNavigator';
import { List, Switch,Image } from 'antd-mobile'
import { AddOutline,MinusOutline  } from 'antd-mobile-icons'


export default function UserList({ users, allowFriendActions = false, onFriendActionSuccess = () => { }, cantAddedFriendUsernames = [], excludedUsers = [] }) {
    const navigateWithState = useNavigator();
    const { handleAddFriend, handleRemoveFriend } = useFriendActions();
    console.log(users);
    return (
        <div>
            {/* <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        {allowFriendActions && <th>Add Friend</th>}
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        !excludedUsers.includes(user.username)
                        &&
                        <tr key={user._id}>
                            <td
                                onClick={() => navigateWithState(`/users/${user.username}`, { replace: true })}
                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                                {user.username}
                            </td>

                            {allowFriendActions &&
                                <td
                                    onClick={cantAddedFriendUsernames.includes(user.username) ?
                                        () => handleRemoveFriend(user.username, onFriendActionSuccess) :
                                        () => handleAddFriend(user.username, onFriendActionSuccess)}
                                    style={{ cursor: 'pointer' }}>
                                    {cantAddedFriendUsernames.includes(user.username) ? "❤️" : "🤍"}
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>a
            </table> */}
            <List >
                {users && users.map((user) => (
                    !excludedUsers.includes(user.username)
                    &&
                    <List.Item extra={
                        <span onClick={cantAddedFriendUsernames.includes(user.username) ?
                            () => handleRemoveFriend(user.username, onFriendActionSuccess) :
                            () => handleAddFriend(user.username, onFriendActionSuccess)} style={{cursor:"pointer"}}>
                            {cantAddedFriendUsernames.includes(user.username) ? <MinusOutline /> : <AddOutline />}

                        </span>
                    } prefix={
                        <Image
                          src=""
                          style={{ borderRadius: 20 }}
                          fit='cover'
                          width={40}
                          height={40}
                          onClick={() => navigateWithState(`/users/${user.username}`, { replace: true })}
                        />
                      }   >
                        <span onClick={() => navigateWithState(`/users/${user.username}`, { replace: true })} style={{cursor:"pointer"}}>
                            {user.username}
                        </span>
                    </List.Item>

                ))}
            </List>
        </div>
    )
}
