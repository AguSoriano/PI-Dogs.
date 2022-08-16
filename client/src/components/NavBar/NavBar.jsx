import React from 'react'
import {Link} from 'react-router-dom';
import style from './NavBar.module.css'

function NavBar() {
  return (
    <nav>
      <div className={style.Nav_Contenedor}>
        <li className={style.Landing_Page}><Link style={{textDecoration: "none"}} to='/'>LandingPage</Link></li>
        <li className={style.home}><Link style={{textDecoration: "none"}}  to='/dogs'>Home</Link></li>
        <li className={style.DogsCreate}><Link style={{textDecoration: "none"}} to='/create/dogs'>DogsCreate</Link></li>
        </div>
    </nav>
  )
}

export default NavBar;