import React from 'react'
import Navbar from './compoments/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './compoments/Footer/Footer'

const App = () => {
	return (
		<>
			<div className='app'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Cart' element={<Cart />} />
					<Route path='/order' element={<PlaceOrder />} />
				</Routes>
			</div>
			<Footer />

		</>
	)
}

export default App