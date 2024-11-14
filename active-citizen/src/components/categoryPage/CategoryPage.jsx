import Header from './../header/Header'
import BackButton from './../backButton/BackButton'
import SubcategoryCard from './subcategoryCard/SubcategoryCard'
import './../categoryPage/categoryPage.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function CategoryPage () {
    const { categoryId } = useParams();
    const categoryContent = [
        {id: 'community', title: 'Развитие социальной среды', subcategories: ['Плохая организация работы соц служб', 'Сообщение  о плачевном состоянии общественных пространств']},
        {id: 'ecology', title: 'Экологические проблемы', subcategories: ['aaa', 'bbb']},
    ];
    const content = categoryContent.find((category) => category.id === categoryId);
    
    return (
        <div className='App'>
            <Header />

            <section className='page_content'>
                <Link to={'/'}>
                    <BackButton />
                </Link>
                <h1 className="select-subcategory_title text-title">{content.title}</h1>
                <span className="select-subcategory_desc description-text">Выберете подкатегорию для вашего обращения</span>
            
                <ul className="subcategory-list cards-list">
                    {content.subcategories.map((subcategory, index) => (
                        <li key={index} className="subcategory-list__item">
                            <SubcategoryCard subcategory={subcategory} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default CategoryPage;