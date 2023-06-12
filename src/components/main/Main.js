import React from 'react';
import api from '../../utils/Api.js';
import Card from '../card/Card';

const Main = ({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) => {

    const [userName, setUserName] = React.useState('Имя');
    const [userDescription, setUserDescription] = React.useState('О себе');
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    /** Получение карточек и данных пользователя */
    React.useEffect(() => {
        Promise.all([api.getProfileInfo(), api.getInitialCards()])
        .then(([info, initialCards]) => {
            setUserName(info.name);
            setUserDescription(info.about);
            setUserAvatar(info.avatar);
            setCards(initialCards.reverse());
        })
    }, [])

    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar" style={{backgroundImage: `url(${userAvatar})`}} onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__interest">{userDescription}</p>
                    <button className="profile__edit-btn btn" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
                </div>
                <button className="profile__add-btn btn" type="button" aria-label="Добавить фото" onClick={onAddPlace}></button>
            </section>
            <section className="cards">
                {cards.map(card => (
                    <Card
                        key={card._id}
                        card={card}
                        /** Прокинул из App обработчик нажатия на карточку */
                        onCardClick={onCardClick}
                    />
                ))}
            </section>
        </main>
    );
};

export default Main;