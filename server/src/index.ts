import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";
import cors from "cors";

import config from "./configs";
import routes from "./routes";
import connectDB from "./configs/db";
import { createErrorResponse } from "./utils/createErrorResponse";
import path from "path";
const { PORT } = config;
const app: Express = express();

// global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware Error Hadnling");
  const errStatusCode = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  const errStack = process.env.NODE_ENV === "development" ? err.stack : {};
  createErrorResponse(res, errStatusCode, errMsg, errStack);
});
///Connect to MonogDB Database
connectDB();

//start server
app.listen(PORT, () => {
  console.log(` ⚡ Server Running on PORT ${PORT} ⚡`);
});
