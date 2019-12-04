"use strict";

const url ="http://10.114.34.106";

const loginWrapper = document.querySelector("#login-wrapper");
const loginForm = document.querySelector("#login-form");
const logOut = document.querySelector("#log-out");
const addUserForm = document.querySelector("#add-user-form");
const userInfo = document.querySelector("#user-info");

//Login
loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(loginForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
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
})

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