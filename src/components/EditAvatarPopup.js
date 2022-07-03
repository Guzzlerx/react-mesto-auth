import { useRef, useEffect } from "react";

import Loader from "./Loader";

function EditAvatarPopup({ isOpen, onClose, onSubmit, isLoading }) {
    const avatarInput = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit({ avatar: avatarInput.current.value });
    }

    useEffect(() => {
        avatarInput.current.value = "";
    }, [isOpen]);

    return (
        <div
            className={`popup popup_type_set-avatar ${
                isOpen && "popup_active"
            }`}
            onClick={onClose}
        >
            <div
                className="popup__container"
                onClick={(e) => e.stopPropagation()}
            >
                <form
                    className="popup__form popup__form_type_set-avatar"
                    name="set-avatar"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <h2 className="popup__title">Обновить аватар</h2>
                    <input
                        className="popup__input popup__input_type_link"
                        id="avatar-link"
                        type="url"
                        name="avatar"
                        placeholder="Ссылка на картинку"
                        required
                        ref={avatarInput}
                    />
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button className="popup__button-submit" type="submit">
                            Сохранить
                        </button>
                    )}
                </form>
                <button
                    className={`popup__button-close popup__button-close_type_set-avatar`}
                    type="button"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
}

export default EditAvatarPopup;
