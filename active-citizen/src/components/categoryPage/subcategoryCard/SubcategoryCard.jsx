import './../subcategoryCard/subcategoryCard.css'
import { Link } from 'react-router-dom';
import SelectButton from './../../selectButton/SelectButton'

function SubcategoryCard ({subcategory}) {
    return (
        <Link to='#'>
            <div className="category-card subcategory-card card-blue">
                <h2 className="category-card__title">
                    {subcategory.title}
                </h2>
                <span className="category-card__disc">
                    {subcategory.desc}
                </span>
                <SelectButton />
            </div>
        </Link>
    )
}

export default SubcategoryCard;