'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server
const ul = document.querySelector('ul');
const addForm = document.querySelector('#addForm');
const modForm = document.querySelector('#modForm');
//create product card
const createShoppingCard = (items) => {
  //clear ul
  ul.innerHTML='';
  items.forEach(tuote =>{
    //create li with DOM methods
    const h2 = document.createElement('h2');
    h2.innerHTML=tuote.name;
    const maara = document.createElement('p');
    maara.innerHTML = `Maara: ${tuote.maara}`;
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
      inputs[0].value = tuote.name;
      inputs[1].value = tuote.maara;
      inputs[2].value = tuote.tuote_id;
    });

    // delete selected list
    const delButton = document.createElement('button');
    delButton.innerHTML = 'Delete';
    delButton.addEventListener('click', async () => {
      const fetchOptions = {
        method: 'DELETE',
      };
      try {
        const response = await fetch(url + '/tuote/' + items.tuote_id, fetchOptions);
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
// AJAX call
const getTuote = async () => {
  try {
    const response = await fetch(url + '/tuote');
    const items = await response.json();
    createShoppingCard(items);
  }
  catch (e) {
    console.log(e.message());
  }
};


// submit add tuote form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd =serializeJson(addForm);
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(fd),

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
