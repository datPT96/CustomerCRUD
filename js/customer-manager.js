function start() {
  getListCustomer(renderCustomer);

  handleCreate();
  handleUpdate();
}

start();

// Get customer list data
function getListCustomer(callback) {
  var url = "http://localhost:8080/api/v1/customer/all";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

// Get customer by id
function getCustomerById(id, callback) {
  var url = "http://localhost:8080/api/v1/customer?id=" + id;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

// Send add customer to db
function addCustomer(data, callback) {
  var url = "http://localhost:8080/api/v1/customer/add";
  var object = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(url, object)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

// Send update customer to db
function updateCustomer(id, data, callback) {
  var url = "http://localhost:8080/api/v1/customer/update?id=" + id;
  var object = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(url, object)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

// Send delete customer form db
function deleteCustomer(id) {
  var url = "http://localhost:8080/api/v1/customer/delete?id=" + id;
  var object = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url, object)
    .then(function (response) {
      return response.json;
    })
    .then(function () {
      getListCustomer(renderCustomer);
    });
}

// render list customer to html
// an array customers
function renderCustomer(customers) {
  var listCustomer = document.querySelector("#listCustomers");
  var htmls = customers.map(function (customer) {
    var isActive = customer.active;
    if (isActive) {
      isActive = "active";
    } else {
      isActive = "inactive";
    }
    return `
          <tr>
              <th scope="row">${customer.id}</th>
              <td>${customer.firstName}</td>
              <td>${customer.lastName}</td>
              <td>${customer.email}</td>
              <td>${isActive}</td>
              <td>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update-customer" onclick="getCustomerById(${customer.id}, renderFormUpdate)"><i class="fa-solid fa-pencil"></i></button>
              <button type="button" class="btn btn-danger" onclick="deleteCustomer(${customer.id})"><i class="fa-solid fa-trash"></i></button>
              </td>
          </tr>
    `;
  });
  listCustomer.innerHTML = htmls.join("");
}

// Get data from input form
function handleCreate() {
  var clickCreateBtn = document.querySelector("#click-add");

  clickCreateBtn.onclick = function () {
    var firstName = document.querySelector('input[name="firstName"]').value;
    var lastName = document.querySelector('input[name="lastName"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var active = document.querySelector('input[name="active"]:checked').value;

    var formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      active: active,
    };
    addCustomer(formData, function () {
      getListCustomer(renderCustomer);
    });
  };
}

// Render form update to html
function renderFormUpdate(customer) {
  var formUpdate = document.querySelector("#update-customer-form");
  var isActive = customer.active;
  var formHtml = `
                <label for="idCustomer" class="form-label">Id</label>
                <input type="text" class="form-control mb-2" name="idCustomer" id="idCustomer" value="${customer.id}" disabled>
                <label for="first-name" class="form-label">First Name</label>
                <input type="text" name="firstNameUpdate" class="form-control mb-2" id="first-name" value="${customer.firstName}" required>
                <label for="last-Name" class="form-label">Last Name</label>
                <input type="text" name="lastNameUpdate" class="form-control mb-2" id="last-name" value="${customer.lastName}" required>
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control mb-2" name="emailUpdate" id="email" value="${customer.email}" required>
                <label class="form-label">Status:</label>
                <input type="radio" class="form-check-input" name="activeUpdate" id="isActive" value="true">
                <label for="isActive">Active</label>
                <input type="radio" class="form-check-input" name="activeUpdate" id="isInActive" value="false">
                <label for="isInActive">Inactive</label>
                `;
  formUpdate.innerHTML = formHtml;
  // Check customer status to show render radio button
  if(isActive){
    document.querySelector('#isActive').setAttribute("checked", "true");
  } else{
    document.querySelector('#isInActive').setAttribute("checked", "true");
  }

}

// Get update data form input form
function handleUpdate() {
  var saveChangeBtn = document.querySelector("#save-changes");
  saveChangeBtn.onclick = function () {
    var idCustomer = document.querySelector('input[name="idCustomer"]').value;
    var firstName = document.querySelector('input[name="firstNameUpdate"]').value;
    var lastName = document.querySelector('input[name="lastNameUpdate"]').value;
    var email = document.querySelector('input[name="emailUpdate"]').value;
    var active = document.querySelector('input[name="activeUpdate"]:checked').value;
    
    var formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      active: active,
    };
    updateCustomer(idCustomer, formData, function(){
      getListCustomer(renderCustomer);
    });
  };
}
