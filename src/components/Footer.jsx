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
            <div className="footer__logo">
              <h3>ТРИУМФ</h3>
              <p>Клуб единоборств</p>
            </div>
          </div>

          <div className="footer__center">
            <div className="footer__center-box">
              <span className="footer__location">Дрожжино</span>
              <div className="footer__phones">
                <a className="footer__phone-link" href="tel:+79652579544">+7 (965) 257-95-44</a>
                <a className="footer__phone-link" href="tel:+79175718222">+7 (917) 571-82-22</a>
              </div>
            </div>
          </div>

          <div className="footer__right">
            <div className="footer__socials">
              <a href="https://t.me/VadimLoboda" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.242-1.865-.442-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.122.098.155.23.171.324.016.094.036.308.02.475z"/>
                </svg>
              </a>
              <a href="https://vk.com/triumph_boxingclub" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.163c.603.594 1.242 1.155 1.767 1.792.234.283.455.577.608.919.216.484.02.917-.397.943h-2.619c-.672.055-1.202-.212-1.65-.656-.357-.354-.689-.727-1.033-1.09-.137-.145-.28-.282-.447-.39-.297-.193-.556-.135-.744.14-.192.28-.236.604-.26.927-.033.446-.262.563-.708.583-1.015.044-1.975-.119-2.877-.614-.797-.437-1.417-1.062-1.963-1.762-1.065-1.363-1.887-2.87-2.625-4.423-.157-.329-.041-.506.32-.512.604-.01 1.208-.008 1.812-.001.244.002.405.15.506.371.379.832.827 1.618 1.384 2.334.148.19.3.383.515.505.245.14.433.077.546-.188.072-.168.104-.351.124-.529.062-.552.07-1.103-.007-1.654-.045-.318-.253-.524-.572-.593-.163-.036-.139-.106-.06-.213.13-.176.253-.287.497-.287h2.633c.415.082.508.27.564.687l.002 2.931c-.005.131.065.519.301.605.19.067.316-.096.43-.212.519-.529.888-1.154 1.222-1.804.148-.288.274-.589.397-.889.092-.223.235-.331.485-.325l2.474.015c.073 0 .147.001.219.015.338.065.43.23.323.558-.177.542-.508 1.006-.838 1.467-.356.498-.734.978-1.09 1.476-.326.458-.301.687.09 1.064z"/>
                </svg>
              </a>
            </div>
            <button className="footer__scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </footer>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default Footer;