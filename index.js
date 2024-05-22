import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-ec2cc-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "ShoppingList");

const addBtnEl = document.getElementById("add-button");
const inputFiledEl = document.getElementById("input-field");
const listEl = document.getElementById("shopping-list");

fetchData();

addBtnEl.addEventListener("click", () => {
  let inputValue = inputFiledEl.value;

  push(shoppingListInDB, inputValue);

  clearInputFiledEl();
});

function fetchData() {
  onValue(shoppingListInDB, (snapshot) => {
    if (snapshot.exists()) {
      let items = Object.entries(snapshot.val());

      clearListEl();

      items.forEach((item) => {
        appendItemToListEl(item);
      });
    } else {
      listEl.innerHTML = "No items here";
    }
  });
}

function clearInputFiledEl() {
  inputFiledEl.value = "";
}

function appendItemToListEl(item) {
  let itemId = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  listEl.append(newEl);

  newEl.addEventListener("click", () => {
    deleteItem(itemId);
  });
}

function clearListEl() {
  listEl.innerHTML = "";
}

function deleteItem(id) {
  let exactLoactionofItemInDB = ref(database, `/ShoppingList/${id}`);
  remove(exactLoactionofItemInDB);
}
