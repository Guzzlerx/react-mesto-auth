import { useState, useContext, useEffect } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onSubmit, ...props }) {
    const {
        currentUser: { name, about },
    } = useContext(CurrentUserContext);

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
        <PopupWithForm
            onSubmit={handleSubmit}
            title="Редактировать профиль"
            btnTitle="Сохранить"
            isOpen={isOpen}
            {...props}
        >
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
        </PopupWithForm>
    );
}

export default EditProfilePopup;
