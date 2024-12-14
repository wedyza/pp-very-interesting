import './adminCategories.css'
import Header from '../../components/header/Header'
import React from 'react'
import AdminChangePage from '../../components/adminChangePage/AdminChangePage'

function AdminCategories () {
    return (
        <div className='App app_moderator'>
            <Header />
            <section className='page_content admin_page'>
                <h1 className='text-title'>Категории</h1>
                <AdminChangePage id={'categories'} />
            </section>
        </div>
    )
}

export default AdminCategories