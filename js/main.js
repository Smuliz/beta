"use strict";

const url = "http://localhost:3000"; // change url when uploading to server
const ul = document.querySelector("ul.tuote");
const ul2 = document.querySelector("ul.shops");
const ul3 = document.querySelector("ul.ale");
const addForm = document.querySelector("#addForm");
const modForm = document.querySelector("#modForm");
const createListaForm = document.querySelector("#createListForm");
//Samulin koodi
const loginWrapper = document.querySelector("#login-wrapper");
const loginForm = document.querySelector("#login-form");
const logOut = document.querySelector("#log-out");
const addUserForm = document.querySelector("#add-user-form");
const userInfo = document.querySelector("#user-info");
const addAlennus = document.querySelector("#add-alennus");

//Login
loginForm.addEventListener("submit", async evt => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(data)
  };

  const response = await fetch(url + "/auth/login", fetchOptions);
  //console.log(response);
  const json = await response.json();
  //console.log('login response', json);
  if (!json.user.Sahkoposti) {
    alert("TESTI");
  } else {
    // save token
    sessionStorage.setItem("token", json.token);

    // what hapens after login is succesful
    logOut.style.display = "block";
    userInfo.innerHTML = "Hello" + json.user.Sahkoposti;
    alert("login success");
    getTuote();
    getKaupat();
  }
});

// Logout
logOut.addEventListener("click", async evt => {
  evt.preventDefault();
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    };
    const response = await fetch(url + "/auth/logout", options);
    const json = await response.json();
    // Remove token
    sessionStorage.removeItem("token");
    // What happens after logout is succesful
    alert("You have logged out succesfully");

    logOut.style.display = "none";
    loginWrapper.style.display = "block";
  } catch (e) {
    console.log("errori logoutissa", e.message);
  }
});

// Registering user
addUserForm.addEventListener("submit", async evt => {
  evt.preventDefault();
  const data = serializeJson(addUserForm); // tai serializeJson
  //console.log("datamuuttuja main.js - registering ", data)
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) //JSON.stringify
  };
  //console.log("JSON TESTI", JSON.stringify(data));
  //console.log("fetcOptions", fetchOptions);
  const response = await fetch(url + "/auth/register", fetchOptions);
  //console.log("fetch response", response);
  const json = await response.json();

  // Save token
  sessionStorage.setItem("token", json.token);
  // What happens after registering is succesful
  loginWrapper.style.display = "none";
  logOut.style.display = "block";
});

//checking if token already exists
if (sessionStorage.getItem("token")) {
  loginWrapper.style.display = "none";
  logOut.style.display = "block";
}

//Alennuksen vastaanotto
addAlennus.addEventListener("submit", async evt => {
  evt.preventDefault();
  //console.log(sessionStorage.getItem('token'));
  const fd = new FormData(addAlennus);
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    body: fd
  };
  const response = await fetch(url + "/alennus", fetchOptions);
  const json = await response.json();
  //console.log('alennus add main.js', json);
});

//AJAX call alennus
const getAlennus = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/alennus", options);
    console.log(response);
    const alennukset = await response.json();
    console.log("ALENNUKSET", alennukset);
    createAleList(alennukset);
  } catch (e) {
    console.log("ajax call getAlennus in main.js", e.message);
  }
};
getAlennus();


//Create alennus list
const createAleList = items => {
  console.log("ITEMEJÄ", items);
  ul3.innerHTML = "";
  items.forEach(Alennus => {
    //console.log(kauppa);
    //create li with DOM methods
    const img = document.createElement("img");
    img.src = url + "/thumbnails/" + Alennus.KuvaNimi;
    img.alt = "kuva alennuskesta";
    img.classList.add("resp");

    /*// open large image when clicking image
      img.addEventListener('click', () => {
        modalImage.src = url + '/' + kauppa.filename;
        imageModal.alt = kauppa.name;
        imageModal.classList.toggle('hide');
        try {
          const coords = JSON.parse(kauppa.coords);
          // console.log(coords);
          addMarker(coords);
        }
        catch (e) {
        }
      });
       */
    const figure = document.createElement("figure").appendChild(img);

    const h2 = document.createElement("h2");
    h2.innerHTML = Alennus.KauppaNimi;
    const kauppa = document.createElement("p");
    kauppa.innerHTML = `Kauppa: ${Alennus.Kauppanimi}`;
    const li = document.createElement("li");
    li.classList.add("light-border");
    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(kauppa);
    // // add selected list's values to modify form
    // const modButton = document.createElement('button');
    // modButton.innerHTML = 'Modify';

    // modButton.addEventListener('click', () => {
    //   const inputs = modForm.querySelectorAll('input');
    //   inputs[0].value = kauppa.KauppaNimi;
    //   inputs[1].value = kauppa.Osoite;
    //   inputs[2].value = kauppa.KauppaNumero;
  });
};

// Miken koodi
//create product card
const createShoppingCard = items => {
  //clear ul
  ul.innerHTML = "";
  items.forEach(tuote => {
    //console.log(tuote);
    //create li with DOM methods
    const h2 = document.createElement("h2");
    h2.innerHTML = tuote.TuoteNimi;
    const maara = document.createElement("p");
    maara.innerHTML = `Maara: ${tuote.TuoteMaara}`;
    // add selected list's values to modify form
    const modButton = document.createElement("button");
    modButton.innerHTML = "Modify";
    //add checkButton
    const checkButton = document.createElement("button");
    checkButton.innerHTML = "Check";
    checkButton.addEventListener("click", () => {
      //on click lineThrough
    });
    modButton.addEventListener("click", () => {
      const inputs = modForm.querySelectorAll("input");
      inputs[0].value = tuote.TuoteNimi;
      inputs[1].value = tuote.TuoteMaara;
      inputs[2].value = tuote.TuoteNumero;
    });

    // delete selected list
    const delButton = document.createElement("button");
    delButton.innerHTML = "Delete";
    delButton.addEventListener("click", async () => {
      const fetchOptions = {
        method: "DELETE"
      };
      try {
        const response = await fetch(
          url + "/tuote/" + tuote.TuoteNumero,
          fetchOptions
        );
        const json = await response.json();
        //console.log('delete response', json);
        getTuote();
      } catch (e) {
        console.log(e.message);
      }
    });

    const li = document.createElement("li");
    li.classList.add("light-border");

    li.appendChild(h2);
    li.appendChild(maara);
    li.appendChild(modButton);
    li.appendChild(delButton);
    ul.appendChild(li);
  });
};
//Create shops list
const createShopsList = items => {
  //clear ul
  ul2.innerHTML = "";
  items.forEach(kauppa => {
    //console.log(kauppa);
    //create li with DOM methods
    const img = document.createElement("img");
    img.src = url + "/thumbnails/" + kauppa.filename;
    img.alt = kauppa.name;
    img.classList.add("resp");

    /*// open large image when clicking image
    img.addEventListener('click', () => {
      modalImage.src = url + '/' + kauppa.filename;
      imageModal.alt = kauppa.name;
      imageModal.classList.toggle('hide');
      try {
        const coords = JSON.parse(kauppa.coords);
        // console.log(coords);
        addMarker(coords);
      }
      catch (e) {
      }
    });
     */
    const figure = document.createElement("figure").appendChild(img);

    const h2 = document.createElement("h2");
    h2.innerHTML = kauppa.KauppaNimi;
    const osoite = document.createElement("p");
    osoite.innerHTML = `Osoite: ${kauppa.Osoite}`;
    // add selected list's values to modify form
    const modButton = document.createElement("button");
    modButton.innerHTML = "Modify";

    modButton.addEventListener("click", () => {
      const inputs = modForm.querySelectorAll("input");
      inputs[0].value = kauppa.KauppaNimi;
      inputs[1].value = kauppa.Osoite;
      inputs[2].value = kauppa.KauppaNumero;
    });

    // delete selected list
    const delButton = document.createElement("button");
    delButton.innerHTML = "Delete";
    delButton.addEventListener("click", async () => {
      const fetchOptions = {
        method: "DELETE"
      };
      try {
        const response = await fetch(
          url + "/kauppa/" + kauppa.KauppaNumero,
          fetchOptions
        );
        const json = await response.json();
        // console.log('delete response', json);
        getKaupat();
      } catch (e) {
        console.log(e.message());
      }
    });

    const li = document.createElement("li");
    li.classList.add("light-border");

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(osoite);
    li.appendChild(modButton);
    li.appendChild(delButton);
    ul2.appendChild(li);
  });
};
// close modal
// close.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   imageModal.classList.toggle('hide');
// });
// AJAX call kauppa
const getKaupat = async () => {
  //console.log('getKauppa token ', sessionStorage.getItem('token'));

  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    };
    const response = await fetch(url + "/kauppa", options);
    const items = await response.json();
    //console.log(items);
    createShopsList(items);
  } catch (e) {
    console.log(e.message);
  }
};
getKaupat();

// AJAX call tuote
const getTuote = async () => {
  //console.log('getTuote token ', sessionStorage.getItem('token'));

  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    };
    const response = await fetch(url + "/tuote", options);
    const items = await response.json();
    createShoppingCard(items);
  } catch (e) {
    console.log(e.message);
  }
};
getTuote();
// submit add tuote form
addForm.addEventListener("submit", async evt => {
  evt.preventDefault();
  const fd = serializeJson(addForm);
  const fetchOptions = {
    method: "POST",
    body: JSON.stringify(fd),
    headers: { "Content-Type": "application/json" }
  };
  //console.log(fetchOptions);
  const response = await fetch(url + "/tuote", fetchOptions);
  const json = await response.json();
  //console.log('add response', json);
  getTuote();
});

//submit lista create
createListaForm.addEventListener("submit", async evt => {
  evt.preventDefault();
  const fd = serializeJson(createListaForm);
  const fetchOptions = {
    method: "POST",
    body: JSON.stringify(fd),
    headers: { "Content-Type": "application/json" }
  };
  //console.log("lista create fetchOptions", fetchOptions);
  const response = await fetch(url + "/lista", fetchOptions);
  const json = await response.json();
  //console.log('add response', json);
});

// submit modify form
modForm.addEventListener("submit", async evt => {
  evt.preventDefault();
  const data = serializeJson(modForm);
  const fetchOptions = {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  };

  //console.log(fetchOptions);
  const response = await fetch(url + "/tuote", fetchOptions);
  const json = await response.json();
  //console.log('modify response', json);
  getTuote();
});
