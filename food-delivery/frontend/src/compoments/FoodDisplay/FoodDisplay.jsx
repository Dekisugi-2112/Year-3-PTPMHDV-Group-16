import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext.jsx'
import Fooditem from '../Fooditem/Fooditem.jsx';

const FoodDisplay = ({category}) => {

    const {food_list, searchTerm} = useContext(StoreContext);

    // BƯỚC 1: Lọc ra danh sách trước
    const filteredFoodList = food_list.filter((item) => {
        // Điều kiện Category
        if (category !== "All" && category !== item.category) {
            return false;
        }
        // Điều kiện Search
        if (searchTerm !== "" && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        return true;
    });

    return (
        <div className='food-display' id='food-display'>
            <h2>Món ngon SheepFood</h2>
            
            {/* BƯỚC 2: Kiểm tra độ dài danh sách đã lọc */}
            {filteredFoodList.length > 0 ? (
                // TRƯỜNG HỢP CÓ MÓN ĂN
                <div className="food-display-list">
                    {filteredFoodList.map((item, index)=> {
                        return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                    })}
                </div>
            ) : (
                // TRƯỜNG HỢP KHÔNG TÌM THẤY GÌ
                <div className="food-not-found">
                    <p>Không có tên món ăn nào chứa "{searchTerm}"</p>
                </div>
            )}
        </div>
    )
}

export default FoodDisplay