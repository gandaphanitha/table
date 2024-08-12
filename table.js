const name = document.querySelector("#name");
const email = document.querySelector("#email");
const panNumber = document.querySelector("#panNumber");
const addres = document.querySelector("#addres");
const mobile = document.querySelector("#mobile");
const submitBtn = document.querySelector("#submitBtn");
const tableRow = document.querySelector("#data-table");
const allInputField = document.querySelectorAll("input");

submitBtn.addEventListener("click", submitData);

let dataStorage = loadStoredData();

function submitData() {
  //   if (
  //     name.value === "" ||
  //     email.value === "" ||
  //     panNumber.value === "" ||
  //     addres.value === "" ||
  //     mobile.value === ""
  //   ) {
  //     alert("Please fill all fields");
  //     return;
  //   }

  const uniqueId = Math.floor(Math.random() * 99999);
  const newRow = `
    <tr>
        <td>${name.value}</td>
        <td>${email.value}</td>
        <td>${panNumber.value}</td>
        <td>${addres.value}</td>
        <td>${mobile.value}</td>
        <td>${uniqueId}</td>
    </tr>`;

  const payload = {
    name: name.value,
    email: email.value,
    panNumber: panNumber.value,
    addres: addres.value,
    mobile: mobile.value,
    uniqueId: uniqueId,
  };

  tableRow.insertAdjacentHTML("afterend", newRow);
  storeData(payload);
  clearInputField();
}

//storing item inside local storage
function storeData(payload) {
  dataStorage.push(payload);
  localStorage.setItem("formData", JSON.stringify(dataStorage));
}

function loadStoredData() {
  const storedData = localStorage.getItem("formData");
  return storedData ? JSON.parse(storedData) : [];
}

function renderStoredData() {
  const data = loadStoredData();
  data.forEach((item) => {
    const rowHTML = createRow(item);
    tableRow.insertAdjacentHTML("afterend", rowHTML)
  });
}

function createRow(data) { 
  return ` <tr>
    <td>${data.name}</td>
    <td>${data.email}</td>
    <td>${data.panNumber}</td>
    <td>${data.addres}</td>
    <td>${data.mobile}</td>
    <td>${data.uniqueId}</td>
</tr>`;
}

renderStoredData();

function clearInputField() {
  name.value = "";
  email.value = "";
  panNumber.value = "";
  addres.value = "";
  mobile.value = "";
}