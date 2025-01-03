import './appealCard.css'
import AppealOptions from '../appealOptions/AppealOptions'
import icon from '../../img/community.svg'
import DateDisplay from '../dateDisplay/DateDisplay';

function AppealCard ({appeal, onDelete}) {
    const statusConfig = {
        'Одобрена': {
            textClass: 'status_accepted'
        },
        'Отклонена': {
            textClass: 'status_rejected'
        },
        'На проверке': {
            textClass: 'status_checking'
        }
    };
    const { textClass } = statusConfig[appeal.status_code] || {};

    return (
        <div className='history__appeal-card'>
            <div className='appeal-card__icon'><img src={icon} /></div>
            <div className="appeal-card__info">
                <div className="appeal-card__info_main">
                    <div className='appeal-card__title'><span>{appeal.title}</span></div>
                    <span className='appeal-card__datetime'>
                        <DateDisplay isoDate={appeal.created_at} />
                    </span>
                </div>
                <div className='appeal-card__status'>
                    <span className='appeal-card__status_label appeal-card__label'>Статус:</span>
                    <span className={`appeal-card__status_value ${textClass}`}>{appeal.status_code}</span>
                </div>
                <div className='appeal-card__comm'>
                    <span className='appeal-card__comm_label appeal-card__label'>Комментарий:</span>
                    <span className='appeal-card__comm_value'>{appeal.latest_review.comment}</span>
                </div>
            </div>
            {appeal.status_code === 'Одобрена' ?
                <AppealOptions showHistory appealId={appeal.id} />
            : 
            appeal.status_code === 'Отклонена' ?
                <AppealOptions showDelete showHistory appealId={appeal.id} onDelete={onDelete} />
            :
                <AppealOptions showDelete showEdit showHistory appealId={appeal.id} onDelete={onDelete} />
            }
            
        </div>
    )
}

export default AppealCard