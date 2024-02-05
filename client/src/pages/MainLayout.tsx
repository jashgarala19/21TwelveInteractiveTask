import { Button } from "@chakra-ui/react";
import { useAuth } from "context/AuthProvider";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const { user, logOut } = useAuth();
  const userName = user.firstName + " " + user.lastName;
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div className="flex">
      <div className="min-h-[calc(100vh_-_0px)] w-[260px]  bg-zinc-900 border-r">
        <div className="flex flex-col  justify-center my-[70px]">
          <Link to="/">
            <div className="border-y p-4 cursor-pointer">
              <p className="text-xl">Shops</p>
            </div>
          </Link>
          <Link to="/add/shop">
            <div className="border-b p-4 cursor-pointer">
              <p className="text-xl">Add Shop</p>
            </div>
          </Link>
        </div>
      </div>
      <div className=" flex-1  ">
        <div className="h-[70px]  border-b border-grey flex items-center px-3 bg-zinc-800 ">
          <h1 className="text-3xl">Welocme {userName}</h1>
          <div className="flex-1 justify-end flex">
            <Button size="lg" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
        <div className="bg-zinc-900 max-h-[calc(100vh_-_70px)]  min-h-[calc(100vh_-_70px)] overflow-auto p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
