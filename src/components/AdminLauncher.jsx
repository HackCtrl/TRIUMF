import '../style/AdminPanel.css';

export default function AdminLauncher({ onOpen }) {
  return (
    <div className="admin-launcher" onClick={onOpen} title="Для администраторов">
      <span className="admin-launcher-dot"></span>
      <span className="admin-launcher-text">Admin</span>
    </div>
  );
}
