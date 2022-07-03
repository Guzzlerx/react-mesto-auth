import Card from "../Card";
import Header from "../Header";
import Footer from "../Footer";

function Main({
    onEditProfile,
    onEditAvatar,
    onAddPlace,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
    onBurgerClick,
    isMenuOpen,
    loggedIn,
    onExitClick,
    email,
    avatar,
    name,
    about,
}) {
    function handleExitClick(e) {
        e.preventDefault();

        onExitClick();
    }

    return (
        <>
            <Header
                onBurgerClick={onBurgerClick}
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
            >
                <p className="header__text">{email}</p>
                <a
                    href="none"
                    className="header__link header__link_active"
                    onClick={handleExitClick}
                >
                    Выйти
                </a>
            </Header>
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
            <Footer />
        </>
    );
}

export default Main;
