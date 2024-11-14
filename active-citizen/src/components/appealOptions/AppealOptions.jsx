import './../appealOptions/appealOptions.css'

function AppealOptions () {
    return (
        <div className="appeal-options">
            <button className='appeal-options__delete'>
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 13.5L7.00002 7.50002M7.00002 7.50002L1 1.5M7.00002 7.50002L13 1.5M7.00002 7.50002L1 13.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <a href='#' className='appeal-options__edit'>
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3632 3.15156L13.8431 1.67157C14.6242 0.890524 15.8905 0.890524 16.6716 1.67157L18.0858 3.08579C18.8668 3.86683 18.8668 5.13316 18.0858 5.91421L16.6058 7.3942M12.3632 3.15156L2.74749 12.7672C2.41542 13.0993 2.21079 13.5376 2.16947 14.0054L1.92738 16.7459C1.87261 17.3659 2.39148 17.8848 3.0115 17.83L5.75191 17.5879C6.21972 17.5466 6.65806 17.3419 6.99013 17.0099L16.6058 7.3942M12.3632 3.15156L16.6058 7.3942" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </a>
        </div>
    )
}

export default AppealOptions;