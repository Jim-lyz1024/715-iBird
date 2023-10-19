import React from 'react'
import { useNavigator } from '../hooks/useNavigator'
import { Button} from 'antd-mobile'
import './ExpertImagesTable.css';

export default function ExpertImagesTable({ images, handleUpdateClick }) {
    const navigateWithState = useNavigator();
    return (
        <table className="expert-images-table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Image</th>
                    <th>Bird Name</th>
                    <th>Update Bird</th>
                </tr>
            </thead>
            <tbody>
                {images.map(image => (
                    <tr key={image._id} className="table-row">
                        <td className="clickable-cell"
                            onClick={() => navigateWithState(`/users/${image.userId.username}`, { replace: true })}
                            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                            {image.userId.username}
                        </td>
                        <td>
                            <img
                                src={image.imageUrl}
                                alt={`Bird by ${image.userId.username}`}
                                width="100"
                            />
                        </td>
                        {image.birdId ?
                            <td className="clickable-cell"
                                onClick={() => navigateWithState(`/bird/${image.birdId.name}`, { replace: true })}
                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                                {image.birdId.name}
                            </td> : <td>Not a Bird</td>
                        }
                        <td><button className="update-button" onClick={() => handleUpdateClick(image)}>Update</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
