import { useState } from 'react'
import './Navbar.css'
import { MenuItems } from './MenuItems'
import { Link } from 'react-router-dom'

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
            <Link className={item.cName} to={item.url}>
              {item.title}
              <i className={item.icon}></i>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
