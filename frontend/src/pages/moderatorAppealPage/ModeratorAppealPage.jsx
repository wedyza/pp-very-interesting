import './moderatorAppealPage.css'
import Header from '../../components/header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import empty from './../../img/empty.jpg'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import {API_KEY, API_URL} from '../../constants'
import DateDisplay from '../../components/dateDisplay/DateDisplay'
import AppealInfo from '../../components/appealInfo/AppealInfo'

function ModeratorAppealPage () {
    const { appealId } = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const [appeal, setAppeal] = useState([]);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [reviewComment, setReviewComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppeal = async () => {
            try {
                const response = await fetch(`${API_URL}/tickets/${appealId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`${response.statusText}`);
                }
                const data = await response.json();
                setAppeal(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchAppeal();
    }, []);

    const handleApproved = () => {
        const review = {
            comment: reviewComment,
            status_code_changed_on: 2
        };
        handleSubmit(review);
    };

    const handleRejected = () => {
        const review = {
            comment: reviewComment,
            status_code_changed_on: 3
        };
        handleSubmit(review);
    };

    const handleRevision = () => {
        const review = {
            comment: reviewComment,
            status_code_changed_on: 4
        };
        handleSubmit(review);
    };

    const handleSubmit = async (review) => {
        try {
            const response = await fetch(`${API_URL}/tickets/${appeal.id}/reviews/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(review),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };


    useEffect(() => {
        const fetchAddress = async () => {
            if (!appeal || isFetching || !appeal.latitude || !appeal.longtitude) return;

            setIsFetching(true);

            const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${appeal.longtitude},${appeal.latitude}&format=json`;
            try {
                const response = await fetch(geocodeUrl);
                const data = await response.json();
                const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;

                if (geoObject) {
                    const fetchedAddress = geoObject.metaDataProperty.GeocoderMetaData.text;
                    setAddress(fetchedAddress);
                }
            } catch (err) {
                console.error('Ошибка при обратном геокодировании координат:', err);
            } finally {
                setIsFetching(false);
            }
        };

        fetchAddress();
    }, [appeal]);
    
    const coords = [appeal.latitude, appeal.longtitude];

    return (
        <div className='App app_moderator'>
            <Header />
            <section className='page_content moderator_page verify-appeal_page'>
                <div className="verify-appeal">
                    <h1 className='verify-appeal__title'>Проверка заявки № {appeal.id}</h1>
                    <AppealInfo appeal={appeal} coords={coords} address={address} />
                    <div className="verify-appeal_comment">
                        <span className='verify-appeal_comment__label'>
                            Комментарий модератора:
                        </span>
                        <span className='verify-appeal_comment__disc'>
                            Оставьте ваш комментарий
                        </span>
                        <input className='verify-appeal_comment__input' type="text" 
                            placeholder='Комментарий' onChange={(e) => setReviewComment(e.target.value)} />
                        <div className='verify-appeal_comment__btns'>
                            <button className='verify-appeal_btns__fix verify-appeal_comment__btn'
                                onClick={handleRevision}
                            >
                                Отправить на доработку
                            </button>
                            <button className='verify-appeal_btns__approve verify-appeal_comment__btn'
                                onClick={handleApproved}
                            >
                                Одобрить заявку
                            </button>
                            <button className='verify-appeal_btns__reject verify-appeal_comment__btn'
                                onClick={handleRejected}
                            >
                                Отклонить заявку
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ModeratorAppealPage