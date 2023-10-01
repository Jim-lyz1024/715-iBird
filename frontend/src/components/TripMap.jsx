import { GoogleMap, LoadScript, Marker, Polyline, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect } from 'react';
import { getImageByKey } from '../api/api';
import UserContext from "../../UserContext";
import { useContext } from "react";
import BirdTable from "./BirdTable";

const mapContainerStyle = {
    height: "500px",
    width: "100%"
};

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function TripMap({ path, center, autoCentering, images, isHistory, trip }) {
    const { selectedImage, setSelectedImage } = useContext(UserContext);
    const [imageUrls, setImageUrls] = useState({});
    const [mapCenter, setMapCenter] = useState(center);

    useEffect(() => {
        setSelectedImage(null);
        if (images && images.length > 0) {
            const fetchImageUrls = async () => {
                const urls = {};
                for (let image of images) {
                    try {
                        const response = await getImageByKey(localStorage.getItem("token"), image.s3Key);
                        if (response.data) {
                            urls[image.s3Key] = response.data;
                        }
                    } catch (error) {
                        console.error("Error fetching image URL for key:", image.s3Key, error);
                    }
                }
                setImageUrls(urls);
            };

            fetchImageUrls();
        }
    }, [images]);

    useEffect(() => {
        if (autoCentering) {
            setMapCenter(null);

            // set time out to ensure the component re-render
            setTimeout(() => {
                setMapCenter(center);
            }, 100);
        }
    }, [autoCentering, center]);

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
                id="trip-map"
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={mapCenter}
            >
                {center && !isHistory &&
                    <Marker
                        position={center}
                        icon={{
                            path: 0.0, //0.0 for window.google.maps.SymbolPath.CIRCLE
                            scale: 10,
                            fillOpacity: 1,
                            strokeWeight: 2,
                            fillColor: '#5384ED',
                            strokeColor: '#ffffff',
                        }}
                    />
                }
                {path && path.length > 0 && (
                    <Polyline
                        path={path}
                        options={{
                            strokeColor: "#FF0000",
                            strokeOpacity: 0.8,
                            strokeWeight: 3
                        }}
                    />
                )}

                {trip && trip.isEdugaming && images && images.map((image) => (
                    <Marker
                        key={image._id}
                        position={{ lat: image.location.lat, lng: image.location.lng }}
                        onClick={() => {
                            setSelectedImage(image);
                        }}
                    >
                        {selectedImage && selectedImage._id === image._id && (
                            <InfoWindow
                                onCloseClick={() => setSelectedImage(null)}
                            >
                                <div>
                                    {selectedImage.birdId && <h3>{selectedImage.birdId.name}</h3>}
                                    {imageUrls[selectedImage.s3Key] &&
                                        <img src={imageUrls[selectedImage.s3Key]} style={{ width: '100px' }} />
                                    }
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                ))}

            </GoogleMap>
            {trip && trip.isEdugaming && <BirdTable trip={trip} setMapCenter={setMapCenter} setSelectedImage={setSelectedImage} />}
        </LoadScript>
    );
}
