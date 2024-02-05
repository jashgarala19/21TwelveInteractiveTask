import { Router } from "express";
import { login, register } from "../../controllers/authController";
import validateInputBody from "../../middlewares/validateInputBody";
import {
  loginUserSchema,
  registerUserSchema,
} from "../../schema/validationSchemas";
import encryptPassword from "../../middlewares/hashPassword";
import checkDuplicateUser from "../../middlewares/checkDuplicateUser";
import verifyJWT from "../../utils/verifyJWT";
import verifyAccessToken from "../../middlewares/verifyAccessToken";
import { Request, Response } from "express";

const router = Router();


router.post("/login", [validateInputBody(loginUserSchema), login]);
router.post("/register", [
  validateInputBody(registerUserSchema),
  checkDuplicateUser,
  encryptPassword,
  register,
]);

export default router;
