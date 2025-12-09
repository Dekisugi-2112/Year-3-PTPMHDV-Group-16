import foodModel from "../models/foodModel.js";
import fs from 'fs';

// 💡 DỊCH VỤ 1: Thêm món ăn mới
const addNewFood = async (foodData, imageFilename) => {
    // Logic: Tạo đối tượng Model và lưu vào DB
    const food = new foodModel({
        name: foodData.name,
        description: foodData.description,
        price: foodData.price,
        category: foodData.category,
        image: imageFilename // Lấy tên file ảnh đã upload
    });

    // Thao tác DB (Lưu món ăn)
    await food.save();
    return "Food Added"; // Trả về thông báo thành công
};

// 💡 DỊCH VỤ 2: Liệt kê tất cả món ăn
const getAllFood = async (req, res) => {
    // Logic: Lấy dữ liệu từ DB
    const foods = await foodModel.find({});
    return foods; // Trả về danh sách món ăn
};

// 💡 DỊCH VỤ 3: Xóa món ăn
const deleteFood = async (foodId) => {
    // 1. Tìm món ăn theo ID để lấy tên file ảnh
    const food = await foodModel.findById(foodId);

    if (!food) {
        throw new Error("Food item not found");
    }

    // 2. Logic: Xóa ảnh khỏi hệ thống file (fs)
    // Đây là logic nghiệp vụ (cleanup), nên giữ trong Service
    fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) {
            console.log("Error deleting image file:", err);
            // Có thể chọn throw error hoặc chỉ log, tùy thuộc vào yêu cầu
        }
    });

    // 3. Logic: Xóa món ăn khỏi DB
    await foodModel.findByIdAndDelete(foodId);
    return "Food Removed"; // Trả về thông báo thành công
};

export { addNewFood, getAllFood, deleteFood };