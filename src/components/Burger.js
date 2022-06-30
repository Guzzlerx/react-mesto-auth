function Burger({ isMenuOpen, onBurgerClick }) {
    function handleClick() {
        onBurgerClick(!isMenuOpen);
    }
    return (
        <>
            {isMenuOpen ? (
                <button
                    className="header__link header__button header__button_type_close"
                    onClick={handleClick}
                    name="Закрыть"
                />
            ) : (
                <button
                    className="header__link header__button header__button_type_burger"
                    onClick={handleClick}
                    name="Меню"
                />
            )}
        </>
    );
}

export default Burger;
