import './notificationOption.css'

function NotificationOption({ notify, onToggle }) {
    return (
        <div className='notify-option'>
            <div className={`toggle-switch ${notify.isActive ? 'active' : ''}`} onClick={onToggle}>
                <svg width="44" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="43" height="23" rx="11.5" />
                </svg>
                <div className="toggle-circle">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" />
                    </svg>
                </div>
            </div>
            <span className='notify-option__name'>{notify.name}</span>
        </div>
    );
}

export default NotificationOption;
