import React, { useState } from 'react'
import './LoginPopup.css'
import { asset } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const [currState,setCurrState] = useState("Login")

  return (
    <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={asset.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input type="text" placeholder='Tên của bạn' required />}
                
                <input type="email" placeholder='Email' required />
                <input type="password" placeholder='Mật khẩu' required />
            </div>
            <button>{currState==="Sign Up"?"Tạo tài khoản":"Đăng nhập"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>Bằng cách tiếp tục, bạn đồng ý với Điều khoản sử dụng và Chính sách quyền riêng tư.</p>
            </div>
            {currState==="Login"
            ?<p>Chưa có tài khoản? <span onClick={()=>setCurrState("Sign Up")}>Đăng ký</span></p>
            :<p>Đã có tài khoản? <span onClick={()=>setCurrState("Login")}>Đăng nhập</span></p>
            }
            
        </form>
    </div>
  )
}

export default LoginPopup
