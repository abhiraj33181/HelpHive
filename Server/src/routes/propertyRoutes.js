import express from "express";
import {
  addProperty,
  updateProperty,
  getMyProperties,
  getNearbyProperties
} from "../controllers/propertyController.js";

import authProvider from "../middlewares/authProvider.js";

const propertyRouter = express.Router();

propertyRouter.post("/add", authProvider, addProperty);
propertyRouter.put("/update/:propertyId", authProvider, updateProperty);
propertyRouter.get("/my-properties", authProvider, getMyProperties);
propertyRouter.get("/nearby" , getNearbyProperties);

export default propertyRouter;
