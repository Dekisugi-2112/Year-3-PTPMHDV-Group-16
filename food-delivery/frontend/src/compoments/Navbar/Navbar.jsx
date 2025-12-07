import React, { useContext, useState }  from 'react'
import './Navbar.css'
import { asset } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () =>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

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
            {!token?<button onClick={()=>setShowLogin(true)}>Đăng nhập</button>
            :<div className='navbar-profile'>
                <img src={asset.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                    <li><img src={asset.bag_icon} alt="" /><p>Đơn hàng</p></li>
                    <hr />
                    <li onClick={logout}><img src={asset.logout_icon} alt="" /><p>Đăng xuất</p></li>
                </ul>
            </div>}
            
        </div>
    </div>
  )
}

export default Navbar
