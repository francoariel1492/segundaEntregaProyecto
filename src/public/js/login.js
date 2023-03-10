const form = document.getElementById("formLogin");
const registerBtn = document.getElementById("register")

registerBtn.addEventListener("click", () =>{
  const newPath = window.location.pathname;
  const newUrl = newPath.replace('/login', '') + '/signup';
  window.location.href = newUrl;
})

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  const url = "/auth";
  const headers = {
    "Content-Type": "application/json",
  };
  const method = "POST";
  const body = JSON.stringify(obj);

  fetch(url, {
    headers,
    method,
    body,
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        return response.json();
      }
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});
