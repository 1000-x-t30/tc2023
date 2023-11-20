document.addEventListener('DOMContentLoaded', () => {
  Splide.defaults = {
    autoWidth: true,
    autoplay: false,
    arrows: false,
    pagination: false,
    destroy: true,
    breakpoints: {
      1024: {
        arrows: true,
        destroy: false,
        focus: 0,
        omitEnd: true,
      },
    },
  };

  const elements = document.querySelectorAll('.js-carousel');
  [].forEach.call(elements, (element) => {
    new Splide(element).mount();
  });
});
