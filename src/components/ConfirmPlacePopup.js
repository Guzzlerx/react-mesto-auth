import Loader from "./Loader";

function ConfirmPlacePopup({ onClose, isOpen, onSubmit, cardId, isLoading }) {
    function handleSubmit(e) {
        e.preventDefault();

        onSubmit(cardId);
    }

    return (
        <div
            className={`popup popup_type_confirm ${isOpen && "popup_active"}`}
            onClick={onClose}
        >
            <div className="popup__container">
                <form
                    className="popup__form popup__form_type_confirm"
                    name="add-card"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <h2 className="popup__title popup__title_type_confirm">
                        Вы уверены?
                    </h2>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button className="popup__button-submit" type="submit">
                            Да
                        </button>
                    )}
                </form>
                <button
                    className="popup__button-close popup__button-close_type_confirm"
                    type="button"
                ></button>
            </div>
        </div>
    );
}

export default ConfirmPlacePopup;
