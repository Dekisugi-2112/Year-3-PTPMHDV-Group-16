// ✅ Chỉ import các dịch vụ Giỏ hàng từ Order Service
import { addToCartLogic, removeFromCartLogic, getCartLogic } from "../services/orderService.js";

// add items vao user cart
const addToCart = async (req,res) => {
    try {
        // Controller gọi Order Service để xử lý logic thêm giỏ hàng
        const message = await addToCartLogic(req.body.userId, req.body.itemId);
        res.json({success:true, message: message});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Đã xảy ra lỗi hệ thống"})
    }
}

// remove items khoi user cart
const removeFromCart = async (req,res) => {
    try {
        // Controller gọi Order Service để xử lý logic xóa giỏ hàng
        const message = await removeFromCartLogic(req.body.userId, req.body.itemId);
        res.json({success:true, message: message})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Đã xảy ra lỗi hệ thống"})
    }
}

// fetch user cart data
const getCart = async (req,res) => {
    try {
        // Controller gọi Order Service để lấy dữ liệu giỏ hàng
        const cartData = await getCartLogic(req.body.userId);
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Đã xảy ra lỗi hệ thống"})
    }
}

export {addToCart,removeFromCart,getCart}