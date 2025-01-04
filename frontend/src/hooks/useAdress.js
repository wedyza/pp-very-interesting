import { useState, useEffect } from 'react';
import { API_KEY } from '../constants';

function useAddress(coords) {
    const [address, setAddress] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchAddress = async () => {
            if (!coords || isFetching) return;

            setIsFetching(true);

            const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${coords[1]},${coords[0]}&format=json`;
            try {
                const response = await fetch(geocodeUrl);
                const data = await response.json();
                const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;

                if (geoObject && isMounted) {
                    const fetchedAddress = geoObject.metaDataProperty.GeocoderMetaData.text;
                    setAddress(fetchedAddress);
                }
            } catch (err) {
                console.error('Ошибка при обратном геокодировании координат:', err);
            } finally {
                if (isMounted) {
                    setIsFetching(false);
                }
            }
        };

        fetchAddress();

        return () => {
            isMounted = false;
        };
    }, [coords]);
    
    return address;
}

export default useAddress;
