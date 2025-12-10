import orderModel from "../models/orderModel.js";

// DỊCH VỤ 1: Lấy Doanh thu theo Khoảng thời gian (Phục vụ Biểu đồ Xu hướng)
const getRevenueByPeriodLogic = async (period = "month") => {
    // 1. Định nghĩa cách nhóm (group) dữ liệu dựa trên tham số 'period'
    let groupFormat;
    let projectionFields;
    
    // Nếu muốn nhóm theo Ngày (day)
    if (period === "day") {
        groupFormat = {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
        };
        projectionFields = {
            _id: 0,
            date: "$_id",
            totalRevenue: 1
        };
    } 
    // Mặc định nhóm theo Tháng (month)
    else { 
        groupFormat = {
            $dateToString: { format: "%Y-%m", date: "$date" }
        };
        projectionFields = {
            _id: 0,
            month: "$_id",
            totalRevenue: 1
        };
    }
    
    // 2. Aggregation Pipeline
    const pipeline = [
        // Bước 1: Lọc chỉ những đơn hàng đã thanh toán (payment: true) 
        // và đã hoàn thành (status có thể là 'Delivered' hoặc 'Completed', 
        // tùy vào flow của bạn, ở đây mình dùng chung "payment: true" là được coi là thành công)
        { $match: { payment: true } }, 

        // Bước 2: Nhóm đơn hàng và tính tổng doanh thu
        {
            $group: {
                _id: groupFormat, // Nhóm theo ngày/tháng
                totalRevenue: { $sum: "$amount" }, // Cộng dồn trường 'amount'
                count: { $sum: 1 } // Đếm số đơn hàng
            }
        },
        
        // Bước 3: Sắp xếp theo thứ tự thời gian tăng dần
        { $sort: { _id: 1 } },
        
        // Bước 4: Định dạng lại output cho Frontend dễ dùng
        { $project: projectionFields }
    ];

    const revenueData = await orderModel.aggregate(pipeline);
    return revenueData;
};

// DỊCH VỤ 2: Lấy Chỉ số Tổng quan (KPIs - Phục vụ các thẻ số lớn trên Dashboard)
const getOverallKPIsLogic = async () => {
    // Pipeline để tính tổng số liệu
    const pipeline = [
        // Lọc các đơn hàng đã thanh toán để tính tổng doanh thu
        { $match: { payment: true } }, 
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$amount" }, // Tổng doanh thu từ tất cả đơn hàng đã thanh toán
                totalOrders: { $sum: 1 }, // Tổng số đơn hàng
            }
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
                totalOrders: 1,
                // Có thể thêm Total Users nếu cần (cần import userModel)
            }
        }
    ];
    
    const kpiData = await orderModel.aggregate(pipeline);
    
    // Nếu có dữ liệu, trả về kết quả đầu tiên
    return kpiData[0] || { totalRevenue: 0, totalOrders: 0 };
};

export { 
    getRevenueByPeriodLogic,
    getOverallKPIsLogic
};