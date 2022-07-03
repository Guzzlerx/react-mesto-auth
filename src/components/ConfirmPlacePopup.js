import PopupWithForm from "./PopupWithForm";

function ConfirmPlacePopup({ onSubmit, cardId, ...props }) {
    function handleSubmit(e) {
        e.preventDefault();

        onSubmit(cardId);
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            title="Вы уверены?"
            btnTitle="Да"
            {...props}
        />
    );
}

export default ConfirmPlacePopup;
