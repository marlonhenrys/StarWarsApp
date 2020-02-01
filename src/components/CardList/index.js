import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import zenserpImageAPI from '../../services/zenserpImageAPI';
import scaleserpImageAPI from '../../services/scaleserpImageAPI';
import pixabayImageAPI from '../../services/pixabayImageAPI';
import './styles.css';
import axios from 'axios';

const CardList = ({ element, itemId, category }) => {

    const title = element.name ? element.name : element.title;
    const [ imageUrl, setImageUrl ] = useState('');

    useEffect(() => {
        async function getImage(apis, imageDescription, callbacks)
        {
            let imageFetched = false;

            for (let i = 0; !imageFetched && i < apis.length; i++)
            {
                try
                {
                    const response = await apis[i].get('', {
                        params: {
                            q: imageDescription
                        }
                    });
    
                    imageFetched = true;
                    console.log(`${i} ->`, response);
                    callbacks[i](response);
                }
                
                catch (error) { /* console.log(error); */ }
            }
        }

        getImage([zenserpImageAPI, scaleserpImageAPI, pixabayImageAPI], title, [
            (response) => setImageUrl(response.data.image_results[0].sourceUrl),
            (response) => setImageUrl(response.data.image_results[0].image),
            (response) => setImageUrl(response.data.hits[0].largeImageURL),
        ]);
    }, []);

    return (
        <div className="CardList col-lg-4 col-md-6">
            { !imageUrl ? null : <img className="card-img-top" src={imageUrl} alt={title} height="200px"></img> }
            <div className="card-header"><strong>{title}</strong></div>
            <div className="card-body">
                <Link to={category + '/' + itemId}
                        className="btn btn-color">I want more</Link>
            </div>
        </div>
    );
}

export default CardList;
