import { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { MenuItems } from './MenuItems'

export const Navbar = () => {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
    }

    return (
        <nav className="NavbarItems">
            <p className="navbar-logo">The Heaven</p>
            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => (
                    <li key={index}>
                        {item.subItems ? (
                            <>
                                <span
                                    className={item.cName}
                                    onClick={handleClick}
                                >
                                    {item.title}
                                    <i className={item.icon}></i>
                                </span>
                                <ul className="sub-menu">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link
                                                className={subItem.cName}
                                                to={subItem.url}
                                            >
                                                {subItem.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <Link className={item.cName} to={item.url}>
                                {item.title}
                                <i className={item.icon}></i>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}
