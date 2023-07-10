let loginCredentials = localStorage.getItem("loginStatus");
if (loginCredentials == "false" || loginCredentials == null) {

} else {
    location.assign("./orders.html");
}

var userName = document.querySelector(".login-form-username");
var userPassword = document.querySelector(".login-form-password");
let submitBtn = document.getElementById("submit");
let form = $("#login-form");
form.submit(function (e) {
    e.preventDefault();

    const user = userName.value;
    const pwd = userPassword.value;
    var mObj = {
        username:"admin",
        password:"admin",
    };
    if (user === "admin" && user !== "" && pwd !== "") {
        console.log("yes");
        alert("Login Successful");
        localStorage.setItem("loginStatus", JSON.stringify(mObj));
        location.assign("./orders.html");
    }
    else {
        alert("Please Enter valid credentials!");
    }
})

document.getElementById("sign-out").style.display = "none";