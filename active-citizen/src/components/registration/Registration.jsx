import './registration.css';
import logo from '../../img/login-logo.svg';
import { useState } from 'react';
import { API_URL } from '../../constants';

function Registration() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const apiUrl = `${API_URL}/auth/users/`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Аккаунт успешно создан!');
                console.log('Response:', data);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.detail || 'Ошибка при создании аккаунта');
                console.error('Error:', errorData);
            }
        } catch (error) {
            setErrorMessage('Ошибка соединения с сервером');
            console.error('Error:', error);
        }
    };

    return (
        <div className='App'>
            <section className='page_content login_page'>
                <div className="login-form_container">
                    <img className='login__logo' src={logo} alt="Мой город" />
                    <h1 className="login__title text-title">Создайте аккаунт</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-form__container">
                            <label className='login-form__label-name login-form__label' htmlFor="first_name">Имя</label>
                            <input
                                className='login-form__name login-form__input'
                                type="text"
                                placeholder='Имя'
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login-form__container">
                            <label className='login-form__label-lastname login-form__label' htmlFor="last_name">Фамилия</label>
                            <input
                                className='login-form__lastname login-form__input'
                                type="text"
                                placeholder='Фамилия'
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login-form__container">
                            <label className='login-form__label-number login-form__label' htmlFor="phone_number">Номер телефона</label>
                            <input
                                className='login-form__number login-form__input'
                                type="tel"
                                placeholder='+7 (999) 999 99 99'
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login-form__container">
                            <label className='login-form__label-password login-form__label' htmlFor="password">Пароль</label>
                            <input
                                className='login-form__password login-form__input'
                                type="password"
                                placeholder='Введите пароль'
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className='login-form__button' type='submit'>Создать аккаунт</button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </div>
            </section>
        </div>
    );
}

export default Registration;
