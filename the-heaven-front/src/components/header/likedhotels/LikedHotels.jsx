import React from 'react'
import './LikedHotels.css'
import LikedHotelsData from './LikedHotelsData'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Card1 from '../../../img/Hotel1.jpg'
import Card2 from '../../../img/Hotel2.jpg'
import Card3 from '../../../img/Hotel3.jpg'
import Card4 from '../../../img/Hotel4.jpg'

export function LikedHotels() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <div className="outstanding">
            <Slider {...settings}>
                <LikedHotelsData
                    image={Card1}
                    heading="The Westin Camino Real"
                    text="Rest in our best suites"
                    btn="Details"
                    price="$200"
                    rating="5.0"
                    comment="1659 comments"
                    link="/hotels/westin-camino-real"
                />
                <LikedHotelsData
                    image={Card2}
                    heading="Intercontinental Real"
                    text="Rest in our 5-star Intercontinental Real hotel"
                    btn="Details"
                    price="$300"
                    rating="4.5"
                    comment="1050 comments"
                    link="/details/intercontinental-real"
                />
                <LikedHotelsData
                    image={Card3}
                    heading="Gran Meliá Iguazú"
                    text="Descansa en el Hotel lujoso del CR7"
                    btn="Details"
                    price="$400"
                    rating="4.9"
                    comment="1750 comments"
                    link="/details/gran-melia-iguazu"
                />
                <LikedHotelsData
                    image={Card4}
                    heading="Palacio Duhau"
                    text="Descansa en el Hotel lujoso del CR7"
                    btn="Details"
                    price="$250"
                    rating="3.9"
                    comment="850 comments"
                    link="/h/palacio-duhau"
                />
            </Slider>
        </div>
    )
}
