import React, { useState }  from 'react'
import './Navbar.css'
import { asset } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");
  return (
    <div className='navbar'>
        <Link to='/'><img src={asset.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
            <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>trang chủ</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>liên hệ</a>
        </ul>
        <div className="navbar-right">
            <img src={asset.search_icon} alt="search-icon" className='img-icon'/>
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={asset.basket_icon} alt="" className='img-icon'/></Link>
                <div className="dot"></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>Đăng nhập</button>
        </div>
    </div>
  )
}

export default Navbar
