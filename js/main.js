'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server
const ul = document.querySelector('ul.tuote');
const ul2 = document.querySelector('ul.shops');
const addForm = document.querySelector('#addForm');
const modForm = document.querySelector('#modForm');
const imageModal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#image-modal img');
const close = document.querySelector('#image-modal a');

//create product card
const createShoppingCard = (items) => {
  //clear ul
  ul.innerHTML='';
  items.forEach(tuote =>{
    console.log(tuote);
    //create li with DOM methods
    const h2 = document.createElement('h2');
    h2.innerHTML=tuote.TuoteNimi;
    const maara = document.createElement('p');
    maara.innerHTML = `Maara: ${tuote.TuoteMaara}`;
    // add selected list's values to modify form
    const modButton = document.createElement('button');
    modButton.innerHTML = 'Modify';
    //add checkButton
    const checkButton = document.createElement('button');
    checkButton.innerHTML = 'Check';
    checkButton.addEventListener('click', () =>{
      //on click lineThrough
    });
    modButton.addEventListener('click', () => {
      const inputs = modForm.querySelectorAll('input');
      inputs[0].value = tuote.TuoteNimi;
      inputs[1].value = tuote.TuoteMaara;
      inputs[2].value = tuote.TuoteNumero;
    });


    // delete selected list
    const delButton = document.createElement('button');
    delButton.innerHTML = 'Delete';
    delButton.addEventListener('click', async () => {
      const fetchOptions = {
        method: 'DELETE',
      };
      try {
        const response = await fetch(url + '/tuote/' + tuote.TuoteNumero, fetchOptions);
        const json = await response.json();
        console.log('delete response', json);
        console.log(getTuote());
        getTuote();
      }
      catch (e) {
        console.log(e.message());
      }
    });

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(maara);
    li.appendChild(modButton);
    li.appendChild(delButton);
    ul.appendChild(li);
  });
};
//Create shops list
const createShopsList = (items) => {
  //clear ul
  ul2.innerHTML='';
  items.forEach(kauppa =>{
    console.log(kauppa);
    //create li with DOM methods
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + kauppa.filename;
    img.alt = kauppa.name;
    img.classList.add('resp');

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
    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML=kauppa.KauppaNimi;
    const osoite = document.createElement('p');
    osoite.innerHTML = `Osoite: ${kauppa.Osoite}`;
    // add selected list's values to modify form
    const modButton = document.createElement('button');
    modButton.innerHTML = 'Modify';

    modButton.addEventListener('click', () => {
      const inputs = modForm.querySelectorAll('input');
      inputs[0].value = kauppa.KauppaNimi;
      inputs[1].value = kauppa.Osoite;
      inputs[2].value = kauppa.KauppaNumero;
    });


    // delete selected list
    const delButton = document.createElement('button');
    delButton.innerHTML = 'Delete';
    delButton.addEventListener('click', async () => {
      const fetchOptions = {
        method: 'DELETE',
      };
      try {
        const response = await fetch(url + '/kauppa/' + kauppa.KauppaNumero, fetchOptions);
        const json = await response.json();
        console.log('delete response', json);
        getKaupat();
      }
      catch (e) {
        console.log(e.message());
      }
    });

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(osoite);
    li.appendChild(modButton);
    li.appendChild(delButton);
    ul2.appendChild(li);
  });
};
// close modal
close.addEventListener('click', (evt) => {
  evt.preventDefault();
  imageModal.classList.toggle('hide');
});
// AJAX call kauppa
const getKaupat = async () => {
  console.log('getKauppa token ', sessionStorage.getItem('token'));

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/kauppa',options);
    const items = await response.json();
    console.log(items);
    createShopsList(items);
  }
  catch (e) {
    console.log(e.message);
  }
};
getKaupat();
// AJAX call tuote
const getTuote = async () => {
  console.log('getTuote token ', sessionStorage.getItem('token'));

  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/tuote',options);
    const items = await response.json();
    createShoppingCard(items);
  }
  catch (e) {
    console.log(e.message);
  }
};
getTuote();
// submit add tuote form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd =serializeJson(addForm);
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(fd),
    headers:{'Content-Type':'application/json'},

  };
  console.log(fetchOptions);
  const response = await fetch(url + '/tuote', fetchOptions);
  const json = await response.json();
  console.log('add response', json);
  getTuote();
});

// submit modify form
modForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(modForm);
  const fetchOptions = {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  console.log(fetchOptions);
  const response = await fetch(url + '/tuote', fetchOptions);
  const json = await response.json();
  console.log('modify response', json);
  getTuote();
});
