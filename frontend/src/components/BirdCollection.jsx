import React, { useState, useEffect } from 'react';
import BirdCard from '../components/BirdCard';
import { getAllbirds, getUserbirds } from '../api/api';

export default function BirdCollection({ username, showRemainBird }) {
    const [myBirds, setMyBirds] = useState([]);
    const [allBirds, setAllBirds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className='Bird_Box'>
                <h2>Birds</h2>
                {myBirds.length > 0 ? <div>
                    {myBirds.map((bird) => (
                        <BirdCard key={bird._id} bird={bird} />
                    ))}
                </div> : <p>No Birds</p>}
            </div>

            {showRemainBird && <div  className='Bird_Box'>
                <h2>Keep looking for these birds</h2>
                {notOwnedBirds.length > 0 ? <div>
                    {notOwnedBirds.map((bird) => (
                        <BirdCard key={bird._id} bird={bird} />
                    ))}
                </div> : <p >No Birds</p>}
            </div>}
        </div>
    );
}
