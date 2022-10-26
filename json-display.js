async function getData() {
  let data;
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  data = await response.json();
  return data;
}

function generateTableHead(table, data) {
  let tableHead = table.createTHead();
  let row = tableHead.insertRow();

  for (let i of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(i);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateUserTable(table, data) {
  let users = [];
  for (let i of data) {
    if (users.includes(i["userId"])) {
      continue;
    } else {
      users.push(i["userId"]);
      let row = table.insertRow();
      let cell = row.insertCell();
      let user = "0000" + i["userId"];
      user = user.slice(-5);

      let text = document.createTextNode(user);
      let link = document.createElement("a");
      link.setAttribute("href", "#" + user);
      link.setAttribute("class", "user");
      link.appendChild(text);
      cell.appendChild(link);
    }
  }
}

function generatePostsTable(user, table, data) {
  let posts = document.querySelectorAll(".post");
  for (let i of posts) {
    i.remove();
  }

  for (let i of data) {
    if (i["userId"] == user) {
      let row = table.insertRow();
      row.setAttribute("class", "post");
      let cell0 = row.insertCell();
      let cell1 = row.insertCell();
      let cell2 = row.insertCell();
      cell0.appendChild(document.createTextNode(i["id"]));
      cell1.appendChild(document.createTextNode(i["title"]));
      cell2.appendChild(document.createTextNode(i["body"]));
    }
  }
  document.querySelector(".posts").style.display = "block";
}

var data;
getData().then((response) => {
  data = response;
  console.log(data);

  const tableUsers = document.querySelector(".users");
  generateTableHead(tableUsers, ["User ID"]);
  generateUserTable(tableUsers, data);

  const tablePosts = document.querySelector(".posts");
  generateTableHead(tablePosts, ["Post ID", "Title", "Body"]);

  let users = document.querySelectorAll(".user");
  for (let i of users) {
    i.addEventListener("click", () =>
      generatePostsTable(i.innerHTML, tablePosts, data)
    );
  }
});
