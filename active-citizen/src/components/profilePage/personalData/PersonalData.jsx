import { useState, useEffect } from 'react'
import './personalData.css'
import avatar from './../../../img/empty.jpg'
import { API_URL } from '../../../constants'

function PersonalData() {
    const accessToken = localStorage.getItem('accessToken');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            console.log(accessToken);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const roundedRating = Math.round(user.rating);

    const ratingStars = [];
    for (let i = 0; i < 5; i++) {
        if (i < roundedRating) {
            ratingStars.push(
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.58737 8.23646L11.1849 3.00425C11.5183 2.33257 12.4817 2.33257 12.8151 3.00425L15.4126 8.23646L21.2215 9.08066C21.9668 9.18897 22.2638 10.0999 21.7242 10.6224L17.5217 14.6923L18.5135 20.4419C18.6409 21.1803 17.8614 21.7433 17.1945 21.3946L12 18.6785L6.80547 21.3946C6.1386 21.7433 5.35909 21.1803 5.48645 20.4419L6.47825 14.6923L2.27575 10.6224C1.73617 10.0999 2.03322 9.18897 2.77852 9.08066L8.58737 8.23646Z" fill="url(#paint0_linear_242_3906)"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9137 3.27202C11.8941 3.28355 11.8736 3.30194 11.856 3.33726L9.25851 8.56947C9.14902 8.79001 8.93826 8.94276 8.6946 8.97817L2.88575 9.82237C2.75064 9.84201 2.70905 9.99811 2.79687 10.0832L6.99937 14.153C7.1775 14.3255 7.25885 14.5749 7.2167 14.8193L6.2249 20.5689C6.21829 20.6072 6.22404 20.6329 6.23243 20.6523C6.2421 20.6746 6.26 20.6982 6.28663 20.7174C6.31326 20.7367 6.34236 20.747 6.36873 20.7494C6.39206 20.7516 6.42081 20.7486 6.45731 20.7295L11.6518 18.0134C11.8695 17.8995 12.1292 17.8995 12.3469 18.0134L17.5414 20.7295C17.5779 20.7486 17.6067 20.7516 17.63 20.7494C17.6564 20.747 17.6855 20.7367 17.7121 20.7174C17.7387 20.6982 17.7566 20.6746 17.7663 20.6523C17.7747 20.6329 17.7804 20.6072 17.7738 20.5689L16.782 14.8193C16.7399 14.5749 16.8212 14.3255 16.9993 14.153L21.2019 10.0832C21.2897 9.99811 21.2481 9.84201 21.113 9.82237L15.3041 8.97817C15.0605 8.94276 14.8497 8.79001 14.7402 8.56947L12.1427 3.33726C12.1252 3.30194 12.1046 3.28355 12.0851 3.27202C12.0628 3.25889 12.0331 3.25 11.9994 3.25C11.9656 3.25 11.9359 3.25889 11.9137 3.27202ZM10.5125 2.67026C11.1216 1.44325 12.8771 1.44325 13.4862 2.67026L15.9089 7.55031L21.3287 8.33797C22.6842 8.53496 23.2367 10.2006 22.2454 11.1607L18.3276 14.9548L19.252 20.3139C19.4866 21.6742 18.0549 22.6907 16.8464 22.0587L11.9994 19.5243L7.15235 22.0587C5.94378 22.6907 4.51209 21.6742 4.74673 20.3139L5.67116 14.9548L1.75335 11.1607C0.762015 10.2006 1.31453 8.53496 2.67002 8.33797L8.08979 7.55031L10.5125 2.67026Z" fill="url(#paint1_linear_242_3906)"/>
                    <defs>
                    <linearGradient id="paint0_linear_242_3906" x1="21.4561" y1="3.10175" x2="10.3031" y2="25.0408" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF200"/>
                    <stop offset="0.464" stopColor="#E7B510"/>
                    <stop offset="0.924" stopColor="#FFF200"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_242_3906" x1="22.1659" y1="2.39876" x2="10.1065" y2="26.0359" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF200"/>
                    <stop offset="0.464" stopColor="#E7B510"/>
                    <stop offset="0.924" stopColor="#FFF200"/>
                    </linearGradient>
                    </defs>
                </svg>
            );
        } else {
            ratingStars.push(
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9137 2.27202C10.8941 2.28355 10.8736 2.30194 10.856 2.33726L8.25851 7.56947C8.14902 7.79001 7.93826 7.94276 7.6946 7.97817L1.88575 8.82237C1.75064 8.84201 1.70905 8.99811 1.79687 9.08315L5.99937 13.153C6.1775 13.3255 6.25885 13.5749 6.2167 13.8193L5.2249 19.5689C5.21829 19.6072 5.22404 19.6329 5.23243 19.6523C5.2421 19.6746 5.26 19.6982 5.28663 19.7174C5.31326 19.7367 5.34236 19.747 5.36873 19.7494C5.39206 19.7516 5.42081 19.7486 5.45731 19.7295L10.6518 17.0134C10.8695 16.8995 11.1292 16.8995 11.3469 17.0134L16.5414 19.7295C16.5779 19.7486 16.6067 19.7516 16.63 19.7494C16.6564 19.747 16.6855 19.7367 16.7121 19.7174C16.7387 19.6982 16.7566 19.6746 16.7663 19.6523C16.7747 19.6329 16.7804 19.6072 16.7738 19.5689L15.782 13.8193C15.7399 13.5749 15.8212 13.3255 15.9993 13.153L20.2019 9.08315C20.2897 8.99811 20.2481 8.84201 20.113 8.82237L14.3041 7.97817C14.0605 7.94276 13.8497 7.79001 13.7402 7.56947L11.1427 2.33726C11.1252 2.30194 11.1046 2.28355 11.0851 2.27202C11.0628 2.25889 11.0331 2.25 10.9994 2.25C10.9656 2.25 10.9359 2.25889 10.9137 2.27202ZM9.51248 1.67026C10.1216 0.443247 11.8771 0.443247 12.4862 1.67026L14.9089 6.55031L20.3287 7.33797C21.6842 7.53496 22.2367 9.20064 21.2454 10.1607L17.3276 13.9548L18.252 19.3139C18.4866 20.6742 17.0549 21.6907 15.8464 21.0587L10.9994 18.5243L6.15235 21.0587C4.94378 21.6907 3.51209 20.6742 3.74673 19.3139L4.67116 13.9548L0.753354 10.1607C-0.237985 9.20064 0.314526 7.53496 1.67002 7.33797L7.08979 6.55031L9.51248 1.67026Z" fill="url(#paint0_linear_268_2572)"/>
                    <defs>
                    <linearGradient id="paint0_linear_268_2572" x1="21.1659" y1="1.39876" x2="9.10654" y2="25.0359" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF200"/>
                    <stop offset="0.464" stopColor="#E7B510"/>
                    <stop offset="0.924" stopColor="#FFF200"/>
                    </linearGradient>
                    </defs>
                </svg>
            );
        }
    }

    return (
        <div className='personal-data'>
            <div className="user-data">
                <div className="user-info__avatar-container">
                    <div className="user-info__avatar">
                        <img src={avatar} alt="" />
                    </div>
                </div>
                <div className="user-info__item user-info__name">
                    <div className="user-info__item_header">
                        <span className="user-info__item_label">ФИО</span>
                        <button className='user-info__item_edit'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#656368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <span className="user-info__item_value">{`${user.first_name} ${user.last_name} ${user.given_name || ''}` || 'Нет данных'}</span>
                </div>
                <div className="user-info__item user-info__phone">
                    <div className="user-info__item_header">
                        <span className="user-info__item_label">Номер телефона</span>
                        <button className='user-info__item_edit'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#656368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <span className="user-info__item_value">{user.phone_number}</span>
                </div>
                <div className="user-info__item user-info__mail">
                    <div className="user-info__item_header">
                        <span className="user-info__item_label">Почта</span>
                        <button className='user-info__item_edit'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#656368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <span className="user-info__item_value">{user.mail}</span>
                </div>
                <div className="user-info__item user-info-rating">
                    <div className="user-info__item_header">
                        <span className="user-info__item_label">Ваш рейтинг</span>
                        <button className='user-info__item_info'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 11.5V16.5" stroke="#656368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 7.51L12.01 7.49889" stroke="#656368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#656368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>                            
                    </div>
                    <div className="user-rating__value">
                        <div className="user-rating__stars">
                            {ratingStars}
                        </div>
                        <div className="user-info__item_value">
                            {user.rating.toFixed(1)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalData;
