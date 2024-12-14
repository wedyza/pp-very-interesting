import Header from '../../components/header/Header'
import './createAppeal.css'
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import SelectList from '../../components/selectList/SelectList'
import ImageUploader from '../../components/imageUploader/ImageUploader'
import AddressPicker from '../../components/addressPicker/AddressPicker'
import { API_URL } from '../../constants'
import Modal from '../../components/modal/Modal'
import { useNavigate } from 'react-router-dom'

function CreateAppeal() {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        navigate('/');
        window.scrollTo(0, 0);
    };
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
    const [latitude, setLatitude] = useState(null);
    const [longtitude, setlongtitude] = useState(null);


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
            setError('Укажите тему обращения.');
            return;
        }
        if (!body) {
            setError('Укажите описание проблемы.');
            return;
        }
        if (!latitude || !longtitude) {
            setError('Выберите местоположение.');
            return;
        }
        if (!selectedCategoryId) {
            setError('Выберите категорию.');
            return;
        }
        if (!selectedSubcategoryId) {
            setError('Выберите подкатегорию.');
            return;
        }

        const roundedLatitude = parseFloat(latitude.toFixed(6));
        const roundedlongtitude = parseFloat(longtitude.toFixed(6));
    
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
                    latitude: roundedLatitude,
                    longtitude: roundedlongtitude,
                    category: selectedCategoryId,
                    subcategory: selectedSubcategoryId,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.detail || 'Ошибка при создании заявки.');
                return;
            }
            openModal();
        } catch (err) {
            setError('Ошибка при отправке данных на сервер.');
        }
    };

    const handleAddressChange = (newAddress) => {
        setLatitude(newAddress.latitude);
        setlongtitude(newAddress.longtitude);
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
                            <AddressPicker onAddressChange={handleAddressChange} />
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
            <Modal isOpen={isModalOpen} onClose={closeModal} modalClass='appeal_modal'>
                <svg width="54" height="55" viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M27 0.625C12.1573 0.625 0.125 12.6573 0.125 27.5C0.125 42.3427 12.1573 54.375 27 54.375C41.8427 54.375 53.875 42.3427 53.875 27.5C53.875 12.6573 41.8427 0.625 27 0.625ZM15.8261 27.4242C15.0939 26.6919 13.9067 26.6919 13.1745 27.4242C12.4422 28.1564 12.4422 29.3436 13.1745 30.0758L20.6745 37.5758C21.4067 38.3081 22.5939 38.3081 23.3261 37.5758L40.8261 20.0758C41.5583 19.3436 41.5583 18.1564 40.8261 17.4242C40.0939 16.6919 38.9067 16.6919 38.1745 17.4242L22.0003 33.5983L15.8261 27.4242Z" fill="#349C0E"/>
                </svg>
                <p>Обращение отправлено</p>
            </Modal>
        </div>
    );
}

export default CreateAppeal;