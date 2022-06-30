import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

function Register({ isLoading, onSubmit }) {
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

        if (!data.email || !data.password) {
            return;
        }

        onSubmit(data);

        setData({ email: data.email, password: "" });
    }

    return (
        <>
            <Header>
                <Link className="header__link" to="/sign-in">
                    Войти
                </Link>
            </Header>
            <div className="popup__container popup__container_type_auth">
                <form
                    className="popup__form"
                    name="sign-up"
                    onSubmit={handleSubmit}
                >
                    <h2 className="popup__title popup__title_type_auth">
                        Регистрация
                    </h2>
                    <input
                        className="popup__input popup__input_type_auth"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        minLength="2"
                        maxLength="40"
                        onChange={onChange}
                        value={data.email}
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
                        onChange={onChange}
                        value={data.password}
                        noValidate
                    />
                    <span className="popup__input-error password-error"></span>
                    <button
                        className="popup__button-submit popup__button-submit_type_auth"
                        type="submit"
                    >
                        {isLoading ? "Загрузка..." : "Зарегистрироваться"}
                    </button>
                    <nav>
                        <Link to="/sign-in" className="popup__link">
                            Уже зарегистрированы? Войти
                        </Link>
                    </nav>
                </form>
            </div>
        </>
    );
}

export default Register;
