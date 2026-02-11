import express from "express";
import { getChat, deleteMessageForAll, markAllSeen } from "../controllers/chatController.js";
import userAuth from "../middlewares/authUser.js"; 
import providerAuth from "../middlewares/authProvider.js";

const router = express.Router();


router.post("/get", userAuth, getChat);      
router.post("/get-provider", providerAuth, getChat);


router.post("/delete-for-all", userAuth, deleteMessageForAll);


router.post("/mark-seen", userAuth, markAllSeen);

export default router;
