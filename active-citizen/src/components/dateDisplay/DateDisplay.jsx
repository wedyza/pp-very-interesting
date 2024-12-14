import React from 'react';

const DateDisplay = ({ isoDate }) => {
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${hours}:${minutes}, ${day}.${month}.${year}`;
    };

    return <span>{formatDate(isoDate)}</span>;
};

export default DateDisplay;
