import KiwiInfo from "../components/KiwiInfo"
import UserContext from "../../UserContext";
import { useContext } from "react";
import NavigationButton from "../components/NavigationButton";

export default function MyKiwi() {
    const { username } = useContext(UserContext);
    return (
        <div>
            <NavigationButton path="/" text="My Kiwi" />
            <KiwiInfo username={username} canLevelUp={true} />
        </div>
    )
}
