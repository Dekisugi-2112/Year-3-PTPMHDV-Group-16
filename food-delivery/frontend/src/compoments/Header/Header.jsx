import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order món yêu thích tại đây!</h2>
            <p>Chọn từ thực đơn đa dạng với những món ăn Việt chế biến từ nguyên liệu tươi, đảm bảo chất lượng. Thỏa mãn cơn đói, nâng trải nghiệm ăn uống mỗi ngày.</p>
            
            {/* THAY THẾ <button> BẰNG <a> VÀ THÊM HREF */}
            <a href="#explore-menu" className="menu-button">
                Xem thực đơn
            </a>
        </div>

    </div>
  )
}

export default Header