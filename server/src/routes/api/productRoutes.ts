import { Router } from "express";
import verifyAccessToken from "../../middlewares/verifyAccessToken";
import validateInputBody from "../../middlewares/validateInputBody";
import { addProductJoiSchema } from "../../schema/validationSchemas";

import { addProduct, upadteProduct } from "../../controllers/productController";
import paramObjectJoiSchema from "../../schema/validationSchemas/paramObjectJoiSchema";
import validateParamObjectId from "../../middlewares/validateParamObjectId";
import updateShopJoiSchema from "../../schema/validationSchemas/shop/updateShopSchema";
import updateProductJoiSchema from "../../schema/validationSchemas/product/updateProductJoiSchema";
import { getMulterConfig } from "../../utils/multerConfig";
import multer from "multer";

const router = Router();
const { storage } = getMulterConfig("./src/uploads/product");
const upload = multer({ storage: storage });
router.post("/", [
  upload.single("productPhoto"),
  verifyAccessToken,
  validateInputBody(addProductJoiSchema),
  addProduct,
]);

router.put("/:id", [
  upload.none(),
  verifyAccessToken,
  validateParamObjectId(paramObjectJoiSchema),
  validateInputBody(updateProductJoiSchema),
  upadteProduct,
]);
export default router;
