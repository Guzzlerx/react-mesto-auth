import { useEffect, useRef } from "react";

import Loader from "./Loader";

function AddPlacePopup({ isOpen, onClose, onSubmit, isLoading }) {
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
        <div
            className={`popup popup_type_add-card ${isOpen && "popup_active"}`}
            onClick={onClose}
        >
            <div className="popup__container">
                <form
                    className={`popup__form popup__form_type_add-card`}
                    name="add-card"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <h2 className="popup__title">Новое место</h2>
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
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button className="popup__button-submit" type="submit">
                            Создать
                        </button>
                    )}
                </form>
                <button
                    className={`popup__button-close popup__button-close_type_add-card`}
                    type="button"
                ></button>
            </div>
        </div>
    );
}

export default AddPlacePopup;
