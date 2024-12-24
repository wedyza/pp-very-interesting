import './moderatorAppeal.css'
import { Link } from 'react-router-dom'

function ModeratorAppeal ( {appeal} ) {
    const datetime = new Date(appeal.created_at);
    const date = `${String(datetime.getDate()).padStart(2, '0')}.${String(datetime.getMonth() + 1).padStart(2, '0')}.${datetime.getFullYear()}`;
    const time = `${String(datetime.getHours()).padStart(2, '0')}:${String(datetime.getMinutes()).padStart(2, '0')}`;

    return (
        <div className='moderator-appeal'>
            <div className="moderator-appeal_header">
                <span className='moderator-appeal_id'>{`№ ${appeal.id}`}</span>
                <span className='moderator-appeal_status'>{appeal.status_code.title}</span>
            </div>
            <div className="moderator-appeal_info">
                <div className="moderator-appeal_info__first">
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Тема:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {appeal.title}
                        </p>
                    </div>
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Категория:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {appeal.category}
                        </p>
                    </div>
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Подкатегория:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {appeal.subcategory}
                        </p>
                    </div>
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Автор:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {`${appeal.user.first_name} ${appeal.user.last_name} ${appeal.user.given_name || ''}`}
                        </p>
                    </div>
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Рейтинг пользователя:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {appeal.user.rating}
                        </p>
                    </div>
                </div>
                <div className="moderator-appeal_info__second">
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Номер проверки:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {appeal.reviews_count}
                        </p>
                    </div>
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Время заявки:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {time}
                        </p>
                    </div>
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Дата заявки:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {date}
                        </p>
                    </div>
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Комментарий:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {appeal.latest_review.comment || '-'}
                        </p>
                    </div>
                </div>
            </div>
            <Link to={`/moderator-appeal/${appeal.id}`}>
                <div className="moderator-appeal_open">
                    Проверить заявку
                </div>
            </Link>
        </div>
    )
}

export default ModeratorAppeal