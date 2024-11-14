import './../draftCard/draftCard.css'
import AppealOptions from '../../appealOptions/AppealOptions'

function DraftCard ({draft}) {
    const datetime = draft.datetime.split(', '); 
    const date = datetime[0]; 
    const time = datetime[1]; 

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
                        {time}
                    </span>
                </div>
                <div className="draft-card__time">
                    <span className="draft-card__time_label draft-card__datetime_label">
                        Во сколько
                    </span>
                    <span className="draft-card__time_value draft-card__datetime_value">
                        {date}
                    </span>
                </div>
            </div>
            <AppealOptions />
        </div>
    )
}

export default DraftCard;