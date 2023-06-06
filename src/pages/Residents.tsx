import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const imageSrc1 = "https://64.media.tumblr.com/497b1b56611ce532b37b0aa54ef34ed3/tumblr_oo9qugeqHn1uncsmmo1_1280.jpg";
const imageSrc2 = "https://64.media.tumblr.com/9263996fa62f90dfedcc17be2b222623/tumblr_n41j0nJzSL1rp4397o1_1280.jpg";
const imageSrc3 = "https://64.media.tumblr.com/901de0f3ee9d01388194e6286b457989/tumblr_nm7jomOBYJ1uo0ao3o1_1280.jpg";
const imageSrc4 = "https://64.media.tumblr.com/3f1a873c9122b05e57e73bc2fb0d15f7/tumblr_ns2htucjTC1uncsmmo1_1280.jpg";

export const Residents = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index: any) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const residents = [
        { src: imageSrc1, alt: "Resident 1", heading: "John" },
        { src: imageSrc2, alt: "Resident 2", heading: "Jane" },
        { src: imageSrc3, alt: "Resident 3", heading: "Jane" },
        { src: imageSrc4, alt: "Resident 4", heading: "John" },
    ];

    return (
        <div className="residents">
            {residents.map((resident, index) => (
                <div key={index} className="resident-container">
                    <div className="resident-image">
                        <img
                            src={resident.src}
                            alt={resident.alt}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        />
                    </div>
                        <h2 className="heading-overlay">{resident.heading}</h2>
                </div>
            ))}
        </div>
    );
};


export default Residents;
