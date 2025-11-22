import React from 'react'
import './Footer.css'
import { asset } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={asset.logo} alt="" style={{width: "200px", height: "100px"}}/>
                <p>SheepFood mang đến trải nghiệm đặt món
                    <br /> nhanh chóng, tiện lợi và đa dạng lựa chọn từ
                    <br /> các quán gần bạn. Chúng tôi luôn ưu tiên chất
                    <br /> lượng món ăn và sự hài lòng của toàn thể khách hàng.</p>
                <div className="footer-social-icons">
                    <img src={asset.facebook_icon} alt="" />
                    <img src={asset.twitter_icon} alt="" />
                    <img src={asset.linkedIn_icon} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>CÔNG TY</h2>
                <ul>
                    <li>Trang chủ</li>
                    <li>Về chúng tôi</li>
                    <li>Giao hàng</li>
                    <li>Chính sách bảo mật</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>LIÊN HỆ</h2>
                <ul>
                    <li>+84-0123456789</li>
                    <li>contact@sheepfood.com</li>
                </ul>

            </div>


        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 @ SheepFood.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer