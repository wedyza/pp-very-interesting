import Header from '../header/Header'
import './notificationsPage.css'
import BackButton from '../backButton/BackButton'
import Notification from './notification/Notification'
import { Link } from 'react-router-dom'

function NotificationsPage () {
    const notifications = [{title: 'Кривая дорога', id: 0}, {title: 'Мусорка упала', id: 1}, {title: 'Настроение плохое', id: 2}];

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
                <ul className="notifications-list">{
                    notifications.map((notification, index) => (
                        <li key={index} className="notifications-list__item">
                            <Notification notification={notification} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default NotificationsPage