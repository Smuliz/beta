'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server
const ul = document.querySelector('ul');
const addForm = document.querySelector('#addItemForm');
const modForm = document.querySelector('#modItemForm');
//create product card
const createShoppingCard = (items) => {
  //clear ul
  items.forEach((item) =>{
    //create li with DOM methods
    const h2 = document.createElement('h2');
    h2.innerHTML= item.name;
    const maara = document.createElement('p');
    maara.innerHTML = `Maara: ${item.maara}`;
    // add selected cat's values to modify form
    const modButton = document.createElement('button');
    modButton.innerHTML = 'Modify';
    modButton.addEventListener('click', () => {
      const inputs = modForm.querySelectorAll('input');
      inputs[0].value = item.name;
      inputs[1].value = item.maara;
      inputs[3].value = item.item_id;
    });

    // delete selected cat
    const delButton = document.createElement('button');
    delButton.innerHTML = 'Delete';
    delButton.addEventListener('click', async () => {
      const fetchOptions = {
        method: 'DELETE',
      };
      try {
        const response = await fetch(url + '/shoppingList/' + items.item_id, fetchOptions);
        const json = await response.json();
        console.log('delete response', json);
        getShoppingCart();
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
const getShoppingCart = async () => {
  try {
    const response = await fetch(url + '/shoppingCart');
    const items = await response.json();
    createShoppingCard(items);
  }
  catch (e) {
    console.log(e.message());
  }
};
getShoppingCart();

// submit add cat form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: 'POST',
    body: fd,
  };
  const response = await fetch(url + '/shoppingCart', fetchOptions);
  const json = await response.json();
  console.log('add response', json);
  getShoppingCart();
});


