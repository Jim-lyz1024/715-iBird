import React, { useState, useEffect } from 'react';
import BirdCard from '../components/BirdCard';
import { getAllbirds, getUserbirds } from '../api/api';
import Spinner from './Spinner';

export default function BirdCollection({ username, showRemainBird }) {
    const [myBirds, setMyBirds] = useState([]);
    const [allBirds, setAllBirds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const doesUserOwnBird = (bird) => {
        return myBirds.some(myBird => myBird._id === bird._id);
    };

    useEffect(() => {
        if (!username) return;
        const fetchBirds = async () => {
            try {
                const allBirdsResponse = await getAllbirds(localStorage.getItem('token'));
                const myBirdsResponse = await getUserbirds(localStorage.getItem('token'), username);

                setAllBirds(allBirdsResponse.data);
                setMyBirds(myBirdsResponse.data);
            } catch (err) {
                setError("Failed to fetch birds.");
            } finally {
                setLoading(false);
            }
        };

        fetchBirds();
    }, [username]);

    const notOwnedBirds = allBirds.filter(
        (bird) => !myBirds.some((myBird) => myBird._id === bird._id)
    );

    if (loading) return <Spinner />;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {showRemainBird ? <div className='Bird_Box'>
                {allBirds.length > 0 ? <div>
                    {allBirds.map((bird) => (
                        <BirdCard key={bird._id} bird={bird} owned={doesUserOwnBird(bird)} />
                    ))}
                </div> : <p>No Birds</p>}
            </div> :
                <div className='Bird_Box'>
                    <h2>Birds</h2>
                    {myBirds.length > 0 ? (
                        <div>
                            {allBirds.map((bird) => {
                                // Check if the current bird is in the list of birds the user owns
                                const isOwned = doesUserOwnBird(bird);

                                // If the bird is owned by the user, display it; otherwise, skip rendering
                                return isOwned ? <BirdCard key={bird._id} bird={bird} owned={true} /> : null;
                            })}
                        </div>
                    ) : (
                        <p>No Birds</p>
                    )}
                </div>}
        </div>
    );
}
