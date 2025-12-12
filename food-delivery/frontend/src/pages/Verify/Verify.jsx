import React, { useContext, useEffect } from "react";
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    // 1. Lấy tham số từ URL
    const success = searchParams.get("success"); // Dành cho logic cũ (Stripe)
    const orderId = searchParams.get("orderId");
    
    // 👉 THÊM DÒNG NÀY: Lấy mã kết quả từ MoMo
    const resultCode = searchParams.get("resultCode"); 

    const verifyPayment = async () => {
        // 2. Logic kiểm tra mới:
        // Nếu MoMo trả về resultCode là "0" -> Thành công
        // Hoặc nếu dùng Stripe trả về success là "true" -> Thành công
        let isSuccess = false;

        if (resultCode === "0" || success === "true") {
            isSuccess = true;
        }
        
        // Gửi kết quả (true/false) về cho Backend xử lý
        const response = await axios.post(url + "/api/order/verify", { success: isSuccess, orderId });

        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/");
        }
    }
    
    useEffect(() => {
        verifyPayment();
    }, [])
    
    return (
        <div className="verify" >
            <div className="spinner"></div>
        </div>
    )
}

export default Verify