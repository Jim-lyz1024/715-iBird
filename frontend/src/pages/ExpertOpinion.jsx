import React, { useState, useEffect } from 'react';
import { getImagesForExpertReview, getImageByKey, getAllbirds } from '../api/api';
import NavigationButton from "../components/NavigationButton";
import { expertUpdateBird } from '../api/api';
import ExpertImagesTable from '../components/ExpertImagesTable';
import { useNavigator } from '../hooks/useNavigator';

export default function ExpertOpinion() {
    const [images, setImages] = useState([]);
    const [birds, setBirds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedBirdId, setSelectedBirdId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const navigateWithState = useNavigator();
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch birds
        getAllbirds(token)
            .then(res => {
                setBirds(res.data);
            })
            .catch(error => {
                console.error('Error fetching birds:', error);
            });

        // Fetch images for expert review
        getImagesForExpertReview(token)
            .then(res => {
                const fetchedImages = res.data;

                // Fetch image URLs for each image
                const promises = fetchedImages.map(image =>
                    getImageByKey(token, image.s3Key)
                );

                Promise.all(promises)
                    .then(imageUrls => {
                        const imagesWithUrls = fetchedImages.map((image, index) => ({
                            ...image,
                            imageUrl: imageUrls[index].data
                        }));
                        setImages(imagesWithUrls);
                    });
            })
            .catch(error => {
                console.error('Error fetching images for expert review:', error);
            });
    }, [refreshKey]);

    const handleUpdateClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const handleSubmit = () => {
        expertUpdateBird(token, selectedImage._id, selectedBirdId)
            .then(res => {
                console.log(res.data);
                setRefreshKey(prevKey => prevKey + 1);
            })
            .catch(error => {
                console.log(error)
            });

        // Close the modal
        setShowModal(false);
    };

    const handleClose = () => {
        // Reset selected Image
        setSelectedImage(null);

        // Reset selected bird ID
        setSelectedBirdId(null);

        // Close the modal
        setShowModal(false);
    };

    return (
        <div>
            <NavigationButton path="/" text="back" />
            <button
                onClick={() => navigateWithState(`/birds/collection`, { replace: true })}>
                View Bird Collection
            </button>
            <h3>Verify these Birds</h3>
            <ExpertImagesTable images={images.filter(img => img.expertStatus === 'inProgress')} handleUpdateClick={handleUpdateClick} />

            <h3>Done</h3>
            <ExpertImagesTable images={images.filter(img => img.expertStatus === 'done')} handleUpdateClick={handleUpdateClick} />

            {showModal && (
                <div style={overlayStyles}>
                    <div style={formStyle}>
                        <h3>Which Bird is This?</h3>
                        <img src={selectedImage.imageUrl} style={{ width: '100%' }} />
                        <h3>Select a Bird</h3>
                        {birds.map(bird => (
                            <div key={bird._id} style={{ width: '20%', display: 'inline-block' }}>
                                <img src={bird.images[0]} style={{ width: '90%' }} />
                                <br />
                                <button
                                    onClick={() => setSelectedBirdId(bird._id)}
                                    style={bird._id === selectedBirdId ? selectedStyle : {}}
                                >
                                    {bird.name}
                                </button>
                                <br /><br />
                            </div>
                        ))}
                        <br />
                        <button
                            onClick={() => setSelectedBirdId(null)}
                            style={selectedBirdId === null ? selectedStyle : {}}
                        >
                            No Bird
                        </button>
                        <br /><br /><br />
                        <button onClick={handleSubmit}>Submit</button>
                        <br /><br />
                        <button onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const formStyle = {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    overflowY: 'auto',
    padding: '20px',
    borderRadius: '20px'
};


const selectedStyle = {
    backgroundColor: 'lightblue'
};

