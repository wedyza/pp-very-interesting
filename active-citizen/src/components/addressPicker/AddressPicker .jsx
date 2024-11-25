import React, { useState } from 'react';
import './addressPicker.css'
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const AddressPicker = () => {
    const [coords, setCoords] = useState([55.751574, 37.573856]);
    const [address, setAddress] = useState('');

    const handleMapClick = async (e) => {
        const newCoords = e.get('coords');
        setCoords(newCoords);

        const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=962fb11e-806c-46ab-abc2-19208bcfa8e6&geocode=${newCoords[1]},${newCoords[0]}&format=json`;
        try {
            const response = await fetch(geocodeUrl);
            const data = await response.json();
            const result =
                data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text;
            setAddress(result || 'Адрес не найден');
        } catch (error) {
            console.error('Ошибка при обратном геокодировании:', error);
            setAddress('Ошибка получения адреса');
        }
    };

    return (
        <div className='map'>
            <div className='map-container'>
                <YMaps>
                    <Map
                        defaultState={{
                            center: coords,
                            zoom: 10,
                        }}
                        width="478px"
                        height="163px"
                        onClick={handleMapClick}
                    />
                </YMaps>
            </div>
            <div className="address-display">
                {address || 'Адрес не выбран'}
            </div>
        </div>
    );
};

export default AddressPicker;
