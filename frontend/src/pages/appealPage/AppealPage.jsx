import './appealPage.css'
import Header from '../../components/header/Header'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import BackButton from '../../components/backButton/BackButton'
import { Link } from 'react-router-dom'
import empty from './../../img/empty.jpg'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import {API_KEY, API_URL} from '../../constants'
import DateDisplay from '../../components/dateDisplay/DateDisplay'
import AppealInfo from '../../components/appealInfo/AppealInfo'

function AppealPage () {
    const { appealId, auditId } = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const [appeal, setAppeal] = useState([]);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${API_URL}/tickets/${appealId}${auditId ? `/audit/${auditId}` : ''}`, {
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
                <AppealInfo appeal={appeal} coords={coords} address={address} />
            </section>
        </div>
    )
}

export default AppealPage