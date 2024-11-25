import { useNavigate } from 'react-router-dom';
import './../subcategoryCard/subcategoryCard.css';
import SelectButton from './../../selectButton/SelectButton';

function SubcategoryCard({ subcategory, categoryId }) {
    const navigate = useNavigate();

    const handleSelect = () => {
        navigate('/create-appeal', {
            state: {
                categoryId,
                subcategory,
            },
        });
    };

    return (
        <div className="category-card subcategory-card card-blue" onClick={handleSelect}>
            <h2 className="category-card__title">{subcategory.title}</h2>
            <span className="category-card__disc">{subcategory.desc}</span>
            <SelectButton />
        </div>
    );
}

export default SubcategoryCard;
