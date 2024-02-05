import { Request, Response } from "express";
import asyncWrapper from "../middlewares/asyncWrapper";
import Shop from "../models/shop";
import { createErrorResponse } from "../utils/createErrorResponse";
import { createSuccessResponse } from "../utils/createSuccessResponse";
interface CustomRequest extends Request {
  user?: Record<string, any> & { _id: string };
}
export const addProduct = asyncWrapper(
  async (req: CustomRequest, res: Response) => {
    const shopId = req.body.shopId;
    const userId = req.user?._id;
    const newProductData = {
      ...req.body.product,
      productPhoto: req.file?.filename,
    };
 
    if (!shopId || !userId) {
      return createErrorResponse(res, 400, "Invalid shopId or userId");
    }
    const shop = await Shop.findOne({ _id: shopId, owner: userId });
    if (!shop) {
      return createErrorResponse(
        res,
        404,
        "Shop not found or you are not the owner"
      );
    }

    shop.products.push(newProductData);
    const response = await shop.save();

    createSuccessResponse(
      res,
      response,
      200,
      "Product added successfully"
    );
  }
);

export const upadteProduct = asyncWrapper(
  async (req: CustomRequest, res: Response) => {
    const { id: productId } = req.params;
    const { shopId, product } = req.body;

    const userId = req.user?._id;
    if (!shopId || !userId) {
      return createErrorResponse(res, 400, "Invalid shopId or userId");
    }
    const shop = await Shop.findOne({ _id: shopId, owner: userId });

    if (!shop) {
      return createErrorResponse(
        res,
        404,
        "Shop not found or you are not the owner"
      );
    }

    const productToUpdate = shop.products.find(
      (product: any) => product._id.toString() === productId
    );

    if (!productToUpdate) {
      return createErrorResponse(res, 404, "Product not found in the shop");
    }
    for (let p in product) {
      productToUpdate[p] = product[p];
    }
    const updatedShop = await shop.save();
    createSuccessResponse(
      res,
      updatedShop.products,
      200,
      "Product updated successfully"
    );
  }
);
