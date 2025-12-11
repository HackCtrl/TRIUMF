import ReactDOM from 'react-dom';
import { useState } from 'react';
import '../style/Modal.css';
import directions from '../data/directions';
import apiFetch from '../utils/api';

export default function Modal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const phone = e.target.phone.value.trim();
    const direction = e.target.direction.value || '';

    if (!name || !phone) return;

    try {
      setLoading(true);
      await apiFetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, direction }),
      });

      alert(`Спасибо, ${name}! Ваша заявка принята.`);
      onClose();
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert('Ошибка отправки заявки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </button>

        <h2 className="modal-title">Записаться на тренировку</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            required
            className="modal-input"
          />
          <input
            type="tel"
            name="phone"
            placeholder="+7 (999) 999-99-99"
            required
            pattern="^\+?[0-9\s\-\(\)]{10,20}$"
            className="modal-input"
          />

          <select name="direction" className="modal-input" defaultValue="">
            <option value="" disabled>Выберите направление</option>
            {directions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <button type="submit" className="modal-submit" disabled={loading}>
            {loading ? 'Отправка...' : 'Отправить заявку'}
          </button>
        </form>

        <p className="modal-note">Мы перезвоним вам в ближайшее время</p>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}