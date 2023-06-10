import React from 'react';

const Main = () => {
    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar"></button>
                <div className="profile__info">
                    <h1 className="profile__name">Имя</h1>
                    <p className="profile__interest">О себе</p>
                    <button className="profile__edit-btn btn" type="button" aria-label="Редактировать профиль"></button>
                </div>
                <button className="profile__add-btn btn" type="button" aria-label="Добавить фото"></button>
            </section>
            <section className="cards">
                {/* Место для размещения карточек */}
            </section>
        </main>
    );
};

export default Main;