import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe";

// Khởi tạo Stripe chỉ 1 lần trong Service
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = "http://localhost:5173";
const VND_TO_USD = 25000; // Tỉ giá dùng trong Service

// =======================================================
//          PHẦN 1: DỊCH VỤ GIỎ HÀNG (CART SERVICE LOGIC)
// =======================================================

// DỊCH VỤ 1: Thêm món vào giỏ hàng
const addToCartLogic = async (userId, itemId) => {
    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {}; // Khởi tạo nếu chưa có
    
    // Logic nghiệp vụ: Tăng số lượng nếu đã có, hoặc thêm mới với số lượng 1
    if(!cartData[itemId]) 
    {
        cartData[itemId] = 1;
    }
    else {
        cartData[itemId] += 1;
    }

    // Tương tác DB: Cập nhật giỏ hàng
    await userModel.findByIdAndUpdate(userId, {cartData});
    return "Đã thêm vào giỏ hàng";
};

// DỊCH VỤ 2: Xóa món khỏi giỏ hàng
const removeFromCartLogic = async (userId, itemId) => {
    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;
    
    // Logic nghiệp vụ: Giảm số lượng, đảm bảo không âm
    if(cartData[itemId] > 0) {
        cartData[itemId] -= 1;
        // Logic bổ sung: Xóa hẳn nếu số lượng về 0 (tùy nhu cầu)
        if (cartData[itemId] === 0) {
            delete cartData[itemId];
        }
    }
    
    // Tương tác DB: Cập nhật giỏ hàng
    await userModel.findByIdAndUpdate(userId,{cartData});
    return "Đã xóa khỏi giỏ hàng";
};

// DỊCH VỤ 3: Lấy dữ liệu giỏ hàng
const getCartLogic = async (userId) => {
    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;
    return cartData;
};


// =======================================================
//          PHẦN 2: DỊCH VỤ ĐƠN HÀNG (ORDER SERVICE LOGIC)
// =======================================================

// DỊCH VỤ 4: Đặt hàng (Tạo đơn hàng và tạo phiên thanh toán Stripe)
const placeOrderLogic = async (data) => {
    // 1. Lưu đơn hàng mới vào DB (Logic chính)
    const newOrder = new orderModel({
        userId: data.userId,
        items: data.items,
        amount: data.amount,
        address: data.address
    });
    await newOrder.save();

    // 2. Xóa giỏ hàng của người dùng (Logic nghiệp vụ liên quan)
    await userModel.findByIdAndUpdate(data.userId, { cartData: {} });

    // 3. Chuẩn bị dữ liệu cho Stripe (Logic tích hợp bên thứ ba)
    const line_items = data.items.map(item => ({
        price_data: {
            currency: "usd",
            product_data: { name: item.name },
            // Chuyển đổi VND sang USD và * 100 (cent)
            unit_amount: Math.round(item.price / VND_TO_USD * 100) 
        },
        quantity: item.quantity
    }));

    // Thêm phí giao hàng
    line_items.push({
        price_data: {
            currency: "usd",
            product_data: { name: "Phí giao hàng" },
            unit_amount: Math.round(16000 / VND_TO_USD * 100)
        },
        quantity: 1
    });

    // 4. Tạo phiên thanh toán Stripe
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    
    // Trả về URL thanh toán cho Controller
    return session.url;
};

// DỊCH VỤ 5: Xác minh thanh toán
const verifyOrderLogic = async (orderId, isSuccess) => {
    if(isSuccess === "true"){
        // Nếu thành công: Cập nhật trạng thái thanh toán
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        return "Paid";
    } else {
        // Nếu thất bại: Xóa đơn hàng chưa thanh toán
        await orderModel.findByIdAndDelete(orderId);
        return "Not Paid";
    }
};

// DỊCH VỤ 6: Lấy danh sách đơn hàng của người dùng
const getUserOrdersLogic = async (userId) => {
    const orders = await orderModel.find({userId:userId});
    return orders;
};

// DỊCH VỤ 7: Lấy tất cả đơn hàng (Admin)
const getAllOrdersLogic = async () => {
    const orders = await orderModel.find({});
    return orders;
};

// DỊCH VỤ 8: Cập nhật trạng thái đơn hàng (Admin)
const updateOrderStatusLogic = async (orderId, status) => {
    await orderModel.findByIdAndUpdate(orderId, {status: status});
    return "Cập nhật trạng thái thành công";
};

export { 
    addToCartLogic, 
    removeFromCartLogic, 
    getCartLogic, 
    placeOrderLogic, 
    verifyOrderLogic, 
    getUserOrdersLogic, 
    getAllOrdersLogic, 
    updateOrderStatusLogic 
};