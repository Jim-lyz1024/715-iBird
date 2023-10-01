import { createContext } from 'react';

const UserContext = createContext({
    username: null,
    setUsername: () => { },
    selectedImage: null,
    setSelectedImage: () => { }
});

export default UserContext;
