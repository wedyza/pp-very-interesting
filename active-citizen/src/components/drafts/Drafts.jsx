import './../drafts/drafts.css'
import DraftCard from './draftCard/DraftCard'

function Drafts () {
    const drafts = [
        {title: 'Невероятно кривая дорога', datetime: '10:15, 18.02.2024'},
        {title: 'Очень кривая дорога', datetime: '20:15, 17.02.2024'},
        {title: 'Кривая дорога', datetime: '10:15, 17.02.2024'},
        {title: 'Невероятно кривая дорога', datetime: '10:15, 18.02.2024'},
        {title: 'Очень кривая дорога', datetime: '20:15, 17.02.2024'},
        {title: 'Кривая дорога', datetime: '10:15, 17.02.2024'},
        {title: 'Невероятно кривая дорога', datetime: '10:15, 18.02.2024'},
        {title: 'Невероятно кривая дорога', datetime: '10:15, 18.02.2024'},
        {title: 'Очень кривая дорога', datetime: '20:15, 17.02.2024'},
        {title: 'Кривая дорога', datetime: '10:15, 17.02.2024'},
        {title: 'Невероятно кривая дорога', datetime: '10:15, 18.02.2024'},
        {title: 'Невероятно кривая дорога', datetime: '10:15, 18.02.2024'},
    ];

    return (
        <div className="drafts">
            <h1 className="drafts__title text-title">
                Черновики
            </h1>
            <span className="drafts_desc description-text">
                Здесь находятся ваши незавершенные обращения. 
                Пожалуйста, завершите их!
            </span>
            <ul className="drafts-list">
                {drafts.map((draft, index) => (
                    <li key={index} className="draft-list__item">
                        <DraftCard draft={draft} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Drafts;