import React from 'react';

// Queries
import { useQuery } from '@apollo/client';
import { media } from '../gql/Query';
import {Link} from "react-router-dom";

export const Home = () => {
    const { loading, error, data } = useQuery(media);
    let logoImageSrc = '';

    if (!loading && !error && data?.mediaElements?.length) {
        const logoElement = data.mediaElements[2];
        logoImageSrc = logoElement.elementUrl.url;
    }

    return (
        <div className="content-container">
            <Link to="/" id="logo-link">
                {logoImageSrc && (
                    <img src={logoImageSrc} alt="Logo" className="logo" />
                )}
            </Link>
        </div>
    );
};

export default Home;
