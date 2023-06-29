// Попап с картинкой
import React from 'react';

const ImagePopup = ({ card, onClose }) => {
    return (
        <div className={`popup popup_type_img ${Object.keys(card).length !== 0 ? 'popup_opened' : ''}`}>
            <div className="popup__img-content">
                <img className="popup__img" src={card ? card.link : '#'} alt={card ? `Фото места: ${card.name}` : '#'} draggable="false"/>
                <p className="popup__caption">{card ? card.name : ''}</p>
                <button className="popup__close-btn img-close-btn btn" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
            </div>
        </div>
    );
};

export default ImagePopup;