import React from 'react'
import {Link} from 'react-router-dom';
import './NavBar.css'

function NavBar() {
  return (
    <nav>
      <div className='Nav-Contenedor'>
        <li className='Landing-Page'><Link to='/'>LandingPage</Link></li>
        <li className='Details'><Link to='/dogs/:id'>Details</Link></li>
        <li className='DogsCreate'><Link to='/create/dogs'>DogsCreate</Link></li>
        </div>
    </nav>
  )
}

export default NavBar;