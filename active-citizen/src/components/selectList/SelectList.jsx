import { useState, useRef, useEffect } from 'react';
import './selectList.css';

function SelectList({ options, value, onChange, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="custom-select filter" ref={ref}>
            <div className="custom-select__header filter__header" onClick={handleToggle}>
                <span className='filter__text'>{value || placeholder}</span>
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.5303 0.96967C13.2374 0.676777 12.7626 0.676777 12.4697 0.96967L7 6.43934L1.53033 0.96967C1.23744 0.676777 0.762563 0.676777 0.46967 0.96967C0.176777 1.26256 0.176777 1.73744 0.46967 2.03033L6.46967 8.03033C6.76256 8.32322 7.23744 8.32322 7.53033 8.03033L13.5303 2.03033C13.8232 1.73744 13.8232 1.26256 13.5303 0.96967Z" fill="#5415C8"/>
                </svg>
            </div>
            {isOpen && (
                <ul className="custom-select__options filter__options-list">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className={'custom-select__option filter__option'}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SelectList;
