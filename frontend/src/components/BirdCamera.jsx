import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useState } from 'react';
import {Button} from 'antd-mobile'


export default function BirdCamera({ onPhotoCaptured }) {
    const [showCamera, setShowCamera] = useState(false);
    const [photoSrc, setPhotoSrc] = useState('');

    function handleTakePhoto(dataUri) {
        // Set the captured photo to state
        setPhotoSrc(dataUri);
    }

    function handleSubmitPhoto() {
        onPhotoCaptured(photoSrc);
        closeCamera();  // Close the camera once submitted
    }

    function closeCamera() {
        setPhotoSrc('');  // Clear photo
        setShowCamera(false);  // Hide camera
    }

    const cameraStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,  // Ensure it's above other components
        backgroundColor: 'black'
    };

    return (
        <div>
            {showCamera ? (
                <div style={cameraStyle}>
                    {photoSrc ? (
                        <div>
                            <img src={photoSrc} alt="Captured" style={{width:"100vw"}}/>
                            <Button color='primary'   onClick={() => setPhotoSrc('')}>Retake</Button>
                            <Button color='primary'   onClick={handleSubmitPhoto}>Submit</Button>
                            <Button color='primary'   onClick={closeCamera}>Back</Button>
                        </div>
                    ) : (
                        <div>
                            <Camera onTakePhoto={(dataUri) => handleTakePhoto(dataUri)} idealFacingMode="environment" />
                            <Button color='primary'   onClick={closeCamera}>Back</Button>
                        </div>
                    )}
                </div>
            ) : (
                <Button color='primary'   onClick={() => setShowCamera(true)}>Open Camera</Button>
            )}
        </div>
    );
}
