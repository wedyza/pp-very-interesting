import './../subcategoryCard/subcategoryCard.css'
import { Link } from 'react-router-dom';
import SelectButton from './../../selectButton/SelectButton'

function SubcategoryCard ({subcategory}) {
    return (
        <Link to='#'>
            <div className="subcategory-card card-blue">
                <h2 className="category-card__title">
                    {subcategory}
                </h2>
                    <SelectButton />
            </div>
        </Link>
    )
}

export default SubcategoryCard;