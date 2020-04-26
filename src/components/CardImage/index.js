import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

import imgurAPI from '../../services/imgurAPI';

// const BASE_IMAGE_SEARCH = "https://pixabay.com/api/?key=15107938-32df2223c6d173bad257be2dd&image_type=photo";

const CardImage = ({ title }) => {
    const [imageHits, setImageHits] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        let cancelled = false;

        (async () => {
            try {
                const response = await imgurAPI.get(`?q=${encodeURIComponent(title)}&q_type=jpg`, {
                    cancelToken: source.token
                });
                if (!cancelled) setImageHits(response.data);
            } catch (error) {
                console.info(error);
            }
        })();

        return () => {
            cancelled = true;
            source.cancel("Request cancelled on component unmont");
        }
    }, [title]);

    let component;
    if (!imageHits) component = <Spinner animation="border" />;
    else {
        const data = imageHits.data?.[0];
        const link = data?.images?.[0]?.link || data?.link;

        component = !link ? (
            "Image not found"
        ) : (
            <img className="card-img-top" src={link} alt={title} height="200px"/>
        );
    }

    return component;
}

export default CardImage;
