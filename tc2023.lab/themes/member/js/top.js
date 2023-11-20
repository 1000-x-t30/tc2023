document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('js-top-carousel')) {
    new Splide('#js-top-carousel', {
      type: 'loop',
      gap: '2.5rem',
      autoplay: true,
      arrows: true,
      pagination: true,
      perPage: 1,
      perMove: 1,
      speed: 600,
    }).mount();
  }
});
