import express from "express";
import { addShop, updateShop, getMyShops, getNearbyShops, deleteShop } from "../controllers/shopController.js";
import authProvider from "../middlewares/authProvider.js";

const shopRouter = express.Router();

shopRouter.post("/add", authProvider, addShop);
shopRouter.put("/update/:shopId", authProvider, updateShop);
shopRouter.delete("/delete/:shopId", authProvider, deleteShop);
shopRouter.get("/my-shops", authProvider, getMyShops);
shopRouter.get("/nearby", getNearbyShops);

export default shopRouter;
