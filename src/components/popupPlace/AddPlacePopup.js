import React, { useState } from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {

    const [placeLink, setPlaceLink] = useState('');
    const [placeName, setPlaceName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        onAddPlace({
            name: placeName,
            link: placeLink
        });
    }

    return (
        <PopupWithForm
            title='Новое место'
            name='place'
            submitByttonText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="text" id="name-img-input" name="name" className="form__input form__input_type_name" placeholder="Название" required minLength="2" maxLength="30" onChange={e => setPlaceName(e.target.value)}/>
            <span className="form__input-error name-img-input-error"></span>
            <input type="url" id="url-input" name="link" className="form__input form__input_type_link" placeholder="Ссылка на картинку" required onChange={e => setPlaceLink(e.target.value)}/>
            <span className="form__input-error url-input-error"></span>
        </PopupWithForm>
    );
};

export default AddPlacePopup;