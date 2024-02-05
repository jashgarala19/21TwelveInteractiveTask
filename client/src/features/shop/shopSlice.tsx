import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  shops: [],
  currentShop: null,
  products: [],
  editShopDetails: {},
  editProductDetails: {},
};

export const counterSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShops: (state, action) => {
      state.shops = action.payload;
    },
    setCurrentShop: (state, action) => {
      state.currentShop = action.payload;
    },
    getProductsByShopId: (state, action) => {
      const shop = state.shops.find((shop) => shop._id === action.payload);
      state.products = shop ? shop.products : [];
    },

    addProduct: (state, action) => {
      const { shopId, data } = action.payload;

      const shopIndex = state.shops.findIndex((shop) => shop?._id === shopId);

      if (shopIndex !== -1) {
        state.shops[shopIndex] = data;
      }
    },
    initialEditShopDetails: (state, action) => {
      const shopId = action.payload;

      const shopIndex = state.shops.findIndex((shop) => shop?._id === shopId);
      // console.log(shop);

      const { products, ...shopDetails } = state.shops[shopIndex];
      state.editShopDetails = shopDetails;
    },
    initialEditProductDetails: (state, action) => {
      const { shopId, productId } = action.payload;

      const shopIndex = state.shops.findIndex((shop) => shop?._id === shopId);

      if (shopIndex !== -1) {
        const { products } = state.shops[shopIndex];

        const productIndex = products.findIndex(
          (product) => product?._id === productId
        );

        if (productIndex !== -1) {
          state.editProductDetails =
            state.shops[shopIndex].products[productIndex];
        } else {
          state.editProductDetails = null;
        }
      } else {
        state.editProductDetails = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShops,
  addProduct,
  setCurrentShop,
  getProductsByShopId,
  initialEditShopDetails,
  initialEditProductDetails,
} = counterSlice.actions;

export default counterSlice.reducer;
