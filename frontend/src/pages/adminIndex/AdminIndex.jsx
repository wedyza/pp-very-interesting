import './adminIndex.css'
import Header from '../../components/header/Header'
import React from 'react'
import AdminChangeCard from '../../components/adminChangeCard/AdminChangeCard'

function AdminIndex () {
    return (
        <div className='App app_moderator'>
            <Header />
            <section className='page_content admin_page'>
                <h1 className='text-title'>Изменение</h1>
                <div className="admin_change">
                    <AdminChangeCard title='Категории' desc='Добавление и удаление категорий' id='categories' />
                    <AdminChangeCard title='Подкатегории' desc='Добавление и удаление подкатегорий' id='subcategories' />
                    <AdminChangeCard title='Модераторы' desc='Добавление и удаление модераторов' id='moderators' />
                </div>
            </section>
        </div>
    )
}

export default AdminIndex