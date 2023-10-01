import UserContext from "../../UserContext";
import { useContext } from "react";
import Challenges from "../components/Challenges";
import NavigationButton from "../components/NavigationButton";

export default function ChallengesPage() {
    const { username } = useContext(UserContext);

    return (
        <div>
            <NavigationButton path="/" text="Rewards" />
            <Challenges username={username} />
        </div>
    );
};
