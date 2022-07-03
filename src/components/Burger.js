function Burger({ isMenuOpen, onBurgerClick }) {
    function handleClick() {
        onBurgerClick(!isMenuOpen);
    }
    return (
        <button
            className={`header__link header__button header__button_type_${
                isMenuOpen ? "close" : "burger"
            }`}
            onClick={handleClick}
            name={isMenuOpen ? "Закрыть" : "Меню"}
        />
    );
}

export default Burger;
