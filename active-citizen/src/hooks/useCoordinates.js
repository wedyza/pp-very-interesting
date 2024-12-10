import { useState, useEffect } from 'react';
import { API_KEY } from '../constants';

function useCoordinates(address) {
    const [coords, setCoords] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchCoordinates = async () => {
            if (!address || isFetching) return;

            setIsFetching(true);

            const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${address}&format=json`;
            try {
                const response = await fetch(geocodeUrl);
                const data = await response.json();
                const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;

                if (geoObject && isMounted) {
                    const pos = geoObject.Point.pos.split(' ').map(Number);
                    setCoords([pos[1], pos[0]]);
                }
            } catch (err) {
                console.error('Ошибка при геокодировании адреса:', err);
            } finally {
                if (isMounted) {
                    setIsFetching(false);
                }
            }
        };

        fetchCoordinates();

        return () => {
            isMounted = false;
        };
    }, [address]);
    return coords;
}

export default useCoordinates;
