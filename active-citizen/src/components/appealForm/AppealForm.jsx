import './appealForm.css'
import { useState, useEffect, useRef } from 'react'
import SelectList from '../../components/selectList/SelectList'
import ImageUploader from '../../components/imageUploader/ImageUploader'
import AddressPicker from '../../components/addressPicker/AddressPicker'
import { API_URL } from '../../constants'
import { useNavigate, useLocation } from 'react-router-dom'

function AppealForm({openModal, mainAction, draftAction, initialData = {}, appealId}) {
    const navigate = useNavigate();
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
    const [selectedCategoryId, setSelectedCategoryId] = useState(initialData.category?.id ||initialCategoryId || '');
    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState(initialData.category?.title || initialCategoryTitle || '');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(initialData.subcategory?.id || initialSubcategoryId || '');
    const [selectedSubcategory, setSelectedSubcategory] = useState(initialData.subcategory?.title || initialSubcategory || '');
    const [error, setError] = useState(null);
    const [latitude, setLatitude] = useState(initialData.latitude ? Number(initialData.latitude) : null);
    const [longtitude, setlongtitude] = useState(initialData.longtitude ? Number(initialData.longtitude) : null);
    const [images, setImages] = useState(initialData.media || []);
    const [deletedImages, setDeletedImages] = useState([]);

    const titleRef = useRef();
    const bodyRef = useRef();

    useEffect(() => {
        if (initialData.title) titleRef.current.value = initialData.title;
        if (initialData.body) bodyRef.current.value = initialData.body;
    }, [initialData]);

    const saveDraft = async () => {
        const title = titleRef.current?.value || '';
        const body = bodyRef.current?.value || '';

        if (!title && draftAction=='POST') {
            return;
        }

        const draftData = new FormData();
        draftData.append('title', title || null);        
        if (body) {
            draftData.append('body', body);
        }
        if (latitude !== null && latitude !== undefined) {
            draftData.append('latitude', parseFloat(latitude.toFixed(6)));
        }
        if (longtitude !== null && longtitude !== undefined) {
            draftData.append('longtitude', parseFloat(longtitude.toFixed(6)));
        }
        if (selectedCategoryId !== null && selectedCategoryId !== undefined) {
            draftData.append('category', selectedCategoryId);
        }
        if (selectedSubcategoryId !== null && selectedSubcategoryId !== undefined) {
            draftData.append('subcategory', selectedSubcategoryId);
        }
        draftData.append('draft', 1);
    
        images.forEach((image) => {
            if (image.file) {
                draftData.append('media', image.file);
            }
        });

        console.log(deletedImages)

        try {
            await fetch(`${API_URL}/tickets/${draftAction === 'PATCH' ? `${appealId}/` : ''}`, {
                method: draftAction,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: draftData,
            });
        } catch (err) {
            console.error('Ошибка при сохранении черновика:', err);
        }
    };

    const handleSubmitDraft = async (e) => {
        e.preventDefault();
        saveDraft();
        navigate('/');

    }

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
        if (mainAction === "POST" || draftAction === "PATCH") {
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
        }
    
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            formData.append('latitude', parseFloat(latitude.toFixed(6)));
            formData.append('longtitude', parseFloat(longtitude.toFixed(6)));
            formData.append('category', selectedCategoryId);
            formData.append('subcategory', selectedSubcategoryId);
    
            if (draftAction === 'PATCH') {
                formData.append('draft', 0);
            }
    
            images.forEach((image) => {
                if (image.file) {
                    formData.append('media', image.file);
                }
            });    
    
            const response = await fetch(`${API_URL}/tickets/${appealId || ''}${mainAction === 'PATCH' ? '/' : ''}`, {
                method: mainAction,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.detail || 'Ошибка при создании заявки.');
                return;
            }

            if (deletedImages.length > 0 && appealId) {
                const deleteResponse = await fetch(`${API_URL}/tickets/${appealId}/delete_media/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ media: deletedImages }),
                });
    
                if (!deleteResponse.ok) {
                    const deleteErrorData = await deleteResponse.json();
                    console.error('Ошибка при удалении изображений:', deleteErrorData);
                }
            }
    
            openModal();
        } catch (err) {
            setError('Ошибка при отправке данных на сервер.');
            console.error('Ошибка:', err);
        }
    };

    
    useEffect(() => {
        if (!draftAction) return;
        const handleBeforeUnload = (event) => {
            saveDraft();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [saveDraft]);

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

    const handleAddressChange = (newAddress) => {
        setLatitude(newAddress.latitude);
        setlongtitude(newAddress.longtitude);
    };
    

    return (
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
                    <AddressPicker
                        onAddressChange={handleAddressChange}
                        initialCoords={initialData.latitude && initialData.longtitude ? [initialData.latitude, initialData.longtitude] : null}
                    />
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
                        <ImageUploader images={images} setImages={setImages} setDeletedImages={setDeletedImages} />
                    </div>
                </div>
            </div>
            {error && <div>{error}</div>}
            <div className="appeal-form_buttons">
                <button type='submit' className='appeal-form_button' onClick={handleSubmit}>Отправить на модерацию</button>
                {draftAction &&
                    <button type='submit' className='appeal-form_button_draft' onClick={handleSubmitDraft}>Сохранить черновик</button>
                }
            </div>
        </form>
    );
}

export default AppealForm;