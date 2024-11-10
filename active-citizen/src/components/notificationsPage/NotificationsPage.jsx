import Header from '../header/Header'
import './notificationsPage.css'
import BackButton from '../backButton/BackButton'
import Notification from './notification/Notification'
import { Link } from 'react-router-dom';

function NotificationsPage () {
    return (
        <div className='App'>
            <Header />
            <section className='page_content'>
                <Link to={'/'}>
                    <BackButton />
                </Link>
                <h1 className="notifications__title text-title">
                    Уведомления
                </h1>
                <ul className="notifications-list">
                    <li className="notifications-list__item">
                        <Notification />
                    </li>
                    <li className="notifications-list__item">
                        <Notification />
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default NotificationsPage