import React, { useContext, useState }  from 'react'
import './Navbar.css'
import { asset } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");

    // them state để quan ly show/hide searchbar
    const [showSearch, setShowSearch] = useState(false);

    // them setSearchTerm tu context
    const {getTotalCartAmount, token, setToken, setSearchTerm} = useContext(StoreContext);
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
            {/* 2. SỬA ĐOẠN ICON SEARCH THÀNH KHỐI TÌM KIẾM */}
            {/* them class active neu showSearch = true */}
            <div className={`navbar-search-container ${showSearch ? "active" : ""}`}>
                <input 
                    type="text" 
                    placeholder="Tìm món ăn..." 
                    onChange={(e) => {
                        setSearchTerm(e.target.value); // 1. Lưu từ khóa
                        navigate('/'); // 2. Đảm bảo đang ở trang chủ
                        
                        // 3. THÊM ĐOẠN NÀY ĐỂ TỰ TRƯỢT XUỐNG
                        // Bro nên trượt tới 'food-display' (chỗ hiện món) sẽ hợp lý hơn là 'explore-menu' (chỗ danh mục)
                        // Nếu vẫn thích 'explore-menu' thì đổi id trong ngoặc đơn nhé
                        const element = document.getElementById('food-display'); 
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }}
                    className="search-input"
                />
                <img 
                    src={asset.search_icon} 
                    alt="search-icon" 
                    className='search-icon-img'
                    onClick={() => setShowSearch(!showSearch)} 
                />
            </div>

            <div className="navbar-search-icon">
                <Link to='/cart'><img src={asset.basket_icon} alt="" className='img-icon'/></Link>
                <div className="dot"></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Đăng nhập</button>
            :<div className='navbar-profile'>
                <img src={asset.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                    <li onClick={()=>navigate('/myorders')}><img src={asset.bag_icon} alt="" /><p>Đơn hàng</p></li>
                    <hr />
                    <li onClick={logout}><img src={asset.logout_icon} alt="" /><p>Đăng xuất</p></li>
                </ul>
            </div>}
            
        </div>
    </div>
  )
}

export default Navbar
