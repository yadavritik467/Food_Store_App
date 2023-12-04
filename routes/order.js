import express from "express"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { NewOrder, deleteOrders, getAllOrders, myOrder, updateOrders } from "../controller/order.js"





const router = express.Router()

// router.get("/order/:id", requireSignIn,isAdmin, getSingleOrder) // add admin here later
router.get("/admin/orders",requireSignIn,  getAllOrders,) 
router.put("/admin/update-orders/:id",requireSignIn,  updateOrders) 
router.delete("/admin/orders/:id",requireSignIn, deleteOrders) 


router.post("/order/new",requireSignIn, NewOrder,)
router.get("/myOrder",requireSignIn, myOrder) 

export default router