import { useState } from 'react';
import Header from './../header/Header';
import './profilePage.css';
import BackButton from '../backButton/BackButton';
import { Link } from 'react-router-dom';
import PersonalData from './personalData/PersonalData';
import NotificationSettings from './notificationSettings/NotificationSettings';
import AboutProject from './aboutProject/AboutProject'

function ProfilePage() {
    const [activeSection, setActiveSection] = useState(window.innerWidth <= 1060 ? null : 'personalData');

    const activeSectionName = {
        'personalData': 'Данные профиля',
        'notificationSettings': 'Настройки',
        'aboutProject': 'О проекте',
    }

    const handleBackButtonClick = () => {
        setActiveSection(null);
    };

    return (
        <div className='App'>
            <Header />
            <section className='page_content'>
                <button className={`back-button back-button__profile ${activeSection ? '' : 'back-button__hidden'}`} onClick={handleBackButtonClick}>                                
                    <BackButton />
                </button>
                <Link to={'/'} className={`${activeSection ? 'back-button__hidden' : ''}`}>
                    <BackButton />
                </Link>
                <div className="profile__container">
                    <div className="profile__container_info">
                        <h1 className='profile__title text-title'>
                            {!activeSection ? 'Профиль' : activeSectionName[activeSection]}                            
                        </h1>
                        <nav className={`profile__nav ${activeSection ? 'profile__nav_closed' : ''}`}>
                            <div 
                                className={`profile__nav__item profile__nav__item_btns ${activeSection === 'personalData' ? 'profile__nav__item_active' : ''}`}
                                onClick={() => setActiveSection('personalData')}
                            >
                                <svg className='profile__nav__item_icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.00024C6.47715 2.00024 2 6.4774 2 12.0002C2 17.5231 6.47715 22.0002 12 22.0002C17.5228 22.0002 22 17.5231 22 12.0002C22 6.4774 17.5228 2.00024 12 2.00024Z" stroke="url(#paint0_linear_242_3755)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M4.27148 18.3459C4.27148 18.3459 6.50051 15.5002 12.0005 15.5002C17.5005 15.5002 19.7295 18.3459 19.7295 18.3459" stroke="url(#paint1_linear_242_3755)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="url(#paint2_linear_242_3755)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_242_3755" x1="20.5171" y1="2.00024" x2="9.27005" y2="24.9118" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FFF200"/>
                                    <stop offset="0.468465" stopColor="#ECBF2A"/>
                                    <stop offset="1" stopColor="#6219E8"/>
                                    </linearGradient>
                                    </defs>
                                </svg>
                                <span>Данные профиля</span>
                                <div className="profile__arrow">
                                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0 4C-1.81059e-08 3.58579 0.335786 3.25 0.75 3.25L13.3401 3.25L11.2397 1.2996C10.9361 1.01775 10.9186 0.543198 11.2004 0.239665C11.4823 -0.0638681 11.9568 -0.0814439 12.2603 0.200408L15.7603 3.45041C15.9132 3.59232 16 3.79145 16 4C16 4.20855 15.9132 4.40769 15.7603 4.5496L12.2603 7.7996C11.9568 8.08145 11.4823 8.06387 11.2004 7.76034C10.9186 7.45681 10.9361 6.98226 11.2397 6.70041L13.3401 4.75L0.75 4.75C0.335786 4.75 1.81059e-08 4.41422 0 4Z" fill="#656368"/>
                                    </svg>
                                </div>                                    
                            </div>
                            <div 
                                className={`profile__nav__item profile__nav__item_btns ${activeSection === 'notificationSettings' ? 'profile__nav__item_active' : ''}`}
                                onClick={() => setActiveSection('notificationSettings')}
                            >
                                <svg className='profile__nav__item_icon' width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2607 19.7665L16.721 16.614C17.3039 16.2775 17.5947 16.1092 17.8067 15.8738C17.9942 15.6655 18.136 15.4202 18.2227 15.1536C18.3203 14.853 18.3203 14.5172 18.3203 13.8473V7.53311C18.3203 6.8632 18.3203 6.52737 18.2227 6.22681C18.136 5.96025 17.9942 5.71471 17.8067 5.50643C17.5957 5.27204 17.3054 5.10448 16.7276 4.77086L11.2598 1.61402C10.6769 1.27749 10.386 1.10956 10.0762 1.0437C9.80202 0.985432 9.51858 0.985432 9.24443 1.0437C8.93458 1.10956 8.64275 1.27749 8.05986 1.61402L2.59859 4.76709C2.01638 5.10322 1.72551 5.27116 1.51367 5.50643C1.32613 5.71471 1.1845 5.96025 1.09789 6.22681C1 6.52808 1 6.86479 1 7.53785V13.8428C1 14.5159 1 14.8523 1.09789 15.1536C1.1845 15.4202 1.32613 15.6655 1.51367 15.8738C1.72563 16.1092 2.01672 16.2775 2.59961 16.614L8.05986 19.7665C8.64274 20.103 8.93459 20.271 9.24443 20.3369C9.51858 20.3952 9.80202 20.3952 10.0762 20.3369C10.386 20.271 10.6779 20.103 11.2607 19.7665Z" stroke="url(#paint0_linear_7_1646)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6.66016 10.6902C6.66016 12.347 8.0033 13.6902 9.66016 13.6902C11.317 13.6902 12.6602 12.347 12.6602 10.6902C12.6602 9.03334 11.317 7.69019 9.66016 7.69019C8.0033 7.69019 6.66016 9.03334 6.66016 10.6902Z" stroke="url(#paint1_linear_7_1646)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_7_1646" x1="17.0361" y1="1" x2="5.40998" y2="22.166" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FFF200"/>
                                    <stop offset="0.468465" stopColor="#ECBF2A"/>
                                    <stop offset="1" stopColor="#6219E8"/>
                                    </linearGradient>
                                    </defs>
                                </svg>
                                <span>Настройки</span>
                                <div className="profile__arrow">
                                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0 4C-1.81059e-08 3.58579 0.335786 3.25 0.75 3.25L13.3401 3.25L11.2397 1.2996C10.9361 1.01775 10.9186 0.543198 11.2004 0.239665C11.4823 -0.0638681 11.9568 -0.0814439 12.2603 0.200408L15.7603 3.45041C15.9132 3.59232 16 3.79145 16 4C16 4.20855 15.9132 4.40769 15.7603 4.5496L12.2603 7.7996C11.9568 8.08145 11.4823 8.06387 11.2004 7.76034C10.9186 7.45681 10.9361 6.98226 11.2397 6.70041L13.3401 4.75L0.75 4.75C0.335786 4.75 1.81059e-08 4.41422 0 4Z" fill="#656368"/>
                                    </svg>
                                </div>                        
                            </div>
                            <div 
                                className={`profile__nav__item profile__nav__item_btns ${activeSection === 'aboutProject' ? 'profile__nav__item_active' : ''}`}
                                onClick={() => setActiveSection('aboutProject')}
                            >
                                <svg className='profile__nav__item_icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 11.5V16.5" stroke="url(#paint0_linear_7_1640)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 7.51L12.01 7.49889" stroke="url(#paint1_linear_7_1640)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#paint2_linear_7_1640)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_7_1640" x1="12.9259" y1="11.5" x2="10.4421" y2="12.5119" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FFF200"/>
                                    <stop offset="0.468465" stopColor="#ECBF2A"/>
                                    <stop offset="1" stopColor="#6219E8"/>
                                    </linearGradient>
                                    </defs>
                                </svg>
                                <span>О проекте</span>
                                <div className="profile__arrow">
                                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0 4C-1.81059e-08 3.58579 0.335786 3.25 0.75 3.25L13.3401 3.25L11.2397 1.2996C10.9361 1.01775 10.9186 0.543198 11.2004 0.239665C11.4823 -0.0638681 11.9568 -0.0814439 12.2603 0.200408L15.7603 3.45041C15.9132 3.59232 16 3.79145 16 4C16 4.20855 15.9132 4.40769 15.7603 4.5496L12.2603 7.7996C11.9568 8.08145 11.4823 8.06387 11.2004 7.76034C10.9186 7.45681 10.9361 6.98226 11.2397 6.70041L13.3401 4.75L0.75 4.75C0.335786 4.75 1.81059e-08 4.41422 0 4Z" fill="#656368"/>
                                    </svg>
                                </div>                        
                            </div>
                            <div className='profile__nav__item profile__nav__exit'>
                                <svg className='profile__nav__item_icon' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5 4.13086C3.75736 4.13086 2.75 5.13822 2.75 6.38086V18.3809C2.75 19.6235 3.75736 20.6309 5 20.6309H7C8.24264 20.6309 9.25 19.6235 9.25 18.3809V6.38086C9.25 5.13822 8.24264 4.13086 7 4.13086H5ZM1.25 6.38086C1.25 4.30979 2.92893 2.63086 5 2.63086H7C9.07107 2.63086 10.75 4.30979 10.75 6.38086V18.3809C10.75 20.4519 9.07107 22.1309 7 22.1309H5C2.92893 22.1309 1.25 20.4519 1.25 18.3809V6.38086Z" fill="url(#paint0_linear_8_1648)"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.25 3.38086C15.25 2.96665 15.5858 2.63086 16 2.63086H18C20.6234 2.63086 22.75 4.75751 22.75 7.38086V17.3809C22.75 20.0042 20.6234 22.1309 18 22.1309H16C15.5858 22.1309 15.25 21.7951 15.25 21.3809C15.25 20.9666 15.5858 20.6309 16 20.6309H18C19.7949 20.6309 21.25 19.1758 21.25 17.3809V7.38086C21.25 5.58593 19.7949 4.13086 18 4.13086H16C15.5858 4.13086 15.25 3.79507 15.25 3.38086Z" fill="url(#paint1_linear_8_1648)"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 12.9112C18.8232 12.6183 18.8232 12.1434 18.5303 11.8505L15.5303 8.85053C15.2374 8.55764 14.7626 8.55764 14.4697 8.85053C14.1768 9.14342 14.1768 9.6183 14.4697 9.91119L16.1893 11.6309H10C9.58579 11.6309 9.25 11.9666 9.25 12.3809C9.25 12.7951 9.58579 13.1309 10 13.1309H16.1893L14.4697 14.8505C14.1768 15.1434 14.1768 15.6183 14.4697 15.9112C14.7626 16.2041 15.2374 16.2041 15.5303 15.9112L18.5303 12.9112Z" fill="url(#paint2_linear_8_1648)"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_8_1648" x1="10.0456" y1="2.63086" x2="-3.81488" y2="16.3866" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FFF200"/>
                                    <stop offset="0.468465" stopColor="#ECBF2A"/>
                                    <stop offset="1" stopColor="#6219E8"/>
                                    </linearGradient>
                                    </defs>
                                </svg>
                                <span>Выйти</span>
                            </div>
                        </nav>
                    </div>
                    {activeSection && (
                        <div className={`profile-content__container ${activeSection!=='none' ? 'profile-content__container_active' : ''}`}>
                            {activeSection === 'personalData' && <PersonalData />}
                            {activeSection === 'notificationSettings' && <NotificationSettings />}
                            {activeSection === 'aboutProject' && <AboutProject />}
                        </div>
                    )}
                        
                </div>
            </section>
        </div>
    );
}

export default ProfilePage;
