import './adminModerators.css'
import Header from '../../components/header/Header'
import React from 'react'
import AdminChangePage from '../../components/adminChangePage/AdminChangePage'

function AdminModerators () {
    return (
        <div className='App app_moderator'>
            <Header />
            <section className='page_content admin_page'>
                <h1 className='text-title'>Модераторы</h1>
                <AdminChangePage id={'moderators'} />
            </section>
        </div>
    )
}

export default AdminModerators