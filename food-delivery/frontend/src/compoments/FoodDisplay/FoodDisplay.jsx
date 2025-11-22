import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext.jsx'
import { food_list } from '../../assets/assets.js';
import Fooditem from '../Fooditem/Fooditem.jsx';

const FoodDisplay = ({category}) => {
		const {dood_list} = useContext(StoreContext);
	return (
		<div className='food-display' id='food-display'>
				<h2>Món ngon gần bạn</h2>
				<div className="food-display-list">
						{food_list.map((item, index)=> {
							if (category === "All" || category === item.category) {
								return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
								
							}
						})}
				</div>
		</div>
	)
}

export default FoodDisplay