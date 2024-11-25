import Header from './../header/Header'
import BackButton from './../backButton/BackButton'
import SubcategoryCard from './subcategoryCard/SubcategoryCard'
import './../categoryPage/categoryPage.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Search from '../search/Search';


function CategoryPage () {
    const { categoryId } = useParams();
    const categoryContent = [
        {id: 'community', title: 'Развитие социальной среды', subcategories: [{title: 'Плохая организация работы соц служб', desc: 'описание 1'}, {title: 'Сообщение  о плачевном состоянии общественных пространств', desc: 'описание 2'}], desc: 'Поддержка культурных и образовательных инициатив.'},
        {id: 'ecology', title: 'Экологические проблемы', subcategories: [{title: 'aaa', desc: 'описание a'}, {title: 'bbb', desc: 'описание b'}], desc: 'ccc'},
    ];
    const content = categoryContent.find((category) => category.id === categoryId);
    const [filteredCategories, setFilteredCategories] = useState(content.subcategories);
    const handleSearchResults = (results) => {
        setFilteredCategories(results);
    };
    
    return (
        <div className='App'>
            <Header />

            <section className='page_content'>
                <Link to={'/'}>
                    <BackButton />
                </Link>
                <div className="select-subcategory__head select-category__head">
                    <div className="select-subcategory__text">
                        <h1 className="select-subcategory_title text-title">
                            {content.title}
                        </h1>
                        <span className="select-subcategory_desc description-text">
                            Выберете подкатегорию для вашего обращения
                        </span>
                    </div>
                    <Search
                        list={content.subcategories}
                        onResults={handleSearchResults}
                        placeholder="Начните искать категорию"
                    />
                </div>
                <ul className="subcategory-list cards-list">
                    {filteredCategories.map((subcategory, index) => (
                        <li key={index} className="subcategory-list__item">
                            <SubcategoryCard subcategory={subcategory} categoryId={categoryId} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default CategoryPage;