import './adminModerators.css'
import Header from '../../components/header/Header'
import React from 'react'

function AdminModerators () {
    return (
        <div className='App app_moderator'>
            <Header />
            <section className='page_content admin_page'>
                <h1 className='text-title'>Модераторы</h1>
            </section>
        </div>
    )
}

export default AdminModerators