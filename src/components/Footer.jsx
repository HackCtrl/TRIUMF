import { useState } from 'react';
import Modal from './Modal';
import '../style/header.css';
import '../style/Footer.css';   

function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <footer id="contacts" className="footer">
        <div className="footer__inner">
          <div className="footer__left">
            <address>
              <ul className="footer__contacts">
                <li><a href="tel:+79652579544">+7 965 257-95-44</a></li>
                <li><a href="tel:+79175718222">+7 917 571-82-22</a></li>
              </ul>
            </address>
          </div>

          <nav className="footer__center" aria-label="Главное меню">
            <ul className="footer__nav">
              <li>
                <a href="#directions" onClick={(e) => scrollToSection(e, '#directions')}>
                  Направления
                </a>
              </li>
              <li>
                <a href="#prices" onClick={(e) => scrollToSection(e, '#prices')}>
                  Цены
                </a>
              </li>
              <li>
                <a href="#contacts" onClick={(e) => scrollToSection(e, '#contacts')}>
                  Контакты
                </a>
              </li>
            </ul>
          </nav>

          <div className="footer__right">
            <button
              className="button"
              onClick={() => setModalOpen(true)}
            >
              Записаться на тренировку!
            </button>
          </div>
        </div>

        <p className="footer__copyright">2025 TRIUMF</p>
      </footer>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default Footer;