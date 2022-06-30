import { useState, useEffect } from "react";

import logoPath from "../images/logo_vector.svg";
import Burger from "./Burger";

function Header({ children, isMenuOpen, onBurgerClick, loggedIn }) {
    const [isPhone, setIsPhone] = useState(false);

    useEffect(() => {
        const isPhone = window.outerWidth < 768;

        setIsPhone(isPhone);

        function checkScreenSize(e) {
            if (e.target.outerWidth < 768) {
                setIsPhone(true);
            } else {
                setIsPhone(false);
            }
        }

        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, [isPhone]);

    return (
        <>
            <nav
                className={isPhone && isMenuOpen ? "menu menu_active" : "menu"}
            >
                {children}
            </nav>
            <header className="header">
                <img
                    className="header__logo"
                    alt="Логотип сайта"
                    src={logoPath}
                />
                <nav className="header__menu">
                    {isPhone && loggedIn ? (
                        <Burger
                            onBurgerClick={onBurgerClick}
                            isMenuOpen={isMenuOpen}
                        >
                            {children}
                        </Burger>
                    ) : (
                        children
                    )}
                </nav>
            </header>
        </>
    );
}

export default Header;
