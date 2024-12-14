import Header from '../../components/header/Header'
import './notificationsPage.css'
import BackButton from '../../components/backButton/BackButton'
import Notification from '../../components/notification/Notification'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API_URL } from '../../constants'

function NotificationsPage () {
    const accessToken = localStorage.getItem('accessToken');
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${API_URL}/notifications/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`${response.statusText}`);
                }
                const data = await response.json();
                setNotifications(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchNotifications();
    }, []);

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