import { useNavigator } from '../hooks/useNavigator';

function BirdCard({ bird }) {
    const navigateWithState = useNavigator();

    return (
        <div className='Bird_card'>
            <h3
                onClick={() => navigateWithState(`/bird/${bird.name}`, { replace: true })}
                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                {bird.name}
            </h3>

            {bird.images && bird.images.length > 0 ? (
                <img src={bird.images[0]} alt={`${bird.name}`} width="100" height="100" />
            ) : (
                <p>No Image Available</p>
            )}
            <p><strong>Rarity:</strong> {'🌟'.repeat(bird.rarity)}</p>
        </div>
    );
}

export default BirdCard;
