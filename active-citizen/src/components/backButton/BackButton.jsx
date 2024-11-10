import './../backButton/backButton.css'

function BackButton () {
    return (
        <div className="back-button">
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 4C16 3.58579 15.6642 3.25 15.25 3.25L2.6599 3.25L4.76034 1.2996C5.06387 1.01775 5.08145 0.543198 4.79959 0.239665C4.51774 -0.0638681 4.04319 -0.0814439 3.73966 0.200408L0.239661 3.45041C0.0868368 3.59232 0 3.79145 0 4C0 4.20855 0.0868368 4.40769 0.239661 4.5496L3.73966 7.7996C4.04319 8.08145 4.51774 8.06387 4.79959 7.76034C5.08145 7.45681 5.06387 6.98226 4.76034 6.70041L2.6599 4.75L15.25 4.75C15.6642 4.75 16 4.41422 16 4Z" fill="#656368"/>
            </svg>
            <span>Назад</span>
        </div>
    )
}

export default BackButton;