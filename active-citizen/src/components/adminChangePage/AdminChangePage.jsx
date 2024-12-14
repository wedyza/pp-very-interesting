import AdminChangeItem from '../adminChangeItem/AdminChangeItem'
import './adminChangePage.css'
import React, { useEffect, useState } from 'react'
import Search from '../search/Search'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../../constants'

function AdminChangePage ({id}) {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [error, setError] = useState(null);

    const handleDelete = (deletedItemId) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== deletedItemId));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setItems(data);
                setFilteredItems(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCategories();
    }, []);

    const handleSearchResults = (results) => {
        setFilteredItems(results);
    };


    return (
        <div className='admin_change-page'>
            <div className='admin_change-page__header'>
                <Search 
                    list={items}
                    onResults={handleSearchResults}
                    placeholder={'Начните искать'} 
                />
                <Link className='admin_change-page__add'>Добавить</Link>
            </div>
            <ul className='admin-change_list'>
                {filteredItems.map((item) => (
                    <li key={item.id} className="admin-change_item">
                        <AdminChangeItem id={id} itemId={item.id} onDelete={handleDelete}>
                            <div className="change_item-card__info">
                                <div className='change_item-card__label'>
                                    Название:
                                </div>
                                <div className='change_item-card__value'>
                                    {item.title}
                                </div>
                            </div>
                            <div className="change_item-card__info">
                                <div className='change_item-card__label'>
                                    Описание:
                                </div>
                                <div className='change_item-card__value'>
                                    {item.description}
                                </div>
                            </div>
                            <div className="change_item-card__info">
                                <div className='change_item-card__label'>
                                    Кто добавил:
                                </div>
                                <div className='change_item-card__value'>
                                    {'и правда)) а кто))'}
                                </div>
                            </div>
                            <div className="change_item-card__info">
                                <div className='change_item-card__label'>
                                    Дата добавления:
                                </div>
                                <div className='change_item-card__value'>
                                    {'точно раньше апи'}
                                </div>
                            </div>
                        </AdminChangeItem>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminChangePage