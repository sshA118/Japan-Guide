class App {
  constructor() {
      this.initMenuToggle();
      this.initPageLoadAnimation();
      this.initIntersectionObserver();
  }

  initMenuToggle() {
      const burgerIcon = document.getElementById('burger-icon');
      const closeIcon = document.getElementById('close-icon');
      const menu = document.getElementById('menu');

      burgerIcon.addEventListener('click', () => {
          menu.classList.toggle('active');
      });

      closeIcon.addEventListener('click', () => {
          menu.classList.remove('active');
      });
  }

  initPageLoadAnimation() {
      window.onload = () => {
          document.body.classList.add('loaded_hiding');
          setTimeout(() => {
              document.body.classList.add('loaded');
              document.body.classList.remove('loaded_hiding');
          }, 500);
      };
  }

  initIntersectionObserver() {
      const options = {
          threshold: [0.3]
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('manifestation-show');
              }
          });
      }, options);

      const elements = document.querySelectorAll('.manifestation');
      elements.forEach(elm => {
          observer.observe(elm);
      });
  }
}
new App();  