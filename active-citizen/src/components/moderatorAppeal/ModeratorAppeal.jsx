import './moderatorAppeal.css'
import { Link } from 'react-router-dom'

function ModeratorAppeal ( {appeal} ) {
    return (
        <div className='moderator-appeal'>
            <div className="moderator-appeal_header">
                <span className='moderator-appeal_id'>{`№ ${appeal.id}`}</span>
                <span className='moderator-appeal_status'>{appeal.status}</span>
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
                            {appeal.user}
                        </p>
                    </div>
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Рейтинг пользователя:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {appeal.rating}
                        </p>
                    </div>
                </div>
                <div className="moderator-appeal_info__second">
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Номер проверки:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {appeal.current_number}
                        </p>
                    </div>
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Время заявки:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {appeal.time}
                        </p>
                    </div>
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Дата заявки:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {appeal.date}
                        </p>
                    </div>
                    <div className="moderator-appeal_info__item">
                        <p className="moderator-appeal_info__label">
                            Комментарий:
                        </p>
                        <p className="moderator-appeal_info__value">
                            {appeal.comment}
                        </p>
                    </div>
                </div>
            </div>
            <Link to={'#'}>
                <div className="moderator-appeal_open">
                    Проверить заявку
                </div>
            </Link>
        </div>
    )
}

export default ModeratorAppeal