import './auditCard.css'
import icon from '../../../img/community.svg'
import DateDisplay from '../../dateDisplay/DateDisplay';
import { Link } from 'react-router-dom';

function AuditCard ({appeal: audit, appealId}) {
    console.log(audit);
    const statusConfig = {
        'Одобрена': {
            textClass: 'status_accepted'
        },
        'Отклонено': {
            textClass: 'status_rejected'
        },
        'На проверке': {
            textClass: 'status_checking'
        }
    };
    const { textClass } = audit.status_code && statusConfig[audit.status_code.title] || {};

    return (
        <div className='history__appeal-card history__audit-card'>
            <div className='appeal-card__icon'><img src={icon} /></div>
            <div className="appeal-card__info">
                <div className="appeal-card__info_main audit-card__info_main">
                    <div className='appeal-card__title audit-card__title'><span>{audit.title}</span></div>
                    <span className='appeal-card__datetime'>
                        <DateDisplay isoDate={audit.created_at} />
                    </span>
                </div>
                <div className='appeal-card__status'>
                    <span className='appeal-card__status_label appeal-card__label'>Статус:</span>
                    <span className={`appeal-card__status_value ${textClass}`}>{audit.status_code ? audit.status_code.title : ''}</span>
                </div>
                <div className='appeal-card__comm'>
                    <span className='appeal-card__comm_label appeal-card__label'>Комментарий:</span>
                    <span className='appeal-card__comm_value'>{audit.latest_review}</span>
                </div>
            </div>
            <Link to={`/appeal/${appealId}/audit/${audit.id}`} className='audit_open'>
                <span>Посмотреть</span>
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg" className='audit-arrow'>
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 4C-1.81059e-08 3.58579 0.335786 3.25 0.75 3.25L13.3401 3.25L11.2397 1.2996C10.9361 1.01775 10.9186 0.543198 11.2004 0.239665C11.4823 -0.0638681 11.9568 -0.0814439 12.2603 0.200408L15.7603 3.45041C15.9132 3.59232 16 3.79145 16 4C16 4.20855 15.9132 4.40769 15.7603 4.5496L12.2603 7.7996C11.9568 8.08145 11.4823 8.06387 11.2004 7.76034C10.9186 7.45681 10.9361 6.98226 11.2397 6.70041L13.3401 4.75L0.75 4.75C0.335786 4.75 1.81059e-08 4.41422 0 4Z" fill="#656368"/>
                </svg>
            </Link>
        </div>
    )
}

export default AuditCard