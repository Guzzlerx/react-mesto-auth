import { useContext } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({
    name,
    link,
    likes,
    _id,
    owner,
    onCardClick,
    onCardLikeClick,
    onCardDeleteBtnClick,
}) {
    const currentUser = useContext(CurrentUserContext);

    const isOwnCard = currentUser._id === owner._id;
    const isOwnLike = likes.some((like) => like._id === currentUser._id);

    const cardLikeBtnClassName = `cards__like-btn ${
        isOwnLike && "cards__like-btn_active"
    }`;

    function handleImageClick() {
        onCardClick({ link, name });
    }

    function handleLikeBtnClick() {
        onCardLikeClick(_id, isOwnLike);
    }

    function handleDeleteBtnClick() {
        onCardDeleteBtnClick(_id);
    }

    return (
        <li className="cards__grid-item">
            <img
                className="cards__photo"
                alt={`Фотография: ${name}`}
                src={link}
                onClick={handleImageClick}
            />
            {isOwnCard && (
                <button
                    className="cards__delete-btn"
                    type="button"
                    onClick={handleDeleteBtnClick}
                ></button>
            )}
            <div className="cards__caption">
                <h2 className="cards__title">{name}</h2>
                <div className="cards__like-container">
                    <button
                        type="button"
                        className={cardLikeBtnClassName}
                        onClick={handleLikeBtnClick}
                    ></button>
                    <p className="cards__like-number">{likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
