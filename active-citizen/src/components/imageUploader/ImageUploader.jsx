import React, { useState } from 'react'
import './imageUploader.css'

function ImageUploader() {
    const [images, setImages] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        const newImages = files.slice(0, 5 - images.length).map((file) => ({
            id: URL.createObjectURL(file),
            file,
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleRemoveImage = (id) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    };

    return (
        <div className="image-uploader">
            <div className='uploaded-image__container'>
                {images.map((image) => (
                    <div key={image.id} className="uploaded-image__preview">
                        <img src={image.id} alt="Uploaded preview" className="uploaded-image" />
                        <button
                            className="uploaded-image__remove"
                            onClick={() => handleRemoveImage(image.id)}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 13L7.00002 7.00002M7.00002 7.00002L1 1M7.00002 7.00002L13 1M7.00002 7.00002L1 13" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            {images.length < 5 && (
                <label className={`image-upload__button ${ images.length > 0 ? 'image-upload__button_small' : '' }`}>
                    Загрузить
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
            )}
        </div>
    );
}

export default ImageUploader;
