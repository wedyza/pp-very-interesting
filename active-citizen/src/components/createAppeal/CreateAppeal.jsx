import Header from './../header/Header'
import './../createAppeal/createAppeal.css'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import SelectList from '../selectList/SelectList';
import ImageUploader from '../imageUploader/ImageUploader';
import AddressPicker from '../addressPicker/AddressPicker';


function CreateAppeal () {
    const location = useLocation();
    const { categoryId, subcategory } = location.state || {};

    const [selectedCategory, setSelectedCategory] = useState(categoryId || '');
    const [selectedSubcategory, setSelectedSubcategory] = useState(subcategory?.title || '');

    const categories = [
        { id: 'community', title: 'Развитие социальной среды' },
        { id: 'ecology', title: 'Экологические проблемы' },
    ];

    const subcategories = {
        community: ['Плохая организация работы соц служб', 'Сообщение  о плачевном состоянии общественных пространств'],
        ecology: ['aaa', 'bbb'],
    };

    
    const getCategoryTitle = (id) => {
        const category = categories.find((cat) => cat.id === id);
        return category ? category.title : '';
    };

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
                            options={categories.map((c) => {return c.title})}
                            value={getCategoryTitle(selectedCategory)}
                            onChange={(categoryTitle) => {
                                const category = categories.find((c) => c.title === categoryTitle);
                                setSelectedCategory(category?.id || '');
                                setSelectedSubcategory('');
                            }}
                            placeholder={'Выберите категорию'}
                        />
                        <SelectList
                            options={(subcategories[selectedCategory] || [])}
                            value={selectedSubcategory}
                            onChange={(category) => {
                                setSelectedSubcategory(category);
                            }}
                            placeholder={'Выберите подкатегорию'}
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