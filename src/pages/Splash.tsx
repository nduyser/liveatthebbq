import React, { useEffect, useState } from 'react';
import LogoFullScreen from "../components/LogoFullScreen";

interface SplashProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const Splash: React.FC<SplashProps> = ({ setLoading }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer);
                    setLoading(false); // Set loading to false when progress reaches 100
                    return 100;
                }
                return prevProgress + (100 / (18 * 20));
            });
        }, 20);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (progress === 100) {
            // Wait for the splash screen to stop and then fade it out
            setTimeout(() => {
                document.getElementById('splash-screen')?.classList.add('fade-out');
            }, 1000);
        }
    }, [progress]);

    return (
        <div id="splash-screen" className="page-container splash fade-in">
            <LogoFullScreen />
            <div className="progress-bar-container">
                Loading...
            </div>
        </div>
    );
};

export default Splash;