import React from 'react'
import { useNavigator } from '../hooks/useNavigator'

export default function ExpertImagesTable({ images, handleUpdateClick }) {
    const navigateWithState = useNavigator();
    return (
        <table>
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
                    <tr key={image._id}>
                        <td
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
                            <td
                                onClick={() => navigateWithState(`/bird/${image.birdId.name}`, { replace: true })}
                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                                {image.birdId.name}
                            </td> : <td>No Bird</td>
                        }
                        <td><button onClick={() => handleUpdateClick(image)}>Update</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
