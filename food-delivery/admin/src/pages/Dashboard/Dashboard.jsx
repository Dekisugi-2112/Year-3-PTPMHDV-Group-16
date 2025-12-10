
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { toast } from 'react-toastify';

// Import Chart.js Components
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = ({ url }) => {
    // State để lưu các chỉ số tổng quan (KPIs) và dữ liệu biểu đồ
    const [kpiData, setKpiData] = useState({ totalRevenue: 0, totalOrders: 0 });
    const [revenueChartData, setRevenueChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // =======================================================
    //          1. HÀM GỌI API THỐNG KÊ MỚI
    // =======================================================
    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            // API 1: Lấy các chỉ số tổng quan (KPIs)
            const kpiResponse = await axios.get(url + "/api/order/stats/kpis");
            if (kpiResponse.data.success) {
                setKpiData(kpiResponse.data.data);
            } else {
                toast.error("Lỗi lấy KPI");
            }

            // API 2: Lấy dữ liệu doanh thu theo tháng (Mặc định)
            const chartResponse = await axios.get(url + "/api/order/stats/revenue?period=month");
            if (chartResponse.data.success) {
                // Xử lý dữ liệu để vẽ biểu đồ
                processRevenueData(chartResponse.data.data);
            } else {
                toast.error("Lỗi lấy dữ liệu biểu đồ");
            }

        } catch (error) {
            console.error("Lỗi Dashboard:", error);
            toast.error("Lỗi kết nối Backend");
        } finally {
            setIsLoading(false);
        }
    };

    // =======================================================
    //          2. HÀM XỬ LÝ DỮ LIỆU CHO BIỂU ĐỒ
    // =======================================================
    const processRevenueData = (data) => {
        // Dữ liệu từ Backend: [{ month: "2025-11", totalRevenue: 7200000 }, ...]
        
        // Chuẩn bị Labels (Trục X) và Data (Trục Y)
        const labels = data.map(item => item.month);
        const revenues = data.map(item => item.totalRevenue);
        
        // Tạo cấu hình dữ liệu cho Chart.js
        const chartConfig = {
            labels,
            datasets: [
                {
                    label: 'Doanh thu (VNĐ)',
                    data: revenues,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    tension: 0.4, // Đường cong mượt
                },
            ],
        };
        setRevenueChartData(chartConfig);
    };


    useEffect(() => {
        fetchDashboardData();
    }, []);

    // =======================================================
    //          3. GIAO DIỆN HIỂN THỊ
    // =======================================================
    if (isLoading) {
        return <div className='dashboard add'>Đang tải dữ liệu Dashboard...</div>;
    }

    return (
        <div className='dashboard add'>
            <h3>Tổng quan và Biểu đồ doanh thu theo tháng</h3> <br />

            {/* Phần 1: Các Chỉ số KPI Tổng quan (Cấp 3) */}
            <div className="kpi-cards">
                <div className="kpi-card">
                    <h4>Tổng Doanh Thu</h4>
                    <p>{kpiData.totalRevenue.toLocaleString('vi-VN')} VND</p>
                </div>
                <div className="kpi-card">
                    <h4>Tổng Số Đơn Hàng</h4>
                    <p>{kpiData.totalOrders.toLocaleString('vi-VN')}</p>
                </div>
                {/* Có thể thêm các KPI khác ở đây */}
            </div>

            {/* Phần 2: Biểu đồ Xu hướng Doanh thu (Cấp 4) */}
            <div className="chart-container">
                <h4>Xu hướng Doanh thu Theo Tháng</h4>
                {revenueChartData ? (
                    <Line data={revenueChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Doanh thu' } } }} />
                ) : (
                    <p>Không có dữ liệu doanh thu để hiển thị.</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;