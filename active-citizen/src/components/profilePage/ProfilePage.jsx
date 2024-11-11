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
            </section>
        </div>
    )
}

export default ProfilePage