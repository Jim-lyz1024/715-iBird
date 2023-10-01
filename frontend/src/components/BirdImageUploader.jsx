import { useState } from 'react';
import { uploadImage } from '../api/api';
import {Button} from 'antd-mobile'

export default function BirdImageUploader({ onUploadComplete, location, timestamp }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const token = localStorage.getItem('token');
        if (selectedFile && token) {
            uploadImage(token, selectedFile, location, timestamp)
                .then(res => {
                    console.log('Successfully uploaded');
                    onUploadComplete();
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                });
        }
    };

    return (
        <div>
            <input type="file" id="default-btn" accept="image/*" onChange={handleFileChange} />
            <Button color='primary'  onClick={handleUpload}>Upload</Button>
        </div>
    );
}
