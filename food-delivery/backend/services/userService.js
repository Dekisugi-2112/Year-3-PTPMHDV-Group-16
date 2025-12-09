import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// 💡 LOGIC NÀY CẦN PHẢI GIỮ LẠI TRONG SERVICE (Vì nó tạo token)
const createToken = (id) => {
    // Lưu ý: process.env.JWT_SECRET cần được cấp quyền trong file server.js
    return jwt.sign({ id }, process.env.JWT_SECRET); 
};

// 💡 DỊCH VỤ 1: Đăng ký người dùng
const registerNewUser = async (name, email, password) => {
    // 1. Kiểm tra người dùng đã tồn tại (Logic nghiệp vụ)
    const exists = await userModel.findOne({ email });
    if (exists) {
        // Thay vì trả về res.json, chúng ta ném ra lỗi để Controller bắt
        throw new Error("Người dùng đã tồn tại"); 
    }

    // 2. Kiểm tra định dạng Email (Logic nghiệp vụ)
    if (!validator.isEmail(email)) {
        throw new Error("Vui lòng nhập địa chỉ email hợp lệ");
    }

    // 3. Kiểm tra độ dài Mật khẩu (Logic nghiệp vụ)
    if (password.length < 8) {
        throw new Error("Mật khẩu phải có ít nhất 8 ký tự");
    }

    // 4. Mã hóa Mật khẩu (Logic nghiệp vụ)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Lưu người dùng vào DB (Logic tương tác với Model)
    const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword
    });

    const user = await newUser.save();

    // 6. Tạo token và trả về kết quả (Logic nghiệp vụ)
    const token = createToken(user._id);
    return { user, token }; // Trả về user và token
};

// 💡 DỊCH VỤ 2: Đăng nhập người dùng
const authenticateUser = async (email, password) => {
    // 1. Tìm kiếm người dùng (Logic tương tác với Model)
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error("Người dùng không tồn tại");
    }

    // 2. So sánh mật khẩu (Logic nghiệp vụ)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Email hoặc mật khẩu không chính xác");
    }

    // 3. Tạo token và trả về kết quả (Logic nghiệp vụ)
    const token = createToken(user._id);
    return { user, token }; // Trả về user và token
};

export { registerNewUser, authenticateUser, createToken };