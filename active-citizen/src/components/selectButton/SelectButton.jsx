import './../selectButton/selectButton.css'

function SelectButton () {
    return (
        <div className="card-select">
            <span>Выбрать </span>
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 4C-1.81059e-08 3.58579 0.335786 3.25 0.75 3.25L13.3401 3.25L11.2397 1.2996C10.9361 1.01775 10.9186 0.543198 11.2004 0.239665C11.4823 -0.0638681 11.9568 -0.0814439 12.2603 0.200408L15.7603 3.45041C15.9132 3.59232 16 3.79145 16 4C16 4.20855 15.9132 4.40769 15.7603 4.5496L12.2603 7.7996C11.9568 8.08145 11.4823 8.06387 11.2004 7.76034C10.9186 7.45681 10.9361 6.98226 11.2397 6.70041L13.3401 4.75L0.75 4.75C0.335786 4.75 1.81059e-08 4.41422 0 4Z" fill="#FFF200"/>
            </svg>
        </div>
    )
}

export default SelectButton;