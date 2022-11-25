import React from "react";
import { Outlet, useParams, useLocation, Navigate } from "react-router-dom";

const Restaurant = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  if (`/restaurant/${id}` === pathname) {
    return <Navigate to={`/restaurant/${id}/overview`} />;
  }

  return (
    <>
      <h1 className="text-3xl">Restaurant</h1>
      <Outlet />
    </>
  );
};

export default Restaurant;
