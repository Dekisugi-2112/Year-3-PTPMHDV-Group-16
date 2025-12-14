import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    
    // 👇 KHỚP VỚI FRONTEND:
    // Trong PlaceOrder.jsx bro gửi: address = { name, phone, orderType }
    // Nên ở đây mình để type: Object để nó hứng trọn cục đó.
    address: { 
        type: Object, 
        required: true // Bắt buộc phải có tên/sđt/loại đơn
    },
    
    // 👇 THÊM CÁI NÀY: Để lưu phương thức thanh toán (momo_wallet, momo_atm...)
    paymentMethod: { type: String, default: "momo_wallet" },

    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now }, 
    payment: { type: Boolean, default: false }
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;