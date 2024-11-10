import './../categoryCardList/categoryCardList.css'
import CategoryCard from './categoryCard/CategoryCard'

function CategoryCardList () {

    const categoryContent = [
        {id: 'community', title: 'Развитие социальной среды', subcategories: ['Плохая организация работы соц служб', 'Сообщение  о плачевном состоянии общественных пространств']},
        {id: 'ecology', title: 'Экологические проблемы', subcategories: ['aaa', 'bbb']},
    ];
    const categories = Object.values(categoryContent);

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