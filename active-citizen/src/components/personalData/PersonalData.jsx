import { useState, useEffect, useContext } from 'react'
import './personalData.css'
import avatar from '../../img/empty.jpg'
import { API_URL } from '../../constants'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function PersonalData() {
    const { logout, userGroup, setUserAvatar } = useContext(AuthContext);
    const accessToken = localStorage.getItem('accessToken');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [editNameValue, setEditNameValue] = useState('');
    const [editPhoneValue, setEditPhoneValue] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_URL}/users/me/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSaveAvatar = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch(`${API_URL}/users/me/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const updatedData = await response.json();
            setUser(updatedData);
            setUserAvatar(updatedData.avatar);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSaveName = async () => {
        const nameParts = editNameValue.trim().split(' ');
        const updatedUser = {
            last_name: nameParts[0] || user.last_name,
            first_name: nameParts[1] || user.first_name,
            given_name: nameParts.slice(2).join(' ') || user.given_name,
        };

        try {
            const response = await fetch(`${API_URL}/users/me/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const updatedData = await response.json();
            setUser(updatedData);
            setIsEditingName(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSavePhone = async () => {
        const updatedUser = {
            phone_number: editPhoneValue,
        };

        try {
            const response = await fetch(`${API_URL}/users/me/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const updatedData = await response.json();
            setUser(updatedData);
            setIsEditingPhone(false);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='personal-data'>
            <div className="user-data">
                <div className="user-info__avatar-container">
                    <div className="user-info__avatar">
                        <label htmlFor="avatar-upload" className='avatar-image_label'>
                            <img
                                src={user?.avatar ? `${API_URL}${user.avatar}` : '/empty.jpg'}
                                alt="avatar"
                                className="avatar-image"
                            />
                        </label>
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleSaveAvatar}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <div className="user-info__item user-info__name">
                    <div className="user-info__item_header">
                        <span className="user-info__item_label">ФИО</span>
                        {!isEditingName && 
                            <button
                                className='user-info__item_edit'
                                onClick={() => {
                                    setIsEditingName(true);
                                    setEditNameValue(`${user.last_name} ${user.first_name} ${user.given_name || ''}`);
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#656368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        }
                    </div>
                    {isEditingName ? (
                        <div className="edit_container edit-name_container">
                            <input
                                type="text"
                                value={editNameValue}
                                onChange={(e) => setEditNameValue(e.target.value)}
                                className="user-info__edit-input"
                            />
                            <button onClick={handleSaveName} className="user-info__save-button">Сохранить</button>
                        </div>
                    ) : (
                        <span className="user-info__item_value">{`${user.last_name} ${user.first_name} ${user.given_name || ''}` || 'Нет данных'}</span>
                    )}
                </div>

                <div className="user-info__item user-info__phone">
                    <div className="user-info__item_header">
                        <span className="user-info__item_label">Номер телефона</span>
                        {!isEditingPhone && 
                            <button
                                className='user-info__item_edit'
                                onClick={() => {
                                    setIsEditingPhone(true);
                                    setEditPhoneValue(user.phone_number);
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#656368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        }
                    </div>
                    {isEditingPhone ? (
                        <div className="edit_container edit-phone_container">
                            <input
                                type="text"
                                value={editPhoneValue}
                                onChange={(e) => setEditPhoneValue(e.target.value)}
                                className="user-info__edit-input"
                            />
                            <button onClick={handleSavePhone} className="user-info__save-button">Сохранить</button>
                        </div>
                    ) : (
                        <span className="user-info__item_value">{user.phone_number}</span>
                    )}
                </div>
                {userGroup !== 0 &&
                    (
                        <button onClick={handleLogout} className='profile__exit'>
                            <svg className='profile__nav__item_icon' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 4.13086C3.75736 4.13086 2.75 5.13822 2.75 6.38086V18.3809C2.75 19.6235 3.75736 20.6309 5 20.6309H7C8.24264 20.6309 9.25 19.6235 9.25 18.3809V6.38086C9.25 5.13822 8.24264 4.13086 7 4.13086H5ZM1.25 6.38086C1.25 4.30979 2.92893 2.63086 5 2.63086H7C9.07107 2.63086 10.75 4.30979 10.75 6.38086V18.3809C10.75 20.4519 9.07107 22.1309 7 22.1309H5C2.92893 22.1309 1.25 20.4519 1.25 18.3809V6.38086Z" fill="url(#paint0_linear_8_1648)"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.25 3.38086C15.25 2.96665 15.5858 2.63086 16 2.63086H18C20.6234 2.63086 22.75 4.75751 22.75 7.38086V17.3809C22.75 20.0042 20.6234 22.1309 18 22.1309H16C15.5858 22.1309 15.25 21.7951 15.25 21.3809C15.25 20.9666 15.5858 20.6309 16 20.6309H18C19.7949 20.6309 21.25 19.1758 21.25 17.3809V7.38086C21.25 5.58593 19.7949 4.13086 18 4.13086H16C15.5858 4.13086 15.25 3.79507 15.25 3.38086Z" fill="url(#paint1_linear_8_1648)"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 12.9112C18.8232 12.6183 18.8232 12.1434 18.5303 11.8505L15.5303 8.85053C15.2374 8.55764 14.7626 8.55764 14.4697 8.85053C14.1768 9.14342 14.1768 9.6183 14.4697 9.91119L16.1893 11.6309H10C9.58579 11.6309 9.25 11.9666 9.25 12.3809C9.25 12.7951 9.58579 13.1309 10 13.1309H16.1893L14.4697 14.8505C14.1768 15.1434 14.1768 15.6183 14.4697 15.9112C14.7626 16.2041 15.2374 16.2041 15.5303 15.9112L18.5303 12.9112Z" fill="url(#paint2_linear_8_1648)"/>
                                <defs>
                                <linearGradient id="paint0_linear_8_1648" x1="10.0456" y1="2.63086" x2="-3.81488" y2="16.3866" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FFF200"/>
                                <stop offset="0.468465" stopColor="#ECBF2A"/>
                                <stop offset="1" stopColor="#6219E8"/>
                                </linearGradient>
                                </defs>
                            </svg>
                            <span>Выйти</span>
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default PersonalData;
