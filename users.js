let loginCredentials = localStorage.getItem("loginStatus");
if (loginCredentials == null || loginCredentials == "false") {
    location.assign("./index.html");
}

var tableData = [];
$.ajax({
    url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
    type: "GET",
    success: function (response) {
        console.log(response);
        tableData = response;
        rowMaking(tableData);
    },
    error: function (error) {
        console.log(error);
    }
})

//function to render user-data into DOM Tree
let tableBody = document.getElementById("tableBody");
function rowMaking(data) {
    tableBody.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        tableBody.innerHTML += `
            <tr>
                <td class="dimColor">${data[i].id}</td>
                <td><img src="${data[i].profilePic}" alt="profilePic"></td>
                <td class="dimColor">${data[i].fullName}</td>
                <td>${data[i].dob}</td>
                <td class="dimColor">${data[i].gender}</td>
                <td class="dimColor">${data[i].currentCity}, ${data[i].currentCountry}</td>
            </tr>`
    }
}

//Selecting SearchBox by its ID
let inputVal = document.getElementById("search-box");
$(`#cross`).click(() => { //to clear typed data in searchBox
    inputVal.value = "";
});

$(`#reset`).click(() => { //to Reset searchBox and load back users data
    inputVal.value = "";
    rowMaking(tableData);
});

//to get count of searchBox input value and if its greater than 0, display icon X, else keep hidden
setInterval(() => {
    var search = document.getElementById("search-box").value.length;
    if (search > 0) {
        $(`#cross`).show();
    }
    else {
        $(`#cross`).hide();
    }
}, 0);

document.getElementById("searchForm").onsubmit = (e) => {
    e.preventDefault();
    const value = inputVal.value;
    if (value.length >= 2) {
        let filteredData = search(value, tableData);
        rowMaking(filteredData);
    }
    else {
        alert("Please enter at least 2 characters");
        rowMaking(tableData);
    }
};

//Main Search Function to filter out names based on Value Entered by client.
function search(value, data) {
    var newData = [];
    for (var i = 0; i < data.length; i++) {
        value = value.toLowerCase();
        var userFullName = data[i].fullName.toLowerCase();
        if (userFullName.includes(value)) {
            newData.push(data[i]);
        }
    }
    return newData;
}

document.getElementById("sign-out").addEventListener("click", function () {
    localStorage.setItem("loginStatus", false);
    location.assign("./index.html");
});