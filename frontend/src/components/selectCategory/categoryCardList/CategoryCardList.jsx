import './../categoryCardList/categoryCardList.css'
import CategoryCard from './categoryCard/CategoryCard'

function CategoryCardList ({ categories }) {

    return (
        <ul className="category-list cards-list">
            {categories.map((category) => (
                <li key={category.id} className="category-list__item">
                    <CategoryCard category={category} />
                </li>
            ))}
        </ul>
    )
}

export default CategoryCardList;