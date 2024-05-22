import React from 'react'
import './Aboutus.css'
import imgA from '../../img/Hotel1.jpg'
import bgA from '../../videos/About-us.mp4'
import { Navbar } from '../navbar/Navbar'
import { Footer } from '../header/footer/Footer'

export const Aboutus = () => {
    return (
        <>
            <Navbar />
            <div className="aboutVid">
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '90vh',
                        objectFit: 'cover',
                        zIndex: '-10',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <source src={bgA} type="video/mp4" />
                </video>
            </div>
            <div className="about-us-container">
                <div className="about-us-header">
                    <div className="about-text">
                        <h1>About us</h1>
                    </div>
                    <div className="features">
                        <div className="feature">
                            <img
                                src="path/to/fast-results-icon.png"
                                alt="Fast results"
                            />
                            <h2>Fast, relevant results</h2>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Quod odit maiores optio, fugit
                                doloribus iure esse cumque, explicabo asperiores
                                velit odio. Voluptates fugit laudantium vitae
                                saepe natus eligendi eos debitis.
                            </p>
                        </div>
                        <div className="feature">
                            <img
                                src="path/to/power-user-icon.png"
                                alt="Power user's dream"
                            />
                            <h2>A power user's dream</h2>
                            <p>
                                Search using regular expressions, boolean
                                operations, keyboard shortcuts, and more.
                            </p>
                        </div>
                        <div className="feature">
                            <img
                                src="path/to/more-than-search-icon.png"
                                alt="More than just search"
                            />
                            <h2>More than just search</h2>
                            <p>
                                Dig deeper with the all-new code view—tightly
                                integrating browsing and code navigation.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="code-search">
                    <h2>Way more than grep.</h2>
                    <div className="code-search-content">
                        <img src={imgA} alt="Code Search" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quo voluptas qui exercitationem accusantium
                            molestiae illo cumque rerum enim quaerat libero
                            quasi, delectus explicabo magni veniam, nemo dolores
                            dolorum iste autem.
                        </p>
                    </div>
                </div>

                <div className="search-syntax">
                    <h2>Suggestions, completions, and more.</h2>
                    <p>
                        Use the new search input to find symbols and files—and
                        jump right to them.
                    </p>

                    <img
                        src="path/to/search-syntax-image.png"
                        alt="Search Syntax"
                    />
                </div>

                <div className="code-view">
                    <h2>Meet the all-new code view.</h2>
                    <p>
                        Dig deeper into complex codebases with tightly
                        integrated search, code navigation and browsing.
                    </p>
                    <img src="path/to/code-view-image.png" alt="Code View" />
                </div>

                <div className="file-browser">
                    <h2>File browser</h2>
                    <p>
                        Keep all your code in context and instantly switch files
                        with the new file tree pane.
                    </p>
                    <img
                        src="path/to/file-browser-image.png"
                        alt="File Browser"
                    />
                </div>

                <div className="faq">
                    <h2>Frequently asked questions</h2>
                    <details>
                        <summary>
                            Do I need to set up my repositories to support code
                            navigation?
                        </summary>
                        <p>No setup required.</p>
                    </details>
                    <details>
                        <summary>Who can search my code?</summary>
                        <p>Only you and your team.</p>
                    </details>
                    <details>
                        <summary>
                            How much does the new code search and code view
                            cost?
                        </summary>
                        <p>It's included in your GitHub plan.</p>
                    </details>
                </div>
            </div>
            <Footer />
        </>
    )
}
