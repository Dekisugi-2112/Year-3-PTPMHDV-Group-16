// ✅ Import thêm orderModel để dùng cho hàm trackOrder
import orderModel from "../models/orderModel.js"; 
import { placeOrderLogic, verifyOrderLogic, getUserOrdersLogic, getAllOrdersLogic, updateOrderStatusLogic } from "../services/orderService.js";

const placeOrder = async (req, res) => {
    try {
        // 1. Lấy userId hoặc Gán ID khách lẻ 
        let userId = req.body.userId;
        const GUEST_ID = "693e87399c05aa5dbe2a0484"; 

        if (!userId) {
             userId = GUEST_ID;
        }

        const orderData = { 
            ...req.body, 
            userId: userId 
        };

        // 2. 👇 SỬA ĐOẠN NÀY: Hứng kết quả trả về từ Service (Cả URL và OrderId)
        // (Lưu ý: Bro nhớ sửa bên orderService.js để nó return object { session_url, orderId } nhé)
        const result = await placeOrderLogic(orderData);
        
        // Trả về cho Frontend cả Link thanh toán VÀ OrderId
        res.json({ 
            success: true, 
            session_url: result.session_url || result, // Backup nếu service chỉ trả về string
            orderId: result.orderId 
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || "Lỗi tạo đơn hàng" });
    }
};

// 👇 3. THÊM HÀM MỚI: trackOrder (Tra cứu đơn hàng cho Kiosk)
const trackOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        
        // Tìm đơn hàng theo ID
        const order = await orderModel.findById(orderId);
        
        if (order) {
            // Trả về dạng mảng [order] để khớp với hàm .map() bên Frontend MyOrders
            res.json({ success: true, data: [order] });
        } else {
            res.json({ success: false, message: "Không tìm thấy đơn hàng" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi tra cứu đơn hàng" });
    }
}

const verifyOrder = async(req , res)=>{
   const{orderId,success}=req.body;
   try {
        const message = await verifyOrderLogic(orderId, success);
        res.json({success:true,message: message});
   } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
   } 
}

const userOrders=async(req,res)=>{
    try {
        const orders = await getUserOrdersLogic(req.body.userId);
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const listOrders=async(req,res)=>{
    try {
        const orders = await getAllOrdersLogic();
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const updateStatus = async(req,res)=>{
    try {
        const message = await updateOrderStatusLogic(req.body.orderId, req.body.status);
        res.json({success:true,message: message});
    } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"}) 
    }
}

// 👇 4. NHỚ UPDATE EXPORT: Thêm trackOrder vào cuối
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, trackOrder };