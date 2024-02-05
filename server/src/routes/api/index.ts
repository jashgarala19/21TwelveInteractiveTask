import { Router } from "express";
import authRoutes from "./authRoutes";
import shopRoutes from "./shopRoutes";
import productRoutes from "./productRoutes";
const router = Router();

//Login Routes
router.use("/auth", authRoutes);
router.use("/shop", shopRoutes);
router.use("/product", productRoutes);
export default router;
