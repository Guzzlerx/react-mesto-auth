function InfoTooltip({ isOpen, onClose, isError }) {
    return (
        <div
            className={`popup popup_type_auth-confirm ${
                isOpen && "popup_active"
            }`}
            onClick={onClose}
        >
            <div className="popup__container">
                <div className="popup__form" name="auth-confirm" noValidate>
                    <div
                        className={`popup__auth-icon ${
                            isError
                                ? "popup__auth-icon_type_error"
                                : "popup__auth-icon_type_success"
                        }`}
                    ></div>
                    <h2 className="popup__title popup__auth-title">
                        {isError
                            ? "Что-то пошло не так! Попробуйте еще раз"
                            : "Вы успешно зарегистрировались!"}
                    </h2>
                </div>
                <button
                    className="popup__button-close popup__button-close_type_confirm"
                    type="button"
                ></button>
            </div>
        </div>
    );
}

export default InfoTooltip;
