import './../draftCard/draftCard.css'
import OpenAppeal from './../../openAppeal/OpenAppeal'

function DraftCard () {
    return (
        <div className="draft-card">
            <h2 className="draft-card__title">
                Кривая дорога
            </h2>
            <span className="draft-card__datetime">10:15, 17.02.2024</span>
            <OpenAppeal text='Продолжить создание' />
            <button className="draft-card__delete">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 13L7.00002 7.00002M7.00002 7.00002L1 1M7.00002 7.00002L13 1M7.00002 7.00002L1 13" stroke="#180F25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    )
}

export default DraftCard;