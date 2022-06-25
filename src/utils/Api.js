class Api {
    constructor({ baseUrl, headers }) {
        this._profileUrl = baseUrl;
        this._headers = headers;
        this._cardsUrl = "https://mesto.nomoreparties.co/v1/cohort36/cards";
    }

    getUserInfo() {
        return fetch(this._profileUrl, {
            headers: this._headers,
        }).then((res) => this._checkResponseStatus(res));
    }

    _checkResponseStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(this._cardsUrl, {
            headers: this._headers,
        }).then((res) => this._checkResponseStatus(res));
    }

    setUserInfo(userInfoObj) {
        return fetch(this._profileUrl, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(userInfoObj),
        }).then((res) => this._checkResponseStatus(res));
    }

    addNewCard(cardDataObj) {
        return fetch("https://mesto.nomoreparties.co/v1/cohort36/cards", {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(cardDataObj),
        }).then((res) => this._checkResponseStatus(res));
    }

    deleteCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort36/cards/${id}`, {
            headers: this._headers,
            method: "DELETE",
        }).then((res) => this._checkResponseStatus(res));
    }

    likeCard(id, method) {
        return fetch(
            `https://mesto.nomoreparties.co/v1/cohort36/cards/${id}/likes`,
            {
                headers: this._headers,
                method: method,
            }
        ).then((res) => this._checkResponseStatus(res));
    }

    setUserAvatar(urlObj) {
        return fetch("https://nomoreparties.co/v1/cohort36/users/me/avatar", {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(urlObj),
        }).then((res) => this._checkResponseStatus(res));
    }
}

const api = new Api({
    baseUrl: "https://nomoreparties.co/v1/cohort36/users/me",
    headers: {
        authorization: "24bb909b-945c-4159-8387-3cc3e3137134",
        "Content-Type": "application/json",
    },
});

export default api;
