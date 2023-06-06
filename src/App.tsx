// App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Photos from './pages/Photos';
import PastEvents from './pages/PastEvents';
import Events from './pages/Events';
import Residents from './pages/Residents';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import '../src/styling/_app.scss';
import { MusicPlayer } from './components/MusicPlayer';
import { useQuery } from '@apollo/client';
import { media } from './gql/Query';
import Splash from './pages/Splash';

const routes = [
    { path: '/', name: 'Home', element: <Home /> },
    { path: '/about', name: 'About', element: <About /> },
    { path: '/residents', name: 'Residents', element: <Residents /> },
    { path: '/events', name: 'Events', element: <Events /> },
    { path: '/videos', name: 'Videos', element: <Videos /> },
    { path: '/photos', name: 'Photos', element: <Photos /> },
    { path: '/past-events', name: 'Past Events', element: <PastEvents /> },
    { path: '/contact', name: 'Contact', element: <Contact /> },
];

function App() {
    const [loading, setLoading] = useState(true);
    const { error, data } = useQuery(media);

    useEffect(() => {
        const splashTimeout = setTimeout(() => {
            setLoading(false);
        }, 8000);

        return () => {
            clearTimeout(splashTimeout);
        };
    }, []);

    if (loading) {
        return <Splash setLoading={setLoading} />;
    }

    if (error) {
        console.log('Error:', error);
        return <div>Error: {error.message}</div>;
    }

    const homeVideo = data.videos[0];

    return (
        <Router>
            <Navbar routes={routes} />
            <div className="page-container fade-in">
                <div className="video-container">
                    <video className="video-element" autoPlay muted>
                        <source src={homeVideo.link.url} type="video/mp4" />
                    </video>
                </div>
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </div>
            <MusicPlayer />
        </Router>
    );
}

export default App;
