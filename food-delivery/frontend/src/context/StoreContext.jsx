import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    // 1. SỬA: Khởi tạo giỏ hàng từ LocalStorage (nếu có) để không bị mất khi F5
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : {};
    });

    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // 2. GIỮ NGUYÊN: Logic này đã chuẩn cho Kiosk (Không có token vẫn chạy tốt)
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        // Nếu có token (User đăng nhập) thì mới sync lên DB
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmout = () => {
        let totalAmout = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                // Thêm check itemInfo để tránh lỗi crash nếu sản phẩm bị xóa khỏi DB
                if (itemInfo) {
                    totalAmout += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmout;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data)
        } catch (error) {
            console.log("Lỗi load danh sách món:", error);
        }
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            // Nếu DB có dữ liệu thì mới ghi đè, còn không thì ưu tiên LocalStorage
            if(response.data.cartData) {
                 setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log("Lỗi load giỏ hàng từ DB:", error);
        }
    }

    // 3. THÊM MỚI: Tự động lưu giỏ hàng vào LocalStorage mỗi khi cartItems thay đổi
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // 4. Load dữ liệu ban đầu
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            
            // Nếu có token trong localStorage (trường hợp Admin/Staff đăng nhập)
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
            // Nếu KHÔNG có token (Khách Kiosk):
            // Không làm gì cả, vì dòng useState ở trên cùng đã tự load từ localStorage rồi!
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmout,
        url,
        token,
        setToken,
        searchTerm,
        setSearchTerm
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider