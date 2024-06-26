import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function PublicRouter(props) {
  const {authUser} = useSelector((state) => state.authentication)
  return (
    <>
      {!authUser ? (
        <div>
          {" "}
          <Outlet />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
