import React, { useRef, useState } from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {

    // Через референс получаю значение value из инпута для аватарки
    const avatar = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        onUpdateAvatar(avatar.current.value);
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='set-avatar'
            submitByttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input ref={avatar} type="url" id="avatar-input" name="link" className="form__input form__input_type_link" placeholder="Ссылка на фото" required/>
            <span className="form__input-error avatar-input-error"></span>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;