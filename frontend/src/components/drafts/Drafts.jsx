import { API_URL } from '../../constants';
import Search from '../search/Search'
import './../drafts/drafts.css'
import DraftCard from './draftCard/DraftCard'
import { useEffect, useState } from 'react'

function Drafts () {
    const accessToken = localStorage.getItem('accessToken');
    const [drafts, setDrafts] = useState([]);
    const [filteredDrafts, setFilteredDrafts] = useState(drafts);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDraftsData = async () => {
            setError(null);
            try {
                const response = await fetch(`${API_URL}/tickets/?draft=true`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                const data = await response.json();
                setDrafts(data);
                setFilteredDrafts(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchDraftsData();
    }, []);

    const handleSearchResults = (results) => {
        setFilteredDrafts(results);
    };

    const handleDeleteAppeal = (id) => {
        setDrafts((prevAppeals) => prevAppeals.filter((appeal) => appeal.id !== id));
        setFilteredDrafts((prevAppeals) => prevAppeals.filter((appeal) => appeal.id !== id));
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
                        <DraftCard draft={draft} onDelete={handleDeleteAppeal} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Drafts;