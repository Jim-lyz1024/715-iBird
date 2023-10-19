import React, { useState, useEffect } from 'react';
import { getImagesForExpertReview, getImageByKey, getAllbirds } from '../api/api';
import NavigationButton from "../components/NavigationButton";
import { expertUpdateBird } from '../api/api';
import ExpertImagesTable from '../components/ExpertImagesTable';
import { useNavigator } from '../hooks/useNavigator';
import { Button } from 'antd-mobile'
import './ExpertOpinion.css';


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
            <NavigationButton path="/" text="Expert Opinion" />
            <div className="expert-opinion-container">
                <Button className="view-collection-button" color='primary'
                    onClick={() => navigateWithState(`/birds/collection`, { replace: true })}>
                    View Bird Collection
                </Button>
                <div className="section-container">
                    <h3 className="section-title">Pleasr verify these birds</h3>
                    <ExpertImagesTable images={images.filter(img => img.expertStatus === 'inProgress')} handleUpdateClick={handleUpdateClick} />
                </div>
                <div className="section-container">
                    <h3 className="section-title">Verified</h3>
                    <ExpertImagesTable images={images.filter(img => img.expertStatus === 'done')} handleUpdateClick={handleUpdateClick} />
                </div>
                {showModal && (
                    <div className="overlay">
                        <div className="modal-form">
                            <h3 className="modal-title">What kind of bird is this?</h3>
                            <img src={selectedImage.imageUrl} className="modal-image" />
                            <h3 className="modal-title">Please select a bird</h3>
                            <div className="bird-selection">
                                {birds.map(bird => (
                                    <div key={bird._id} className="bird-card">
                                        <img src={bird.images[0]} className="bird-image" />
                                        <button
                                            className={`bird-button ${bird._id === selectedBirdId ? 'selected' : ''}`}
                                            onClick={() => setSelectedBirdId(bird._id)}
                                        >
                                            {bird.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className={`bird-button ${selectedBirdId === null ? 'selected' : ''}`}
                                onClick={() => setSelectedBirdId(null)}
                            >
                                No Bird
                            </button>
                            <br /><br /><br />
                            <Button color='primary' className="modal-button" onClick={handleSubmit}>Submit</Button>
                            <Button color='primary' className="modal-button" onClick={handleClose}>Cancel</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}