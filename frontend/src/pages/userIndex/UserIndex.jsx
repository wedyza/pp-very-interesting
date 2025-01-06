import Header from '../../components/header/Header'
import SelectCategory from '../../components/selectCategory/SelectCategory'
import Drafts from '../../components/drafts/Drafts'
import './userIndex.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function UserIndex () {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div className='App'>
            <Header />

            <section className='page_content'>
                <SelectCategory />
                {isAuthenticated && <Drafts />}
            </section>
        </div>
    )
}

export default UserIndex