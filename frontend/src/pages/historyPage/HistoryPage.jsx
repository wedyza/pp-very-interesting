import './historyPage.css'
import Header from '../../components/header/Header'
import Filter from '../../components/filter/Filter'
import AppealCard from '../../components/appealCard/AppealCard'
import { useEffect, useState } from 'react'
import { API_URL } from '../../constants'

function HistoryPage () {
    const accessToken = localStorage.getItem('accessToken');
    const [historyData, setHistoryData] = useState([]);
    const [statusFilter, setStatusFilter] = useState('Статус');
    const [sortOrder, setSortOrder] = useState('Сначала новые');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistoryData = async () => {
            setError(null);
            try {
                const response = await fetch(`${API_URL}/tickets/?draft=false`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                const data = await response.json();
                setHistoryData(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchHistoryData();
    }, []);

    const sortData = (data) => {
        return data.slice().sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return sortOrder === 'Сначала новые' ? dateB - dateA : dateA - dateB;
        });
    };

    const filteredAndSortedData = sortData(historyData.filter((appeal) => {
        return statusFilter === 'Статус' || appeal.status === statusFilter;
    }));

    const handleDeleteAppeal = (id) => {
        setHistoryData((prevAppeals) => prevAppeals.filter((appeal) => appeal.id !== id));
    };

    return (
        <div className='App'>
            <Header />
            <section className='page_content'>
                <h1 className="history__title text-title">
                    История моих заявок
                </h1>
                <div className="history__filters">
                    <div className="history-filters__sort">
                        <Filter defaultText ='Сначала новые' options ={['Сначала новые', 'Сначала старые']}
                            onSelect={(selected) => setSortOrder(selected)} />
                    </div>
                    <div className="history-filters__status">
                        <Filter defaultText ='Статус' options ={['Статус', 'Принято', 'Отклонено', 'На проверке']}
                            onSelect={(selected) => setStatusFilter(selected)}/>
                    </div>
                </div>
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <ul className="history__list">
                        {filteredAndSortedData.map((appeal, index) => (
                            <li key={index} className="history__list_item">
                                <AppealCard appeal={appeal} onDelete={handleDeleteAppeal} />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}

export default HistoryPage