import React, {useContext, useEffect} from 'react';
import api from '../../utils/api';
import Card from '../card/Card';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Main = ({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) => {
    
    const currentUser = useContext(CurrentUserContext);
    const [cards, setCards] = React.useState([]);

    /** Получение карточек */
    useEffect(() => {
        api.getInitialCards()
        .then(initialCards => {
            setCards(initialCards.reverse());
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar" style={{backgroundImage: `url(${currentUser.avatar})`}} onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__interest">{currentUser.about}</p>
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