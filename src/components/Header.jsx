import { useState } from 'react';
import Modal from './Modal';
import '../style/header.css';

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [devToast, setDevToast] = useState(false); 

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const showDevToast = (e) => {
    e.preventDefault();
    setDevToast(true);
    setTimeout(() => setDevToast(false), 2000);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <a href="#" onClick={(e) => scrollToSection(e, '#hero')}>
            <img src="/logo.svg" alt="Логотип" />
          </a>
        </div>

        <nav className="nav desktop-nav">
          <ul>
            <li><a href="#prices" onClick={(e) => scrollToSection(e, '#prices')}>Цены</a></li>
            <li><a href="#blog" onClick={showDevToast}>Блог</a></li>
            <li><a href="#contacts" onClick={(e) => scrollToSection(e, '#contacts')}>Контакты</a></li>
            <li><a href="#coaches" onClick={(e) => scrollToSection(e, '#coaches')}>Тренерский состав</a></li>
          </ul>
        </nav>

        <button className="button desktop-button" onClick={() => setModalOpen(true)}>
          Записаться на тренировку!
        </button>

        <button
          className={`burger ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="nav mobile-nav">
          <ul>
            <li><a href="#prices" onClick={(e) => scrollToSection(e, '#prices')}>Цены</a></li>
            <li><a href="#blog" onClick={showDevToast}>Блог</a></li>
            <li><a href="#contacts" onClick={(e) => scrollToSection(e, '#contacts')}>Контакты</a></li>
            <li><a href="#coaches" onClick={(e) => scrollToSection(e, '#coaches')}>Тренерский состав</a></li>
          </ul>
        </nav>

        <button
          className="button"
          onClick={() => {
            setModalOpen(true);
            setMobileMenuOpen(false);
          }}
        >
          Записаться на тренировку!
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      <div className={`dev-toast ${devToast ? 'show' : ''}`}>
        В разработке
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default Header;