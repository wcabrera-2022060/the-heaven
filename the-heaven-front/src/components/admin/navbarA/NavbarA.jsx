import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavbarA.css'

export const NavbarA = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <>
            <div
                className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
                onClick={toggleMenu}
            >
                <div className="logo">
                    <span>{isCollapsed ? 'H' : 'The Heaven'}</span>
                </div>
                <div className="menu">

            

                    <Link
                        to="/userA"
                        className="menuItem"
                        onClick={toggleMenu}
                    >
                        <i className="fa-solid fa-user"></i>
                        <span className="text">User</span>
                        <span className="tooltip">User</span>
                    </Link>

                    <Link
                        to="/hotelA"
                        className="menuItem"
                        onClick={toggleMenu}
                    >
                        <i className="fa-solid fa-hotel"></i>
                        <span className="text">Hotel</span>
                        <span className="tooltip">Hotel</span>
                    </Link>
                    <Link
                        to="/reservationA"
                        className="menuItem"
                        onClick={toggleMenu}
                    >
                        <i className="fa-solid fa-book"></i>
                        <span className="text">Reservation</span>
                        <span className="tooltip">Reservation</span>
                    </Link>
                    <Link to="/roomA" className="menuItem" onClick={toggleMenu}>
                        <i className="fa-solid fa-house-user"></i>
                        <span className="text">Room</span>
                        <span className="tooltip">Room</span>
                    </Link>
                    <Link
                        to="/eventA"
                        className="menuItem"
                        onClick={toggleMenu}
                    >
                        <i className="fa-solid fa-calendar-days"></i>
                        <span className="text">Event</span>
                        <span className="tooltip">Event</span>
                    </Link>
                </div>
                <div className="profile">
                    <Link to="/" className="profileItem" onClick={toggleMenu}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span className="text">Sign off</span>
                        <span className="tooltip">Sign off</span>
                    </Link>
                </div>
            </div>
        </>
    )
}
