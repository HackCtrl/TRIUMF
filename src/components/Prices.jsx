function Prices() {
  return (
    <section id="prices" className="prices">
      <div className="prices__container">
        <h2 className="directions__title">Цены</h2>

        <div className="prices__grid">
          <div className="prices__card">
            <img src="/box.png" alt="Абонемент" className="prices__card-img" />
            <div className="prices__card-content">
              <h3>Абонемент</h3>
              <div className="gradient-line"></div>
              <ul>
                <li>Абонемент на месяц</li>
                <li className="price">5 000 ₽</li>
              </ul>
            </div>
          </div>

          <div className="prices__card">
            <img src="/BJJ.png" alt="BJJ" className="prices__card-img" />
            <div className="prices__card-content">
              <h3>BJJ</h3>
              <div className="gradient-line"></div>
              <ul>
                <li>Абонемент на месяц</li>
                <li className="price">5 000 ₽</li>
              </ul>
            </div>
          </div>

          <div className="prices__card">
            <img src="/volnbox.png" alt="Вольная борьба" className="prices__card-img" />
            <div className="prices__card-content">
              <h3>Вольная борьба</h3>
              <div className="gradient-line"></div>
              <ul>
                <li>Абонемент на месяц</li>
                <li className="price">6 500 ₽</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="gradient-line"></div>
    </section>
  );
}

export default Prices;