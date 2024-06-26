let menu = document.querySelector(".hidden__menu");
let burger = document.querySelector(".burger__btn");
let closeBtn = document.querySelector(".btn-close");

burger.addEventListener("click", function () {
  menu.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", function () {
  menu.classList.remove("active");
  document.body.style.overflow = "";
});


function validateEmail(email) {
  const regExp = /.+@.+\..+/i;
  return regExp.test(String(email).toLowerCase());
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;

  const nameValue = document.getElementById("name").value.trim();
  const emailValue = document.getElementById("email").value.trim();
  const messageValue = document.getElementById("message").value.trim();

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  if (nameValue === "") {
    nameError.textContent = "Имя обязательно для заполнения";
    isValid = false;
  }

  if (emailValue === "") {
    emailError.textContent = "Почта обязательна для заполнения";
    isValid = false;
  } else if (!validateEmail(emailValue)) {
    emailError.textContent = "Неверный формат почты";
    isValid = false;
  }

  if (messageValue === "") {
    messageError.textContent = "Сообщение обязательно для заполнения";
    isValid = false;
  }

  if (isValid) {
    const formData = {
      name: nameValue,
      email: emailValue,
      message: messageValue
    };

    sendFormData(formData);
  }
});

document.getElementById("name").addEventListener("input", function () {
  const nameError = document.getElementById("nameError");
  nameError.textContent = "";
});

document.getElementById("email").addEventListener("input", function () {
  const email = document.getElementById("email").value.trim();
  const emailError = document.getElementById("emailError");

  emailError.textContent = "";

  if (!validateEmail(email) && email !== "") {
    emailError.textContent = "Неверный формат почты";
  }
});

document.getElementById("message").addEventListener("input", function () {
  const messageError = document.getElementById("messageError");
  messageError.textContent = "";
});

function sendFormData(data) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Данные успешно отправлены", data);
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    });
}