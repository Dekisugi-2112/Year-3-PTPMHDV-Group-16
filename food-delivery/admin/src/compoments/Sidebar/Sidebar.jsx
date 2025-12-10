import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to="/add" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Thêm món mới</p>
            </NavLink>

            <NavLink to="/list" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Danh sách món</p>
            </NavLink>

            <NavLink to="/orders" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Quản lý đơn hàng</p>
            </NavLink>

            {/* 🛑 NAVLINK MỚI: DÀNH CHO DASHBOARD */}
            {/* Link đến đường dẫn gốc "/", nơi bạn đã định tuyến Component Dashboard trong App.jsx */}
            <NavLink to="/" className="sidebar-option">
                {/* Bạn có thể dùng một icon bất kỳ, ví dụ: order_icon tạm thời hoặc icon Dashboard mới */}
                <img src={assets.order_icon} alt="" /> 
                <p>Doanh thu</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar