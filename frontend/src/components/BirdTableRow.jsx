import { useState, useEffect } from 'react';
import { getImageByKey } from '../api/api';
import { useNavigator } from '../hooks/useNavigator';
import { requestExpertOpinion } from '../api/api';

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
                <td
                    onClick={() => navigateWithState(`/bird/${image.birdId.name}`, { replace: true })}
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    {image.birdId.name}
                </td> :
                <td>No Bird</td>
            }

            <td>{image.timestamp}</td>
            <td
                onClick={() => handleBirdLocationClick()}
                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                {JSON.stringify(image.location)}
            </td>
            <td>
                {expertStatus === 'NA' && (
                    <button onClick={handleExpertRequest}>Request Expert Opinion</button>
                )}
                {expertStatus === 'inProgress' && (
                    <span>We have received your request</span>
                )}
                {expertStatus === 'done' && (
                    <span>Please check updated Bird</span>
                )}
            </td>
        </tr>
    );
}
