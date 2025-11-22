import React from 'react'
import "./ExplorMenu.css"
import { menu_list } from '../../assets/assets'

const ExplorMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Khám phá</h1>
        <p className='explore-menu-text'>Thưởng thức nhiều món ngon được chế biến từ nguyên liệu tươi ngon, chuẩn vị. Chúng tôi luôn nỗ lực để mỗi bữa ăn của bạn đều đáng nhớ!</p>
        <div className="explore-menu-list">
            {menu_list.map((item, index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />

    </div>
  )
}

export default ExplorMenu