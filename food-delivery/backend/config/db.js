import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nhom16_db_user:Nhom16%40@clusterfooddelivery.6rmdsbi.mongodb.net/food-del').then(()=>console.log("DB Connected")); 
}