import Header from './../header/Header'
import './../createAppeal/createAppeal.css'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SelectList from '../selectList/SelectList'
import ImageUploader from '../imageUploader/ImageUploader'
import AddressPicker from '../addressPicker/AddressPicker'
import { API_URL } from '../../constants'

function CreateAppeal() {
    const accessToken = localStorage.getItem('accessToken');
    const location = useLocation();
    const { 
        categoryId: initialCategoryId, 
        categoryTitle: initialCategoryTitle,
        subcategoryTitle: initialSubcategory 
    } = location.state || {};
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId || '');
    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState(initialCategoryTitle || '');
    const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory || '');
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingSubcategories, setLoadingSubcategories] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategories(true);
            try {
                const response = await fetch(`${API_URL}/categories/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to load categories: ${response.statusText}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!selectedCategoryId) return;

        const fetchSubcategories = async () => {
            setLoadingSubcategories(true);
            try {
                const response = await fetch(`${API_URL}/categories/${selectedCategoryId}/subcategories/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to load subcategories: ${response.statusText}`);
                }
                const data = await response.json();
                setSubcategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingSubcategories(false);
            }
        };

        fetchSubcategories();
    }, [selectedCategoryId]);

    const handleCategoryChange = (categoryTitle) => {
        const category = categories.find((cat) => cat.title === categoryTitle);
        setSelectedCategoryId(category?.id || '');
        setSelectedCategoryTitle(categoryTitle);
        setSelectedSubcategory('');
    };

    if (loadingCategories) return <div>Loading categories...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='App'>
            <Header />
            <section className='page_content'>
                <h1 className='text-title'>Создание заявки</h1>
                <form className='create-appeal__form'>
                    <div className="appeal-form__title">
                        <h2 className='appeal-form__title_text'>Категории</h2>
                        <hr className='appeal-form__title_line' />
                    </div>
                    <div className="create-appeal__category">
                        <SelectList
                            options={categories.map((cat) => cat.title)}
                            value={selectedCategoryTitle}
                            onChange={(categoryTitle) => {
                                const category = categories.find((cat) => cat.title === categoryTitle);
                                setSelectedCategoryId(category?.id || '');
                                setSelectedSubcategory('');
                            }}
                            placeholder="Выберите категорию"
                        />
                        <SelectList
                            options={subcategories.map((sub) => sub.title)}
                            value={selectedSubcategory}
                            onChange={(subcategory) => setSelectedSubcategory(subcategory)}
                            placeholder="Выберите подкатегорию"
                        />
                    </div>
                    <div className="appeal-form__title appeal-form__info">
                        <h2 className='appeal-form__title_text'>Заполните обращение</h2>
                        <hr className='appeal-form__title_line' />
                    </div>
                    <div className="appeal-form__main">
                        <div className="appeal-form__item appeal-form__item-text">
                            <div className="appeal-form__item_label">
                                <div className="appeal-form__item_label-container">
                                    <span className="appeal-form__item_number">1</span>
                                    <div className="appeal-form__item_text">
                                        <p className="appeal-form__item_name">Тема</p>
                                        <p className="appeal-form__item_disc">Кратко опишите суть одной проблемы</p>
                                    </div>
                                </div>
                            </div>
                            <div className="appeal-form__input-container appeal-form__input-theme">
                                <textarea type="text" className='appeal-form__input_theme appeal-form__input' placeholder='Введите тему обращения' />
                            </div>                            
                        </div>
                        <div className="appeal-form__item appeal-form__item-text">
                            <div className="appeal-form__item_label">
                                <div className="appeal-form__item_label-container">
                                    <span className="appeal-form__item_number">2</span>
                                    <div className="appeal-form__item_text">
                                        <p className="appeal-form__item_name">Описание проблемы</p>
                                        <p className="appeal-form__item_disc">Кратко опишите суть одной проблемы</p>
                                    </div>
                                </div>                                
                            </div>
                            <div className="appeal-form__input-container">
                                <textarea type="text" className='appeal-form__input_disc appeal-form__input' placeholder='Подробности...' />
                            </div>                            
                        </div>
                        <div className="appeal-form__item">
                            <div className="appeal-form__item_label">
                                <div className="appeal-form__item_label-container">
                                    <span className="appeal-form__item_number">3</span>
                                    <div className="appeal-form__item_text">
                                        <p className="appeal-form__item_name">Местоположение</p>
                                        <p className="appeal-form__item_disc">Выберите точку на карте или введите адрес</p>
                                    </div>
                                </div>                                
                            </div>
                            <AddressPicker />
                        </div>
                        <div className="appeal-form__item">
                            <div className="appeal-form__item_label">
                                <div className="appeal-form__item_label-container">
                                    <span className="appeal-form__item_number">4</span>
                                    <div className="appeal-form__item_text">
                                        <p className="appeal-form__item_name">Фотографии</p>
                                        <p className="appeal-form__item_disc">До 5-и фотографий jpg, jpeg, png, tif, tiff, pdf общим размером не более 15 Мб</p>
                                    </div>
                                </div>                                
                            </div>
                            <div className="appeal-form__images">
                                <ImageUploader/>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='appeal-form_button'>Отправить на модерацию</button>
                </form>
            </section>
        </div>
    )
}

export default CreateAppeal;
