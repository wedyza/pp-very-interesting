import React, { useState } from 'react';
import './login.css';
import logo from '../../img/login-logo.svg';
import { API_URL } from '../../constants';

function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${API_URL}/auth/jwt/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: phone,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Access Token:', data.access);
                console.log('Refresh Token:', data.refresh);
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Не удалось войти');
            }
        } catch (err) {
            setError('Ошибка соединения с сервером');
        }
    };

    return (
        <div className='App'>
            <section className='page_content login_page'>
                <div className="login-form_container">
                    <img className='login__logo' src={logo} alt="Мой город" />
                    <h1 className="login__title text-title">Войдите</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-form__container">
                            <label className='login-form__label-number login-form__label' htmlFor="login-form__number">Номер телефона</label>
                            <input
                                className='login-form__number login-form__input'
                                type="tel"
                                placeholder='+7 (999) 999 99 99'
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                        </div>
                        <div className="login-form__container">
                            <label className='login-form__label-password login-form__label' htmlFor="login-form__number">Пароль</label>
                            <input
                                className='login-form__password login-form__input'
                                type="password"
                                placeholder=''
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button className='login-form__button' type='submit'>Войти</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Login;
