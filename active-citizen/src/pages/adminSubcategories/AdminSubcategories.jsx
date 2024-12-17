import './adminSubcategories.css'
import Header from '../../components/header/Header'
import React from 'react'
import AdminChangePage from '../../components/adminChangePage/AdminChangePage'

function AdminSubcategories () {
    return (
        <div className='App app_moderator'>
            <Header />
            <section className='page_content admin_page'>
                <h1 className='text-title'>Подкатегории</h1>
                <AdminChangePage id={'subcategories'} />
            </section>
        </div>
    )
}

export default AdminSubcategories