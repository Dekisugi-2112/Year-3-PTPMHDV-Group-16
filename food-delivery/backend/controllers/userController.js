// ✅ Chỉ import các dịch vụ mà Controller cần
import { registerNewUser, authenticateUser } from "../services/userService.js";

// Controller chỉ tập trung vào HTTP Request/Response
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // GỌI DỊCH VỤ: Hạn chế logic xử lý bên trong controller
        const result = await authenticateUser(email, password); 
        
        // Trả về response thành công
        res.json({ success: true, token: result.token }); 

    } catch (error) {
        // BẮT LỖI TỪ SERVICE và trả về response thất bại
        console.log(error);
        res.json({ success: false, message: error.message || "Đã xảy ra lỗi hệ thống" });
    }
};

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // GỌI DỊCH VỤ: Hạn chế logic xử lý bên trong controller
        const result = await registerNewUser(name, email, password); 

        // Trả về response thành công
        res.json({ success: true, token: result.token });

    } catch (error) {
        // BẮT LỖI TỪ SERVICE và trả về response thất bại
        console.log(error);
        res.json({ success: false, message: error.message || "Đã xảy ra lỗi hệ thống" })
    }
};

// Lưu ý: Hàm createToken đã được chuyển vào Service và không còn ở đây
export { loginUser, registerUser };