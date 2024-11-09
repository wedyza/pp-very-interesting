import './../categoryCard/categoryCard.css'
import community from './../../../../img/community.svg'
import { Link } from 'react-router-dom';
import SelectButton from './../../../selectButton/SelectButton'

function CategoryCard ({category}) {
    return (
        <div className="category-card card-violet">
            <div className="category-card__img">
                <img src={community} />
            </div>
            <h2 className="category-card__title">
                {category.title}
            </h2>
            <span className="category-card__disc">
                Поддержка культурных и образовательных инициатив.
            </span>
            <Link to={`/category/${category.id}`}>
                <SelectButton /> 
            </Link>
        </div>
    )
}

export default CategoryCard;