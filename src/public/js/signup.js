const form = document.getElementById('formSignup')

form.addEventListener('submit', e => {
  e.preventDefault()

  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => obj[key] = value)

  const url = '/users'
  const headers = {
    'Content-Type': 'application/json'
  }
  const method = 'POST'
  const body = JSON.stringify(obj)

  fetch(url, {
    headers,
    method,
    body
  })
  .then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    } else {
      return response.json();
    }
  })
    .then(data => console.log(data))
    .catch(error => console.log(error))
})