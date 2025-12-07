import userModel from "../models/userModel.js"

//add items vao user cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) 
        {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Đã thêm vào giỏ hàng"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Đã xảy ra lỗi hệ thống"})
    }
}


//remove items khoi user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Đã xóa khỏi giỏ hàng"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Đã xảy ra lỗi hệ thống"})
    }
}

//fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Đã xảy ra lỗi hệ thống"})
    }
}

export {addToCart,removeFromCart,getCart}