import jwt from "jsonwebtoken";
const generateAccessToken = (
  payload: any,
  secretKey: any,
  expirationTime: number | string
) => {
  return jwt.sign(payload, secretKey, { expiresIn: expirationTime });
};

export default generateAccessToken;
