var smoothScroll = require('smooth-scroll')
var axios = require('axios')
var notify = require('izitoast')

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function () {
  smoothScroll.init({
    easing: 'easeInOutCubic',
    speed: 600
  })

  /* Contact Form */
  var contactForm = document.getElementById('contact-form')
  var button = document.getElementById('btn-send')

  var baseURL = 'https://formspree.io/luislacruz.dev@gmail.com'

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault()
    loadingButton(true)

    axios({
      method: 'POST',
      url: baseURL,
      data: new FormData(contactForm),
      responseType: 'json',
    })
    .then(function (response) {
      loadingButton(false)
      notify.success({
        title: 'OK',
        message: 'Email enviado exitosamente.',
      });
      // clean form
      event.target.reset()
    })
    .catch(function (error) {
      loadingButton(false)
      notify.error({
        title: 'Oops',
        message: 'Ocurrio un error en el servidor, intente otra vez',
      })
    })
  })

  function loadingButton (boolean) {
    if (boolean) {
      button.innerHTML = 'Enviando...'
      button.disabled = true
    } else {
      button.innerHTML = 'Enviar'
      button.disabled = false
    }
  }
})
