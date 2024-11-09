import './../subcategoryCard/subcategoryCard.css'
import { Link } from 'react-router-dom';
import SelectButton from './../../selectButton/SelectButton'

function SubcategoryCard ({subcategory}) {
    console.log(subcategory);
    return (
        <div className="subcategory-card card-violet">
            <h2 className="subcategory-card__title">
                {subcategory}
            </h2>
            <Link to='#'>
                <SelectButton />
            </Link>
        </div>
    )
}

export default SubcategoryCard;