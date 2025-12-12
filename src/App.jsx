import Header from "./components/Header";
import Hero from "./components/Hero";
import TrainingDirections from "./components/TrainingDirections";
import Coaches from "./components/Coaches";
import Prices from "./components/Prices";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";
import { useState } from 'react';
import AdminLauncher from './components/AdminLauncher';
import AdminPanel from './components/AdminPanel';




function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  return (
    <>
      <Header />
      <Hero />
      <TrainingDirections />
      <Coaches />
      <Prices />
      <Schedule />
      <Footer />
      <AdminLauncher onOpen={() => setAdminOpen(true)} />

      {adminOpen && (
        <div className="admin-fullscreen-overlay">
          <div className="admin-fullscreen-inner">
            <button className="admin-fullscreen-close" onClick={() => setAdminOpen(false)} aria-label="Закрыть">✕</button>
            <AdminPanel onClose={() => setAdminOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

export default App
