import { useState } from 'react';

import './../header/header.css'
import logo from './../../img/logo.svg'
import avatar from './../../img/empty.jpg'
import Menu from './menu/Menu'
import { Link } from 'react-router-dom';

function Header () {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(prevState => !prevState);
    };

    return (
        <header className="header">
            <div className="header__content">
                <div className="header__logo">
                    <img src={logo} alt="Мой город" />
                </div>
                <div className="header__btns">
                    <Link to={'/notifications'}>
                        <div className="header__notifications">
                            <svg width="25" height="28" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15V16C12 17.6569 10.6569 19 9 19C7.34315 19 6 17.6569 6 16V15M12 15H6M12 15H15.5905C15.973 15 16.1652 15 16.3201 14.9478C16.616 14.848 16.8475 14.6156 16.9473 14.3198C16.9997 14.1643 16.9997 13.9715 16.9997 13.5859C16.9997 13.4172 16.9995 13.3329 16.9863 13.2524C16.9614 13.1004 16.9024 12.9563 16.8126 12.8312C16.7651 12.7651 16.7048 12.7048 16.5858 12.5858L16.1963 12.1963C16.0706 12.0706 16 11.9001 16 11.7224V8C16 4.134 12.866 0.999991 9 1C5.13401 1.00001 2 4.13401 2 8V11.7224C2 11.9002 1.92924 12.0706 1.80357 12.1963L1.41406 12.5858C1.29476 12.7051 1.23504 12.765 1.1875 12.8312C1.09766 12.9564 1.03815 13.1004 1.0132 13.2524C1 13.3329 1 13.4172 1 13.586C1 13.9715 1 14.1642 1.05245 14.3197C1.15225 14.6156 1.3848 14.848 1.68066 14.9478C1.83556 15 2.02701 15 2.40956 15H6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </Link>
                    
                    <button className="header__menu-btn" onClick={toggleMenu}>
                        <div className="header__menu-btn-avatar">     
                            <img src={avatar} alt="Профиль" />
                        </div>
                        <div className="header__menu-btn-arrow">
                            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.5303 0.46967C13.2374 0.176777 12.7626 0.176777 12.4697 0.46967L7 5.93934L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L6.46967 7.53033C6.76256 7.82322 7.23744 7.82322 7.53033 7.53033L13.5303 1.53033C13.8232 1.23744 13.8232 0.762563 13.5303 0.46967Z" fill="#FFF200"/>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            {isMenuVisible && <Menu />}
        </header>
    )
}

export default Header;