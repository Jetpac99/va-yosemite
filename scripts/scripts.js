document.body.classList.add('appear');

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const section = carousel.closest('section');
  const previous = section?.querySelector('[data-carousel-prev]');
  const next = section?.querySelector('[data-carousel-next]');

  if (!previous || !next) return;

  const scrollByCard = (direction) => {
    const card = carousel.querySelector('.portrait-card, .hotel-card, article, a');
    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '24') || 24;
    const distance = card ? card.getBoundingClientRect().width + gap : 320;
    carousel.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  previous.addEventListener('click', () => scrollByCard(-1));
  next.addEventListener('click', () => scrollByCard(1));
});

document.querySelectorAll('.tabs').forEach((tabs) => {
  const buttons = [...tabs.querySelectorAll('[role="tab"]')];
  const panels = [...tabs.querySelectorAll('[role="tabpanel"]')];

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.setAttribute('aria-selected', String(item === button)));
      panels.forEach((panel) => {
        panel.hidden = panel.id !== button.getAttribute('aria-controls');
      });
    });
  });
});
