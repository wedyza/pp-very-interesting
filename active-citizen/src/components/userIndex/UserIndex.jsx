import Header from './../header/Header'
import SelectCategory from './../selectCategory/SelectCategory'
import Drafts from './../drafts/Drafts'
import './../userIndex/userIndex.css'

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