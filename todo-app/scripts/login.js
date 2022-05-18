import { Authenticator } from "./firebase.js";

var auth = new Authenticator();
var loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = loginForm.elements['email'].value;
    let password = loginForm.elements['password'].value;

    if (!auth.validateEmail(email)) {
        alert("Incorrect email input");
        return
    }
    if (!auth.validatePassword(password)) {
        alert("Password too short");
        return
    }
    
    loginForm.reset();
    let res = auth.login(email, password);
    res.then((val) => {
        if (val instanceof Error) {
            alert('Login error');
        }
        else {
            let uid = val["user"]["uid"];
            sessionStorage.setItem("uid", uid);
            window.location = "main.html";
        }
    })
})