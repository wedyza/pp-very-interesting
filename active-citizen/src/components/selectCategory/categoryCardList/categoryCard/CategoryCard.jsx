import './categoryCard.css'
import community from './../../../../img/community.svg'
import { Link } from 'react-router-dom'
import SelectButton from './../../../selectButton/SelectButton'
import { API_URL } from '../../../../constants'

function CategoryCard ({category}) {
    return (
        <Link to={`/category/${category.id}`}>
            <div className="category-card card-blue">
                <div className="category-card__img">
                    <img src={API_URL + category.source_url} />
                </div>
                <div className="category-card__text">
                    <h2 className="category-card__title">
                        {category.title}
                    </h2>
                    <span className="category-card__disc">
                        {category.description}
                    </span>
                </div>
                <SelectButton /> 
            </div>
        </Link>
    )
}

export default CategoryCard;