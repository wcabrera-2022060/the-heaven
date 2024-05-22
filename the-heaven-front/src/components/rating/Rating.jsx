import React from 'react'
import './Rating.css'

export const Rating = ({
    rating,
    title,
    date,
    verifiedPurchase,
    text,
    reviewer,
}) => {
    const totalStars = 5
    return (
        <div className="review-container">
            <div className="review-cards">
                <div className="review-header">
                    {[...Array(totalStars)].map((_, index) => (
                        <i
                            key={index}
                            className={
                                index < rating
                                    ? 'fa-solid fa-star'
                                    : 'fa-regular fa-star'
                            }
                        ></i>
                    ))}
                    <span className="review-title">{title}</span>
                </div>
                <div className="review-date">
                    {`Calificado en Estados Unidos el ${date}`}
                    {verifiedPurchase && (
                        <span className="verified-purchase">
                            Compra verificada
                        </span>
                    )}
                </div>
                <div className="review-text">{text}</div>
                <div className="reviewer-name">{reviewer}</div>
            </div>
        </div>
    )
}
