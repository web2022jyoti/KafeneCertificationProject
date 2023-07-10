let loginCredentials = localStorage.getItem("loginStatus");
console.log(loginCredentials)
if (loginCredentials == null || loginCredentials == "false") {
  location.assign("./index.html");
}

// fetch orders data
var orderData;
$.ajax({
  url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
  type: "GET",
  success: function (response) {
    console.log(response);
    orderData = response
    createTableRow(orderData);
  },
  error: function (error) {
    console.log(error);
  }
})

let tableData = document.getElementById("table-data");
// dynamically creating table rows
function createTableRow(data) {
  tableData.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    tableData.innerHTML += `
            <tr class="products-table-row">
                <td class="product-id u-brown">${data[i].id}</td>
                <td class="product-name">${data[i].medicineName}</td>
                <td class="product-brand u-brown">${data[i].medicineBrand}</td>
                <td class="expiry-date">${data[i].expiryDate}</td>
                <td class="unit-price u-brown">$${data[i].unitPrice}</td>
                <td class="product-stock u-brown">${data[i].stock}</td>
            </tr>`;
  }
  document.getElementById("table-count").innerHTML = `count: ${data.length} `;
  expiredItems = [];
  lowStockItems = [];
}

// Filters-options
var filteredData = [];
function filterOptions() {
  for (var i = 0; i < 2; i++) {
    let checkStatus = document.getElementById(`check-${i}`);
    if (checkStatus.checked === true) {
      //pushing label Values of checkboxes inside filteredData array
      filteredData.push(checkStatus.name);
    }
  }
  getFilteredItems(filteredData);
  filteredData = [];
}

//getting data as per checkBox Selected
function getFilteredItems(data) {
  if (data.length == 2) {
    createTableRow(orderData);
  }
  else if (data.length == 1) {
    if (data[0] == "expired") {
      var newData = getExpiredItems(orderData);//will return only expired items
      createTableRow(newData);
    }
    else {
      var newData = getLowStockItems(orderData); //will return only low stock items
      createTableRow(newData);
    }
  }
  else {
    var newData = [];
    createTableRow(newData);
  }
}

//Getting Low-stock Items
var lowStockItems = [];
function getLowStockItems(orderData) {
  for (var i = 0; i < orderData.length; i++) {
    if (orderData[i].stock < 100) {
      lowStockItems.push(orderData[i]);
    }
  }
  return lowStockItems;
}

//Getting Expired Items
var expiredItems = [];
function getExpiredItems(orderData) {
  let today = new Date();
  today.setHours(0, 0, 0, 0); //to have single value based on hrs,min,sec,ms
  for (let i = 0; i < orderData.length; i++) {
    const dateFormat = orderData[i].expiryDate;

    var varDate = new Date(dateFormat); //in dd-mm-YYYY format

    varDate.setHours(0, 0, 0, 0); ////to have single value based on hrs,min,sec,ms
    if (varDate < today) {
      expiredItems.push(orderData[i]);
    }
  }
  return expiredItems;
}

$(".check-boxes").on("change", function () {
  filterOptions(orderData);
});

document.getElementById("sign-out").addEventListener("click", function () {
  localStorage.setItem("loginStatus", false);
  location.assign("./index.html");
});