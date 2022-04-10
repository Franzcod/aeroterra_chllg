let card = document.getElementById("form_send");
let btn_openInput = document.getElementById("openInput");

btn_openInput.addEventListener("click", function () {
  if (btn_openInput.textContent == "Marcar punto ▼") {
    btn_openInput.textContent = "Marcar punto ▲";
  } else {
    btn_openInput.textContent = "Marcar punto ▼";
  }
  card.classList.toggle("desaparecer");
});
