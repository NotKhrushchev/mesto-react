import React, { useEffect, useState } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import Main from './main/Main';
import PopupWithForm from './popupWithForm/PopupWithForm';
import ImagePopup from './imagePopup/ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './popupProfile/EditProfilePopup';
import EditAvatarPopup from './popupAvatar/EditAvatarPopup';
import AddPlacePopup from './popupPlace/AddPlacePopup';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

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

  // Функции открытия попапов
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
  const handleCardRemove = (card) => {
    api.removeCard(card._id)
    .then(()=> {
      setCards(cards => cards.filter(e => e._id !== card._id))
    })
    .catch(err => {
      console.log(err);
    });
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

  const handleUpdateAvatar = (avatarLink) => {
    api.setAvatar(avatarLink)
    .then(newProfileAvatar => {
      setCurrentUser(newProfileAvatar)
      closeAllPopups()
    })
    .catch(err => {
      console.log(err);
    });
  }

  const handleAddPlace = (cardData) => {
    api.postNewCard(cardData)
    .then(newCard => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
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
