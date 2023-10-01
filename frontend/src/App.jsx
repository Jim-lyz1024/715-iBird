import { useState, useEffect } from 'react'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import { RequiresAuth, RequiresNonAuth } from "./components/AuthenticationWrapper";
import { Route, Routes } from "react-router-dom";
import { getUsernameFromToken } from './api/api';
import UserContext from '../UserContext';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import Profile from './pages/Profile';
import FindFriend from './pages/FindFriend';
import MyFriends from './pages/MyFriends';
import Start from './pages/Start';
import Trip from './pages/Trip';
import TripHistoryList from './pages/TripHistoryList';
import TripHistory from './pages/TripHistory';
import BirdDetails from './pages/BirdDetails';
import BirdCollectionPage from './pages/BirdCollectionPage';
import TripOption from './pages/TripOption';
import ChallengesPage from './pages/ChallengesPage';
import MyKiwi from './pages/MyKiwi';
import ExpertOpinion from './pages/ExpertOpinion';

function App() {
    const [username, setUsername] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUsernameFromToken(token)
                .then((res) => {
                    setUsername(res.data);
                })
                .catch((err) => {
                    localStorage.setItem('token', "");
                })
        }
    }, []);

    return (
        <UserContext.Provider value={{ username, setUsername, selectedImage, setSelectedImage }}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequiresAuth>
                            <Dashboard />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/community"
                    element={
                        <RequiresAuth>
                            <Community />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/community/findfriends"
                    element={
                        <RequiresAuth>
                            <FindFriend />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/community/myfriends"
                    element={
                        <RequiresAuth>
                            <MyFriends />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/users/:username"
                    element={
                        <RequiresAuth>
                            <Profile />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/start"
                    element={
                        <RequiresAuth>
                            <Start />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/start/option"
                    element={
                        <RequiresAuth>
                            <TripOption />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/start/trip"
                    element={
                        <RequiresAuth>
                            <Trip />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/start/history"
                    element={
                        <RequiresAuth>
                            <TripHistoryList />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/start/history/:tripId"
                    element={
                        <RequiresAuth>
                            <TripHistory />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/bird/:name"
                    element={
                        <RequiresAuth>
                            <BirdDetails />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/birds/collection"
                    element={
                        <RequiresAuth>
                            <BirdCollectionPage />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/challengesPage"
                    element={
                        <RequiresAuth>
                            <ChallengesPage />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/myKiwi"
                    element={
                        <RequiresAuth>
                            <MyKiwi />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/expertOpinion"
                    element={
                        <RequiresAuth>
                            <ExpertOpinion />
                        </RequiresAuth>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <RequiresNonAuth>
                            <UserLogin />
                        </RequiresNonAuth>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <RequiresNonAuth>
                            <UserRegister />
                        </RequiresNonAuth>
                    }
                />
            </Routes>
        </UserContext.Provider>
    )
}

export default App
