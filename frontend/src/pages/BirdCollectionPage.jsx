import NavigationButton from '../components/NavigationButton';
import UserContext from "../../UserContext";
import { useContext } from "react";
import BirdCollection from '../components/BirdCollection';
import { useLocation } from 'react-router-dom';

export default function BirdCollectionPage() {
    const { username } = useContext(UserContext);
    const previousPath = useLocation().state?.from?.pathname || '/';

    return (
        <div>
            <NavigationButton path={previousPath} text="Bird Collection" />
            <BirdCollection username={username} showRemainBird={true} />
        </div>
    );
}
