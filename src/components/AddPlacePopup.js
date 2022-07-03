import { useEffect, useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onSubmit, ...props }) {
    const placeNameInput = useRef();
    const placeLinkInput = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit({
            name: placeNameInput.current.value,
            link: placeLinkInput.current.value,
        });
    }

    useEffect(() => {
        placeNameInput.current.value = "";
        placeLinkInput.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            title="Новое место"
            btnTitle="Создать"
            isOpen={isOpen}
            {...props}
        >
            <input
                className="popup__input popup__input_type_place"
                id="profile-place"
                type="text"
                name="name"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                ref={placeNameInput}
            />
            <span className="popup__input-error profile-place-error"></span>
            <input
                className="popup__input popup__input_type_link"
                id="profile-link"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                required
                ref={placeLinkInput}
            />
            <span className="popup__input-error profile-link-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
