function TrainingDirections() {
  return (
    <section id="directions" className="directions">
      <h2 className="directions__title">Направления тренировок</h2>

      <div className="directions__grid">
        <div className="card">
          <img src="/boxing.svg" alt="Бокс" className="card__img" />
          <p className="card__text">Бокс</p>
        </div>

        <div className="card">
          <img src="/kikboxing.svg" alt="Кикбоксинг" className="card__img" />
          <p className="card__text">Кикбоксинг</p>
        </div>

        <div className="card card--soon">
          <img src="/muay-tai.svg" alt="Муай-тай" className="card__img" />
          <p className="card__text">Муай-тай</p>
        </div>

        <div className="card">
          <img src="/BJJ.svg" alt="BJJ" className="card__img" />
          <p className="card__text">BJJ</p>
        </div>

        <div className="card">
          <img src="/freestyle-wrestling.svg" alt="Вольная борьба" className="card__img" />
          <p className="card__text">Вольная борьба</p>
        </div>

        <div className="card card--soon">
          <img src="/Taekwondo.svg" alt="Тхэквондо" className="card__img" />
          <p className="card__text">Тхэквондо</p>
        </div>
      </div>
      <div className="gradient-line"></div>
    </section>
  );
}

export default TrainingDirections;