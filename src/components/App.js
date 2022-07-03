import { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import Main from "./landing/Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
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
    const [isError, setIsError] = useState(false);
    const [errorStatus, setErrorStatus] = useState("");

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
            .then((newUserInfo) =>
                setCurrentUser((state) => ({ ...state, ...newUserInfo }))
            )
            .catch((err) => console.error(`Ошибка - ${err}!`))
            .finally(() => setIsLoading(false));

        closeAllPopups();
    }

    function handleUpdateUser(userInfo) {
        setIsLoading(true);

        api.setUserInfo(userInfo)
            .then((newUserInfo) => {
                setCurrentUser((state) => ({ ...state, ...newUserInfo }));
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
                setErrorStatus(err);
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
                    const { email } = userData;

                    localStorage.setItem("jwt", data.token);

                    setLoggedIn(true);
                    setCurrentUser((state) => ({
                        ...state,
                        email,
                    }));
                }
            })
            .catch((err) => {
                setIsError(true);
                setErrorStatus(err);
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

                    setCurrentUser((state) => ({
                        email,
                        ...state,
                    }));

                    setLoggedIn(true);
                }
            });
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
        if (
            isEditAvatarPopupOpen ||
            isEditProfilePopupOpen ||
            isAddPlacePopupOpen ||
            isConfirmPlacePopupOpen ||
            isConfirmRegistrationPopupOpen ||
            selectedCard
        )
            document.addEventListener("keydown", closePopupByEsc);

        function closePopupByEsc(e) {
            if (e.code === "Escape") {
                closeAllPopups();
            }
        }

        return () => {
            document.removeEventListener("keydown", closePopupByEsc);
        };
    }, [
        isEditAvatarPopupOpen,
        isEditProfilePopupOpen,
        isAddPlacePopupOpen,
        isConfirmPlacePopupOpen,
        isConfirmRegistrationPopupOpen,
        selectedCard,
    ]);

    useEffect(() => {
        api.getUserInfo()
            .then((userData) =>
                setCurrentUser((state) => ({ ...state, ...userData }))
            )
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
        <CurrentUserContext.Provider value={{ currentUser, loggedIn }}>
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
                    />
                    <Route path="/">
                        <Redirect to="/sign-in" />
                    </Route>
                </Switch>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleUpdateUser}
                    isLoading={isLoading}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleUpdateAvatar}
                    isLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleUpdatePlace}
                    isLoading={isLoading}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <ConfirmPlacePopup
                    isOpen={isConfirmPlacePopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleCardDeleteBtnClick}
                    cardId={deletedCardId}
                    isLoading={isLoading}
                />
                <InfoTooltip
                    isOpen={isConfirmRegistrationPopupOpen}
                    onClose={closeAllPopups}
                    isError={isError}
                    errorStatus={errorStatus}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
