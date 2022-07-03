function ImagePopup({ card, onClose }) {
    const { link, name } = card;

    return (
        <div
            className={`popup popup_type_zoom-photo ${link && "popup_active"}`}
            onClick={onClose}
        >
            <div className="popup__box" onClick={(e) => e.stopPropagation()}>
                <img
                    className="popup__photo"
                    src={link}
                    alt={`Увеличенное изображение: ${name}`}
                />
                <h3 className="popup__title-zoom">{name}</h3>
                <button
                    className="popup__button-close popup__button-close_type_zoom-photo"
                    type="button"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
}

export default ImagePopup;
