fetch("http://localhost:3000/get-blog")
  .then((data) => data.json())
  .then((data) => displayData(data));

function deleteFunction(id) {
  console.log(id);
  fetch("http://localhost:3000/delete-blog/" + id, {
    method: "DELETE",
  })
    .then((data) => data.json()) // or res.json()
    .then((res) => console.log(res));
}

function updateFunction(username, description, title, date, updateId) {
  // console.log(typeof updateId);
  // let updata = JSON.stringify(id);
  // console.log(title);
  let modal = document.getElementById("myDialog");
  modal.innerHTML = "";
  let div = document.createElement("div");
  div.innerHTML = `
  <form method="post" action="/edit-blog/${updateId}">
  <label for="fname">Title:</label><br>
  <input type="text" id="fname" name="firstName" value="${title}"><br>
  <label for="lname">Description:</label><br>
  <input type="text" id="lname" name="lastName" value="${description}"><br>
  <label for="lname">Date:</label><br>
  <input type="text" id="lname" name="dob" value="${date}"><br>
  <label for="lname">Author:</label><br>
  <input type="text" id="lname" name="dob" value="${username}"><br>
  <label for="lname">Date:</label><br>
  <input type="submit" value="Edit">
</form> 
`;
  modal.appendChild(div);
  document.getElementById("myDialog").showModal();
}

function displayData(data) {
  // alert(id)
  let container = document.getElementById("container");
  container.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    deleteId = data[i]._id;
    updateId = data[i]._id;
    username = data[i].username;
    description = data[i].description;
    title = data[i].title;
    date = data[i].date;
    console.log(data.length);
    let div = document.createElement("div");

    console.log(data[i].username);
    div.innerHTML = `
  <div class="card text-center mb-3">
  <div class="card-header">
 author: ${data[i].username}
  </div>
  <div class="card-body">
 Title: ${data[i].title}
  <div>
  <div class="card-body">
 Description: ${data[i].description}
  <div>
  </div>
  <div>
  <button class="btn btn-success" onclick="updateFunction( '${username}', '${description}' , '${title}', '${date}', '${updateId}')">Update</button>
  <button class="btn btn-danger" onclick="deleteFunction('${data[i]._id}')">Delete</button>
  </div>
  </div>
  <div class="card-footer text-muted">
Date:  ${data[i].date}
  </div>
</div>
`;
    container.appendChild(div);
  }

  //   list.appendChild(row);
}
