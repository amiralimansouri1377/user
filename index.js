const COLUMNS = ["id", "name", "username", "email", "address"];

function request(url, method = "GET") {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();

    xhr.onload = function () {
      resolve(JSON.parse(xhr.response));
    };

    xhr.onerror = function () {
      reject("Somthin happend wrong!");
    };
  });
}

request("https://jsonplaceholder.typicode.com/users")
  .then((data) => renderPage(data))
  .catch((e) => console.log(e));

class User {
  constructor({ id, name, username, email, address: _address }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this._address = _address;
  }

  get address() {
    return `${this._address.city} ${this._address.street} ${this._address.suite}`;
  }

  createRecord() {
    const tr = document.createElement("tr");

    COLUMNS.forEach((column) => {
      const td = document.createElement("td");
      td.textContent = this[column];
      tr.appendChild(td);
    });
    const td = document.createElement("td");
    td.textContent = "X";
    td.style.cursor = "pointer";
    td.style.color = "red";
    td.style.margin = "10px";

    td.addEventListener("click", () => {
      this.deleteRecord(td.parentElement);
    });

    tr.appendChild(td);

    return tr;
  }

  deleteRecord(tr) {
    tr.remove();
  }
}

function renderPage(users) {
  const root = document.querySelector("#root");
  const table = createTable();
  root.appendChild(table);

  users.forEach(function (data) {
    const user = new User(data);
    table.appendChild(user.createRecord());
  });
}

function createTable() {
  const table = document.createElement("table");
  table.setAttribute("border", "1");
  table.setAttribute("width", "100%");
  table.appendChild(createHeader());

  return table;
}

function createHeader() {
  const tr = document.createElement("tr");

  COLUMNS.forEach(function (column) {
    const th = document.createElement("th");
    th.textContent = column;
    tr.appendChild(th);
  });

  return tr;
}
