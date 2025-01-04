import Header from '../../components/header/Header'
import BackButton from '../../components/backButton/BackButton'
import './categoryPage.css'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Search from '../../components/search/Search'
import { API_URL } from '../../constants'
import SubcategoryCard from '../../components/subcategoryCard/SubcategoryCard'

function CategoryPage() {
    //const accessToken = localStorage.getItem('accessToken');
    const { categoryId } = useParams();
    const [subcategories, setSubcategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await fetch(`${API_URL}/categories/${categoryId}/subcategories/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setSubcategories(data);
                setFilteredSubcategories(data);
                setCategoryTitle(data[0].category.title);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchSubcategories();
    }, [categoryId]);

    const handleSearchResults = (results) => {
        setFilteredSubcategories(results);
    };

    if (error) return <div>{error}</div>;

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
                            {categoryTitle}
                        </h1>
                        <span className="select-subcategory_desc description-text">
                            Выберете подкатегорию для вашего обращения
                        </span>
                    </div>
                    <Search
                        list={subcategories}
                        onResults={handleSearchResults}
                        placeholder="Начните искать подкатегорию"
                    />
                </div>
                <ul className="subcategory-list cards-list">
                    {filteredSubcategories.map((subcategory, index) => (
                        <li key={index} className="subcategory-list__item">
                            <SubcategoryCard subcategory={subcategory} categoryId={categoryId} categoryTitle={categoryTitle} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default CategoryPage;
