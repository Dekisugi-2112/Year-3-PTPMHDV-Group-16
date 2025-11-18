import React, { useState }  from 'react'
import './Navbar.css'
import { asset } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");
  return (
    <div className='navbar'>
        <img src={asset.logo} alt="" className="logo" />
        <ul className="navbar-menu">
            <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={asset.search_icon} alt="search-icon" className='img-icon'/>
            <div className="navbar-search-icon">
                <img src={asset.basket_icon} alt="" className='img-icon'/>
                <div className="dot"></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>sign in</button>
        </div>
    </div>
  )
}

export default Navbar
