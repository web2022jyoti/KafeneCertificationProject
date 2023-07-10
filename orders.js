let loginCredentials = localStorage.getItem("loginStatus");
if (loginCredentials == null || loginCredentials == "false") {
  location.assign("./index.html");
}

let tableData = document.getElementById("table-data");

// dynamically creating table rows
function createTableRow(data) {
  tableData.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    tableData.innerHTML += `
        <tr>
          <td class="order-id">${data[i].id}</td>
          <td class="order-customer-name">${data[i].customerName}</td>
          <td class="order-date">${data[i].orderDate} <br>
            <span class="order-time">${data[i].orderTime}</span>
          </td>
          <td class="order-amount">$${data[i].amount}</td>
          <td class="order-status">${data[i].orderStatus}</td>
        </tr>`;
  }
  document.getElementById("table-count").innerHTML = `count: ${data.length} `;
}

// fetching orders data
var orderData;
$.ajax({
  url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
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

// Filters-options
var filteredData = [];
function filterOptions() {
  for (var i = 0; i < 4; i++) {
    let checkStatus = document.getElementById(`check-${i}`);
    if (checkStatus.checked === true) {
      //pushing label Values of checkboxes inside filteredData array
      filteredData.push(checkStatus.name);
    }
  }
  getCheckedItems(orderData, filteredData);
  filteredData = [];
}

$(".check-boxes").on("change", function () {
  filterOptions(orderData);
});


function getCheckedItems(orderData, filteredData) {
  let data = orderData;
  var getCheckedRows = data.filter(function (store) {
    //returning data with orderStatus found (i.e=> >-1)
    return filteredData.indexOf(store.orderStatus) > -1;
  });
  createTableRow(getCheckedRows);
  getCheckedRows = [];
}

document.getElementById("sign-out").addEventListener("click", function () {
  localStorage.setItem("loginStatus", false);
  location.assign("./index.html");
});