import React from 'react';

const Carousel = ({imagesConfig}) => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
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
            <div className="carousel-inner">
                {
                    imagesConfig.map((imageConfig, index) =>
                        <div key={imageConfig.title}
                                className={"carousel-item" + (index === 0 ? " active" : "")}>
                            <img className="d-block w-100" src={imageConfig.src} alt={imageConfig.alt}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{imageConfig.title}</h5>
                                <p>{imageConfig.paragraph}</p>
                            </div>
                        </div>
                    )
                }
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
               data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Anterior</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
               data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Próximo</span>
            </a>
        </div>
    );
};

export default Carousel;
