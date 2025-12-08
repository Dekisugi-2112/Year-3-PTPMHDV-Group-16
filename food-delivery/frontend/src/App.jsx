import React, { useState } from 'react'
import Navbar from './compoments/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './compoments/Footer/Footer'
import LoginPopup from './compoments/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'; 

const App = () => {

    const [showLogin, setShowLogin] = useState(false)

    return (
        <>
        {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
            <div className='app'>
                <Navbar setShowLogin={setShowLogin} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/Cart' element={<Cart />} />
                    <Route path='/order' element={<PlaceOrder />} />
                    <Route path='/verify' element={<Verify/>}/>
                </Routes>
            </div>
            <Footer />

        </>
    )
}

export default App
