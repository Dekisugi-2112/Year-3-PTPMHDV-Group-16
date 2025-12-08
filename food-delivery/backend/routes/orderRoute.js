import express from "express"
import authMiddlware from "../middleware/auth.js"
import { placeOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddlware,placeOrder);

export default orderRouter;