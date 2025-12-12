import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function PlaceOrder() {

  const { getTotalCartAmout, token, food_list, cartItems, url } = useContext(StoreContext);
  const [paymentMethod, setPaymentMethod] = useState("momo_wallet"); // Mặc định là Ví MoMo

  const [data, setData] = useState({
    orderType: "eat-in",
    name: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });


    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmout(),
      paymentMethod: paymentMethod // <--- GỬI THÊM CÁI NÀY
    };

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Lỗi");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    }
    else if (getTotalCartAmout() === 0) {
      navigate('/cart');
    }
  }, [token]);

  // const SHIPPING_FEE = 16000;

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Thông tin giao hàng</p>

        <div className="order-type">
    
          <label>
            <input
              type="radio"
              name="orderType"
              value="eat-in"
              checked={data.orderType === "eat-in"}
              onChange={onChangeHandler}
            />
            <span>Dùng tại quán (Eat-in)</span>
          </label>

          <label>
            <input
              type="radio"
              name="orderType"
              value="take-away"
              checked={data.orderType === "take-away"}
              onChange={onChangeHandler}
            />
            <span>Mang đi (Take-away)</span>
          </label>

        </div>

        <div className="payment-options">
            <h4>Chọn phương thức thanh toán:</h4>
            <label>
                <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="momo_wallet" 
                    checked={paymentMethod === "momo_wallet"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                /> 
                Ví MoMo (Quét QR)
            </label>
            <br/>
            <label>
                <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="momo_atm" 
                    checked={paymentMethod === "momo_atm"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                /> 
                Thẻ ATM Nội địa
            </label>
            <br/>
            <label>
                <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="momo_cc" 
                    checked={paymentMethod === "momo_cc"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                /> 
                Thẻ Visa/Mastercard
            </label>
        </div>

        <input required name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Tên khách hàng' />

        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Số điện thoại' />
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

            <div className="cart-total-details">
              <b>Tổng cộng</b>
              <b>{getTotalCartAmout().toLocaleString('vi-VN')}₫</b>
            </div>
          </div>

          <button type='submit'>THANH TOÁN</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
