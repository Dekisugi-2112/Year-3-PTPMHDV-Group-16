import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

    const {getTotalCartAmout} = useContext(StoreContext);

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Thông tin giao hàng</p>
        <div className="multi-fields">
          <input type="text" placeholder='Tên' />
          <input type="text" placeholder='Họ đệm' />
        </div>
        <input type="email" placeholder='Email' />
        <input type="text" placeholder='Số nhà, tên đường' />
        <div className="multi-fields">
          <input type="text" placeholder='Tỉnh / Thành Phố (Cũ)' />
          <input type="text" placeholder='Quận / Huyện (Cũ)' />
        </div>
        {/* <div className="multi-fields">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div> */}
        <input type="text" placeholder='Số điện thoại' />
      </div>
      <div className="place-order-right">
          <div className="cart-total">
          <h2>Giỏ hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>Tạm tính</p>
              <p>{getTotalCartAmout().toLocaleString('vi-VN')}₫</p>
            </div>
            <hr />

            {/* tao bien phi giao hang de phuc vu thay doi phi giao hang theo khoang cach giao */}
            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>{16000..toLocaleString('vi-VN')}₫</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Tổng cộng</b>
              <b>{(getTotalCartAmout() + 16000).toLocaleString('vi-VN')}₫</b>
            </div>
          </div>
            <button>THANH TOÁN</button>
          
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
