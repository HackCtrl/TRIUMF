import { useState, useRef, useEffect } from 'react';

const coaches = [
  { id: 0, name: 'Балайиф Генджалиев', img: '/Mask group.svg', alt: 'Балайиф Генджалиев' },
  { id: 1, name: 'Вадим Лобода', img: '/Mask group (1).svg', alt: 'Вадим Лобода' },
  { id: 2, name: 'Зейдуллаев Шахрияр', img: '/image 3.svg', alt: 'Зейдуллаев Шахрияр' },
];

function Coaches() {
  const listRef = useRef(null);
  const cardsRef = useRef([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // set initial centered card
    scrollToIndex(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToIndex = (index, smooth = true) => {
    const list = listRef.current;
    const card = cardsRef.current[index];
    if (!list || !card) return;
    const offset = card.offsetLeft - (list.clientWidth - card.clientWidth) / 2;
    list.scrollTo({ left: offset, behavior: smooth ? 'smooth' : 'auto' });
    setCurrent(index);
  };

  const next = () => {
    const nextIndex = Math.min(current + 1, coaches.length - 1);
    scrollToIndex(nextIndex);
  };

  const prev = () => {
    const prevIndex = Math.max(current - 1, 0);
    scrollToIndex(prevIndex);
  };

  // update current index on scroll (debounced)
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(list.children);
        const center = list.scrollLeft + list.clientWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        children.forEach((ch, idx) => {
          const chCenter = ch.offsetLeft + ch.clientWidth / 2;
          const dist = Math.abs(chCenter - center);
          if (dist < minDist) { minDist = dist; closest = idx; }
        });
        setCurrent(closest);
      });
    };
    list.addEventListener('scroll', onScroll, { passive: true });
    return () => { list.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="coaches" className="coaches">
      <div className="coaches__container">
        <h2 className="directions__title">Тренерский состав</h2>

        <div className="coaches-controls">
          <button className="coaches-nav coaches-nav--prev" onClick={prev} aria-label="Предыдущий">
            ‹
          </button>

          <div className="coaches-list" ref={listRef} role="list">
            {coaches.map((coach, i) => (
              <div
                key={coach.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`coach-card ${i === current ? 'active' : ''}`}
                onClick={() => scrollToIndex(i)}
                role="listitem"
              >
                <div className="coach-photo-wrap">
                  <img src={coach.img} alt={coach.alt} className="coach-photo" />
                </div>
                <p className="coach-name">{coach.name}</p>
              </div>
            ))}
          </div>

          <button className="coaches-nav coaches-nav--next" onClick={next} aria-label="Следующий">
            ›
          </button>
        </div>
      </div>

      <div className="gradient-line"></div>
    </section>
  );
}

export default Coaches;