import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../Header";
import Loader from "../Loader";

function Login({ isLoading, onSubmit }) {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    function onChange(e) {
        const { name, value } = e.target;

        setData((state) => ({ ...state, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit(data);

        setData({
            email: data.email,
            password: "",
        });
    }

    return (
        <>
            <Header>
                <Link
                    className="popup__link popup__link_type_menu"
                    to="/sign-up"
                >
                    Регистрация
                </Link>
            </Header>
            <div className="popup__container popup__container_type_auth">
                <form
                    className="popup__form"
                    name="sign-in"
                    onSubmit={handleSubmit}
                >
                    <h2 className="popup__title popup__title_type_auth">
                        Вход
                    </h2>
                    <input
                        className="popup__input popup__input_type_auth"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        minLength="5"
                        maxLength="40"
                        value={data.email}
                        onChange={onChange}
                    />
                    <span className="popup__input-error email-error"></span>
                    <input
                        className="popup__input popup__input_type_auth"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        required
                        minLength="5"
                        maxLength="200"
                        value={data.password}
                        onChange={onChange}
                    />
                    <span className="popup__input-error password-error"></span>
                    <button
                        className="popup__button-submit popup__button-submit_type_auth"
                        type="submit"
                    >
                        {isLoading ? "Загрузка..." : "Войти"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;
