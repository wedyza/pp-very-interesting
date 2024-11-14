import './../selectCategory/selectCategory.css'
import CategoryCardList from './categoryCardList/CategoryCardList'

function SelectCategory () {
    return (
        <div className="select-category">
            <h1 className="select-category_title text-title">
                Создайте новое обращение!
            </h1>
            <span className="select-category_desc description-text">
                Начните создавать вашу заявку. 
                Выберете категорию для вашего обращения
            </span>
            <CategoryCardList />
        </div>
    )
}

export default SelectCategory;