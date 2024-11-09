import './../drafts/drafts.css'
import DraftCard from './draftCard/DraftCard'

function Drafts () {
    return (
        <div className="drafts">
            <h1 className="drafts__title text-title">
                Черновики
            </h1>
            <ul className="drafts-list">
                <li className="draft-list__item">
                    <DraftCard />
                </li>
                <li className="draft-list__item">
                    <DraftCard />
                </li>
                <li className="draft-list__item">
                    <DraftCard />
                </li>
                <li className="draft-list__item">
                    <DraftCard />
                </li>
                <li className="draft-list__item">
                    <DraftCard />
                </li>
            </ul>
        </div>
    )
}

export default Drafts;