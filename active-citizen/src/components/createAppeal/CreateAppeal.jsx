import Header from './../header/Header'
import './../createAppeal/createAppeal.css'
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
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
        subcategoryTitle: initialSubcategory,
        subcategoryId: initialSubcategoryId
    } = location.state || {};
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId || '');
    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState(initialCategoryTitle || '');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(initialSubcategoryId || '');
    const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory || '');
    const [error, setError] = useState(null);
    const [address, setAddress] = useState('');

    const titleRef = useRef();
    const bodyRef = useRef();

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
                    throw new Error(`Failed to load categories: ${response.statusText}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCategories();
    }, [accessToken]);

    useEffect(() => {
        if (!selectedCategoryId) return;

        const fetchSubcategories = async () => {
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
            }
        };

        fetchSubcategories();
    }, [selectedCategoryId, accessToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        const title = titleRef.current.value;
        const body = bodyRef.current.value;
    
        if (!title) {
            setError((x) => x+'title');
            return;
        } 
        if (!body) {
            setError('body');
            return;
        }
        if (!address) {
            setError('address');
            return;
        }
        if (!selectedCategoryId) {
            setError('selectedCategoryId');
            return;
        }
        if (!selectedSubcategoryId) {
            setError('selectedSubcategoryId');
            return;
        }
    
        try {
            const response = await fetch(`${API_URL}/tickets/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    title,
                    body,
                    address,
                    category: selectedCategoryId,
                    subcategory: selectedSubcategoryId,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.detail || 'Ошибка при создании заявки.');
                return;
            }
    
            alert('Заявка успешно создана!');
        } catch (err) {
            setError('Ошибка при отправке данных на сервер.');
        }
    };

    return (
        <div className='App'>
            <Header />
            <section className='page_content'>
                <h1 className='text-title'>Создание заявки</h1>
                <form className='create-appeal__form' onSubmit={handleSubmit}>
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
                                setSelectedCategoryTitle(categoryTitle);
                                setSelectedSubcategory('');
                                setSelectedSubcategoryId('');
                            }}
                            placeholder="Выберите категорию"
                        />
                        <SelectList
                            options={subcategories.map((sub) => sub.title)}
                            value={selectedSubcategory}
                            onChange={(subcategoryTitle) => {
                                const subcategory = subcategories.find((sub) => sub.title === subcategoryTitle);
                                setSelectedSubcategoryId(subcategory?.id || '');
                                setSelectedSubcategory(subcategoryTitle);
                            }}
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
                                <textarea
                                    ref={titleRef}
                                    type="text"
                                    className='appeal-form__input_theme appeal-form__input'
                                    placeholder='Введите тему обращения'
                                />
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
                                <textarea
                                    ref={bodyRef}
                                    type="text"
                                    className='appeal-form__input_disc appeal-form__input'
                                    placeholder='Подробности...'
                                />
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
                            <AddressPicker onAddressChange={setAddress} />
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
                    {error && <div>{error}</div>}
                    <button type='submit' className='appeal-form_button'>Отправить на модерацию</button>
                </form>
            </section>
        </div>
    );
}

export default CreateAppeal;
