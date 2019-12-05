import React from 'react';
import {Link} from "react-router-dom";
import './styles.css';

const Carousel = ({imagesConfig, omitControls = false}) => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide Carousel" data-ride="carousel">
            { omitControls ? null :
                <ol className="carousel-indicators">
                {
                    imagesConfig.map((imagesConfig, index) =>
                        <li data-target="#carouselExampleIndicators"
                            key={imagesConfig.title}
                            data-slide-to={"" + index}
                            className={index === 0 ? "active" : ""}/>
                    )
                }
                </ol>
            }
            <div className="carousel-inner">
                {
                    imagesConfig.map((imageConfig, index) =>
                        <Link to={{
                                    pathname: imageConfig.route,
                                    state: {imageConfig}
                                }}
                                key={imageConfig.title}
                                className={"carousel-item" + (index === 0 ? " active" : "")}>
                            <div>
                                <img className="d-block w-100" src={imageConfig.src} alt={imageConfig.alt}/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h3>{imageConfig.title}</h3>
                                    <p>{imageConfig.paragraph}</p>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
            {
                omitControls ? null :
                    <span>
                        <a className={"carousel-control-prev"}
                           href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Anterior</span>
                        </a>
                        <a className={"carousel-control-next"}
                           href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Próximo</span>
                        </a>
                    </span>
            }
        </div>
    );
};

export default Carousel;
