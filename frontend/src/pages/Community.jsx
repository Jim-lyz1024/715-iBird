import NavigationButton from "../components/NavigationButton"
import { useNavigate } from "react-router-dom";
import { List } from 'antd-mobile'

export default function Community() {
    const navigate = useNavigate();

    return (
        <div>
            <NavigationButton path="/" text="Community" />
            <List>
                <List.Item onClick={()=> navigate("/community/findfriends")}>Find Friends</List.Item>
                <List.Item onClick={()=> navigate("/community/myfriends")}>My Friends</List.Item>
            </List>
        </div>
    )
}