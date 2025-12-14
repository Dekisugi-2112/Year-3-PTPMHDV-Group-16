import React, { useContext, useEffect, useState } from "react";
import './Myorders.css'
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { asset } from "../../assets/assets";

const translateStatus = (status) => {
    switch (status) {
        case "Food Processing":
            return "Đang chế biến";
        case "Out for delivery":
            return "Đang giao hàng";
        case "Delivered":
            return "Đã giao hàng";
        default:
            return status;
    }
};

const Myorders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        // TRƯỜNG HỢP 1: Đã đăng nhập (Có Token) -> Lấy list đơn của user
        if (token) {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
        }
        // TRƯỜNG HỢP 2: Khách Kiosk (Không Token) -> Lấy đơn từ LocalStorage
        else {
            // Lấy danh sách ID đơn hàng đã lưu trong máy
            const savedOrders = JSON.parse(localStorage.getItem("my_kiosk_orders") || "[]");

            if (savedOrders.length > 0) {
                // Lấy đơn hàng mới nhất vừa đặt (phần tử cuối cùng trong mảng)
                const lastOrderId = savedOrders[savedOrders.length - 1];

                try {
                    // Gọi API Track Order (API mở không cần token)
                    const response = await axios.post(url + "/api/order/track", { orderId: lastOrderId });
                    
                    if (response.data.success) {
                        // Backend trả về data dạng mảng [order] nên set trực tiếp được
                        setData(response.data.data);
                    }
                } catch (error) {
                    console.log("Lỗi track order:", error);
                }
            }
        }
    }

    // Sửa useEffect: Luôn chạy fetchOrders kể cả khi không có token
    useEffect(() => {
        fetchOrders();
    }, [token])

    return (
        <div className="my-orders">
            <h2>Đơn hàng của tôi</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={asset.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            {/* Format giá tiền cho đẹp chút */}
                            <p>{order.amount.toLocaleString('vi-VN')}₫</p>
                            <p>Số món: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b> {translateStatus(order.status)}</b></p>
                            <button onClick={fetchOrders}>Theo dõi đơn hàng</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Myorders