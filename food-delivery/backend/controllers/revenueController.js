import { getRevenueByPeriodLogic, getOverallKPIsLogic } from "../services/revenueService.js";

// Controller cho API /stats/revenue
const getRevenueByPeriod = async (req, res) => {
    try {
        // Nhận tham số 'period' (day, month) từ query string (VD: /stats/revenue?period=day)
        const { period } = req.query; 
        
        const revenueData = await getRevenueByPeriodLogic(period);
        
        res.json({ success: true, data: revenueData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi lấy dữ liệu doanh thu" });
    }
};

// Controller cho API /stats/kpis
const getOverallKPIs = async (req, res) => {
    try {
        const kpiData = await getOverallKPIsLogic();
        res.json({ success: true, data: kpiData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi lấy chỉ số KPI" });
    }
};

export { getRevenueByPeriod, getOverallKPIs };