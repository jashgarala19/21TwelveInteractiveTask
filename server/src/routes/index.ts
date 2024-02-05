import { Router } from "express";
import apiRoutes from "./api";
const router = Router();

const api = `/${process.env.BASE_API_URL}`;
router.use(api, apiRoutes);

export default router;
