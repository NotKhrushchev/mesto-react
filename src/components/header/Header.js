import React from 'react';
import mestoLogo from '../../images/logo/mesto_logo.svg';

const Header = () => {
    return (
        <header className="header">
            <img src={mestoLogo} alt="Логотип 'Место'" className="header__logo" draggable="false"/>
        </header>
    );
};

export default Header;