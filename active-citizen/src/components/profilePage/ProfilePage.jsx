import Header from './../header/Header'
import './profilePage.css'
import BackButton from '../backButton/BackButton'
import { Link } from 'react-router-dom';
import PersonalData from './personalData/PersonalData'
import NotificationSettings from './notificationSettings/NotificationSettings'

function ProfilePage () {
    return (
        <div className='App'>
            <Header />
            <section className='page_content'>
                <Link to={'/'}>
                    <BackButton />
                </Link>
                <div className="profile__container">
                    <div className="profile__container_info">
                        <h1 className='profile__title text-title'>Данные профиля</h1>
                        <nav className="profile__nav">
                            <div className='profile__nav__item'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.00024C6.47715 2.00024 2 6.4774 2 12.0002C2 17.5231 6.47715 22.0002 12 22.0002C17.5228 22.0002 22 17.5231 22 12.0002C22 6.4774 17.5228 2.00024 12 2.00024Z" stroke="url(#paint0_linear_242_3755)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.27148 18.3459C4.27148 18.3459 6.50051 15.5002 12.0005 15.5002C17.5005 15.5002 19.7295 18.3459 19.7295 18.3459" stroke="url(#paint1_linear_242_3755)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="url(#paint2_linear_242_3755)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_242_3755" x1="20.5171" y1="2.00024" x2="9.27005" y2="24.9118" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FFF200"/>
                                    <stop offset="0.468465" stop-color="#ECBF2A"/>
                                    <stop offset="1" stop-color="#6219E8"/>
                                    </linearGradient>
                                    </defs>
                                </svg>
                                <span>Данные профиля</span>
                            </div>
                            <div className='profile__nav__item'>
                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2607 19.7665L16.721 16.614C17.3039 16.2775 17.5947 16.1092 17.8067 15.8738C17.9942 15.6655 18.136 15.4202 18.2227 15.1536C18.3203 14.853 18.3203 14.5172 18.3203 13.8473V7.53311C18.3203 6.8632 18.3203 6.52737 18.2227 6.22681C18.136 5.96025 17.9942 5.71471 17.8067 5.50643C17.5957 5.27204 17.3054 5.10448 16.7276 4.77086L11.2598 1.61402C10.6769 1.27749 10.386 1.10956 10.0762 1.0437C9.80202 0.985432 9.51858 0.985432 9.24443 1.0437C8.93458 1.10956 8.64275 1.27749 8.05986 1.61402L2.59859 4.76709C2.01638 5.10322 1.72551 5.27116 1.51367 5.50643C1.32613 5.71471 1.1845 5.96025 1.09789 6.22681C1 6.52808 1 6.86479 1 7.53785V13.8428C1 14.5159 1 14.8523 1.09789 15.1536C1.1845 15.4202 1.32613 15.6655 1.51367 15.8738C1.72563 16.1092 2.01672 16.2775 2.59961 16.614L8.05986 19.7665C8.64274 20.103 8.93459 20.271 9.24443 20.3369C9.51858 20.3952 9.80202 20.3952 10.0762 20.3369C10.386 20.271 10.6779 20.103 11.2607 19.7665Z" stroke="url(#paint0_linear_7_1646)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6.66016 10.6902C6.66016 12.347 8.0033 13.6902 9.66016 13.6902C11.317 13.6902 12.6602 12.347 12.6602 10.6902C12.6602 9.03334 11.317 7.69019 9.66016 7.69019C8.0033 7.69019 6.66016 9.03334 6.66016 10.6902Z" stroke="url(#paint1_linear_7_1646)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_7_1646" x1="17.0361" y1="1" x2="5.40998" y2="22.166" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FFF200"/>
                                    <stop offset="0.468465" stop-color="#ECBF2A"/>
                                    <stop offset="1" stop-color="#6219E8"/>
                                    </linearGradient>
                                    </defs>
                                </svg>
                                <span>Настройки</span>
                            </div>
                            <div className='profile__nav__item'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 11.5V16.5" stroke="url(#paint0_linear_7_1640)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 7.51L12.01 7.49889" stroke="url(#paint1_linear_7_1640)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#paint2_linear_7_1640)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_7_1640" x1="12.9259" y1="11.5" x2="10.4421" y2="12.5119" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FFF200"/>
                                    <stop offset="0.468465" stop-color="#ECBF2A"/>
                                    <stop offset="1" stop-color="#6219E8"/>
                                    </linearGradient>
                                    </defs>
                                </svg>
                                <span>О проекте</span>
                            </div>
                            <div className='profile__nav__item profile__nav__exit'>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4.13086C3.75736 4.13086 2.75 5.13822 2.75 6.38086V18.3809C2.75 19.6235 3.75736 20.6309 5 20.6309H7C8.24264 20.6309 9.25 19.6235 9.25 18.3809V6.38086C9.25 5.13822 8.24264 4.13086 7 4.13086H5ZM1.25 6.38086C1.25 4.30979 2.92893 2.63086 5 2.63086H7C9.07107 2.63086 10.75 4.30979 10.75 6.38086V18.3809C10.75 20.4519 9.07107 22.1309 7 22.1309H5C2.92893 22.1309 1.25 20.4519 1.25 18.3809V6.38086Z" fill="url(#paint0_linear_8_1648)"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.25 3.38086C15.25 2.96665 15.5858 2.63086 16 2.63086H18C20.6234 2.63086 22.75 4.75751 22.75 7.38086V17.3809C22.75 20.0042 20.6234 22.1309 18 22.1309H16C15.5858 22.1309 15.25 21.7951 15.25 21.3809C15.25 20.9666 15.5858 20.6309 16 20.6309H18C19.7949 20.6309 21.25 19.1758 21.25 17.3809V7.38086C21.25 5.58593 19.7949 4.13086 18 4.13086H16C15.5858 4.13086 15.25 3.79507 15.25 3.38086Z" fill="url(#paint1_linear_8_1648)"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5303 12.9112C18.8232 12.6183 18.8232 12.1434 18.5303 11.8505L15.5303 8.85053C15.2374 8.55764 14.7626 8.55764 14.4697 8.85053C14.1768 9.14342 14.1768 9.6183 14.4697 9.91119L16.1893 11.6309H10C9.58579 11.6309 9.25 11.9666 9.25 12.3809C9.25 12.7951 9.58579 13.1309 10 13.1309H16.1893L14.4697 14.8505C14.1768 15.1434 14.1768 15.6183 14.4697 15.9112C14.7626 16.2041 15.2374 16.2041 15.5303 15.9112L18.5303 12.9112Z" fill="url(#paint2_linear_8_1648)"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_8_1648" x1="10.0456" y1="2.63086" x2="-3.81488" y2="16.3866" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FFF200"/>
                                    <stop offset="0.468465" stop-color="#ECBF2A"/>
                                    <stop offset="1" stop-color="#6219E8"/>
                                    </linearGradient>
                                    </defs>
                                </svg>
                                <span>Выйти</span>
                            </div>
                        </nav>
                    </div>
                    <PersonalData />
                </div>
                {/* <NotificationSettings />
                <a href="#" className="logout-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.75C3.75736 3.75 2.75 4.75736 2.75 6V18C2.75 19.2426 3.75736 20.25 5 20.25H7C8.24264 20.25 9.25 19.2426 9.25 18V6C9.25 4.75736 8.24264 3.75 7 3.75H5ZM1.25 6C1.25 3.92893 2.92893 2.25 5 2.25H7C9.07107 2.25 10.75 3.92893 10.75 6V18C10.75 20.0711 9.07107 21.75 7 21.75H5C2.92893 21.75 1.25 20.0711 1.25 18V6Z" fill="#E40A0A"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.25 3C15.25 2.58579 15.5858 2.25 16 2.25H18C20.6234 2.25 22.75 4.37665 22.75 7V17C22.75 19.6234 20.6234 21.75 18 21.75H16C15.5858 21.75 15.25 21.4142 15.25 21C15.25 20.5858 15.5858 20.25 16 20.25H18C19.7949 20.25 21.25 18.7949 21.25 17V7C21.25 5.20507 19.7949 3.75 18 3.75H16C15.5858 3.75 15.25 3.41421 15.25 3Z" fill="#E40A0A"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5303 12.5303C18.8232 12.2374 18.8232 11.7626 18.5303 11.4697L15.5303 8.46967C15.2374 8.17678 14.7626 8.17678 14.4697 8.46967C14.1768 8.76256 14.1768 9.23744 14.4697 9.53033L16.1893 11.25H10C9.58579 11.25 9.25 11.5858 9.25 12C9.25 12.4142 9.58579 12.75 10 12.75H16.1893L14.4697 14.4697C14.1768 14.7626 14.1768 15.2374 14.4697 15.5303C14.7626 15.8232 15.2374 15.8232 15.5303 15.5303L18.5303 12.5303Z" fill="#E40A0A"/>
                    </svg>
                    <span className="logout-btn__text">
                        Выйти
                    </span>
                </a> */}
            </section>
        </div>
    )
}

export default ProfilePage