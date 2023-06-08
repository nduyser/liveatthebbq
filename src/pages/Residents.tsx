import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useQuery} from "@apollo/client";
import { media } from "../gql/Query"

export const Residents = () => {
    const { data } = useQuery(media);
    const residents = data?.residents;
    console.log(residents);

    return (
        <div className="residents content-container">
            {residents?.map((resident: any, index: number) => (
                <div key={index} className="resident-container">
                    <h2 className="heading-overlay">{resident.residentName}</h2>
                    <div className="resident-image">
                        <img
                            src={resident.residentImage.url}
                            alt="resident image"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};


export default Residents;
