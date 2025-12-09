// ✅ Chỉ import các dịch vụ cần thiết
import { addNewFood, getAllFood, deleteFood } from "../services/foodService.js";

// add food item (Controller chỉ xử lý request/response)
const addFood = async (req, res) => {
    try {
        // Lấy tên file ảnh từ req.file và dữ liệu từ req.body (Xử lý request)
        let image_filename = req.file.filename;
        const foodData = req.body;

        // GỌI DỊCH VỤ để xử lý logic thêm món ăn và lưu DB
        const message = await addNewFood(foodData, image_filename);
        
        // Trả về response thành công
        res.json({ success: true, message: message });

    } catch (error) {
        // Bắt lỗi và trả về response thất bại
        console.log(error);
        res.json({ success: false, message: error.message || "Error adding food" });
    }
}

// all food list (Controller chỉ xử lý request/response)
const listFood = async (req, res) => {
    try {
        // GỌI DỊCH VỤ để lấy danh sách món ăn
        const foods = await getAllFood(); 
        
        // Trả về response thành công
        res.json({ success: true, data: foods });

    } catch (error) {
        // Bắt lỗi và trả về response thất bại
        console.log(error);
        res.json({ success: false, message: error.message || "Error fetching food list" });
    }
}

// remove food item (Controller chỉ xử lý request/response)
const removeFood = async (req, res) => {
    try {
        // Lấy ID món ăn từ req.body (Xử lý request)
        const foodId = req.body.id;

        // GỌI DỊCH VỤ để xử lý logic xóa món ăn và xóa file ảnh
        const message = await deleteFood(foodId);

        // Trả về response thành công
        res.json({ success: true, message: message });
    } catch (error) {
        // Bắt lỗi và trả về response thất bại
        console.log(error);
        res.json({ success: false, message: error.message || "Error removing food" });
    }
}


export { addFood, listFood, removeFood }