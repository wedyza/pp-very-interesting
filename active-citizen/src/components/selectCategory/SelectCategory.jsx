import './../selectCategory/selectCategory.css'
import CategoryCardList from './categoryCardList/CategoryCardList'
import Search from '../search/Search';
import { useState } from 'react';

function SelectCategory () {
    const categoryContent = [
        {id: 'community', title: 'Развитие социальной среды', subcategories: [{title: 'Плохая организация работы соц служб', desc: 'описание 1'}, {title: 'Сообщение  о плачевном состоянии общественных пространств', desc: 'описание 2'}], desc: 'Поддержка культурных и образовательных инициатив.'},
        {id: 'ecology', title: 'Экологические проблемы', subcategories: [{title: 'aaa', desc: 'описание a'}, {title: 'bbb', desc: 'описание b'}], desc: 'ccc'},
        {id: 'aa', title: 'Развитие социальной среды', subcategories: [{title: 'Плохая организация работы соц служб', desc: 'описание 1'}, {title: 'Сообщение  о плачевном состоянии общественных пространств', desc: 'описание 2'}], desc: 'Поддержка культурных и образовательных инициатив.'},
        {id: 'bb', title: 'Экологические проблемы', subcategories: [{title: 'aaa', desc: 'описание a'}, {title: 'bbb', desc: 'описание b'}], desc: 'ccc'},
        {id: 'cc', title: 'Развитие социальной среды', subcategories: [{title: 'Плохая организация работы соц служб', desc: 'описание 1'}, {title: 'Сообщение  о плачевном состоянии общественных пространств', desc: 'описание 2'}], desc: 'Поддержка культурных и образовательных инициатив.'},
        {id: 'dd', title: 'Экологические проблемы', subcategories: [{title: 'aaa', desc: 'описание a'}, {title: 'bbb', desc: 'описание b'}], desc: 'ccc'},
    ];
    const categories = Object.values(categoryContent);
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const handleSearchResults = (results) => {
        setFilteredCategories(results);
    };

    return (
        <div className="select-category">
            <div className="select-category__head">
                <div className="select-category__text">
                    <h1 className="select-category_title text-title">
                        Создайте новое обращение!
                    </h1>
                    <span className="select-category_desc description-text">
                        Начните создавать вашу заявку. 
                        Выберете категорию для вашего обращения
                    </span>
                </div>
                <Search
                    list={categories}
                    onResults={handleSearchResults}
                    placeholder="Начните искать категорию"
                />
            </div>
            <CategoryCardList categories={filteredCategories} />
        </div>
    )
}

export default SelectCategory;