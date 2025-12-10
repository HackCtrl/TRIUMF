import { useState } from 'react';

const coaches = [
  { id: 0, name: 'Балайиф Генджалиев', img: '/Mask group.svg', alt: 'Иван Петров' },
  { id: 1, name: 'Вадим Лобода', img: '/Mask group (1).svg', alt: 'Алексей Сидоров' },
  { id: 2, name: 'Зейдуллаев Шахрияр', img: '/image 3.svg', alt: 'Дмитрий Кузнецов' },
];

function Coaches() {
  const [current, setCurrent] = useState(1);

  const getPosition = (index) => {
    let diff = index - current;
    if (diff > 1) diff -= 3;
    if (diff < -1) diff += 3;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -2) return 'right';
    if (diff === -1 || diff === 2) return 'left';
    return '';
  };

  const prevSlide = () => setCurrent((prev) => (prev - 1 + coaches.length) % coaches.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % coaches.length);

  return (
    <section id="coaches" className="coaches">
      <div className="coaches__container">
        <h2 className="directions__title">Тренерский состав</h2>

        <div className="coaches-carousel">
          {coaches.map((coach, index) => (
            <div
              key={coach.id}
              className={`coaches-carousel__wrapper ${getPosition(index)}`}
              data-pos={getPosition(index)}
            >
              <div className="coaches-carousel__item">
                <img
                  src={coach.img}
                  alt={coach.alt}
                  className="coaches-carousel__photo"
                />
              </div>
              <p className="coaches-carousel__name">{coach.name}</p>
            </div>
          ))}

          <button
            className="coaches-carousel__nav coaches-carousel__nav--prev"
            onClick={prevSlide}
            aria-label="Предыдущий тренер"
          >
            <img src="/Arrow 2.svg" alt="" className="coaches-carousel__arrow-icon" />
          </button>

          <button
            className="coaches-carousel__nav coaches-carousel__nav--next"
            onClick={nextSlide}
            aria-label="Следующий тренер"
          >
            <img src="/Arrow 1.svg" alt="" className="coaches-carousel__arrow-icon" />
          </button>
        </div>
      </div>

      <div className="gradient-line"></div>
    </section>
  );
}

export default Coaches;