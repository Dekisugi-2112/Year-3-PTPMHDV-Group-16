import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from "../../context/StoreContext.jsx";
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmout } = useContext(StoreContext);

  const navigate = useNavigate();



  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-items-title">
          <p>Món</p>
          <p>Tên món</p>
          <p>Giá</p>
          <p>SL</p>
          <p>Tổng</p>
          <p>Xóa</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price.toLocaleString('vi-VN')}₫</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{(item.price * cartItems[item._id]).toLocaleString('vi-VN')}₫</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross' >x</p>
                </div>
                <hr />
              </div>
            )
          }

        })}
      </div>

      <div className="cart-bottom">

        <div className="cart-total">
          <h2>Giỏ hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>Tạm tính</p>
              <p>{getTotalCartAmout().toLocaleString('vi-VN')}₫</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>{16000..toLocaleString('vi-VN')}₫</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Tổng cộng</b>
              <p>{(getTotalCartAmout() + 16000).toLocaleString('vi-VN')}₫</p>
            </div>
          </div>
            <button onClick={()=>navigate('/order')}>ĐẾN TRANG THANH TOÁN</button>
          
        </div>
        <div className="cart-promocode">
          <div>
            <p>Nhập mã giảm giá (nếu có)</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Nhập mã' />
              <button>Áp dụng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart