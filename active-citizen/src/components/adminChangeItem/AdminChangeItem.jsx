import './adminChangeItem.css';
import React from 'react';
import { API_URL } from '../../constants';

function AdminChangeItem({ id, itemId, children, onDelete }) {
    const accessToken = localStorage.getItem('accessToken');
    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/${id}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении элемента');
            }

            if (onDelete) {
                onDelete(itemId);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    return (
        <div className='change_item-card'>
            {children}
            <button
                className='change_item-card__delete'
                onClick={handleDelete}
            >
                Удалить
            </button>
        </div>
    );
}

export default AdminChangeItem;
