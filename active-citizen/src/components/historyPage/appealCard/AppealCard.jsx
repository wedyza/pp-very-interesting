import './appealCard.css'
import AppealOptions from '../../appealOptions/AppealOptions'
import icon from '../../../img/community.svg'

function AppealCard ({appeal}) {
    const statusConfig = {
        'Принято': {
            textClass: 'status_accepted'
        },
        'Отклонено': {
            textClass: 'status_rejected'
        },
        'На проверке': {
            textClass: 'status_checking'
        }
    };
    const { textClass } = statusConfig[appeal.status] || {};

    return (
        <div className='history__appeal-card'>
            <div className='appeal-card__icon'><img src={icon} /></div>
            <div className="appeal-card__info">
                <div className="appeal-card__info_main">
                    <div className='appeal-card__title'><span>{appeal.title}</span></div>
                    <span className='appeal-card__datetime'>{appeal.datetime}</span>
                </div>
                <div className='appeal-card__status'>
                    <span className='appeal-card__status_label appeal-card__label'>Статус:</span>
                    <span className={`appeal-card__status_value ${textClass}`}>{appeal.status}</span>
                </div>
                <div className='appeal-card__comm'>
                    <span className='appeal-card__comm_label appeal-card__label'>Комментарий:</span>
                    <span className='appeal-card__comm_value'>{appeal.comment}</span>
                </div>
            </div>     
            <AppealOptions />
        </div>
    )
}

export default AppealCard