import React from 'react'
import './Aboutus.css'
import bgA from '../../videos/About-us.mp4'
import { Navbar } from '../navbar/Navbar'
import { Footer } from '../header/footer/Footer'

export const Aboutus = () => {
    return (
        <>
            <Navbar />
            <div className="aboutVid">
                <video autoPlay loop muted className="background-video">
                    <source src={bgA} type="video/mp4" />
                </video>
                <div className="about-text">
                    <h1>About us</h1>
                </div>
            </div>
            <div className="about-us-container">
                <div className="about-section">
                    <h2>About us</h2>
                    <p>
                        The Heaven was born from our passion for comfort and
                        excellence in service. Our team of hospitality experts
                        works tirelessly to offer the highest level of
                        personalized attention, ensuring that each visit becomes
                        a memorable experience.
                    </p>
                </div>
                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        Our commitment is to provide you with a space where you
                        can relax and rejuvenate. From our exquisitely designed
                        rooms to our world-class facilities, we strive to create
                        an environment that feels like a true paradise.
                    </p>
                </div>
                <div className="about-section">
                    <h2>Our Commitment</h2>
                    <p>
                        At The Heaven, we believe that every guest deserves an
                        extraordinary experience. Whether you visit us for
                        business, pleasure or a romantic getaway, our goal is to
                        exceed your expectations at every moment of your stay.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}
