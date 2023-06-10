import mestoLogo from '../images/logo/mesto_logo.svg';

function App() {
  return (
    <div className="App">
      <header class="header">
        <img src={mestoLogo} alt="Логотип 'Место'" class="header__logo" draggable="false"/>
      </header>
      <main class="main">
        <section class="profile">
          <button class="profile__avatar"></button>
          <div class="profile__info">
            <h1 class="profile__name">Имя</h1>
            <p class="profile__interest">О себе</p>
            <button class="profile__edit-btn btn" type="button" aria-label="Редактировать профиль"></button>
          </div>
          <button class="profile__add-btn btn" type="button" aria-label="Добавить фото"></button>
        </section>
        <section class="cards">
          {/* Место для размещения карточек */}
        </section>
      </main>
      <footer class="footer">
        <p class="footer__info">© 2023 Mesto Russia</p>
      </footer>
      <div class="popup popup_type_profile">
        <div class="popup__container">
          <form class="form form_type_profile" name="edit-profile-form" novalidate>
            <h2 class="form__header">Редактировать профиль</h2>
            <input type="text" id="name-input" name="name" class="form__input form__input_type_name" placeholder="Имя" required minlength="2" maxlength="40"/>
            <span class="form__input-error name-input-error"></span>
            <input type="text" id="interest-input" name="interest" class="form__input form__input_type_interest" placeholder="О себе" required minlength="2" maxlength="200"/>
            <span class="form__input-error interest-input-error"></span>
            <button class="form__save-btn btn" type="submit" aria-label="Сохранить">Сохранить</button>
          </form>
          <button class="popup__close-btn profile-close-btn btn" type="button" aria-label="Закрыть окно"></button>
        </div>
      </div>
      <div class="popup popup_type_place">
        <div class="popup__container">
          <form class="form form_type_place" name="add-card-form" novalidate>
            <h2 class="form__header">Новое место</h2>
            <input type="text" id="name-img-input" name="name" class="form__input form__input_type_name" placeholder="Название" required minlength="2" maxlength="30"/>
            <span class="form__input-error name-img-input-error"></span>
            <input type="url" id="url-input" name="link" class="form__input form__input_type_link" placeholder="Ссылка на картинку" required/>
            <span class="form__input-error url-input-error"></span>
            <button class="form__save-btn btn" type="submit" aria-label="Создать">Создать</button>
          </form>
          <button class="popup__close-btn place-close-btn btn" type="button" aria-label="Закрыть окно"></button>
        </div>
      </div>
      <div class="popup popup_type_remove-card">
        <div class="popup__container">
          <form class="form form_type_remove-card" name="add-card-form" novalidate>
            <h2 class="form__header form__header_modified">Вы уверены?</h2>
            <button class="form__save-btn btn" type="submit" aria-label="Да">Да</button>
          </form>
          <button class="popup__close-btn remove-card-close-btn btn" type="button" aria-label="Закрыть окно"></button>
        </div>
      </div>
      <div class="popup popup_type_img">
        <div class="popup__img-content">
          <img class="popup__img" alt="#" draggable="false"/>
          <p class="popup__caption"></p>
          <button class="popup__close-btn img-close-btn btn" type="button" aria-label="Закрыть окно"></button>
        </div>
      </div>
      <div class="popup popup_type_set-avatar">
        <div class="popup__container">
          <form class="form form_type_set-avatar" name="add-card-form" novalidate>
            <h2 class="form__header">Обновить аватар</h2>
            <input type="url" id="avatar-input" name="link" class="form__input form__input_type_link" placeholder="Ссылка на фото" required/>
            <span class="form__input-error avatar-input-error"></span>
            <button class="form__save-btn btn" type="submit" aria-label="Сохранить">Сохранить</button>
          </form>
          <button class="popup__close-btn remove-card-close-btn btn" type="button" aria-label="Закрыть окно"></button>
        </div>
      </div>
      <template class="card-template">
        <article class="card">
          <button class="card__remove-btn btn" aria-label="Удалить карточку"></button>
          <img class="card__img" alt="#" draggable="false"/>
          <div class="card__info">
            <p class="card__desc"></p>
            <div class="card__like-section">
              <button class="card__like-btn btn" aria-label="Отметить понравившееся фото"></button>
              <p class="card__like-counter"></p>
            </div>
          </div>
        </article>
      </template>
    </div>
  );
}

export default App;
