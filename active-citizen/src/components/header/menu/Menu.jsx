import './menu.css'

function Menu () {
    return (
        <nav className="header__menu">
            <div className="menu__list">
                <a className="menu__item">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.77148 18.3457C4.77148 18.3457 7.00051 15.5 12.5005 15.5C18.0005 15.5 20.2295 18.3457 20.2295 18.3457" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5 12C14.1569 12 15.5 10.6569 15.5 9C15.5 7.34315 14.1569 6 12.5 6C10.8431 6 9.5 7.34315 9.5 9C9.5 10.6569 10.8431 12 12.5 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Профиль</span>
                </a>
                <a className="menu__item">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 7V12H17.5M12.5 21C7.52944 21 3.5 16.9706 3.5 12C3.5 7.02944 7.52944 3 12.5 3C17.4706 3 21.5 7.02944 21.5 12C21.5 16.9706 17.4706 21 12.5 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>История моих заявок</span>
                </a>
                <a className="menu__item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 11.4998L3.51493 11.6211C2.62459 11.8437 2 12.6436 2 13.5614V15.4382C2 16.356 2.62459 17.1559 3.51493 17.3785L5.25448 17.8134C5.63317 17.9081 6 17.6217 6 17.2313V11.7683C6 11.3779 5.63317 11.0915 5.25448 11.1862L4 11.4998ZM4 11.4998V11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11V11.4998M20 11.4998L20.4851 11.6211C21.3754 11.8437 22 12.6436 22 13.5614V15.4382C22 16.356 21.3754 17.1559 20.4851 17.3785L20 17.4998M20 11.4998L18.7455 11.1862C18.3668 11.0915 18 11.3779 18 11.7683V17.2313C18 17.6217 18.3668 17.9081 18.7455 17.8134L20 17.4998M15 20.5H18C19.1046 20.5 20 19.6046 20 18.5V18V17.4998M15 20.5C15 19.6716 14.3284 19 13.5 19H10.5C9.67157 19 9 19.6716 9 20.5C9 21.3284 9.67157 22 10.5 22H13.5C14.3284 22 15 21.3284 15 20.5Z" stroke="white" stroke-width="1.5"/>
                    </svg>
                    <span>Помощь и обратная связь</span>
                </a>
                <a className="menu__item">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 11.5V16.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5 7.51L12.51 7.49889" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>О проекте</span>
                </a>
                <a className="menu__item">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 3.75C4.25736 3.75 3.25 4.75736 3.25 6V18C3.25 19.2426 4.25736 20.25 5.5 20.25H7.5C8.74264 20.25 9.75 19.2426 9.75 18V6C9.75 4.75736 8.74264 3.75 7.5 3.75H5.5ZM1.75 6C1.75 3.92893 3.42893 2.25 5.5 2.25H7.5C9.57107 2.25 11.25 3.92893 11.25 6V18C11.25 20.0711 9.57107 21.75 7.5 21.75H5.5C3.42893 21.75 1.75 20.0711 1.75 18V6Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 3C15.75 2.58579 16.0858 2.25 16.5 2.25H18.5C21.1234 2.25 23.25 4.37665 23.25 7V17C23.25 19.6234 21.1234 21.75 18.5 21.75H16.5C16.0858 21.75 15.75 21.4142 15.75 21C15.75 20.5858 16.0858 20.25 16.5 20.25H18.5C20.2949 20.25 21.75 18.7949 21.75 17V7C21.75 5.20507 20.2949 3.75 18.5 3.75H16.5C16.0858 3.75 15.75 3.41421 15.75 3Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0303 12.5303C19.3232 12.2374 19.3232 11.7626 19.0303 11.4697L16.0303 8.46967C15.7374 8.17678 15.2626 8.17678 14.9697 8.46967C14.6768 8.76256 14.6768 9.23744 14.9697 9.53033L16.6893 11.25H10.5C10.0858 11.25 9.75 11.5858 9.75 12C9.75 12.4142 10.0858 12.75 10.5 12.75H16.6893L14.9697 14.4697C14.6768 14.7626 14.6768 15.2374 14.9697 15.5303C15.2626 15.8232 15.7374 15.8232 16.0303 15.5303L19.0303 12.5303Z" fill="white"/>
                    </svg>
                    <span>Выйти</span>
                </a>
            </div>
        </nav>
    )
}

export default Menu