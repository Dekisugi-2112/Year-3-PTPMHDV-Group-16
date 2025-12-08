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
const Myorders=()=>{
    const{url,token}=useContext(StoreContext);
    const [data,setData]=useState([]);

    const fetchOrders=async()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
       
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

    return(
        <div className="my-orders">
            <h2>Đơn hàng của tôi</h2>
            <div className="container">
                  {data.map((order,index)=>{
                    return(
                    <div key={index} className="my-orders-order">
                        <img src={asset.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+","
                            }
                        })}</p>
                        <p>{order.amount} vnd</p>
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