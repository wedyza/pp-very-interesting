import './notificationSettings.css';
import NotificationOption from './notificationOption/NotificationOption';
import { useState } from 'react';

function NotificationSettings() {
    const [notifyOptions, setNotifyOptions] = useState([
        { name: 'Уведомление 1', isActive: false },
        { name: 'Уведомление 2', isActive: false },
        { name: 'Уведомление 3', isActive: false },
        { name: 'Уведомление 4', isActive: false },
        { name: 'Уведомление 5', isActive: false },
    ]);

    const toggleActive = (index) => {
        setNotifyOptions(prevOptions =>
            prevOptions.map((option, i) =>
                i === index ? { ...option, isActive: !option.isActive } : option
            )
        );
    };

    return (
        <div className='notify-set'>
            <div className="notify-set__title_container">
                <h2 className='notify-set__title'>Настройки уведомлений</h2>
                <hr className="notify-set__title_line" />
            </div>
            <ul className="notify__list">
                {notifyOptions.map((notify, index) => (
                    <li key={index}>
                        <NotificationOption
                            notify={notify}
                            onToggle={() => toggleActive(index)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NotificationSettings;
