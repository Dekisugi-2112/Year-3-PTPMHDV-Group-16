import React, { useContext } from 'react'
import './Fooditem.css'
import { asset } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext.jsx'

const Fooditem = ({id, name, description, price, image}) => {
    
    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext)

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={image} alt="" />
                
                {/* Đã SỬA: Dùng asset.add_icon_green thay vì asset.add_icon_white */}
                {!cartItems[id] 
                    ? <img 
                        className="add" 
                        onClick={()=>addToCart(id)} 
                        src={asset.add_icon_green} // ĐÃ THAY ĐỔI
                        alt="Thêm" 
                      />
                    : <div className='food-item-counter'>
                        {/* Đã SỬA lỗi chính tả: remove_icon_red */}
                        <img 
                            onClick={()=>removeFromCart(id)} 
                            src={asset.remoce_icon_red} 
                            alt="Trừ" 
                        />
                        <p>{cartItems[id]}</p>
                        <img 
                            onClick={()=>addToCart(id)} 
                            src={asset.add_icon_green} // Vẫn giữ nguyên màu xanh
                            alt="Thêm" 
                        />
                    </div>
                }
            </div>

            <div className="food-item-info">
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    <img src={asset.rating_starts} alt="" />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className="food-item-cart">${price}</p>
            </div>
        </div>
    )
}

export default Fooditem