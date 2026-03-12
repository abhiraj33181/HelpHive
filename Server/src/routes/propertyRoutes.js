import express from "express";
import {
  addProperty,
  updateProperty,
  getMyProperties,
  getNearbyProperties,
  deleteProperty
} from "../controllers/propertyController.js";

import authProvider from "../middlewares/authProvider.js";

const propertyRouter = express.Router();

propertyRouter.post("/add", authProvider, addProperty);
propertyRouter.put("/update/:propertyId", authProvider, updateProperty);
propertyRouter.delete("/delete/:propertyId", authProvider, deleteProperty);
propertyRouter.get("/my-properties", authProvider, getMyProperties);
propertyRouter.get("/nearby" , getNearbyProperties);

export default propertyRouter;
