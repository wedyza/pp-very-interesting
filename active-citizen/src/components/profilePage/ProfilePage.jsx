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
                <h1 className='profile__title text-title'>Личный кабинет</h1>
                <PersonalData />
                <NotificationSettings />
                <a href="#" className="logout-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.75C3.75736 3.75 2.75 4.75736 2.75 6V18C2.75 19.2426 3.75736 20.25 5 20.25H7C8.24264 20.25 9.25 19.2426 9.25 18V6C9.25 4.75736 8.24264 3.75 7 3.75H5ZM1.25 6C1.25 3.92893 2.92893 2.25 5 2.25H7C9.07107 2.25 10.75 3.92893 10.75 6V18C10.75 20.0711 9.07107 21.75 7 21.75H5C2.92893 21.75 1.25 20.0711 1.25 18V6Z" fill="#E40A0A"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.25 3C15.25 2.58579 15.5858 2.25 16 2.25H18C20.6234 2.25 22.75 4.37665 22.75 7V17C22.75 19.6234 20.6234 21.75 18 21.75H16C15.5858 21.75 15.25 21.4142 15.25 21C15.25 20.5858 15.5858 20.25 16 20.25H18C19.7949 20.25 21.25 18.7949 21.25 17V7C21.25 5.20507 19.7949 3.75 18 3.75H16C15.5858 3.75 15.25 3.41421 15.25 3Z" fill="#E40A0A"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5303 12.5303C18.8232 12.2374 18.8232 11.7626 18.5303 11.4697L15.5303 8.46967C15.2374 8.17678 14.7626 8.17678 14.4697 8.46967C14.1768 8.76256 14.1768 9.23744 14.4697 9.53033L16.1893 11.25H10C9.58579 11.25 9.25 11.5858 9.25 12C9.25 12.4142 9.58579 12.75 10 12.75H16.1893L14.4697 14.4697C14.1768 14.7626 14.1768 15.2374 14.4697 15.5303C14.7626 15.8232 15.2374 15.8232 15.5303 15.5303L18.5303 12.5303Z" fill="#E40A0A"/>
                    </svg>
                    <span className="logout-btn__text">
                        Выйти
                    </span>
                </a>
            </section>
        </div>
    )
}

export default ProfilePage