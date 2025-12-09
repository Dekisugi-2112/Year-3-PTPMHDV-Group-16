// ✅ Chỉ import các dịch vụ Đơn hàng
import { placeOrderLogic, verifyOrderLogic, getUserOrdersLogic, getAllOrdersLogic, updateOrderStatusLogic } from "../services/orderService.js";

const placeOrder = async (req, res) => {
    try {
        // Controller gọi Service để xử lý tất cả logic đặt hàng và Stripe
        const session_url = await placeOrderLogic(req.body);
        res.json({ success: true, session_url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const verifyOrder = async(req , res)=>{
   const{orderId,success}=req.body;
   try {
        // Controller gọi Service để xử lý xác minh
        const message = await verifyOrderLogic(orderId, success);
        res.json({success:true,message: message});
   } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
   } 
}

const userOrders=async(req,res)=>{
    try {
        // Controller gọi Service để lấy đơn hàng người dùng
        const orders = await getUserOrdersLogic(req.body.userId);
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const listOrders=async(req,res)=>{
    try {
        // Controller gọi Service để lấy tất cả đơn hàng (Admin)
        const orders = await getAllOrdersLogic();
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const updateStatus = async(req,res)=>{
    try {
        // Controller gọi Service để cập nhật trạng thái
        const message = await updateOrderStatusLogic(req.body.orderId, req.body.status);
        res.json({success:true,message: message});
    } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"}) 
    }
}

export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus };