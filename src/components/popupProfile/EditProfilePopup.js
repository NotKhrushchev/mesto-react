import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const EditProfilePopup = ({isOpen, onClose, onUpdateProfile, loading}) => {

    // Подписываюсь на контекст с информацией о пользователе
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('Имя');
    const [description, setDescription] = useState('О себе');

    useEffect(() => {
        if (Object.keys(currentUser).length) {
            setName(currentUser.name);
            setDescription(currentUser.about)
        }
    }, [currentUser]);

    // Обработчик изменения данных профиля
    const handleEditProfileSubmit = (e) => {
        e.preventDefault();

        onUpdateProfile({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='profile'
            submitByttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleEditProfileSubmit}
            loading={loading}
        >
            <input 
                type="text" 
                id="name-input" 
                name="name" 
                className="form__input form__input_type_name" 
                placeholder="Имя" 
                required 
                minLength="2" 
                maxLength="40" 
                value={name} 
                onChange={e => setName(e.target.value)}
            />
            <span className="form__input-error name-input-error"></span>
            <input 
                type="text" 
                id="interest-input" 
                name="interest" 
                className="form__input form__input_type_interest" 
                placeholder="О себе" 
                required 
                minLength="2" 
                maxLength="200" 
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <span className="form__input-error interest-input-error"></span>
        </PopupWithForm>
    );
};

export default EditProfilePopup;