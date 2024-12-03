import React, { useState } from 'react'
import './addressPicker.css'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import {API_KEY} from '../../constants'

const AddressPicker = () => {
    const [coords, setCoords] = useState([55.751574, 37.573856]);
    const [address, setAddress] = useState('');
    const [prevAddress, setPrevAddress] = useState('');

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleAddressBlur = async () => {
        if (!address || address === prevAddress) return;

        setPrevAddress(address);

        const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${address}&format=json`;
        try {
            const response = await fetch(geocodeUrl);
            const data = await response.json();
            const geoObject =
                data.response.GeoObjectCollection.featureMember[0]?.GeoObject;

            if (geoObject) {
                const pos = geoObject.Point.pos.split(' ').map(Number);
                const newCoords = [pos[1], pos[0]];
                setCoords(newCoords);
            } else {
                console.warn('Адрес не найден');
            }
        } catch (error) {
            console.error('Ошибка при прямом геокодировании:', error);
        }
    };

    const handleMapClick = async (e) => {
        const newCoords = e.get('coords');
        setCoords(newCoords);

        const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${newCoords[1]},${newCoords[0]}&format=json`;
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
        <div className="map">
            <div className="map-container">
                <YMaps>
                    <Map
                        state={{
                            center: coords,
                            zoom: 10,
                        }}
                        width="478px"
                        height="163px"
                        onClick={handleMapClick}
                    >
                        <Placemark geometry={coords} />
                    </Map>
                </YMaps>
            </div>
            <textarea
                className="address-input"
                value={address}
                onChange={handleAddressChange}
                onBlur={handleAddressBlur} 
                placeholder="Введите адрес"
            />
        </div>
    );
};

export default AddressPicker;
