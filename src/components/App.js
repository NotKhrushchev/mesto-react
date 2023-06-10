import Header from './header/Header';
import Main from './main/Main';

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <footer className="footer">
        <p className="footer__info">© 2023 Mesto Russia</p>
      </footer>
      <div className="popup popup_type_profile">
        <div className="popup__container">
          <form className="form form_type_profile" name="edit-profile-form" noValidate>
            <h2 className="form__header">Редактировать профиль</h2>
            <input type="text" id="name-input" name="name" className="form__input form__input_type_name" placeholder="Имя" required minLength="2" maxLength="40"/>
            <span className="form__input-error name-input-error"></span>
            <input type="text" id="interest-input" name="interest" className="form__input form__input_type_interest" placeholder="О себе" required minLength="2" maxLength="200"/>
            <span className="form__input-error interest-input-error"></span>
            <button className="form__save-btn btn" type="submit" aria-label="Сохранить">Сохранить</button>
          </form>
          <button className="popup__close-btn profile-close-btn btn" type="button" aria-label="Закрыть окно"></button>
        </div>
      </div>
      <div className="popup popup_type_place">
        <div className="popup__container">
          <form className="form form_type_place" name="add-card-form" noValidate>
            <h2 className="form__header">Новое место</h2>
            <input type="text" id="name-img-input" name="name" className="form__input form__input_type_name" placeholder="Название" required minLength="2" maxLength="30"/>
            <span className="form__input-error name-img-input-error"></span>
            <input type="url" id="url-input" name="link" className="form__input form__input_type_link" placeholder="Ссылка на картинку" required/>
            <span className="form__input-error url-input-error"></span>
            <button className="form__save-btn btn" type="submit" aria-label="Создать">Создать</button>
          </form>
          <button className="popup__close-btn place-close-btn btn" type="button" aria-label="Закрыть окно"></button>
        </div>
      </div>
      <div className="popup popup_type_remove-card">
        <div className="popup__container">
          <form className="form form_type_remove-card" name="add-card-form" noValidate>
            <h2 className="form__header form__header_modified">Вы уверены?</h2>
            <button className="form__save-btn btn" type="submit" aria-label="Да">Да</button>
          </form>
          <button className="popup__close-btn remove-card-close-btn btn" type="button" aria-label="Закрыть окно"></button>
        </div>
      </div>
      <div className="popup popup_type_img">
        <div className="popup__img-content">
          <img className="popup__img" alt="#" draggable="false"/>
          <p className="popup__caption"></p>
          <button className="popup__close-btn img-close-btn btn" type="button" aria-label="Закрыть окно"></button>
        </div>
      </div>
      <div className="popup popup_type_set-avatar">
        <div className="popup__container">
          <form className="form form_type_set-avatar" name="add-card-form" noValidate>
            <h2 className="form__header">Обновить аватар</h2>
            <input type="url" id="avatar-input" name="link" className="form__input form__input_type_link" placeholder="Ссылка на фото" required/>
            <span className="form__input-error avatar-input-error"></span>
            <button className="form__save-btn btn" type="submit" aria-label="Сохранить">Сохранить</button>
          </form>
          <button className="popup__close-btn remove-card-close-btn btn" type="button" aria-label="Закрыть окно"></button>
        </div>
      </div>
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
