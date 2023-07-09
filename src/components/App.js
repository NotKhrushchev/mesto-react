import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Footer from './footer/Footer';
import Header from './header/Header';
import Main from './main/Main';
import ImagePopup from './imagePopup/ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './popupProfile/EditProfilePopup';
import EditAvatarPopup from './popupAvatar/EditAvatarPopup';
import AddPlacePopup from './popupPlace/AddPlacePopup';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const dispatch = useDispatch();

  // Инициализирую состояние каждого попапа
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  // Получаю карточки и данные о пользователе при монтировании App
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

  
  // Обработчик нажатия на лайк карточки
  const handleCardLike = useCallback((card) => {

    // Повторно проверяем есть ли лайк на карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then(newCard => {
      setCards(cards => cards.map(e => e._id === card._id ? newCard : e));
    })
    .catch(err => {
      console.log(err);
    });
  }, [currentUser]);

  // Функции открытия попапов
  const handleEditProfileClick = useCallback(() => {
    setEditProfilePopupOpen(true);
  }, []);

  const handleEditAvatarClick = useCallback(() => {
    setEditAvatarPopupOpen(true);
  }, []);

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  // Закрытие всех попапов
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    // Сбрасываю значения в полях всех форм по закрытию попапа
    document.querySelectorAll('form').forEach(form => form.reset());
  }

  // Обработчик нажатия на мусорку карточки
  const handleCardRemove = useCallback((card) => {
    api.removeCard(card._id)
    .then(()=> {
      setCards(cards => cards.filter(e => e._id !== card._id))
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  // Обновление данных пользователя
  const handleUpdateProfile = (profileData) => {
    dispatch({type: 'SET_LOADING_TRUE'});
    api.setProfileInfo(profileData)
    .then(newProfileData => {
      setCurrentUser(newProfileData)
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      dispatch({type: 'SET_LOADING_FALSE'});
    })
  }

  // Обновление аватара
  const handleUpdateAvatar = (avatarLink) => {
    dispatch({type: 'SET_LOADING_TRUE'});
    api.setAvatar(avatarLink)
    .then(newProfileData => {
      setCurrentUser(newProfileData)
      closeAllPopups()
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      dispatch({type: 'SET_LOADING_FALSE'});
    })
  }

  // Добавление новой карточки
  const handleAddPlace = (cardData) => {
    dispatch({type: 'SET_LOADING_TRUE'});
    api.postNewCard(cardData)
    .then(newCard => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      dispatch({type: 'SET_LOADING_FALSE'});
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
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
