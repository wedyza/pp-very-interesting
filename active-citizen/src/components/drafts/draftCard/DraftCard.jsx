import './../draftCard/draftCard.css'
import AppealOptions from '../../appealOptions/AppealOptions'

function DraftCard ({draft, onDelete}) {
    const datetime = new Date(draft.created_at);
    const date = `${String(datetime.getDate()).padStart(2, '0')}.${String(datetime.getMonth() + 1).padStart(2, '0')}.${datetime.getFullYear()}`;
    const time = `${String(datetime.getHours()).padStart(2, '0')}:${String(datetime.getMinutes()).padStart(2, '0')}`;

    return (
        <div className="draft-card">
            <h2 className="draft-card__title appeal-title">
                {draft.title}
            </h2>
            <div className="draft-card__datetime">
                <div className="draft-card__date">
                    <span className="draft-card__date_label draft-card__datetime_label">
                        Когда
                    </span>
                    <span className="draft-card__date_value draft-card__datetime_value">
                        {date}
                    </span>
                </div>
                <div className="draft-card__time">
                    <span className="draft-card__time_label draft-card__datetime_label">
                        Во сколько
                    </span>
                    <span className="draft-card__time_value draft-card__datetime_value">
                        {time}
                    </span>
                </div>
            </div>
            <AppealOptions showDelete showEdit appealId={draft.id} onDelete={onDelete} />
        </div>
    )
}

export default DraftCard;