import './../login/login.css'
import logo from '../../img/login-logo.svg'

function Login () {
    return (
        <div className='App'>
            <section className='page_content login_page'>
                <div className="login-form_container">
                    <img className='login__logo' src={logo} alt="Мой город" />
                    <h1 className="login__title text-title">Войдите</h1>
                    <form className="login-form">
                        <label className='login-form__label' htmlFor="login-form__number">Номер телефона</label>
                        <input className='login-form__number' type="tel" placeholder='+7 (999) 999 99 99'/>
                        <button className='login-form__button' type='submit'>Получить код</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login