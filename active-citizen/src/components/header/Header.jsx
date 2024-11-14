import './../header/header.css'
import logo from './../../img/logo.svg'
import avatar from './../../img/empty.jpg'
import { Link } from 'react-router-dom';

function Header () {
    return (
        <header className="header">
            <div className="header__content">
                <div className="header__logo">
                    <img src={logo} alt="Мой город" />
                </div>
                <div className="header__btns">
                    <Link to={'/history'}>
                        <div className="header__notifications header__btn">
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.6574 7.35742C12.0361 7.35742 12.3431 7.66443 12.3431 8.04314L12.3431 12.8431L17.1431 12.8431C17.5218 12.8431 17.8288 13.1501 17.8288 13.5288C17.8288 13.9076 17.5218 14.2146 17.1431 14.2146L11.6574 14.2146C11.2787 14.2146 10.9717 13.9076 10.9717 13.5289L10.9717 8.04314C10.9717 7.66443 11.2787 7.35742 11.6574 7.35742Z" fill="#EBE7FF"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 3.25024C17.1086 3.25024 21.25 7.39161 21.25 12.5002C21.25 17.6089 17.1086 21.7502 12 21.7502C7.36362 21.7502 3.52275 18.3384 2.8534 13.8887C2.79179 13.4791 2.40979 13.197 2.00019 13.2586C1.59058 13.3202 1.30848 13.7022 1.37009 14.1118C2.1482 19.2846 6.61031 23.2502 12 23.2502C17.9371 23.2502 22.75 18.4373 22.75 12.5002C22.75 6.56318 17.9371 1.75024 12 1.75024C7.59065 1.75024 3.80298 4.40484 2.14482 8.19997C1.97898 8.57953 2.15224 9.02167 2.53181 9.18751C2.91137 9.35335 3.35351 9.18009 3.51935 8.80052C4.94742 5.53203 8.20807 3.25024 12 3.25024Z" fill="#EBE7FF"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M2 2.75C1.58579 2.75 1.25 3.08579 1.25 3.5V7.9C1.25 8.64558 1.85442 9.25 2.6 9.25H7C7.41421 9.25 7.75 8.91421 7.75 8.5C7.75 8.08579 7.41421 7.75 7 7.75H2.75V3.5C2.75 3.08579 2.41421 2.75 2 2.75Z" fill="#EBE7FF"/>
                            </svg>
                            <span>История заявок</span>
                        </div>
                    </Link>
                    <Link to={'/notifications'}>
                        <div className="header__notifications header__btn">
                            <svg width="25" height="28" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15V16C12 17.6569 10.6569 19 9 19C7.34315 19 6 17.6569 6 16V15M12 15H6M12 15H15.5905C15.973 15 16.1652 15 16.3201 14.9478C16.616 14.848 16.8475 14.6156 16.9473 14.3198C16.9997 14.1643 16.9997 13.9715 16.9997 13.5859C16.9997 13.4172 16.9995 13.3329 16.9863 13.2524C16.9614 13.1004 16.9024 12.9563 16.8126 12.8312C16.7651 12.7651 16.7048 12.7048 16.5858 12.5858L16.1963 12.1963C16.0706 12.0706 16 11.9001 16 11.7224V8C16 4.134 12.866 0.999991 9 1C5.13401 1.00001 2 4.13401 2 8V11.7224C2 11.9002 1.92924 12.0706 1.80357 12.1963L1.41406 12.5858C1.29476 12.7051 1.23504 12.765 1.1875 12.8312C1.09766 12.9564 1.03815 13.1004 1.0132 13.2524C1 13.3329 1 13.4172 1 13.586C1 13.9715 1 14.1642 1.05245 14.3197C1.15225 14.6156 1.3848 14.848 1.68066 14.9478C1.83556 15 2.02701 15 2.40956 15H6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Уведомления</span>
                        </div>
                    </Link>
                    <Link to={'/profile'} className="menu__item">
                        <div className="header__menu-avatar">     
                            <img src={avatar} alt="Профиль" />
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;