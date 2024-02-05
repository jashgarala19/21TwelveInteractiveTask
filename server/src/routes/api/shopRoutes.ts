import { Router } from "express";

import validateInputBody from "../../middlewares/validateInputBody";
import verifyAccessToken from "../../middlewares/verifyAccessToken";
import {
  addProductJoiSchema,
  createShopJoiSchema,
} from "../../schema/validationSchemas";
import {
  createShop,
  getShops,
  updateShop,
} from "../../controllers/shopController";
import validateParamObjectId from "../../middlewares/validateParamObjectId";
import paramObjectJoiSchema from "../../schema/validationSchemas/paramObjectJoiSchema";
import updateShopJoiSchema from "../../schema/validationSchemas/shop/updateShopSchema";
import multer from "multer";
import path from "path";
import { getMulterConfig } from "../../utils/multerConfig";
const router = Router();
const { storage } = getMulterConfig("./src/uploads/shop");
const upload = multer({ storage: storage });
router.post("/create", [
  upload.single("shopPhoto"),
  verifyAccessToken,
  validateInputBody(createShopJoiSchema),
  createShop,
]);

router.put("/:id", [
  upload.none(),
  verifyAccessToken,
  validateParamObjectId(paramObjectJoiSchema),
  validateInputBody(updateShopJoiSchema),
  updateShop,
]);
router.get("/", [verifyAccessToken, getShops]);

export default router;
