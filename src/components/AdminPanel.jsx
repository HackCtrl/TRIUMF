import { useEffect, useState } from 'react';
import '../style/style.css';
import '../style/AdminPanel.css';
import apiFetch from '../utils/api';

const ADMIN_PASS = '301062Ki';

function AuthForm({ onAuth, onClose }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) onAuth(pass);
    else setError('Неверный пароль');
  };

  return (
    <div className="admin-auth-overlay">
      <div className="admin-auth-card">
        <button className="admin-auth-close" onClick={() => { if (onClose) onClose(); else window.location.hash = '' }} aria-label="Закрыть">✕</button>
        <div className="admin-auth-content">
          <h3 className="admin-auth-title">Вход в админ‑панель</h3>
          <p className="admin-auth-sub">Введите пароль для доступа к заявкам</p>

          <form onSubmit={submit} className="admin-auth-form">
            <input
              className="admin-auth-input"
              type="password"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setError(''); }}
              placeholder="Пароль"
              autoFocus
            />
            <button type="submit" className="admin-auth-btn">Войти</button>
          </form>

          {error && <div className="admin-auth-error">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel({ onClose = null }) {
  const [pass, setPass] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pass) return;
    fetchApps();
    // eslint-disable-next-line
  }, [pass]);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/api/applications', { headers: { 'x-admin-pass': pass } });
      setApps(data || []);
    } catch (err) {
      console.error(err);
      if (err.status === 401) { alert('Неверный пароль на стороне сервера'); setPass(null); return; }
      alert('Ошибка получения заявок');
    } finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    // Optimistic update: update UI immediately, then persist. Revert on error.
    let previous = null;
    setApps((prev) => {
      previous = prev;
      return prev.map((p) => (p.id === id ? { ...p, status } : p));
    });

    try {
      const updated = await apiFetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-pass': pass },
        body: JSON.stringify({ status }),
      });
      // Replace with authoritative server response when available
      setApps((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      console.error(err);
      // revert
      setApps(previous);
      alert('Ошибка обновления статуса');
    }
  };

  const STATUS_LABELS = {
    new: 'Новая',
    in_progress: 'В обработке',
    closed: 'Закрыта',
  };

  if (!pass) return <AuthForm onAuth={(p) => setPass(p)} onClose={onClose} />;

  const content = (
    <div className="admin-root">
      <div className="admin-card">
        <div className="admin-header">
          <div>
            <h2 style={{margin:0}}>Админ-панель</h2>
            <div style={{opacity:0.8}}>Заявки на тренировки</div>
          </div>
          <div>
            <div style={{textAlign:'right'}}>Всего: <strong>{apps.length}</strong></div>
            <div style={{marginTop:8}}>
              <button className="btn" onClick={fetchApps} disabled={loading}>Обновить</button>
            </div>
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
          <thead>
            <tr>
              <th>Клиент</th>
              <th>Телефон</th>
              <th>Направление</th>
              <th>Дата</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.phone}</td>
                <td>{a.direction}</td>
                <td>{new Date(a.createdAt).toLocaleString()}</td>
                <td>
                  <span className={`admin-badge status-${a.status}`}>{STATUS_LABELS[a.status] || a.status}</span>
                </td>
                <td>
                  {a.status !== 'in_progress' && (
                    <button className="btn" onClick={() => updateStatus(a.id, 'in_progress')}>В обработке</button>
                  )}
                  {a.status !== 'closed' && (
                    <button className="btn" style={{marginLeft:8}} onClick={() => updateStatus(a.id, 'closed')}>Закрыть</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // When rendered inside overlay, parent provides a fullscreen close button.
  // Return content directly so overlay's close control is used (avoids duplicate buttons).
  return content;
}
