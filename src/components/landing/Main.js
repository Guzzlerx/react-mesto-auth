import { useContext } from "react";

import Card from "../Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({
    onEditProfile,
    onEditAvatar,
    onAddPlace,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
}) {
    const { name, about, avatar } = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <a
                        className="profile__overlay-avatar"
                        href="href"
                        onClick={onEditAvatar}
                    >
                        <img
                            className="profile__avatar"
                            alt="Фотография пользователя"
                            src={avatar}
                        />
                    </a>
                    <div className="profile__info">
                        <div className="profile__name-container">
                            <h1 className="profile__name">{name}</h1>
                            <button
                                className="profile__button-edit-info"
                                type="button"
                                aria-label="Редактировать"
                                onClick={onEditProfile}
                            ></button>
                        </div>
                        <p className="profile__description">{about}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__button-add-picture"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="cards">
                <ul className="cards__grid-list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            {...card}
                            onCardClick={onCardClick}
                            onCardLikeClick={onCardLike}
                            onCardDeleteBtnClick={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
