import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LikedHotels.css'

function LikedHotelsData(props) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(props.link)
    }

    return (
        <div className="i-card">
            <div className="i-image">
                <img src={props.image} alt="image" />
            </div>
            <div className="i-details">
                <div className="left-details">
                    <h4>{props.heading}</h4>
                    <p>{props.text}</p>
                    <p>
                        {props.rating}
                        {Array.from(
                            { length: Math.floor(parseFloat(props.rating)) },
                            (_, i) => (
                                <i key={i} className="fa-solid fa-star"></i>
                            )
                        )}
                    </p>
                    <p>Comment: {props.comment}</p>
                </div>
                <div className="right-details">
                    <p className="price">Price: {props.price}</p>
                </div>
            </div>
            <button className="btnC" onClick={handleClick}>
                {props.btn}
            </button>
        </div>
    )
}

export default LikedHotelsData
