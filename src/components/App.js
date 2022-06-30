import { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import Main from "./landing/Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import UserDataContext from "../contexts/UserDataContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPlacePopup from "./ConfirmPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./landing/Register";
import Login from "./landing/Login";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/Auth";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isConfirmPlacePopupOpen, setIsConfirmPlacePopupOpen] =
        useState(false);
    const [isConfirmRegistrationPopupOpen, setIsConfirmRegistrationPopupOpen] =
        useState(false);
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [deletedCardId, setDeletedCardId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [isError, setIsError] = useState(false);

    const history = useHistory();

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

    function handleRegistrationSubmit(userData) {
        setIsLoading(true);

        auth.register(userData)
            .then((data) => {
                setIsError(false);
                history.push("/sign-in");
            })
            .catch((err) => {
                setIsError(true);
                console.error(`Ошибка - ${err}!`);
            })
            .finally(() => {
                setIsConfirmRegistrationPopupOpen(true);
                setIsLoading(false);
            });
    }

    function handleAuthorizationSubmit(userData) {
        setIsLoading(true);

        auth.authorize(userData)
            .then((data) => {
                if (data.token) {
                    setLoggedIn(true);
                    localStorage.setItem("jwt", data.token);
                }
            })
            .catch((err) => {
                setIsError(true);
                setIsConfirmRegistrationPopupOpen(true);
                console.error(`Ошибка - ${err}!`);
            })
            .finally(() => setIsLoading(false));
    }

    function handleExitClick() {
        setLoggedIn(false);
        setIsBurgerMenuOpen(false);
        localStorage.removeItem("jwt");
    }

    function handleBurgerMenuClick(bool) {
        setIsBurgerMenuOpen(bool);
    }

    function tokenCheck() {
        const jwt = localStorage.getItem("jwt");

        if (jwt) {
            auth.getContent(jwt).then((data) => {
                if (data) {
                    const {
                        data: { email },
                    } = data;

                    setUserData({ email });
                    setLoggedIn(true);
                }
            });
        }
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
        setIsConfirmRegistrationPopupOpen(false);
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

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            history.push("/");
        }
    }, [loggedIn]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <UserDataContext.Provider value={userData}>
                <div className="page">
                    <Switch>
                        <Route path="/sign-up">
                            <Register
                                isLoading={isLoading}
                                onSubmit={handleRegistrationSubmit}
                            />
                        </Route>
                        <Route path="/sign-in">
                            <Login
                                isLoading={isLoading}
                                onSubmit={handleAuthorizationSubmit}
                            />
                        </Route>
                        <ProtectedRoute
                            exact
                            path="/"
                            loggedIn={loggedIn}
                            component={Main}
                            onEditProfile={handleEditProfileClick}
                            onEditAvatar={handleEditAvatarClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            onCardDelete={handleConfirmPlaceClick}
                            onCardLike={handleCardLikeBtnClick}
                            onExitClick={handleExitClick}
                            onBurgerClick={handleBurgerMenuClick}
                            isMenuOpen={isBurgerMenuOpen}
                            cards={cards}
                            tokenCheck={tokenCheck}
                        ></ProtectedRoute>
                        <Route path="/">
                            <Redirect to="/sign-in" />
                        </Route>
                    </Switch>
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
                    <InfoTooltip
                        isOpen={isConfirmRegistrationPopupOpen}
                        onClose={closeAllPopupsByClick}
                        isError={isError}
                    />
                </div>
            </UserDataContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
