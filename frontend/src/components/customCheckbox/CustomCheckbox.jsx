import './customCheckbox.css'

function CustomCheckbox({label, onChangeFunction, selected}) {
    return (
        <label key={label} className='moderator_checkbox-filter__item'>
            <input
                type="checkbox"
                checked={selected.includes(label)}
                onChange={onChangeFunction}
                className="custom-checkbox"
            />
            <div className="custom-checkbox-icon">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="unchecked"
                >
                    <path d="M1 18.4V1.6C1 1.26863 1.26863 1 1.6 1H18.4C18.7314 1 19 1.26863 19 1.6V18.4C19 18.7314 18.7314 19 18.4 19H1.6C1.26863 19 1 18.7314 1 18.4Z" stroke="#B5B5B5" strokeWidth="1.5"
                    />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='checked'>
                    <path d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="#656368" strokeWidth="1.5"/>
                    <path d="M7 12.5L10 15.5L17 8.5" stroke="#656368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            {label}
        </label>
    );
}

export default CustomCheckbox;
