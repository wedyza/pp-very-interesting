import './../header/header.css'
import logo from './../../img/logo.svg'
import avatar from './../../img/empty.jpg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import { API_URL } from '../../constants'

function Header () {
    const { isAuthenticated, userGroup, userAvatar } = useContext(AuthContext);
    return (
        <header className={`header ${userGroup === 0 ? '' : 'header_mod'}`}>
            <div className="header__overlay"></div>
            <div className="header__content">
                <Link to={'/'}> 
                    <div className="header__logo">
                        <img src={logo} alt="Мой город" />
                    </div>
                </Link>
                {isAuthenticated ? 
                (
                    <div className="header__btns">
                        {userGroup === 0 && 
                            <Link to={'/history'}>
                                <div className="header__notifications header__btn">
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.6574 7.35742C12.0361 7.35742 12.3431 7.66443 12.3431 8.04314L12.3431 12.8431L17.1431 12.8431C17.5218 12.8431 17.8288 13.1501 17.8288 13.5288C17.8288 13.9076 17.5218 14.2146 17.1431 14.2146L11.6574 14.2146C11.2787 14.2146 10.9717 13.9076 10.9717 13.5289L10.9717 8.04314C10.9717 7.66443 11.2787 7.35742 11.6574 7.35742Z" fill="#EBE7FF"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 3.25024C17.1086 3.25024 21.25 7.39161 21.25 12.5002C21.25 17.6089 17.1086 21.7502 12 21.7502C7.36362 21.7502 3.52275 18.3384 2.8534 13.8887C2.79179 13.4791 2.40979 13.197 2.00019 13.2586C1.59058 13.3202 1.30848 13.7022 1.37009 14.1118C2.1482 19.2846 6.61031 23.2502 12 23.2502C17.9371 23.2502 22.75 18.4373 22.75 12.5002C22.75 6.56318 17.9371 1.75024 12 1.75024C7.59065 1.75024 3.80298 4.40484 2.14482 8.19997C1.97898 8.57953 2.15224 9.02167 2.53181 9.18751C2.91137 9.35335 3.35351 9.18009 3.51935 8.80052C4.94742 5.53203 8.20807 3.25024 12 3.25024Z" fill="#EBE7FF"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2 2.75C1.58579 2.75 1.25 3.08579 1.25 3.5V7.9C1.25 8.64558 1.85442 9.25 2.6 9.25H7C7.41421 9.25 7.75 8.91421 7.75 8.5C7.75 8.08579 7.41421 7.75 7 7.75H2.75V3.5C2.75 3.08579 2.41421 2.75 2 2.75Z" fill="#EBE7FF"/>
                                    </svg>
                                    <span>
                                        История заявок
                                    </span>
                                </div>
                            </Link>
                        }
                        {userGroup === 0 && (
                            <Link to={'/notifications'}>
                                <div className="header__notifications header__btn">
                                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3752 16.5556V17.6667C13.3752 19.5076 11.8642 21 10.0002 21C8.13616 21 6.6251 19.5076 6.6251 17.6667V16.5556M13.3752 16.5556H6.6251M13.3752 16.5556H17.4146C17.8449 16.5556 18.0612 16.5556 18.2354 16.4975C18.5683 16.3866 18.8287 16.1285 18.941 15.7998C19 15.627 19 15.4128 19 14.9844C19 14.7969 18.9998 14.7032 18.9849 14.6138C18.9569 14.4449 18.8905 14.2848 18.7894 14.1458C18.736 14.0723 18.6682 14.0053 18.5343 13.8731L18.0961 13.4403C17.9547 13.3007 17.8753 13.1113 17.8753 12.9138V8.77778C17.8753 4.48222 14.3495 0.999989 10.0002 1C5.65085 1.00001 2.12502 4.48224 2.12502 8.77778V12.9138C2.12502 13.1113 2.04542 13.3007 1.90403 13.4403L1.46583 13.8731C1.33161 14.0057 1.26443 14.0723 1.21094 14.1458C1.10986 14.2849 1.04291 14.4449 1.01485 14.6138C1 14.7032 1 14.7969 1 14.9844C1 15.4128 1 15.6269 1.05901 15.7997C1.17128 16.1285 1.4329 16.3866 1.76576 16.4975C1.94002 16.5556 2.15541 16.5556 2.58578 16.5556H6.6251" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Уведомления</span>
                                </div>
                            </Link>
                        )}
                        <Link to={'/profile'} className="menu__item">
                            <div className="header__menu-avatar">
                                {userAvatar ? 
                                    <img src={API_URL + userAvatar} alt="Профиль" />
                                :
                                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5007 2.58301C8.36697 2.58301 2.58398 8.366 2.58398 15.4997C2.58398 22.6334 8.36697 28.4163 15.5007 28.4163C22.6343 28.4163 28.4173 22.6334 28.4173 15.4997C28.4173 8.366 22.6343 2.58301 15.5007 2.58301Z" stroke="#D9D3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.51758 23.6962C5.51758 23.6962 8.39674 20.0205 15.5009 20.0205C22.6051 20.0205 25.4842 23.6962 25.4842 23.6962" stroke="#D9D3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15.5 15.5C17.6401 15.5 19.375 13.7651 19.375 11.625C19.375 9.4849 17.6401 7.75 15.5 7.75C13.3599 7.75 11.625 9.4849 11.625 11.625C11.625 13.7651 13.3599 15.5 15.5 15.5Z" stroke="#D9D3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                }
                            </div>
                        </Link>
                    </div>
                ) : (
                    <div className="header__btns">
                        <Link to={'/login'}>
                            <div className="header__login header__btn">
                                Войти
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;