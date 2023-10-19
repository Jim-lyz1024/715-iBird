import { GoogleMap, LoadScript, Marker, Polyline, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect, useRef } from 'react';
import { getImageByKey } from '../api/api';
import UserContext from "../../UserContext";
import { useContext } from "react";
import BirdTable from "./BirdTable";

const mapContainerStyle = {
    height: "40vh",
    width: "100%"
};

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function TripMap({ path, center, autoCentering, images, isHistory, trip, onMapHeightChange }) {
    const { selectedImage, setSelectedImage } = useContext(UserContext);
    const [imageUrls, setImageUrls] = useState({});
    const [mapCenter, setMapCenter] = useState(center);
    const [isGoogleMapsLoaded, setGoogleMapsLoaded] = useState(false);
    const tripMapRef = useRef(null);
    const [tripMapHeight, setTripMapHeight] = useState(0);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);


    useEffect(() => {
        if (tripMapRef.current) {
            setTripMapHeight(tripMapRef.current.mapRef.offsetHeight);
            onMapHeightChange && onMapHeightChange(tripMapRef.current.mapRef.offsetHeight);
        }
    }, [tripMapRef, isGoogleMapsLoaded]);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
    
        window.addEventListener('resize', handleResize);
        
        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    

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
    const getMarkerLabel = (s3Key) => {
        return s3Key.includes('/') ? '🖊️' : '🐦';
    };
    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey} onLoad={() => setGoogleMapsLoaded(true)}>
            {isGoogleMapsLoaded && (<GoogleMap
                id="trip-map"
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={mapCenter}
                ref={tripMapRef}
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
                        icon={{
                            url: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', // Transparent pixel
                            size: new window.google.maps.Size(32, 32),
                            scaledSize: new window.google.maps.Size(32, 32),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(16, 16),
                        }}
                        label={{ text: getMarkerLabel(image.s3Key), color: 'black', fontSize: '20px' }}
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

            </GoogleMap>)}
            {trip && trip.isEdugaming && <BirdTable trip={trip} setMapCenter={setMapCenter} setSelectedImage={setSelectedImage} mapHeight={tripMapHeight} windowHeight={windowHeight}/>}
        </LoadScript>
    );
}
