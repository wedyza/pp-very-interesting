import Search from '../search/Search'
import './../drafts/drafts.css'
import DraftCard from './draftCard/DraftCard'
import { useState } from 'react'

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
    const [filteredDrafts, setFilteredDrafts] = useState(drafts);
    const handleSearchResults = (results) => {
        setFilteredDrafts(results);
    };

    return (
        <div className="drafts">
            <div className="drafts__header">
                <div className="drafts__header_text">
                    <h1 className="drafts__title text-title">
                        Черновики
                    </h1>
                    <span className="drafts_desc description-text">
                        Здесь находятся ваши незавершенные обращения. 
                        Пожалуйста, завершите их!
                    </span>
                </div>
                <Search 
                    list={drafts}
                    onResults={handleSearchResults}
                    placeholder="Начните искать ваше обращение"
                />
            </div>
            <ul className="drafts-list">
                {filteredDrafts.map((draft, index) => (
                    <li key={index} className="draft-list__item">
                        <DraftCard draft={draft} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Drafts;