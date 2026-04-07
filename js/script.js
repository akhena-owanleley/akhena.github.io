// MODALE PROJETS
const modale = document.getElementById('modale');
const modaleTitre = document.getElementById('modale-titre');
const modaleCat = document.getElementById('modale-cat');
const modaleGallery = document.getElementById('modale-gallery');
const modaleClose = document.getElementById('modale-close');

function ouvrirModale() {
  modale.classList.remove('modale-hidden');
  isScrolling = true; // bloque le scroll de page
}

function fermerModale() {
  modale.classList.add('modale-hidden');
  isScrolling = false; // réactive le scroll de page
}

// Remplace tes anciens appels
document.querySelectorAll('.projet-card').forEach(card => {
  card.addEventListener('click', () => {
    const images = card.dataset.images ? card.dataset.images.split(',') : [];
    modaleTitre.textContent = card.dataset.titre || '';
    modaleCat.textContent = card.dataset.cat || '';
    modaleGallery.innerHTML = images
      .map(src => `<img src="${src.trim()}" alt="${card.dataset.titre}">`)
      .join('');
    ouvrirModale();
  });
});

modaleClose.addEventListener('click', fermerModale);
modale.addEventListener('click', (e) => {
  if (e.target === modale) fermerModale();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fermerModale();
});

modale.addEventListener('wheel', (e) => {
  e.stopPropagation();
}, { passive: true });

modale.addEventListener('touchstart', (e) => e.stopPropagation());
modale.addEventListener('touchend', (e) => e.stopPropagation());






// SCROLL SECTION PAR SECTION
const sections = [...document.querySelectorAll('section, footer')];
let currentIndex = 0;
let isScrolling = false;

function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;
  isScrolling = true;
  currentIndex = index;
  sections[index].scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => { isScrolling = false; }, 800);
}

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (isScrolling) return;
  if (e.deltaY > 0) scrollToSection(currentIndex + 1);
  else scrollToSection(currentIndex - 1);
}, { passive: false });

// Support tactile
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});
window.addEventListener('touchend', (e) => {
  if (isScrolling) return;
  const delta = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(delta) < 30) return; // ignore les micro-swipes
  if (delta > 0) scrollToSection(currentIndex + 1);
  else scrollToSection(currentIndex - 1);
});
