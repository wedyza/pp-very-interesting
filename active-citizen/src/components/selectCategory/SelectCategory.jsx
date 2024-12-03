import './../selectCategory/selectCategory.css'
import CategoryCardList from './categoryCardList/CategoryCardList'
import Search from '../search/Search'
import { useState, useEffect } from 'react'
import { API_URL } from '../../constants'

function SelectCategory() {
    const accessToken = localStorage.getItem('accessToken');
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/categories/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setCategories(data);
                setFilteredCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSearchResults = (results) => {
        setFilteredCategories(results);
    };

    if (loading) return <div>Loading categories...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="select-category">
            <div className="select-category__head">
                <div className="select-category__text">
                    <h1 className="select-category_title text-title">
                        Создайте новое обращение!
                    </h1>
                    <span className="select-category_desc description-text">
                        Начните создавать вашу заявку.
                        Выберите категорию для вашего обращения
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
    );
}

export default SelectCategory;
