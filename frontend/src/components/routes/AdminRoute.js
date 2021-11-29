import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { currentAdmin } from "../../functions/auth";
import LoadingToRedirect from "./LoadingToRedirect";

export default function AdminRoute({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setok] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setok(true);
        })
        .catch((err) => {
          console.log("err", err);
          setok(false);
        });
    }
  }, [user]);

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
}
