import { useState, useContext, useEffect } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";
import Loader from "./Loader";

function EditProfilePopup({ isOpen, onClose, onSubmit, isLoading }) {
    const { name, about } = useContext(CurrentUserContext);
    const [inputValue, setInputValue] = useState({ name, about });

    function onInputChange(e) {
        setInputValue((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit(inputValue);
    }

    useEffect(() => {
        setInputValue({ name, about });
    }, [name, about, isOpen]);

    return (
        <div
            className={`popup popup_type_edit-profile ${
                isOpen && "popup_active"
            }`}
            onClick={onClose}
        >
            <div className="popup__container">
                <form
                    className={`popup__form popup__form_type_edit-profile`}
                    name="edit-profile"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <h2 className="popup__title">Редактировать профиль</h2>
                    <input
                        className="popup__input popup__input_type_name"
                        id="profile-name"
                        type="text"
                        name="name"
                        placeholder="Ваше имя"
                        required
                        minLength="2"
                        maxLength="40"
                        value={inputValue.name || ""}
                        onChange={onInputChange}
                    />
                    <span className="popup__input-error profile-name-error"></span>
                    <input
                        className="popup__input popup__input_type_description"
                        id="profile-description"
                        type="text"
                        name="about"
                        placeholder="Ваш род деятельности"
                        required
                        minLength="2"
                        maxLength="200"
                        value={inputValue.about || ""}
                        onChange={onInputChange}
                    />
                    <span className="popup__input-error profile-description-error"></span>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button className="popup__button-submit" type="submit">
                            Сохранить
                        </button>
                    )}
                </form>
                <button
                    className={`popup__button-close popup__button-close_type_edit-profile`}
                    type="button"
                ></button>
            </div>
        </div>
    );
}

export default EditProfilePopup;
