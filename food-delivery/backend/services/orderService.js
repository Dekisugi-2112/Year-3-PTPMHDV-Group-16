import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import axios from 'axios'; // Cần cài: npm install axios
import crypto from 'crypto'; // Có sẵn trong Node.js

const frontend_url = "http://localhost:5173";

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

// DỊCH VỤ 4: Đặt hàng (Thay Stripe bằng MoMo)
const placeOrderLogic = async (data) => {
    // 1. Lưu đơn hàng mới vào DB
    const newOrder = new orderModel({
        userId: data.userId,
        items: data.items,
        amount: data.amount,
        address: data.address,
    });
    await newOrder.save();

    // 2. Xóa giỏ hàng của người dùng
    await userModel.findByIdAndUpdate(data.userId, { cartData: {} });

    // 3. Cấu hình thanh toán MoMo
    const partnerCode = "MOMO";
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const apiEndpoint = "https://test-payment.momo.vn/v2/gateway/api/create";

    const orderId = newOrder._id.toString();
    const requestId = orderId;
    const orderInfo = "Thanh toan don hang " + orderId;
    const amount = data.amount.toString(); // MoMo yêu cầu amount là string
    
    // URL trả về (Giống format cũ của bro để Frontend xử lý)
    const redirectUrl = `${frontend_url}/verify`;
    const ipnUrl = `${frontend_url}/verify`; // Localhost chưa có IPN thực
    
    let requestType = "captureWallet"; // Mặc định là QR

    if (data.paymentMethod === "momo_atm") {
        requestType = "payWithATM";
    } else if (data.paymentMethod === "momo_cc") {
        requestType = "payWithCC"; // Credit Card
    }

    const extraData = "";

    // 4. Tạo chữ ký (Signature) - Bắt buộc đúng thứ tự Alpha
    const rawSignature = "accessKey=" + accessKey + 
                         "&amount=" + amount + 
                         "&extraData=" + extraData + 
                         "&ipnUrl=" + ipnUrl + 
                         "&orderId=" + orderId + 
                         "&orderInfo=" + orderInfo + 
                         "&partnerCode=" + partnerCode + 
                         "&redirectUrl=" + redirectUrl + 
                         "&requestId=" + requestId + 
                         "&requestType=" + requestType;

    // Mã hóa chữ ký
    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    // 5. Tạo Body request
    const requestBody = {
        partnerCode: partnerCode,
        partnerName: "SheepFood Payment",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: 'vi',
        requestType: requestType,
        autoCapture: true,
        extraData: extraData,
        signature: signature
    };

    // 6. Gọi MoMo API để lấy link thanh toán
    try {
        const response = await axios.post(apiEndpoint, requestBody);
        
        if (response.data && response.data.payUrl) {
            // Trả về payUrl (Link QR Code MoMo)
            return response.data.payUrl;
        } else {
            console.error("MoMo Response Error:", response.data);
            throw new Error("Không lấy được link thanh toán MoMo");
        }
    } catch (error) {
        throw error;
    }
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