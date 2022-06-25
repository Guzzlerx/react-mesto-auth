import { useState, useEffect } from "react";

import Header from "./landing/Header";
import Main from "./landing/Main";
import Footer from "./landing/Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPlacePopup from "./ConfirmPlacePopup";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isConfirmPlacePopupOpen, setIsConfirmPlacePopupOpen] =
        useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [deletedCardId, setDeletedCardId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleCardDeleteBtnClick(cardId) {
        setIsLoading(true);
        api.deleteCard(cardId)
            .then(() => {
                setCards((state) =>
                    state.filter((currentCard) => currentCard._id !== cardId)
                );
            })
            .catch((err) => console.error(`Ошибка - ${err}!`))
            .finally(() => setIsLoading(false));

        closeAllPopups();
    }

    function handleCardLikeBtnClick(cardId, isLiked) {
        if (isLiked) {
            setIsLoading(true);
            api.likeCard(cardId, "DELETE")
                .then((newCard) => {
                    setCards((state) =>
                        state.map((currentCard) =>
                            currentCard._id === cardId ? newCard : currentCard
                        )
                    );
                })
                .catch((err) => console.error(`Ошибка - ${err}!`))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(true);
            api.likeCard(cardId, "PUT")
                .then((newCard) => {
                    setCards((state) =>
                        state.map((currentCard) =>
                            currentCard._id === cardId ? newCard : currentCard
                        )
                    );
                })
                .catch((err) => console.error(`Ошибка - ${err}!`))
                .finally(() => setIsLoading(false));
        }
    }

    function handleUpdatePlace(placeInfo) {
        setIsLoading(true);
        api.addNewCard(placeInfo)
            .then((newPlace) => setCards((state) => [newPlace, ...state]))
            .catch((err) => console.error(`Ошибка - ${err}!`))
            .finally(() => setIsLoading(false));

        closeAllPopups();
    }

    function handleUpdateAvatar(link) {
        setIsLoading(true);
        api.setUserAvatar(link)
            .then((newUserInfo) => setCurrentUser(newUserInfo))
            .catch((err) => console.error(`Ошибка - ${err}!`))
            .finally(() => setIsLoading(false));

        closeAllPopups();
    }

    function handleUpdateUser(userInfo) {
        setIsLoading(true);
        api.setUserInfo(userInfo)
            .then((newUserInfo) => {
                setCurrentUser(newUserInfo);
            })
            .catch((err) => console.error(`Ошибка - ${err}!`))
            .finally(() => setIsLoading(false));

        closeAllPopups();
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditAvatarClick(e) {
        e.preventDefault();
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleConfirmPlaceClick(cardId) {
        setIsConfirmPlacePopupOpen(true);
        setDeletedCardId(cardId);
    }

    function closeAllPopupsByClick(e) {
        if (
            e.target.classList.contains("popup_active") ||
            e.target.classList.contains("popup__button-close")
        ) {
            closeAllPopups();
        }
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmPlacePopupOpen(false);
        setSelectedCard({});
    }

    useEffect(() => {
        document.addEventListener("keydown", closePopupByEsc);

        function closePopupByEsc(e) {
            if (e.code === "Escape") {
                closeAllPopups();
            }
        }

        return () => {
            document.removeEventListener("keydown", closePopupByEsc);
        };
    }, []);

    useEffect(() => {
        api.getUserInfo()
            .then((userData) => setCurrentUser(userData))
            .catch((err) => console.error(`Ошибка - ${err}!`));

        api.getInitialCards()
            .then((data) => setCards(data))
            .catch((err) => console.error(`Ошибка - ${err}!`));
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardDelete={handleConfirmPlaceClick}
                    onCardLike={handleCardLikeBtnClick}
                    cards={cards}
                />
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopupsByClick}
                    onSubmit={handleUpdateUser}
                    isLoading={isLoading}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopupsByClick}
                    onSubmit={handleUpdateAvatar}
                    isLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopupsByClick}
                    onSubmit={handleUpdatePlace}
                    isLoading={isLoading}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopupsByClick}
                />
                <ConfirmPlacePopup
                    isOpen={isConfirmPlacePopupOpen}
                    onClose={closeAllPopupsByClick}
                    onSubmit={handleCardDeleteBtnClick}
                    cardId={deletedCardId}
                    isLoading={isLoading}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
