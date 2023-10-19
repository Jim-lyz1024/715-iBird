import { useNavigator } from '../hooks/useNavigator';
import './BirdCard.css';

function BirdCard({ bird, owned = true }) {
    const navigateWithState = useNavigator();

    const isLongName = bird.name.length > 20;

    return (
        <div className='Bird_card'>
            <h3
                onClick={() => navigateWithState(`/bird/${bird.name}`, { replace: true })}
                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                {bird.name}
            </h3>

            {bird.images && bird.images.length > 0 ? (
                <img
                    className={`bird-image ${!owned ? 'grayscale' : ''}`}
                    src={bird.images[0]}
                    alt={`${bird.name}`}
                    width="100"
                    height="100"
                />
            ) : (
                <p className="no-image">No Image Available</p>
            )}
            <p className="bird-rarity">{'🌟'.repeat(bird.rarity)}</p>
        </div>
    );
}

export default BirdCard;
