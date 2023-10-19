import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getBird } from '../api/api';
import NavigationButton from '../components/NavigationButton';
import './BirdDetails.css';
import Spinner from '../components/Spinner';

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

    if (error) return <div>{error}</div>;

    return (
        <div>
            {loading && <Spinner />}
            <NavigationButton path={previousPath} text="Bird Detail" />
            {bird && <div className="bird-details-container">
                <h2 className="bird-title">{bird.name}</h2>
                <div className="bird-info">
                    <p><strong>Maori Name:</strong> {bird.maoriName}</p>
                    <p><strong>Scientific Name:</strong> {bird.scientificName}</p>
                    <p><strong>Other Names:</strong> {bird.otherNames.join(", ")}</p>
                    <p><strong>Conservation Status:</strong> {bird.conservationStatus}</p>

                    <p><strong>Weight:</strong> {bird.weight}</p>
                    <p><strong>Length:</strong> {bird.length}</p>
                    <p><strong>Food:</strong> {bird.food}</p>
                    <p><strong>Habitat:</strong> {bird.habitat}</p>
                    <p><strong>Rarity:</strong>{'🌟'.repeat(bird.rarity)}</p>
                    <br />
                    <p><strong>Description:</strong> {bird.description}</p>
                    <br />
                </div>
                <div className="bird-images">
                    <h3>Images:</h3>
                    {bird.images.map((imgSrc, index) => (
                        <img key={index} className="bird-image" src={imgSrc} alt={`${bird.name} image ${index}`} style={{ width: "100%" }} />
                    ))}
                </div>
            </div>}
        </div>
    );
};