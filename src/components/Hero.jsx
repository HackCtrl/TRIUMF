function Hero() {
  return (
    <section className="hero">
      <img src="/ring.png" alt="Ринг" className="hero__bg" />
      
      <div className="hero__overlay"></div>

      <div className="hero__content">
        <div className="hero__top-text">
          <h1 className="hero__title">Клуб единоборств ТРИУМФ</h1>
          <p className="hero__subtitle">Клуб единоборств в Дрожжино</p>
        </div>

        <ul className="hero__features-bottom">
          <li>Бокс, кикбоксинг, муай-тай, тхэквондо и др.</li>
          <li>Групповые и индивидуальные тренировки</li>
          <li>Занятия для детей и взрослых</li>
        </ul>
      </div>
      <div className="gradient-line"></div>
    </section>
  );
}

export default Hero;