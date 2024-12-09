import { menu } from './data.js'
import { headers } from './data.js';

const main = document.getElementById('main-container');

menu.forEach(dish => {
    const sectionId = dish.category;
    let currentSection = document.getElementById(sectionId);

    if (!currentSection) {
        const newSection = document.createElement('section');
        newSection.id = sectionId;
        main.insertBefore(newSection, main.lastElementChild);

        const header = document.createElement('h2');
        header.textContent = headers[sectionId];
        newSection.appendChild(header);

        const newGridContainer = document.createElement('div');
        newGridContainer.className = 'grid-container';
        newSection.appendChild(newGridContainer);

        currentSection = newSection;
    }

    const newGridItem = document.createElement('div');
    newGridItem.className = 'grid-item';
    newGridItem.setAttribute('data-dish', dish.keyword);
    const currentGridContainer = currentSection.querySelector('div');
    currentGridContainer.appendChild(newGridItem);

    const currentGridItem = newGridItem;

    const image = document.createElement('img');
    image.src = dish.image;
    image.alt = dish.keyword;
    currentGridItem.appendChild(image);

    const price = document.createElement('p');
    price.textContent = dish.price;
    currentGridItem.appendChild(price);

    const name = document.createElement('p');
    name.textContent = dish.name;
    currentGridItem.appendChild(name);

    const count = document.createElement('p');
    count.textContent = dish.count;
    currentGridItem.appendChild(count);

    const button = document.createElement('button');
    button.textContent = 'Добавить';
    currentGridItem.appendChild(button);
});

