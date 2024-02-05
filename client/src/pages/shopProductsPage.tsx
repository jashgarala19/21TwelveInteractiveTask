import { Button } from "@chakra-ui/react";
import { IMAGE_URL } from "constants";
import {
  getProductsByShopId,
  initialEditProductDetails,
  setCurrentShop,
} from "features/shop/shopSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ShopProductsPage = () => {
  const { shopId } = useParams();
 
  const { products, refetch } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  useEffect(() => {
   
    dispatch(getProductsByShopId(shopId));
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          dispatch(setCurrentShop(shopId));
          navigate("/shop/products/add");
        }}
      >
        Add Product
      </Button>
      <div className="my-5 gap-2 flex flex-col">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex border p-5 rounded-md gap-2 cursor-pointer"
          >
            <div>
              <img
                className="bg-zinc-800 p-5"
                style={{
                  objectFit: "contain",
                  width: "300px",
                  height: "300px",
                }}
                src={`${IMAGE_URL}/product/${product.productPhoto}`}
                alt={`Product: ${product.name}`}
              />
            </div>
            <div className="flex flex-col justify-evenly ">
              <div className="flex flex-1 flex-col justify-evenly">
                <p className="text-lg">Product Name: {product.name}</p>
                <p className="text-lg">
                  Product Description: {product.description}
                </p>
                <p className="text-lg">Product Price: ${product.price}</p>
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(
                    initialEditProductDetails({
                      shopId,
                      productId: product._id,
                    })
                  );
                  navigate(`/shop/${shopId}/product/edit/${product._id}`);
                }}
              >
                Edit Product
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopProductsPage;
