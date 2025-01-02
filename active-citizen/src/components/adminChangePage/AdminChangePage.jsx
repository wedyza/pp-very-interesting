import AdminChangeItem from '../adminChangeItem/AdminChangeItem';
import './adminChangePage.css';
import React, { useEffect, useState } from 'react';
import Search from '../search/Search';
import { API_URL } from '../../constants';
import DateDisplay from '../dateDisplay/DateDisplay';
import Modal from '../modal/Modal';
import SelectList from '../selectList/SelectList';

function AdminChangePage({ id }) {
    const isModerator = id === 'moderators';
    const accessToken = localStorage.getItem('accessToken');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [editingTitleId, setEditingTitleId] = useState(null);
    const [editingDescriptionId, setEditingDescriptionId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [formData, setFormData] = useState({ title: '', description: '', category: {title: '', id: 0}, moderator: null });

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleDelete = (deletedItemId) => {
        setFilteredItems((prevItems) => prevItems.filter(item => item.id !== deletedItemId));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${id === 'moderators' ? `${API_URL}/users/?is_staff=1` : `${API_URL}/admin_section/${id}/`}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const data = await response.json();
                setItems(data);
                setFilteredItems(data);

                if (id !== 'moderators') {
                    const categoryResponse = await fetch(`${API_URL}/categories/`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });
                    setCategories(await categoryResponse.json());
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/users/?is_staff=0`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const result = await response.json();
                setUsers(result);
                setFilteredUsers(result);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        if (isModerator) {
            fetchUsers();
        }
        fetchData();
    }, [id]);

    const handleSearchResults = (results) => {
        setFilteredItems(results);
    };

    const handleTitleEditClick = (itemId, currentTitle) => {
        setEditingTitleId(itemId);
        setEditedTitle(currentTitle);
    };

    const handleTitleSaveClick = async (itemId) => {
        try {
            const response = await fetch(`${API_URL}/admin_section/${id}/${itemId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ title: editedTitle }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            setFilteredItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === itemId ? { ...item, title: editedTitle } : item
                )
            );
            setEditingTitleId(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDescriptionEditClick = (itemId, currentDescription) => {
        setEditingDescriptionId(itemId);
        setEditedDescription(currentDescription);
    };

    const handleDescriptionSaveClick = async (itemId) => {
        try {
            const response = await fetch(`${API_URL}/admin_section/${id}/${itemId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ description: editedDescription }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            setFilteredItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === itemId ? { ...item, description: editedDescription } : item
                )
            );
            setEditingDescriptionId(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFormDataChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleSave = async () => {
        try {
            formData.category = formData.category.id;
            const body = id === 'moderators' ? {moderator: 1} : formData;
            const response = await fetch(`${API_URL}/${isModerator ? `users/${formData.moderator}/moderator_manage/` : `admin_section/${id}/`}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) throw new Error('Error saving item');
            const newItem = await response.json();
            setItems((prevItems) => [newItem, ...prevItems]);
            setFilteredItems((prevItems) => [newItem, ...prevItems]);
            closeModal();
            setFormData({ title: '', description: '', category: { title: '', id: 0 }, moderator: null });
        } catch (error) {
            console.error(error);
        }
    };

    const handleUsersSearchResults = (results) => {
        setFilteredUsers(results);
    };

    return (
        <div className='admin_change-page'>
            <div className='admin_change-page__header'>
                <Search 
                    list={items}
                    onResults={handleSearchResults}
                    placeholder={'Начните искать'} 
                />
                <button className='admin_change-page__add' onClick={openModal}>Добавить</button>
            </div>
            <ul className='admin-change_list'>
                {filteredItems.map((item) => (
                    <li key={item.id} className="admin-change_item">
                        <AdminChangeItem id={id} itemId={item.id} onDelete={handleDelete}>
                            <div className="change_item-card__info change_item-card__title">
                                <div className='change_item-card__label'>
                                    {isModerator ? 'ФИО' : 'Название'}:
                                </div>
                                <div className='change_item-card__value change_item-card__value-title'>
                                    {editingTitleId === item.id ? (
                                        <input
                                            type="text"
                                            value={editedTitle}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                            className="change_item-card__input"
                                        />
                                    ) : (
                                        isModerator
                                            ? `${item.last_name || ''} ${item.first_name || ''} ${item.given_name || ''}`
                                            : item.title
                                    )}
                                </div>
                                {!isModerator && 
                                    <button
                                        className="change_item-card__button"
                                        onClick={() =>
                                            editingTitleId === item.id
                                                ? handleTitleSaveClick(item.id)
                                                : handleTitleEditClick(item.id, item.title)
                                        }
                                    >
                                        {editingTitleId === item.id ? 
                                            'Сохранить' 
                                        :
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.3632 3.65156L13.8431 2.17157C14.6242 1.39052 15.8905 1.39052 16.6716 2.17157L18.0858 3.58579C18.8668 4.36683 18.8668 5.63316 18.0858 6.41421L16.6058 7.8942M12.3632 3.65156L2.74749 13.2672C2.41542 13.5993 2.21079 14.0376 2.16947 14.5054L1.92738 17.2459C1.87261 17.8659 2.39148 18.3848 3.0115 18.33L5.75191 18.0879C6.21972 18.0466 6.65806 17.8419 6.99013 17.5099L16.6058 7.8942M12.3632 3.65156L16.6058 7.8942" stroke="#656368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>                                        
                                        }
                                    </button>
                                }
                            </div>
                            {!isModerator &&
                                <div className="change_item-card__info change_item-card__description">
                                    <div className='change_item-card__label'>
                                        Описание:
                                    </div>
                                    <div className='change_item-card__value change_item-card__value-description'>
                                        {editingDescriptionId === item.id ? (
                                            <input
                                                value={editedDescription}
                                                onChange={(e) => setEditedDescription(e.target.value)}
                                                className="change_item-card__textarea"
                                            />
                                        ) : (
                                            item.description
                                        )}
                                    </div>
                                    <button
                                        className="change_item-card__button"
                                        onClick={() =>
                                            editingDescriptionId === item.id
                                                ? handleDescriptionSaveClick(item.id)
                                                : handleDescriptionEditClick(item.id, item.description)
                                        }
                                    >
                                        {editingDescriptionId === item.id ? 
                                            'Сохранить' 
                                        :
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.3632 3.65156L13.8431 2.17157C14.6242 1.39052 15.8905 1.39052 16.6716 2.17157L18.0858 3.58579C18.8668 4.36683 18.8668 5.63316 18.0858 6.41421L16.6058 7.8942M12.3632 3.65156L2.74749 13.2672C2.41542 13.5993 2.21079 14.0376 2.16947 14.5054L1.92738 17.2459C1.87261 17.8659 2.39148 18.3848 3.0115 18.33L5.75191 18.0879C6.21972 18.0466 6.65806 17.8419 6.99013 17.5099L16.6058 7.8942M12.3632 3.65156L16.6058 7.8942" stroke="#656368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>                                        
                                        }
                                    </button>
                                </div>
                            }
                            {isModerator && 
                                <div className="change_item-card__info">
                                    <div className='change_item-card__label'>
                                        Номер телефона:
                                    </div>
                                    <div className='change_item-card__value'>
                                        {item.phone_number}
                                    </div>
                                </div>
                            }
                            {id === "subcategories" && 
                                <div className="change_item-card__info">
                                    <div className='change_item-card__label'>
                                    К какой категории относится:
                                    </div>
                                    <div className='change_item-card__value'>
                                        {item.category.title}
                                    </div>
                                </div>
                            }
                            {!isModerator &&
                                <div className="change_item-card__info">
                                    <div className='change_item-card__label'>
                                        Кто добавил:
                                    </div>
                                    <div className='change_item-card__value'>
                                        {item.created_by && `${item.created_by.first_name} ${item.created_by.last_name}`}
                                    </div>
                                </div>
                            }
                            {!isModerator &&
                                <div className="change_item-card__info">
                                    <div className='change_item-card__label'>
                                        Дата добавления:
                                    </div>
                                    <div className='change_item-card__value'>
                                        <DateDisplay isoDate={item.created_at} />
                                    </div>
                                </div>
                            }
                        </AdminChangeItem>
                    </li>
                ))}
            </ul>
            <Modal isOpen={isModalOpen} onClose={closeModal} modalClass="admin-modal">
                <h2 className='admin-modal__title'>Создать {isModerator ? 'модератора' : id === 'categories' ? 'категорию' : 'подкатегорию'}</h2>
                <div className='admin-modal__form'>
                    {!isModerator && (
                        <>
                        {id === 'subcategories' && (
                            <div className="admin-modal_item">
                                <span className='admin-modal_label'>Категория:</span>                                    
                                <SelectList
                                    options={categories.map((cat) => ({
                                        id: cat.id,
                                        name: cat.title,
                                    }))}
                                    value={formData.category.name}
                                    onChange={(option) => handleFormDataChange('category', option)}
                                    placeholder='Выберите категорию'
                                />
                            </div>
                        )}
                            <div className="admin-modal_item">
                                <span className='admin-modal_label'>Название:</span>
                                <input
                                    type='text'
                                    value={formData.title}
                                    onChange={(e) => handleFormDataChange('title', e.target.value)}
                                    className='admin-modal_input'
                                />
                            </div>
                            <div className="admin-modal_item">
                                <span className='admin-modal_label'>Описание:</span>
                                <input
                                    value={formData.description}
                                    onChange={(e) => handleFormDataChange('description', e.target.value)}
                                    className='admin-modal_input'
                                />
                            </div>
                        </>
                    )}
                    {isModerator && (
                        <div className='admin-search'>
                            <Search
                                list={users}
                                onResults={handleUsersSearchResults}
                                placeholder='Найти пользователя...'
                            />
                            <div className="moderator-list_container">
                                <ul className='moderator-list'>
                                    {filteredUsers.map((user) => (
                                        <li key={user.id} className='moderator-item'>
                                            <span>{`${user.first_name} ${user.last_name}`}</span>
                                            <button
                                                className={`moderator-list_select ${formData.moderator === user.id ? 'moderator-list_selected' : ''}`}
                                                onClick={() =>
                                                    handleFormDataChange(
                                                        'moderator',
                                                        formData.moderator === user.id ? null : user.id
                                                    )
                                                }
                                            >
                                                {formData.moderator === user.id ? 'Выбрано' : 'Выбрать'}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    <button onClick={handleSave} className='admin_save-button'>
                        Сохранить
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default AdminChangePage;
