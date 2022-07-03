import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
    const { currentUser, loggedIn } = useContext(CurrentUserContext);

    return (
        <Route>
            {loggedIn ? (
                <Component {...props} {...currentUser} />
            ) : (
                <Redirect to="/sign-in" />
            )}
        </Route>
    );
};

export default ProtectedRoute;
