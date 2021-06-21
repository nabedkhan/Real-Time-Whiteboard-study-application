import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../App";

const PrivateRoute = ({ children, ...rest }) => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser && loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
