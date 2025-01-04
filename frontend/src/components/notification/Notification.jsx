import './notification.css'
import { Link } from 'react-router-dom'

function Notification ({notification}) {
    return (
        <div className="notification">
            <div className="notification__img">
                <svg width="45" height="50" viewBox="0 0 45 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.2349 37.6825V40.2607C30.2349 44.5323 26.772 47.9952 22.5004 47.9952C18.2287 47.9952 14.7659 44.5323 14.7659 40.2607V37.6825M30.2349 37.6825H14.7659M30.2349 37.6825H39.4918C40.478 37.6825 40.9735 37.6825 41.3728 37.5478C42.1356 37.2905 42.7325 36.6916 42.9898 35.9288C43.125 35.5279 43.125 35.0309 43.125 34.0368C43.125 33.6019 43.1245 33.3844 43.0905 33.177C43.0262 32.7851 42.8741 32.4136 42.6425 32.091C42.5201 31.9206 42.3645 31.765 42.0579 31.4584L41.0536 30.4541C40.7296 30.1301 40.5476 29.6905 40.5476 29.2323V19.6353C40.5476 9.66812 32.4676 1.58811 22.5004 1.58813C12.5332 1.58816 4.45317 9.66815 4.45317 19.6353V29.2324C4.45317 29.6906 4.27075 30.13 3.94673 30.4541L2.94252 31.4583C2.63494 31.7659 2.48098 31.9204 2.35841 32.0911C2.12677 32.4137 1.97335 32.7851 1.90903 33.177C1.875 33.3844 1.875 33.6019 1.875 34.0369C1.875 35.0309 1.875 35.5278 2.01023 35.9287C2.26753 36.6915 2.86707 37.2905 3.62987 37.5478C4.02921 37.6825 4.52282 37.6825 5.50907 37.6825H14.7659" stroke="url(#paint0_linear_268_1675)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_268_1675" x1="40.0665" y1="1.58814" x2="12.147" y2="52.143" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF200"/>
                    <stop offset="0.468465" stopColor="#ECBF2A"/>
                    <stop offset="1" stopColor="#6219E8"/>
                    </linearGradient>
                    </defs>
                </svg>
            </div>
            <span className="notification__text">
                Ваша заявка <Link id="notification__text_accent" to={`/appeal/${notification.ticket.id}`}>{notification.ticket.title}</Link> была {notification.status_code_changed_on.toLowerCase()}
            </span>
            <span className="notification__datetime">
                10:15, 17.02.2024
            </span>
        </div>
    )
}

export default Notification