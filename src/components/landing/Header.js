import logoPath from "../../images/logo_vector.svg";

function Header() {
    return (
        <header className="header">
            <img className="header__logo" alt="Логотип сайта" src={logoPath} />
        </header>
    );
}

export default Header;
