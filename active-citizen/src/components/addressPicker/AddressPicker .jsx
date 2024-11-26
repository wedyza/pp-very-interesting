import React, { useState, useEffect } from 'react';
import './addressPicker.css';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const AddressPicker = () => {
    const [coords, setCoords] = useState([55.751574, 37.573856]);
    const [address, setAddress] = useState('');
    const [debouncedAddress, setDebouncedAddress] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedAddress(address);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [address]);

    useEffect(() => {
        if (!debouncedAddress) return;

        const fetchCoordinates = async () => {
            const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=962fb11e-806c-46ab-abc2-19208bcfa8e6&geocode=${debouncedAddress}&format=json`;
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

        fetchCoordinates();
    }, [debouncedAddress]);

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
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Введите адрес"
            />
        </div>
    );
};

export default AddressPicker;
