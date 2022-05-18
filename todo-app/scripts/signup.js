import { Authenticator } from "./firebase.js";

var auth = new Authenticator();
var signupForm = document.getElementById("login-form");
signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let email = signupForm.elements['email'].value;
    let username = signupForm.elements['username'].value;
    let password = signupForm.elements['password'].value;

    if (!auth.validateEmail(email)) {
        alert("Incorrect email input");
        return
    }
    if (!auth.validatePassword(password)) {
        alert("Password too short");
        return
    }
    
    signupForm.reset();
    let res = auth.signup(email, password);
    res.then((val) => {
        if (val instanceof Error) {
            alert('Signup error');
        }
        else {
            let uid = val["user"]["uid"];
            sessionStorage.setItem("uid", uid);
            window.location = "main.html";
        }
    })
})