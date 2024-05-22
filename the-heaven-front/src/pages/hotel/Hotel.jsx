import React, { useState } from 'react'
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/header/footer/Footer'
import { Navbar } from '../../components/navbar/Navbar'
import './Hotel.css'
import { LikedHotels } from '../../components/header/likedhotels/LikedHotels'
import { Link } from 'react-router-dom'
import { Rating } from '../../components/rating/Rating'
import { RatingForm } from '../../components/rating/RatingForm'

export const Hotel = () => {
    const [slideNumber, setSlideNumber] = useState(0)
    const [open, setOpen] = useState(false)
    const [comments, setComments] = useState([
        {
            rating: 4,
            title: 'Beautiful but missing MSI docking station promotion',
            date: '18 de enero de 2024',
            verifiedPurchase: true,
            text: "I'm very pleased with the laptop overall. It could have used at least one more USB-A port so I'm going to have to invest in USB hub or docking station. After receiving the laptop I discovered that if I had ordered it from MSI directly I would have gotten a free MSI 2nd gen Docking Station for the same price as Amazon's. It would be nice if Amazon would retroactively match the MSI store's free docking station promotion.",
            reviewer: 'Michael T',
        },
        {
            rating: 1,
            title: 'Major Flaws',
            date: '16 de marzo de 2024',
            verifiedPurchase: true,
            text: "I've have bought two of these AI (2024) model for employees. Major issues. Hardware & software. Avoid. I bought 5 of the previous Prestige models (silver) with no issues at all. I guess MSI cut too many cost corners with this new one.",
            reviewer: 'Kristopher Paulk',
        },
    ])

    const handleOpen = (i) => {
        setSlideNumber(i)
        setOpen(true)
    }

    const handleMove = (direction) => {
        let newSlideNumber

        if (direction === 'l') {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
        }
        setSlideNumber(newSlideNumber)
    }

    const addReview = (newReview) => {
        setComments([newReview, ...comments])
    }

    const photosH = [
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/538700871.jpg?k=96efd9cd986e79b694945a34f3e5fa71440d4cc37720ac419944006525113e7b&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/538700866.jpg?k=e1b0cf3f99961470c899626a1e6a16ec49ab9b7785e93d89e9f9fbfe945722e9&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/538700936.jpg?k=d2833ae200b5e23d56752a4c1e97566bd6acfd921c2a39bfa59c42139f842392&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/509957920.jpg?k=5ec1f23fa54c2188cd8eafbbebd64451366951a4356d76f221c20694a59da08c&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/462626468.jpg?k=2e6b559397f0f02a12b2160496346440ee4c7d61c04e537819ab3431297238f8&o=&hp=1',
        },
        {
            src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/538700878.jpg?k=68daeb9b4e8ca4b1fccf97ea278aac5a70384cd8a60b50525cdc5742bfdcbf9f&o=&hp=1',
        },
    ]

    return (
        <>
            <div>
                <Navbar />
                <Header type="list" />
                <div className="hotelContainer">
                    {open && (
                        <div className="slider">
                            <i
                                className="fa-solid fa-circle-xmark close"
                                onClick={() => setOpen(false)}
                            ></i>
                            <i
                                className="fa-solid fa-circle-arrow-left arrow"
                                onClick={() => handleMove('l')}
                            ></i>
                            <div className="sliderWrapper">
                                <img
                                    src={photosH[slideNumber].src}
                                    alt=""
                                    className="sliderImg"
                                />
                            </div>
                            <i
                                className="fa-solid fa-circle-arrow-right arrow"
                                onClick={() => handleMove('r')}
                            ></i>
                        </div>
                    )}
                    <div className="hotelWrapper">
                        <Link to="Reservation">
                            <button className="reserve">
                                Reserve or Book Now!
                            </button>
                        </Link>
                        <h1 className="hotelTitle">The Westin Camino Real</h1>
                        <div className="hotelAddress">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>
                                The Westin Camino Real, Guatemala, 14 Calle
                                0-20, Cdad. de Guatemala 01010
                            </span>
                        </div>
                        <span className="hotelDistance">
                            Excellente location - 500m from center
                        </span>

                        <div className="hotelImag">
                            {photosH.map((photo, i) => (
                                <div className="hotelImgWrapper" key={i}>
                                    <img
                                        onClick={() => handleOpen(i)}
                                        src={photo.src}
                                        alt=""
                                        className="hotelImg"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="hotelDetails">
                            <div className="hotelDetailsTexts">
                                <h1 className="">
                                    Discover how the stars feel with the best
                                    service at The Westin Camino Real, Guatemala
                                </h1>
                                <p className="hotelDesc">
                                    Located 2 km from Guatemala Airport, The
                                    Westin Camino Real, Guatemala offers a
                                    heated outdoor pool and a convention center.
                                    The rooms have air conditioning, cable TV
                                    and a safe.
                                    <br />
                                    <br />
                                    The Westin Camino Real, Guatemala features a
                                    modern gym, hot tub, spa and sauna. There
                                    are also squash and tennis courts.
                                    <br />
                                    <br />
                                    All rooms are spacious and classic in style,
                                    and feature a minibar and coffee maker. The
                                    marble bathroom is equipped with a
                                    hairdryer. Free mineral water and free local
                                    calls are included.
                                    <br />
                                    <br />
                                    The Cafetal restaurant serves international
                                    cuisine in an elegant setting. Breakfast
                                    includes local and American specialties such
                                    as pancakes, eggs and bacon.
                                    <br />
                                    <br />
                                    The Ixchel Museum is just 600 meters from
                                    the hotel, while the Metropolitan Cathedral
                                    is about 5 km away. Free private parking is
                                    provided. Antigua Guatemala is approximately
                                    38 km away.
                                    <br />
                                    <br />
                                    Couples love the location — They have given
                                    it a 9.2 for trips of two people.
                                    <br />
                                    <br />
                                    The distances in the accommodation
                                    description are calculated with
                                    OpenStreetMap© Most popular services.
                                </p>
                            </div>
                            <div className="hotelDetailsH">
                                <h1>Strong points of the accommodation</h1>
                                <div className="detailsSection">
                                    <h2>Ubicación</h2>
                                    <div className="detailsList">
                                        <i className="fa-solid fa-location-dot icon"></i>
                                        <span className="detailsText">
                                            The best location. Recent travelers
                                            give it a high score (4.8)
                                        </span>
                                    </div>
                                </div>
                                <div className="detailsSection">
                                    <h2>Rooms with:</h2>
                                    <div className="detailsList">
                                        <i className="fa-solid fa-person-swimming icon"></i>
                                        <span className="detailsText">
                                            Pool views
                                        </span>
                                    </div>
                                    <div className="detailsList">
                                        <i className="fa-solid fa-square-parking icon"></i>
                                        <span className="detailsText">
                                            There is free private parking at the
                                            hotel
                                        </span>
                                    </div>
                                </div>
                                <div className="detailsSection">
                                    <h2>Faithful clients</h2>
                                    <div className="detailsList">
                                        <i className="fa-solid fa-circle-check icon"></i>
                                        <span className="detailsText">
                                            Customers repeat more here than in
                                            other accommodations.
                                        </span>
                                    </div>
                                </div>
                                <button>Reserve or book Now</button>
                            </div>
                        </div>
                    </div>
                    <h1 className="others com">Comments</h1>
                    <div className="commentsSection">
                        <RatingForm addReview={addReview} />
                        {comments.map((review, index) => (
                            <Rating key={index} {...review} />
                        ))}
                    </div>
                    <div>
                        <h1 className="others">
                            You may be interested in these hotels
                        </h1>
                    </div>
                    <LikedHotels />
                </div>
            </div>
            <Footer />
        </>
    )
}
