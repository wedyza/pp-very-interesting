import Header from '../../components/header/Header'
import './editAppeal.css'
import { useEffect, useState } from 'react'
import Modal from '../../components/modal/Modal'
import { useNavigate, useParams } from 'react-router-dom'
import AppealForm from '../../components/appealForm/AppealForm'
import { API_URL } from '../../constants'

function EditAppeal() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [appealData, setAppealData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { appealId } = useParams();
    const navigate = useNavigate();
    const closeModal = () => {
        navigate('/');
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const fetchAppealData = async () => {
            try {
                const response = await fetch(`${API_URL}/tickets/${appealId}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
                }
                const data = await response.json();
                setAppealData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppealData();
    }, [appealId]);

    if (loading) {
        return;
    }

    return (
        <div className='App'>
            <Header />
            <section className='page_content'>
                <h1 className='text-title'>Изменение заявки</h1>
                    <AppealForm openModal={() => setModalOpen(true)} mainAction='PATCH' initialData={appealData} appealId={appealId} />
            </section>
            <Modal isOpen={isModalOpen} onClose={closeModal} modalClass='appeal_modal'>
                <svg width="54" height="55" viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M27 0.625C12.1573 0.625 0.125 12.6573 0.125 27.5C0.125 42.3427 12.1573 54.375 27 54.375C41.8427 54.375 53.875 42.3427 53.875 27.5C53.875 12.6573 41.8427 0.625 27 0.625ZM15.8261 27.4242C15.0939 26.6919 13.9067 26.6919 13.1745 27.4242C12.4422 28.1564 12.4422 29.3436 13.1745 30.0758L20.6745 37.5758C21.4067 38.3081 22.5939 38.3081 23.3261 37.5758L40.8261 20.0758C41.5583 19.3436 41.5583 18.1564 40.8261 17.4242C40.0939 16.6919 38.9067 16.6919 38.1745 17.4242L22.0003 33.5983L15.8261 27.4242Z" fill="#349C0E"/>
                </svg>
                <p>Обращение отправлено</p>
            </Modal>
        </div>
    );
}

export default EditAppeal;