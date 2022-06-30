import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import UserDataContext from "../contexts/UserDataContext";
import { useEffect } from "react";

const ProtectedRoute = ({
    component: Component,
    tokenCheck,
    onExitClick,
    onBurgerClick,
    isMenuOpen,
    ...props
}) => {
    const { email } = useContext(UserDataContext);

    function handleClick(e) {
        e.preventDefault();

        onExitClick();
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    return (
        <>
            <Header
                onBurgerClick={onBurgerClick}
                loggedIn={props.loggedIn}
                isMenuOpen={isMenuOpen}
            >
                <p className="header__text">{email}</p>
                <a
                    href="none"
                    className="header__link header__link_active"
                    onClick={handleClick}
                >
                    Выйти
                </a>
            </Header>
            <Route>
                {props.loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/sign-in" />
                )}
            </Route>
            <Footer />
        </>
    );
};

export default ProtectedRoute;
