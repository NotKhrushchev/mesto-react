import React, { useEffect, useState } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import Main from './main/Main';
import PopupWithForm from './popupWithForm/PopupWithForm';
import ImagePopup from './imagePopup/ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './profilePopup/EditProfilePopup';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  /** Получаю карточки и данные о пользователе при монтировании App */
  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
    .then(([currentUser, cards]) => {
        setCurrentUser(currentUser)
        setCards(cards);
    })
    .catch(err => {
        console.log(err);
    })
  }, []);

  
  /** Обработчик нажатия на лайк карточки */
  const handleCardLike = (card) => {

    // Повторно проверяем есть ли лайк на карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then(newCard => {
      setCards(cards => cards.map(e => e._id === card._id ? newCard : e));
    })
    .catch(err => {
      console.log(err);
    });
  }

  /** Обработчик нажатия на мусорку карточки */
  const handleCardRemove = (card) => {
    api.removeCard(card._id)
    .then(()=> {
      setCards(cards => cards.filter(e => e._id !== card._id))
    })
    .catch(err => {
      console.log(err);
    });
  } 

  /** Инициализирую состояние каждого попапа */
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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
    setSelectedCard(card);
  }

  /** Закрытие всех попапов */
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  // Обновление данных пользователя
  const handleUpdateProfile = (profileData) => {
    api.setProfileInfo(profileData)
    .then(newProfileData => {
      setCurrentUser(newProfileData)
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="App">
      <Header/>
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardRemove={handleCardRemove}
        />
        <Footer/>
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateProfile={handleUpdateProfile}
        />
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
      </CurrentUserContext.Provider>
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
