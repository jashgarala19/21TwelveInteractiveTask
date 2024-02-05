import { Request, Response } from "express";
import asyncWrapper from "../middlewares/asyncWrapper";
import { createSuccessResponse } from "../utils/createSuccessResponse";
import Shop from "../models/shop";
import { createErrorResponse } from "../utils/createErrorResponse";

interface CustomRequest extends Request {
  user?: Record<string, any> & { _id: string };
}
export const createShop = asyncWrapper(
  async (req: CustomRequest, res: Response) => {
    const user = req.user?._id;
    const userData = req.body;
   
    const shopData = {
      ...req.body,
      owner: user,
      shopPhoto: req.file?.filename,
    };
    const shop = new Shop(shopData);
    const newShop = await shop.save();
    createSuccessResponse(res, newShop, 200, "Shop Created successfully");
  }
);

export const getShops = asyncWrapper(
  async (req: CustomRequest, res: Response) => {
    const user = req.user?._id;
    const shopData = await Shop.find({
      owner: user,
    });
    createSuccessResponse(res, shopData, 200, "");
  }
);

export const updateShop = asyncWrapper(
  async (req: CustomRequest, res: Response) => {
   
    const { id } = req.params;
    const userId = req.user?._id;
    const updatedShop = req.body;

    const shop = await Shop.findOne({ _id: id, owner: userId });
    if (!shop) {
      return createErrorResponse(
        res,
        404,
        "Shop not found or you are not the owner"
      );
    }

    for (let key in updatedShop) {
      shop[key] = updatedShop[key];
    }
    const updatedSHOP = await shop.save();
    createSuccessResponse(res, updatedSHOP, 200, "Shop updated successfully");
  }
);
