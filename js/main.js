"use strict";

const url ="http://10.114.34.106";

const loginWrapper = document.querySelector("#login-wrapper");
const loginForm = document.querySelector("#login-form");
const logOut = document.querySelector("#log-out");
const addUserForm = document.querySelector("#add-user-form");
const userInfo = document.querySelector("#user-info");

//Login
const hampurilainen = document.querySelector(".hampurilainen");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hampurilainen.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// Hidden



const lista = document.getElementById("btn1");
const alen = document.getElementById("btn2");

function viin() {
    const content1 = document.getElementById("content1");
    const content2 = document.getElementById("content2");
    if(content1.style.display === "none"){
        content1.style.display = "block";
        content2.style.display = "none";
    }else{
        content1.style.display ="none";
    }
}
function viin2() {
    const content1 = document.getElementById("content1");
    const content2 = document.getElementById("content2");
    if(content2.style.display === "none"){
        content2.style.display = "block";
        content1.style.display = "none";
    }else{
        content2.style.display ="none";
    }
}




loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(loginForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = await response.json();
    console.log('login response', json);
    if (!json.user) {
        alert(json.message);
    } else {
        // save token
        sessionStorage.setItem('token', json.token);

        // what hapens after login is succesful
        logOut.style.display = 'block';
        userInfo.innerHTML = `Hello ${json.user.Sahkoposti}`
    }
});

// Logout
logOut.addEventListener('click', async (evt) => {
    evt.preventDefault();
    try {
        const options = {
            headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
};
const response = await fetch(url + '/auth/logout', options);
const json = await response.json();
// Remove token
sessionStorage.removeItem('token');
// What happens after logout is succesful
alert("You have logged out succesfully");

logOut.style.display = 'none';
}
catch (e) {
    console.log("errori logoutissa", e.message);
}
});

// Registering user
addUserForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(addUserForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(url + '/auth/register', fetchOptions);
    const json = await response.json();
    // Save token
    sessionStorage.setItem('token', json.token);
    // What happens after registering is succesful
    loginWrapper.style.display = 'none';
    logOut.style.display = 'block';
});

//checking if token already exists
if (sessionStorage.getItem('token')) {
    loginWrapper.style.display = "none";
    logOut.style.display = "block";
}