import React, { useState } from 'react'
import './RatingForm.css'

export const RatingForm = () => {
    const [form, setForm] = useState({
        rating: 0,
        title: '',
        text: '',
        reviewer: 'Usuario Anónimo',
        date: new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
        verifiedPurchase: true,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleStarClick = (index) => {
        setForm({
            ...form,
            rating: index + 1,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Aquí podrías manejar el envío de la reseña, por ejemplo, guardarla en un estado global o enviarla a un servidor.
        console.log('Review submitted:', form)
    }

    return (
        <div className="rating-container">
            <form className="custom-rating-form" onSubmit={handleSubmit}>
                <h2>Agregar una reseña</h2>
                <div className="custom-form-group">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="custom-form-group">
                    <label>Calificación</label>
                    <div className="custom-star-rating">
                        {[...Array(5)].map((_, index) => (
                            <i
                                key={index}
                                className={
                                    index < form.rating
                                        ? 'fa-solid fa-star'
                                        : 'fa-regular fa-star'
                                }
                                onClick={() => handleStarClick(index)}
                            ></i>
                        ))}
                    </div>
                </div>
                <div className="custom-form-group">
                    <label htmlFor="text">Comentario</label>
                    <textarea
                        id="text"
                        name="text"
                        value={form.text}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Enviar reseña</button>
            </form>
        </div>
    )
}
