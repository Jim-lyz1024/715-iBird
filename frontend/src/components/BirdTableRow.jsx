import { useState, useEffect } from 'react';
import { getImageByKey } from '../api/api';
import { useNavigator } from '../hooks/useNavigator';
import { requestExpertOpinion } from '../api/api';
import './BirdTableRow.css';


export default function BirdTableRow({ image, setMapCenter, setSelectedImage }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [expertStatus, setExpertStatus] = useState(image.expertStatus);
    const navigateWithState = useNavigator();

    const handleBirdLocationClick = () => {
        setSelectedImage(null);

        setTimeout(() => {
            setSelectedImage(image);
            setMapCenter(image.location);
        }, 100);
    };

    const handleExpertRequest = () => {
        requestExpertOpinion(localStorage.getItem('token'), image._id)
            .then(() => {
                setExpertStatus("inProgress");
            })
            .catch(error => {
                console.error('Error requesting expert opinion:', error);
            });
    };

    useEffect(() => {
        getImageByKey(localStorage.getItem('token'), image.s3Key)
            .then(res => {
                setImageUrl(res.data);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    }, []);

    return (
        <tr>
            <td>{imageUrl && <img src={imageUrl} alt="Bird" width="100" />}</td>
            {image.birdId ?
                <td className="clickable-cell"
                    onClick={() => navigateWithState(`/bird/${image.birdId.name}`, { replace: true })}
                    >
                    {image.birdId.name}
                </td> :
                <td>No Bird</td>
            }

            {/* <td>{image.timestamp}</td> */}
            <td className="clickable-cell"
                onClick={() => handleBirdLocationClick()}
                >
                <p className="map-icon">🗺️</p>
            </td>
            <td>
                {expertStatus === 'NA' && (
                    <button className="request-button" onClick={handleExpertRequest}>Need Expert</button>
                )}
                {expertStatus === 'inProgress' && (
                    <span>Request received</span>
                )}
                {expertStatus === 'done' && (
                    <span>Check update</span>
                )}
            </td>
        </tr>
    );
}
