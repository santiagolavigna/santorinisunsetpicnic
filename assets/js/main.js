(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Mobile nav toggle
   */
  const toogleNav = function() {
    let navButton = select('.nav-toggle')
    navButton.classList.toggle('nav-toggle-active')
    navButton.querySelector('i').classList.toggle('bx-x')
    navButton.querySelector('i').classList.toggle('bx-menu')

    select('.nav-menu').classList.toggle('nav-menu-active')
  }
  on('click', '.nav-toggle', function(e) {
    toogleNav();
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.nav-menu .drop-down > a', function(e) {
    e.preventDefault()
    this.nextElementSibling.classList.toggle('drop-down-active')
    this.parentElement.classList.toggle('active')
  }, true)

  /**
   * Scrool links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      select('.nav-menu .active').classList.remove('active')
      this.parentElement.classList.toggle('active')
      toogleNav();
    }
  }, true)

  /*
  Sending email through phpmailer
  */
  on('submit', '#contact-form', function(e) {
    
    select('.loading').style.display = 'block';
    select('.send').style.display = 'none';
    select('.error-message').style.display = 'none';
    select('.sent-message').style.display = 'none';

    e.preventDefault(); // Evita que el formulario se envíe normalmente
    
    // Obtén los datos del formulario
    let formData = new FormData(this);

    // Realiza una solicitud AJAX para enviar los datos del formulario al servidor
    fetch('forms/contact.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {

      select('.loading').style.display = 'none';
      select('.send').style.display = 'block';

      if (data === '1') {
        select('.sent-message').style.display = 'block';
        select('#contact-form').reset(); 
      } else {
        select('.error-message').style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      select('.error-message').style.display = 'block';
    });
  });

})()