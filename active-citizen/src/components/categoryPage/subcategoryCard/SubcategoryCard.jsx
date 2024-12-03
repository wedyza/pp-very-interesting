import { useNavigate } from 'react-router-dom'
import './../subcategoryCard/subcategoryCard.css'
import SelectButton from './../../selectButton/SelectButton'

function SubcategoryCard({ subcategory, categoryId, categoryTitle }) {
    const navigate = useNavigate();
    const subcategoryTitle = subcategory.title;

    const handleSelect = () => {
        navigate('/create-appeal', {
            state: {
                categoryId,
                subcategoryTitle,
                categoryTitle,
            },
        });
    };

    return (
        <div className="category-card subcategory-card card-blue" onClick={handleSelect}>
            <h2 className="category-card__title">{subcategory.title}</h2>
            <span className="category-card__disc">{subcategory.description}</span>
            <SelectButton />
        </div>
    );
}

export default SubcategoryCard;
