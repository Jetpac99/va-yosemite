document.body.classList.add('appear');

const YOSEMITE_IMAGES = [
  [/golden hour|sunrise|California mountain landscape|Yosemite Valley view/i, '/assets/yosemite/001-use-case-photorealistic-natural-asset-type-virgin-atlantic-s.png'],
  [/Hikers climbing|Waterfall spray|Mist Trail waterfall/i, '/assets/yosemite/002-use-case-photorealistic-natural-asset-type-content-card-imag.png'],
  [/high-country trail|Wildflower|Tuolumne|High-country meadow/i, '/assets/yosemite/003-use-case-photorealistic-natural-asset-type-content-card-imag.png'],
  [/Glacier Point|viewpoint|San Francisco holidays|Travellers looking/i, '/assets/yosemite/004-use-case-photorealistic-natural-asset-type-inspiration-card-.png'],
];

function restoreImageSources(root = document) {
  root.querySelectorAll('img').forEach((img) => {
    const match = YOSEMITE_IMAGES.find(([pattern]) => pattern.test(img.alt || ''));
    if (match) img.src = match[1];
  });
}

function moveImageOutOfParagraph(section) {
  const img = section.querySelector('img');
  const imageParagraph = img?.closest('p');
  if (img && imageParagraph) imageParagraph.replaceWith(img);
  return img;
}

function wrapRemainingContent(section) {
  const wrapper = document.createElement('div');
  [...section.childNodes].forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG') return;
    wrapper.append(node);
  });
  section.append(wrapper);
  return wrapper;
}

function enhanceHero(section) {
  section.className = 'hero';
  const img = moveImageOutOfParagraph(section);
  if (img) {
    const picture = document.createElement('picture');
    img.replaceWith(picture);
    picture.append(img);
  }

  const copy = document.createElement('div');
  copy.className = 'hero-copy va-container';
  const card = document.createElement('div');
  card.className = 'hero-card';
  [...section.childNodes].forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'PICTURE') return;
    card.append(node);
  });
  card.querySelector('a')?.classList.add('button-primary');
  copy.append(card);
  section.append(copy);
}

function enhancePromo(section, reverse = false) {
  section.className = `promo-card va-container${reverse ? ' reverse' : ''}`;
  moveImageOutOfParagraph(section);
  const wrapper = wrapRemainingContent(section);
  wrapper.querySelector('a')?.classList.add('button-primary');
  const badge = wrapper.querySelector('p');
  if (badge?.textContent.trim() === 'Trail spotlight') badge.classList.add('badge');
}

function groupPairs(section, className, withSpan = false) {
  section.className = className;
  const children = [...section.children];
  section.textContent = '';
  for (let index = 0; index < children.length;) {
    const card = document.createElement('div');
    if (withSpan && children[index]?.tagName === 'P') {
      const span = document.createElement('span');
      span.textContent = children[index].textContent;
      card.append(span);
      index += 1;
    }
    if (children[index]) card.append(children[index]);
    if (children[index + 1]) card.append(children[index + 1]);
    section.append(card);
    index += 2;
  }
}

function enhanceCarousel(section) {
  section.className = 'offer-carousel va-container';
  const heading = section.querySelector('h2');
  const track = section.querySelector('.carousel-track');
  track?.setAttribute('data-carousel', '');

  const controlsText = [...section.children].find((child) => child.tagName === 'P' && child.textContent.includes('‹'));
  const head = document.createElement('div');
  head.className = 'carousel-head';
  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  controls.innerHTML = '<button type="button" data-carousel-prev aria-label="Previous trail">‹</button><button type="button" data-carousel-next aria-label="Next trail">›</button>';
  if (heading) head.append(heading);
  head.append(controls);
  section.prepend(head);
  controlsText?.remove();

  const images = [
    YOSEMITE_IMAGES[2][1],
    YOSEMITE_IMAGES[3][1],
    YOSEMITE_IMAGES[0][1],
  ];
  track?.querySelectorAll(':scope > div').forEach((card, index) => {
    card.className = 'portrait-card';
    if (!card.querySelector('img')) {
      const img = document.createElement('img');
      img.src = images[index] || images[0];
      img.alt = card.querySelector('h3')?.textContent || 'Yosemite trail';
      card.prepend(img);
    }
    const body = document.createElement('div');
    [...card.childNodes].forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG') return;
      body.append(node);
    });
    card.append(body);
  });
}

function enhanceHotelCarousel(section) {
  section.className = 'hotel-carousel va-container';
  const children = [...section.children];
  section.textContent = '';
  for (let index = 0; index < children.length;) {
    const card = document.createElement('div');
    card.className = 'hotel-card';
    if (children[index]?.querySelector?.('img')) {
      card.append(children[index].querySelector('img'));
      index += 1;
    }
    const body = document.createElement('div');
    while (children[index] && children[index].tagName !== 'P') {
      body.append(children[index]);
      index += 1;
    }
    while (children[index] && !children[index].querySelector?.('img')) {
      body.append(children[index]);
      index += 1;
    }
    card.append(body);
    section.append(card);
  }
}

function enhanceArticleList(section) {
  section.className = 'article-list va-container';
  const children = [...section.children];
  section.textContent = '';
  for (let index = 0; index < children.length;) {
    const card = document.createElement('div');
    if (children[index]?.querySelector?.('img')) {
      card.append(children[index].querySelector('img'));
      index += 1;
    }
    if (children[index]) card.append(children[index]);
    if (children[index + 1]) card.append(children[index + 1]);
    section.append(card);
    index += 2;
  }
}

function enhanceTabs(section) {
  section.className = 'tabs va-container';
  section.id = section.id || 'highlights';

  const heading = section.querySelector('h2');
  const tabLabels = ['Waterfalls', 'Viewpoints', 'High country'];
  const imageParagraphs = [...section.querySelectorAll(':scope > p')]
    .filter((paragraph) => paragraph.querySelector('img'));
  const contentParagraphs = [...section.querySelectorAll(':scope > p')]
    .filter((paragraph) => !paragraph.querySelector('img') && !tabLabels.every((label) => paragraph.textContent.includes(label)));

  section.textContent = '';
  if (heading) section.append(heading);

  const tabButtons = document.createElement('div');
  tabButtons.className = 'tab-buttons';
  tabButtons.setAttribute('role', 'tablist');
  tabButtons.setAttribute('aria-label', 'Yosemite highlights');

  tabLabels.forEach((label, index) => {
    const slug = label.toLowerCase().replace(/\s+/g, '');
    const button = document.createElement('button');
    button.type = 'button';
    button.id = `${slug}-tab`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(index === 0));
    button.setAttribute('aria-controls', `tab-${slug}`);
    button.textContent = label;
    tabButtons.append(button);
  });
  section.append(tabButtons);

  tabLabels.forEach((label, index) => {
    const slug = label.toLowerCase().replace(/\s+/g, '');
    const panel = document.createElement('div');
    panel.className = 'tab-panel';
    panel.id = `tab-${slug}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `${slug}-tab`);
    if (index > 0) panel.hidden = true;

    const img = imageParagraphs[index]?.querySelector('img');
    if (img) panel.append(img);

    const copy = document.createElement('p');
    copy.textContent = contentParagraphs[index]?.textContent || '';
    panel.append(copy);
    section.append(panel);
  });
}

function enhanceDestinationCarousel(section) {
  section.className = 'destination-carousel va-container';
  const links = [...section.querySelectorAll('a')];
  section.textContent = '';

  links.forEach((link) => {
    const text = [...link.childNodes]
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent.trim())
      .join(' ')
      .trim();

    [...link.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) node.remove();
    });

    if (text && !link.querySelector('span')) {
      const span = document.createElement('span');
      span.textContent = text;
      link.append(span);
    }

    section.append(link);
  });
}

function enhanceFaq(section) {
  section.className = 'faq va-container';
  const heading = section.querySelector('h2');
  const paragraphs = [...section.querySelectorAll(':scope > p')];
  section.textContent = '';
  if (heading) section.append(heading);

  for (let index = 0; index < paragraphs.length; index += 2) {
    const details = document.createElement('details');
    if (index === 0) details.open = true;
    const summary = document.createElement('summary');
    summary.textContent = paragraphs[index]?.textContent || '';
    const copy = document.createElement('p');
    copy.textContent = paragraphs[index + 1]?.textContent || '';
    details.append(summary, copy);
    section.append(details);
  }
}

function enhanceDaYosemitePage() {
  const main = document.querySelector('main');
  const sections = [...main?.children || []];
  if (!sections.length || sections[0].classList.contains('hero')) return;

  document.body.classList.add('va-yosemite-da');
  restoreImageSources(main);
  enhanceHero(sections[0]);
  sections[1]?.classList.add('breadcrumbs', 'va-container');
  [2, 3, 6, 9, 11, 13, 15, 18, 21].forEach((index) => sections[index]?.classList.add('text-lockup', 'va-container'));
  enhancePromo(sections[4], true);
  enhanceCarousel(sections[5]);
  groupPairs(sections[7], 'info-grid va-container');
  groupPairs(sections[8], 'support-grid va-container');
  enhancePromo(sections[10]);
  groupPairs(sections[12], 'benefit-panel va-container');
  enhanceHotelCarousel(sections[14]);
  groupPairs(sections[16], 'itinerary-cards va-container', true);
  enhanceTabs(sections[17]);
  enhanceArticleList(sections[19]);
  enhanceFaq(sections[20]);
  enhanceDestinationCarousel(sections[22]);
  restoreImageSources(main);
}

enhanceDaYosemitePage();

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const section = carousel.closest('section, .offer-carousel, .hotel-carousel');
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
