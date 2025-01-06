import { Link } from 'react-router-dom'
import './adminChangeCard.css'

function AdminChangeCard ({title, desc, id}) {
    return (
        <div className='change-card'>
            <div className="change-card_text">
                <h2 className='change-card_title'>{title}</h2>
                <p className='change-card_desc'>{desc}</p>
            </div>
            <Link to={`/admin-${id}`} className='change-card_open-container'>
                <div className='change-card_open'>Изменить</div>
            </Link>
        </div>
    )
}

export default AdminChangeCard