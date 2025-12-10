function Schedule() {
  return (
    <section className="schedule">
      <div className="schedule__container">
        <h2 className="directions__title">График</h2>

        <div className="schedule__wrapper">
          <div className="schedule__section">
            <div className="schedule__header">
              <h3>Бокс</h3>
              <div className="gradient-line"></div>
            </div>
            <div className="schedule__content">
              <ul>
                <li><h3>Дети с 6 лет до 14</h3></li>
                <li><p>Вт с 18:00 до 19:20</p></li>
                <li><p>Чт с 18:00 до 19:20</p></li>
                <li><p>Вс с 13:00 до 14:00</p></li>
              </ul>
              <ul className="schedule__adult">
                <li><h3>Взрослая 15+</h3></li>
                <li><p>Вт 21:00</p></li>
                <li><p>Чт 21:00</p></li>
                <li><p>Вс 14:00</p></li>
              </ul>
            </div>
          </div>

          <div className="schedule__section">
            <div className="schedule__header">
              <h3>Вольная борьба</h3>
              <div className="gradient-line"></div>
            </div>
            <div className="schedule__content">
              <ul>
                <li><h3>С 6 до 9 лет</h3></li>
                <li><p>Пн с 16:00 до 17:30</p></li>
                <li><p>Ср с 16:00 до 17:30</p></li>
                <li><p>Пт с 16:00 до 17:30</p></li>
              </ul>
              <ul className="schedule__adult">
                <li><h3>С 9 до 14 лет</h3></li>
                <li><p>Вт с 18:00 до 19:30</p></li>
                <li><p>Чт с 18:00 до 19:30</p></li>
                <li><p>Сб с 18:00 до 19:30</p></li>
              </ul>
            </div>
          </div>

          <div className="schedule__section">
            <div className="schedule__header">
              <h3>Джиу-джитсу</h3>
              <div className="gradient-line"></div>
            </div>
            <div className="schedule__content">
              <ul>
                <li><h3>Детская с 8 до 15</h3></li>
                <li><p>Вт с 16:30 до 18:00</p></li>
                <li><p>Чт с 16:30 до 18:00</p></li>
              </ul>
              <ul className="schedule__adult">
                <li><h3>Взрослая 15+</h3></li>
                <li><p>Пн 20:00</p></li>
                <li><p>Ср 20:00</p></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="schedule__note schedule__note--left">
          Суббота — день борьбы в разработке
        </p>
      </div>
    </section>
  );
}

export default Schedule;