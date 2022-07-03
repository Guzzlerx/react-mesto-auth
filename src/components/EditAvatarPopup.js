import { useRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onSubmit, ...props }) {
    const avatarInput = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit({ avatar: avatarInput.current.value });
    }

    useEffect(() => {
        avatarInput.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            {...props}
            isOpen={isOpen}
            title="Обновить аватар"
            btnTitle="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_link"
                id="avatar-link"
                type="url"
                name="avatar"
                placeholder="Ссылка на картинку"
                required
                ref={avatarInput}
            />
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
