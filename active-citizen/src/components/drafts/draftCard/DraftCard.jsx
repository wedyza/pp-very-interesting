import './../draftCard/draftCard.css'

function DraftCard () {
    return (
        <div className="draft-card">
            <h2 className="draft-card__title">
                Кривая дорога
            </h2>
            <span className="draft-card__datetime">10:15, 17.02.2024</span>
            <a href='#' className="draft-card__continue">
                <span>Продолжить создание</span>
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 4C-1.81059e-08 3.58579 0.335786 3.25 0.75 3.25L13.3401 3.25L11.2397 1.2996C10.9361 1.01775 10.9186 0.543198 11.2004 0.239665C11.4823 -0.0638681 11.9568 -0.0814439 12.2603 0.200408L15.7603 3.45041C15.9132 3.59232 16 3.79145 16 4C16 4.20855 15.9132 4.40769 15.7603 4.5496L12.2603 7.7996C11.9568 8.08145 11.4823 8.06387 11.2004 7.76034C10.9186 7.45681 10.9361 6.98226 11.2397 6.70041L13.3401 4.75L0.75 4.75C0.335786 4.75 1.81059e-08 4.41422 0 4Z" fill="#656368"/>
                </svg>
            </a>
            <button className="draft-card__delete">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 13L7.00002 7.00002M7.00002 7.00002L1 1M7.00002 7.00002L13 1M7.00002 7.00002L1 13" stroke="#180F25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    )
}

export default DraftCard;