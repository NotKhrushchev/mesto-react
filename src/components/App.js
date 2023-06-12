import React from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import Main from './main/Main';
import PopupWithForm from './popupWithForm/PopupWithForm';
import ImagePopup from './imagePopup/ImagePopup';

function App() {

  /** Инициализирую состояние каждого попапа */
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState()

  /** Функции открытия попапов */
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  /** Закрытие всех попапов */
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard()
  }

  return (
    <div className="App">
      <Header/>
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer/>
      <PopupWithForm
        title='Редактировать профиль'
        name='profile'
        submitByttonText='Сохранить'
        isOpened={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text" id="name-input" name="name" className="form__input form__input_type_name" placeholder="Имя" required minLength="2" maxLength="40"/>
        <span className="form__input-error name-input-error"></span>
        <input type="text" id="interest-input" name="interest" className="form__input form__input_type_interest" placeholder="О себе" required minLength="2" maxLength="200"/>
        <span className="form__input-error interest-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title='Новое место'
        name='place'
        submitByttonText='Создать'
        isOpened={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text" id="name-img-input" name="name" className="form__input form__input_type_name" placeholder="Название" required minLength="2" maxLength="30"/>
        <span className="form__input-error name-img-input-error"></span>
        <input type="url" id="url-input" name="link" className="form__input form__input_type_link" placeholder="Ссылка на картинку" required/>
        <span className="form__input-error url-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title='Вы уверены?'
        name='remove-card'
        submitByttonText='Да'
        onClose={closeAllPopups}
      >
      </PopupWithForm>
      <PopupWithForm
        title='Обновить аватар'
        name='set-avatar'
        submitByttonText='Сохранить'
        isOpened={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input type="url" id="avatar-input" name="link" className="form__input form__input_type_link" placeholder="Ссылка на фото" required/>
        <span className="form__input-error avatar-input-error"></span>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <template className="card-template">
        <article className="card">
          <button className="card__remove-btn btn" aria-label="Удалить карточку"></button>
          <img className="card__img" alt="#" draggable="false"/>
          <div className="card__info">
            <p className="card__desc"></p>
            <div className="card__like-section">
              <button className="card__like-btn btn" aria-label="Отметить понравившееся фото"></button>
              <p className="card__like-counter"></p>
            </div>
          </div>
        </article>
      </template>
    </div>
  );
}

export default App;
