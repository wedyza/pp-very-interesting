import './historyPage.css'
import Header from './../header/Header'
import Filter from './../filter/Filter'
import AppealCard from './appealCard/AppealCard'
import { useState } from 'react'

function HistoryPage () {
    const historyData = [
        {title: 'Невероятно кривая дорога', datetime: '10:15, 18.02.2024', status: 'На проверке', comment: '-'},
        {title: 'Кривая дорога', datetime: '10:15, 17.02.2024', status: 'Отклонено', comment: 'Недопустимые материелы'},
        {title: 'Очень кривая дорога', datetime: '20:15, 17.02.2024', status: 'Принято', comment: 'Все отлично'},
    ];

    const [statusFilter, setStatusFilter] = useState('Статус');
    const [sortOrder, setSortOrder] = useState('Сначала новые');

    const parseDateTime = (datetimeStr) => {
        const [time, date] = datetimeStr.split(', ');
        const [day, month, year] = date.split('.').map(Number);
        const [hours, minutes] = time.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes);
    };

    const sortData = (data) => {
        return data.slice().sort((a, b) => {
            const dateA = parseDateTime(a.datetime);
            const dateB = parseDateTime(b.datetime);
            return sortOrder === 'Сначала новые' ? dateB - dateA : dateA - dateB;
        });
    };

    const filteredAndSortedData = sortData(historyData.filter((appeal) => {
        return statusFilter === 'Статус' || appeal.status === statusFilter;
    }));

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
                <ul className="history__list">
                    {filteredAndSortedData.map((appeal, index) => (
                        <li key={index} className='history__list_item'>
                            <AppealCard appeal={appeal} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default HistoryPage