import React from 'react'
import './Fooditem.css'
import { asset } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'

const Fooditem = ({id, name, description, price, image}) => {

		const {cartItems, addToCart, removeFromCart} = useContext(StoreContext)

	return (
		<div className='food-item'>
				<div className="food-item-img-container">
						<img className='food-item-image' src={image} alt="" />
						{!cartItems[id]
							?<img className="add" onClick={()=>addToCart(id)} alt="" />
							:<div className='food-item-counter'>
								<img onClick={()=>removeFromCart(id)} src={asset.remoce_icon_red} alt="" />
								<p>{cartItems[id]}</p>
								<img onClick={()=>addToCart(id)} src={asset.add_icon_green} alt="" />
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