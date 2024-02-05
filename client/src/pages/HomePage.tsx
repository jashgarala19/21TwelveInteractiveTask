import { Button, Spinner } from "@chakra-ui/react";
import { API_URL, IMAGE_URL } from "constants";
import { useAuth } from "context/AuthProvider";
import {
  initialEditShopDetails,
  setCurrentProduct,
  setShops,
} from "features/shop/shopSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getShops } from "services/api/apiServices";

const HomePage = () => {
  const { user, logOut } = useAuth();
  const { shops } = useSelector((state: any) => state.shop);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleViewProducts = (products, shopId) => {
    // dispatch(
    //   setCurrentProduct({
    //     shopId: shopId,
    //     productId: null,
    //   })
    // );
    navigate(`/shop/${shopId}`);
  };

  useEffect(() => {
    try {
      const getShops_ = async () => {
        setLoading(true);
        const { data } = await getShops();
        if (data.code == 200) {
          dispatch(setShops(data.payload));
        }
      };

      getShops_();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <div className=" ">
      <h1 className="text-4xl">Your Shops</h1>
      <div className="my-5 gap-2 flex flex-col">
        {loading ? (
          <Spinner />
        ) : (
          shops.map((shop) => {
            return (
              <div
                className="flex border p-5 rounded-md gap-2 cursor-pointer"
                onClick={() => {
                  handleViewProducts(shop.products, shop._id);
                }}
              >
                <div>
                  <img
                    className="bg-zinc-800 p-5"
                    style={{
                      objectFit: "contain",
                      width: "300px",
                      height: "300px",
                    }}
                    src={`${IMAGE_URL}/shop/${shop.shopPhoto}`}
                  />
                </div>
                <>
                  <div className="flex flex-col justify-evenly ">
                    <div className="flex flex-1 flex-col justify-evenly">
                      <p className="text-2xl"> Shop Name: {shop?.name}</p>
                      <p className="text-2xl">
                        {" "}
                        Shop Description: {shop?.description}
                      </p>
                      <p className="text-2xl">
                        {" "}
                        Shop Location: {shop?.location}
                      </p>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(initialEditShopDetails(shop._id));
                        navigate(`/shop/edit/${shop._id}`);
                      }}
                    >
                      Edit Shop
                    </Button>
                  </div>
                </>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomePage;
