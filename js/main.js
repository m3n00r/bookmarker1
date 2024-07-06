
var inputName = document.getElementById("siteName");
var wrongName = document.getElementById("wrong-name");
var inputUrl = document.getElementById("siteUrl");
var wrongUrl = document.getElementById("wrong-url");
var tableBody = document.getElementById("tableBody");
var allBooks = [];

if (localStorage.getItem("allBooks")) {
  getData();
  display(allBooks);
}
function validateName() {
  var nameRegx = /^[A-Z][a-z0-9_]{3,8}/;
  if (nameRegx.test(inputName.value)) {
    inputName.classList.remove("is-invalid");
    inputName.classList.add("is-valid");
    wrongName.classList.add("d-none");
    return true;
  } else {
    inputName.classList.remove("is-valid");
    inputName.classList.add("is-invalid");
    wrongName.classList.remove("d-none");
    return false;
  }
}

function validateUrl() {
  var urlRegx =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  if (urlRegx.test(inputUrl.value)) {
    inputUrl.classList.remove("is-invalid");
    inputUrl.classList.add("is-valid");
    wrongUrl.classList.add("d-none");
    return true;
  } else {
    inputUrl.classList.add("is-invalid");
    inputUrl.classList.remove("is-valid");
    wrongUrl.classList.remove("d-none");
    return false;
  }
}

function removeValidClass() {
  inputName.classList.remove("is-valid");
  inputUrl.classList.remove("is-valid");
}


function addBook() {
  if (validateName() && validateUrl()) {
    var data = {
      siteName: inputName.value,
      siteUrl: inputUrl.value,
    };
    allBooks.push(data);
    
    saveData();
    
    clearInput();
    removeValidClass();

    display(allBooks);
  } else {
    alert("pleass enter valid data");
  }
}

function clearInput() {
  inputName.value = "";
  inputUrl.value = "";
}
function saveData() {
  localStorage.setItem("allBooks", JSON.stringify(allBooks));
}

function getData() {
  allBooks = JSON.parse(localStorage.getItem("allBooks"));
}

function display(array) {
  console.log(array);
  var cartona = "";
  for (var i = 0; i < array.length; i++) {
    cartona += `<tr>
      <td>${i + 1}</td>
      <td>${array[i].siteName}</td>
      <td>
        <a href="${
          array[i].siteUrl.includes("https://")
            ? array[i].siteUrl
            : `https://${array[i].siteUrl}`
        }" class="btn btn-outline-info" target="_blank">
          Visite
        </a>
      </td>
      <td>
        <button onclick="deletBook(${i})" class="btn btn-outline-danger">Delete</button>
      </td>
    </tr>
    `;
  }
  tableBody.innerHTML = cartona;
}


function deletBook(index) {
  allBooks.splice(index, 1);

  display(allBooks);
  saveData();
}
