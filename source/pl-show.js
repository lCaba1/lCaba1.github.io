import {  menu, headers, labels, defaults } from './pl-data.js'

const main = document.getElementById('main-container');
const fieldset = document.getElementById('order-fieldset');
const insertTo = fieldset.children[fieldset.children.length - 4]; // where to insert in fieldset

let totalPrice = 0;

let sectionId;      // "soup" "main" "drink"
let section;        // "section" tag with "id" = "menu-" + sectionId
let header;         // "h2" tag in section
let gridContainer;  // "div" tag in section with "class" = "grid-container"
let label;          // "label" tag in fieldset
let br;             // "br" tag
let select;         // "select" tag in fieldset
let option;         // "option" tag in select
let gridItem;       // "div" label in gridContainer with "class" = "grid-item"

menu.forEach(dish => {
    sectionId = dish.category;
    section = document.getElementById(`menu-${sectionId}`);

    // first time add: new section with header/gridContainer to main, new label/select with option to fieldset
    if (!section) {
        section = document.createElement('section');
        section.id = `menu-${sectionId}`;
        main.insertBefore(section, main.lastElementChild);

        header = document.createElement('h2');
        header.textContent = headers[sectionId];
        section.appendChild(header);

        gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';
        section.appendChild(gridContainer);

        label = document.createElement('label');
        label.textContent = labels[sectionId];
        label.setAttribute('for', `order-${dish.category}`);
        fieldset.insertBefore(label, insertTo);

        br = document.createElement('br');
        fieldset.insertBefore(br, insertTo);

        select = document.createElement('select');
        select.name = `order-${dish.category}`;
        select.id = `order-${dish.category}`;
        select.required = true;
        fieldset.insertBefore(select, insertTo);

        br = document.createElement('br');
        fieldset.insertBefore(br, insertTo);

        option = document.createElement('option');
        option.value = '';
        option.textContent = defaults[sectionId];
        option.disabled = true;
        option.selected = true;
        option.hidden = true;
        select.appendChild(option);
    }

    gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.setAttribute('data-dish', dish.keyword);
    gridContainer = section.querySelector('div');
    gridContainer.appendChild(gridItem);

    const image = document.createElement('img');
    image.src = dish.image;
    image.alt = dish.keyword;
    gridItem.appendChild(image);

    const price = document.createElement('p');
    price.textContent = dish.price;
    gridItem.appendChild(price);

    const name = document.createElement('p');
    name.textContent = dish.name;
    gridItem.appendChild(name);

    const count = document.createElement('p');
    count.textContent = dish.count;
    gridItem.appendChild(count);

    const button = document.createElement('button');
    button.textContent = 'Добавить';
    gridItem.appendChild(button);

    select = document.getElementById(`order-${sectionId}`);

    const option1 = document.createElement('option');
    option1.value = dish.keyword;
    option1.textContent = dish.name + ' ' + dish.price + 'р';
    select.appendChild(option1);

    button.addEventListener('click', () => {
        totalPrice += price;
    });
});


