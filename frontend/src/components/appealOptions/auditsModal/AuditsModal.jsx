import './auditsModal.css'
import { API_URL } from '../../../constants'
import { useEffect, useState } from 'react'
import AuditCard from '../auditCard/AuditCard'
import Filter from '../../filter/Filter';

function AuditsModal ({appealId}) {
    const accessToken = localStorage.getItem('accessToken');
    const [audits, setAudits] = useState([]);
    const [sortOrder, setSortOrder] = useState('Сначала новые');

    const sortData = (data) => {
        return data.slice().sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return sortOrder === 'Сначала новые' ? dateB - dateA : dateA - dateB;
        });
    };

    const filteredAndSortedData = sortData(audits);
    
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`${API_URL}/tickets/${appealId}/audit`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch appeals');

                const data = await response.json();
                setAudits(data);
            } catch (error) {
                console.error('Ошибка загрузки заявок:', error);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="history-modal_content">
            <div className="history-modal_header">
                <h1 className="history-modal_header__title">История изменений</h1>
                <Filter defaultText ='Сначала новые' options ={['Сначала новые', 'Сначала старые']}
                            onSelect={(selected) => setSortOrder(selected)} />
            </div>
            <div className="history-modal__audits">
                {filteredAndSortedData.map((audit) => (
                    <AuditCard appeal={audit} appealId={appealId} />
                ))}
            </div>
        </div>
    )
}

export default AuditsModal