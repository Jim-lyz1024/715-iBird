import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getBird } from '../api/api';
import NavigationButton from '../components/NavigationButton';

export default function BirdDetails() {
    const [bird, setBird] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();
    const token = localStorage.getItem('token');
    const previousPath = useLocation().state?.from?.pathname || '/';

    useEffect(() => {
        const fetchBirdDetails = async () => {
            try {
                const response = await getBird(token, name);
                setBird(response.data);
            } catch (err) {
                setError("Failed to fetch the bird details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBirdDetails();
    }, [name, token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!bird) return <div>No bird found with the given name.</div>;

    return (
        <div>
            <NavigationButton path={previousPath} text="back" />
            <h2>{bird.name} {'🌟'.repeat(bird.rarity)}</h2>
            <p><strong>Maori Name:</strong> {bird.maoriName}</p>
            <p><strong>Scientific Name:</strong> {bird.scientificName}</p>
            <p><strong>Other Names:</strong> {bird.otherNames.join(", ")}</p>
            <p><strong>Conservation Status:</strong> {bird.conservationStatus}</p>
            <p><strong>Rarity:</strong> {bird.rarity}</p>
            <h3>Images:</h3>
            {bird.images.map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt={`${bird.name} image ${index}`} style={{ width: "100%" }} />
            ))}
        </div>
    );
};