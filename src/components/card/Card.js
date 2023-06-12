import React from 'react';

const Card = ({card, onCardClick}) => {
    return (
        <article className="card">
            <button className="card__remove-btn btn" aria-label="Удалить карточку"></button>
            <img className="card__img" src={`${card.link}`} alt={`Фото места: ${card.name}`} draggable="false" onClick={() => onCardClick(card)}/>
            <div className="card__info">
                <p className="card__desc">{card.name}</p>
                <div className="card__like-section">
                    <button className="card__like-btn btn" aria-label="Отметить понравившееся фото"></button>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    );
};

export default Card;