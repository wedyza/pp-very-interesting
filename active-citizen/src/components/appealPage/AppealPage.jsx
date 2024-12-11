import './appealPage.css'
import Header from './../header/Header'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import BackButton from '../backButton/BackButton'
import { Link } from 'react-router-dom'
import empty from './../../img/empty.jpg'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import {API_KEY, API_URL} from '../../constants'

function AppealPage () {
    const { appealId } = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const [appeal, setAppeal] = useState([]);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
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
        fetchNotifications();
    }, []);


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
        <div className='App'>
            <Header />
            <section className='page_content'>
                <Link to={'/notifications'}>
                    <BackButton />
                </Link>
                <h1 className='notifications__title text-title'>Ваше обращение</h1>
                <div className="appeal-info">
                    <div className="appeal-info__item appeal-info__theme">
                        <div className="appeal-info__item_label">
                            Тема
                        </div>
                        <div className="appeal-info__item_value">
                            {appeal.title}
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__category">
                        <div className="appeal-info__item_label">
                            Категория
                        </div>
                        <div className="appeal-info__item_value">
                            {appeal.category}                            
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__subcategory">
                        <div className="appeal-info__item_label">
                            Подкатегория
                        </div>
                        <div className="appeal-info__item_value">
                            {appeal.subcategory}                            
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__datetime">
                        <div className="appeal-info__item_label">
                            Дата и время заявки
                        </div>
                        <div className="appeal-info__item_value">
                            {appeal.time}                            
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__desc">
                        <div className="appeal-info__item_label">
                            Описание
                        </div>
                        <div className="appeal-info__item_value appeal-desc__value">
                            {appeal.body}                            
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__address">
                        <div className="appeal-info__item_label">Адрес</div>
                        <div className="map appeal-info__address_value">
                            <div className="map-container">
                                <YMaps>
                                    {coords ? (
                                        <Map
                                            state={{
                                                center: coords,
                                                zoom: 15,
                                            }}
                                            width="262px"
                                            height="163px"
                                        >
                                            <Placemark geometry={coords} />
                                        </Map>
                                    ) : (
                                        <div>Загрузка карты...</div>
                                    )}
                                </YMaps>
                            </div>
                            <div className="appeal-info__item_value appeal-address__value">
                                {address}
                            </div>
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__images">
                        <div className="appeal-info__item_label">
                            Медиафайлы
                        </div>
                        <div className="appeal-info__item_value appeal__images">
                            <img src={empty} alt="" className='appeal__image' />
                            <img src={empty} alt="" className='appeal__image' />
                            <img src={empty} alt="" className='appeal__image' />
                            <img src={empty} alt="" className='appeal__image' />
                        </div>
                    </div>
                    <div className="appeal-info__item appeal-info__comm">
                        <div className="appeal-info__item_label">
                            Комментарии предыдущих модераторов
                        </div>
                        <div className="appeal-info__item_value appeal-comm__value">
                            <p className='appeal__comm_label'>Комментарий модератора:</p>
                            {appeal.comment}                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AppealPage