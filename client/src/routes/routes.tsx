// import CurrentPageProvider from "context/PageContext";
// import SearchCharactersProvider from "context/SearchCharacterContext";
// import CharacterPage from "pages/CharacterPage/CharacterPage";
// import HomePage from "pages/HomePage/HomePage";
// import NotFoundPage from "pages/NotFoundPage/NotFoundPage";
// import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "views/MainLayout";

import LoginPage from "pages/LoginPage";
import NotFoundPage from "pages/notFoundPage";
import RegisterPage from "pages/registerPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./protectedRoutes";
import HomePage from "pages/HomePage";
import MainLayout from "pages/MainLayout";
import AddShop from "pages/addShopPage";
import ShopProductsPage from "pages/shopProductsPage";
import AddProduct from "pages/addProductPage";
import EditShop from "pages/editShopPage";
import EditProduct from "pages/editProductPage";

const Routes = () => {
  const protectedRoutes = [
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          children: [
            { path: "/", element: <HomePage /> },
            {
              path: "/add/shop",
              element: <AddShop />,
            },
            {
              path: "/shop/:shopId",
              element: <ShopProductsPage />,
            },
            {
              path: "/shop/:shopId/product/edit/:productId",
              element: <EditProduct />,
            },
            {
              path: "/shop/products/add",
              element: <AddProduct />,
            },
            {
              path: "/shop/edit/:shopId",
              element: <EditShop />,
            },
          ],
        },
      ],
    },
  ];
  const publicRoutes = [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ];
  const CombinedRoutes = [
    ...publicRoutes,
    ...protectedRoutes,
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];

  const router = createBrowserRouter(CombinedRoutes);

  return <RouterProvider router={router} />;
};

export default Routes;
