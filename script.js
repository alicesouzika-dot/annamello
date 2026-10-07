/* ============================================================
   DRA. ANNA MELLO — HARMONIZACAO FACIAL
   script.js · Versao 1.0
   ============================================================ */

// ============================================================
// CONFIGURACAO — edite aqui para ajustar dados do site
// ============================================================
const CONFIG = {
  whatsappNumero: '5521974791806',
  whatsappMensagem: 'Ola! Gostaria de agendar uma consulta com a Dra. Anna Mello.',
  totalAvaliacoes: '5.022',
  anosExperiencia: '+8',
  procedimentosRealizados: '+2mil',
  clientesSatisfeitas: '+1.5mil',
  googleRating: '5.0',
};

// ============================================================
// NAVBAR — scroll & menu mobile
// ============================================================

const navbar = document.getElementById('navbar');

// Scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});





// ============================================================
// HERO — Ken Burns effect
// ============================================================

const heroBg = document.getElementById('heroBg');
if (heroBg) {
  setTimeout(() => heroBg.classList.add('loaded'), 100);
}

// ============================================================
// SCROLL REVEAL — animacao de entrada dos elementos
// ============================================================

const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ============================================================
// CONTADOR ANIMADO — numeros que sobem ao entrar em cena
// ============================================================

function animateCounter(el, target, suffix = '', duration = 1800) {
  const startTime = performance.now();
  const isFloat = target.toString().includes('.');
  const numTarget = parseFloat(target.toString().replace(',', '.'));

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = numTarget * eased;

    if (isFloat) {
      el.textContent = current.toFixed(1).replace('.', ',') + suffix;
    } else if (target.toString().startsWith('+')) {
      el.textContent = '+' + Math.floor(current) + suffix;
    } else {
      el.textContent = Math.floor(current).toLocaleString('pt-BR') + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = el.dataset.target;
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ============================================================
// GALERIA — tabs de filtro
// ============================================================

const galeriaTabs = document.querySelectorAll('.galeria-tab');
const galeriaItems = document.querySelectorAll('.galeria-item');

galeriaTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    galeriaTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filtro = tab.dataset.filtro;

    galeriaItems.forEach(item => {
      if (filtro === 'todos' || item.dataset.categoria === filtro) {
        item.style.display = '';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 350);
      }
    });
  });
});

// ============================================================
// SLIDER DE DEPOIMENTOS
// ============================================================

const track = document.getElementById('depoimentosTrack');
const cards = document.querySelectorAll('.depoimento-card');
const dots = document.querySelectorAll('.dep-dot');
const btnPrev = document.getElementById('depPrev');
const btnNext = document.getElementById('depNext');

let currentSlide = 0;
let autoSlideInterval;
let cardWidth = 0;
let gap = 24;
let visibleCards = 1;

function getVisibleCards() {
  if (window.innerWidth >= 1025) return 3;
  if (window.innerWidth >= 601) return 2;
  return 1;
}

function updateSlider() {
  if (!track || cards.length === 0) return;

  visibleCards = getVisibleCards();
  const firstCard = cards[0];
  cardWidth = firstCard.offsetWidth + gap;

  const maxSlide = Math.max(0, cards.length - visibleCards);
  currentSlide = Math.min(currentSlide, maxSlide);

  track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function goToSlide(index) {
  const maxSlide = Math.max(0, cards.length - getVisibleCards());
  currentSlide = Math.max(0, Math.min(index, maxSlide));
  updateSlider();
  resetAutoSlide();
}

function nextSlide() {
  const maxSlide = Math.max(0, cards.length - getVisibleCards());
  currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
  updateSlider();
}

function prevSlide() {
  const maxSlide = Math.max(0, cards.length - getVisibleCards());
  currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
  updateSlider();
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 5000);
}

if (btnNext) btnNext.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
if (btnPrev) btnPrev.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => goToSlide(i));
});

// Touch/swipe support
let touchStartX = 0;
if (track) {
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide(); else prevSlide();
      resetAutoSlide();
    }
  });
}

window.addEventListener('resize', updateSlider);
updateSlider();
resetAutoSlide();

// ============================================================
// WHATSAPP — links dinamicos
// ============================================================

function buildWhatsAppLink(mensagem) {
  const msg = encodeURIComponent(mensagem || CONFIG.whatsappMensagem);
  return `https://wa.me/${CONFIG.whatsappNumero}?text=${msg}`;
}

document.querySelectorAll('[data-whatsapp]').forEach(el => {
  const mensagem = el.dataset.whatsapp || CONFIG.whatsappMensagem;
  el.href = buildWhatsAppLink(mensagem);
  el.target = '_blank';
  el.rel = 'noopener noreferrer';
});
// ============================================================
// EFEITOS INTERATIVOS
// ============================================================

document.querySelectorAll('.btn-liquid').forEach(btn => {
  btn.addEventListener('mousedown', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.classList.add('liquid-ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '40px';
    ripple.style.height = '40px';
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// ============================================================
// CONFIGURAR DADOS DINAMICOS
// ============================================================

// Total de avaliacoes
document.querySelectorAll('[data-avaliacoes]').forEach(el => {
  el.textContent = CONFIG.totalAvaliacoes;
});

// Rating Google
document.querySelectorAll('[data-rating]').forEach(el => {
  el.textContent = CONFIG.googleRating;
});

// ============================================================
// SMOOTH SCROLL — links de navegacao
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ============================================================
// LIGHTBOX DA GALERIA
// ============================================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(src, caption) {
  if (!lightbox) return;
  lightboxImg.src = src;
  lightboxCaption.textContent = caption || '';
  lightbox.style.display = 'flex';
  setTimeout(() => lightbox.classList.add('active'), 10);
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  setTimeout(() => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }, 300);
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});

document.querySelectorAll('.galeria-item[data-src]').forEach(item => {
  item.addEventListener('click', () => {
    openLightbox(item.dataset.src, item.dataset.caption);
  });
});

// ============================================================
// INICIALIZACAO
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Garante que as imagens do hero carregam com efeito
  const img = new Image();
  img.src = 'hero.jpg';
  img.onload = () => {
    if (typeof heroBg !== 'undefined' && heroBg) heroBg.classList.add('loaded');
  };

  // Image Comparison Slider Logic
  const comparisonContainers = document.querySelectorAll('.image-comparison');
  comparisonContainers.forEach(container => {
    const leftLayer = container.querySelector('.comparison-left');
    const slider = container.querySelector('.comparison-slider');
    let isDragging = false;

    const handleMove = (e) => {
      if (!isDragging) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      let pos = (x / rect.width) * 100;
      pos = Math.max(0, Math.min(100, pos));
      
      leftLayer.style.clipPath = `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`;
      slider.style.left = `${pos}%`;
    };

    const startDrag = (e) => {
      isDragging = true;
      document.body.style.cursor = 'ew-resize';
      handleMove(e);
    };

    const stopDrag = () => {
      isDragging = false;
      document.body.style.cursor = '';
    };

    container.addEventListener('mousedown', startDrag);
    container.addEventListener('touchstart', startDrag, {passive: true});
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, {passive: true});
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
  });
});

// ============================================================
// EXPANDING CARDS
// ============================================================

const expandingContainers = document.querySelectorAll('.expanding-cards');
if (expandingContainers.length > 0) {
  expandingContainers.forEach(expandingContainer => {
    const expCards = expandingContainer.querySelectorAll('.proc-card-exp');
    
    function updateExpandingCards(activeIndex) {
      const isDesktop = window.innerWidth >= 768;
      const itemsCount = expCards.length;
      
      // Default 0 index if none selected
      if (activeIndex === null || activeIndex === undefined) {
        activeIndex = 0;
      }
      
      const ratios = Array.from({length: itemsCount}).map((_, i) => i === activeIndex ? "5fr" : "1fr");
      const gridStyle = ratios.join(" ");
      
      if (isDesktop) {
        expandingContainer.style.gridTemplateColumns = gridStyle;
        expandingContainer.style.gridTemplateRows = "1fr";
      } else {
        expandingContainer.style.gridTemplateColumns = "1fr";
        expandingContainer.style.gridTemplateRows = gridStyle;
      }
      
      expCards.forEach((card, index) => {
        if (index === activeIndex) {
          card.setAttribute("data-active", "true");
        } else {
          card.setAttribute("data-active", "false");
        }
      });
    }

    // Set initial state
    let currentActive = 0;
    updateExpandingCards(currentActive);

    expCards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        currentActive = index;
        updateExpandingCards(currentActive);
      });
      card.addEventListener('focus', () => {
        currentActive = index;
        updateExpandingCards(currentActive);
      });
      card.addEventListener('click', () => {
        currentActive = index;
        updateExpandingCards(currentActive);
      });
    });

    window.addEventListener('resize', () => {
      updateExpandingCards(currentActive);
    });
  });
}
