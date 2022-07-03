import Loader from "./Loader";

function PopupWithForm({
    title,
    name,
    btnTitle,
    isOpen,
    onClose,
    children,
    onSubmit,
    isLoading,
}) {
    return (
        <div
            className={`popup popup_type_${name} ${isOpen && "popup_active"}`}
            onClick={onClose}
        >
            <div
                className="popup__container"
                onClick={(e) => e.stopPropagation()}
            >
                <form
                    className={`popup__form popup__form_type_${name}`}
                    name={name}
                    noValidate
                    onSubmit={onSubmit}
                >
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button className="popup__button-submit" type="submit">
                            {btnTitle}
                        </button>
                    )}
                </form>
                <button
                    className={`popup__button-close popup__button-close_type_${name}`}
                    type="button"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
}

export default PopupWithForm;
