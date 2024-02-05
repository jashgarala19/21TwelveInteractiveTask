import jwt from "jsonwebtoken";
const verifyJWT = (token: string, secret: any) => {
  let verifyResponse = { error: null, payload: null };
  jwt.verify(token, secret as string, (err: any, user: any) => {
    if (err) {
      console.log(err);
      verifyResponse.error = err;
      verifyResponse.payload = null;
    } else {
      verifyResponse.error = null;
      verifyResponse.payload = user;
    }
  });
  return verifyResponse;
};

export default verifyJWT;
