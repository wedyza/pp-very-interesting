import { useState } from 'react';
import './../appealOptions/appealOptions.css'
import Modal from '../modal/Modal';
import { API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

function AppealOptions ({ showDelete = false, showEdit = false, showHistory = false, appealId, onDelete }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/tickets/${appealId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Ошибка при удалении заявки');
            }
            if (onDelete) {
                onDelete(appealId);
            }
        } catch (error) {
            alert('Ошибка при удалении');
        }
    };

    const handleEdit = () => {
        //navigate(`/edit-appeal/${appealId}`);
    };

    return (
        <div className="appeal-options">
            {showDelete &&
                <button className='appeal-options__delete' onClick={handleDelete}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 12.5L7.00002 7.00002M7.00002 7.00002L1.5 1.5M7.00002 7.00002L12.5 1.5M7.00002 7.00002L1.5 12.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            }
            {showEdit &&
                <a href='#' className='appeal-options__edit' onClick={handleEdit}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1659 5.18093L14.4047 3.94212C15.1858 3.16107 16.4521 3.16107 17.2331 3.94212L18.2938 5.00278C19.0748 5.78383 19.0748 7.05016 18.2938 7.83121L17.055 9.07001M13.1659 5.18093L4.39438 13.9524C4.06231 14.2845 3.85768 14.7229 3.81635 15.1907L3.60853 17.5433C3.55376 18.1633 4.07263 18.6822 4.69264 18.6274L7.04525 18.4196C7.51305 18.3782 7.95139 18.1736 8.28347 17.8415L17.055 9.07001M13.1659 5.18093L17.055 9.07001" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            }
            {showHistory &&
                <button href='#' className='appeal-options__history' onClick={openModal}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.6862 6.28613C11.0333 6.28613 11.3148 6.56755 11.3148 6.9147L11.3148 11.3147L15.7148 11.3147C16.0619 11.3147 16.3433 11.5961 16.3433 11.9433C16.3433 12.2904 16.0619 12.5718 15.7148 12.5718L10.6862 12.5718C10.339 12.5718 10.0576 12.2904 10.0576 11.9433L10.0576 6.9147C10.0576 6.56755 10.339 6.28613 10.6862 6.28613Z" fill="#EBE7FF"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0003 2.52051C15.6832 2.52051 19.4795 6.31676 19.4795 10.9997C19.4795 15.6826 15.6832 19.4788 11.0003 19.4788C6.75031 19.4788 3.22951 16.3513 2.61595 12.2724C2.55947 11.8969 2.2093 11.6383 1.83383 11.6948C1.45836 11.7513 1.19976 12.1015 1.25624 12.4769C1.96951 17.2187 6.05977 20.8538 11.0003 20.8538C16.4426 20.8538 20.8545 16.442 20.8545 10.9997C20.8545 5.55737 16.4426 1.14551 11.0003 1.14551C6.95842 1.14551 3.48639 3.57889 1.96641 7.05775C1.81439 7.40569 1.97322 7.81098 2.32115 7.963C2.66908 8.11502 3.07438 7.9562 3.2264 7.60826C4.53546 4.61215 7.52439 2.52051 11.0003 2.52051Z" fill="#EBE7FF"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.83366 2.0625C1.45396 2.0625 1.14616 2.3703 1.14616 2.75V6.78333C1.14616 7.46679 1.70021 8.02083 2.38366 8.02083H6.41699C6.79669 8.02083 7.10449 7.71303 7.10449 7.33333C7.10449 6.95364 6.79669 6.64583 6.41699 6.64583H2.52116V2.75C2.52116 2.3703 2.21335 2.0625 1.83366 2.0625Z" fill="#EBE7FF"/>
                    </svg>
                </button>
            }
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h1>Однажды здесь будет история</h1>
            </Modal>
        </div>
    )
}

export default AppealOptions;