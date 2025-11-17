import React, { useState }  from 'react'
import './Navbar.css'
import { asset } from '../../assets/assets'

const Navbar = () => {

    const [menu, setMenu] = useState("home");
  return (
    <div className='navbar'>
        <img src={asset.logo} alt="" className="logo" />
        <ul className="navbar-menu">
            <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</li>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li>
            <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</li>
            <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</li>
        </ul>
        <div className="navbar-right">
            <img src={asset.search_icon} alt="search-icon" className='img-icon'/>
            <div className="navbar-search-icon">
                <img src={asset.basket_icon} alt="" className='img-icon'/>
                <div className="dot"></div>
            </div>
            <button>sign in</button>
        </div>
    </div>
  )
}

export default Navbar