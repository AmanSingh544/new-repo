import { DashboardLayout } from "src/layouts/index";
import React from "react";
import routes from "./routes";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateRouter() {
  const {authUser} = useSelector((state) => state.authentication)

  let authToken = null;
  if(authUser) {
    authToken = authUser.token ? authUser.token : null
  }
  return (
    <>
      {authToken ? (
        <DashboardLayout listItems={routes}>
          <Outlet />
        </DashboardLayout>
      ) : (
        <div></div>
      )}
    </>
  );
}
