// RestauranteSys: comportamento da página de apresentação

// 1. Ano no rodapé
const ano = document.getElementById('ano');
if (ano) {
  ano.textContent = new Date().getFullYear();
}

// 2. Destaca na navegação a seção que está na tela
const links = document.querySelectorAll('.nav a[href^="#"]');
const secoes = new Map();

links.forEach((link) => {
  const secao = document.querySelector(link.getAttribute('href'));
  if (secao) {
    secoes.set(secao, link);
  }
});

if ('IntersectionObserver' in window && secoes.size > 0) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        
        links.forEach((link) => {
          link.classList.remove('ativo');
          link.removeAttribute('aria-current');
        });
        
        const atual = secoes.get(entrada.target);
        if (atual) {
          atual.classList.add('ativo');
          atual.setAttribute('aria-current', 'true');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  secoes.forEach((_, secao) => observador.observe(secao));
}