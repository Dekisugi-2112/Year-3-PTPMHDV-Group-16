import express from "express"
import authMiddlware from "../middleware/auth.js"
import { placeOrder, verifyOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddlware,placeOrder);
orderRouter.post("/verify",verifyOrder)
export default orderRouter;