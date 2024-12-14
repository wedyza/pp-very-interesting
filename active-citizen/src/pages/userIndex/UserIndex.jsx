import Header from '../../components/header/Header'
import SelectCategory from '../../components/selectCategory/SelectCategory'
import Drafts from '../../components/drafts/Drafts'
import './userIndex.css'

function UserIndex () {
    return (
        <div className='App'>
            <Header />

            <section className='page_content'>
                <SelectCategory />
                <Drafts />
            </section>
        </div>
    )
}

export default UserIndex