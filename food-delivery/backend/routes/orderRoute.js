import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, trackOrder } from "../controllers/orderController.js"
// 🛑 THÊM DÒNG IMPORT NÀY:
import { getRevenueByPeriod, getOverallKPIs } from "../controllers/revenueController.js" 
// (Giả sử bạn đã đặt Controller mới vào file revenueController.js)

const orderRouter = express.Router();

orderRouter.post("/place",placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get('/list',listOrders)
orderRouter.post("/status",updateStatus)

//new
orderRouter.get('/stats/revenue', getRevenueByPeriod); // Lấy dữ liệu biểu đồ doanh thu
orderRouter.get('/stats/kpis', getOverallKPIs); // Lấy các chỉ số tổng quan

// new new
orderRouter.post("/track", trackOrder);
export default orderRouter;