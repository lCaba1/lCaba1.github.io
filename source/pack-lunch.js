import { menu } from './data.js'

menu.sort((l, r) => l.name.localeCompare(r.name));

const fieldset = document.getElementById('order-fieldset');

menu.forEach(dish => {
    const category = dish.category;
    const section = document.getElementById(`menu-${category}`);
    section.hidden = false;

    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.setAttribute('data-dish', dish.keyword);
    const gridContainer = section.querySelector('div');
    gridContainer.appendChild(gridItem);

    const image = document.createElement('img');
    image.src = dish.image;
    image.alt = dish.keyword;
    gridItem.appendChild(image);

    const price = document.createElement('p');
    price.textContent = dish.price + 'р';
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

    const select = document.getElementById(`order-${category}`);
    select.hidden = false;

    const label = document.querySelector(`label[for='order-${category}']`);
    label.hidden = false;

    const option = document.createElement('option');
    option.value = dish.keyword;
    option.textContent = dish.name + ' ' + dish.price + 'р';
    select.appendChild(option);

    button.addEventListener('click', (event) => {
        fieldset.querySelector('div').hidden = false;
        fieldset.querySelector(':scope > label').hidden = true;
        document.querySelector(`select[id='order-${dish.category}']`).value = dish.keyword;
        document.querySelector(`select[id='order-${dish.category}']`).dispatchEvent(new Event('change'));
    });
});

function dishSelectChange(category, etv) {
    const lastDish = document.querySelector(`#menu-${category}`).querySelector('.script-hover');
    let lastDishName = '';
    let lastDishPrice = 0;
    if (lastDish) {
        lastDish.classList.remove('script-hover');
        lastDishName = lastDish.dataset.dish;
        lastDishPrice = menu.find(item => item.keyword == lastDishName).price;
    }

    document.querySelector(`[data-dish="${etv}"]`).classList.add('script-hover');

    document.querySelector('#order-price').textContent =
        parseInt(document.querySelector('#order-price').textContent, 10)
        + menu.find(item => item.keyword == etv).price
        - lastDishPrice
        + 'р';
}

document.querySelector('#order-soup').addEventListener('change', (event) => {
    dishSelectChange('soup', event.target.value);
});
document.querySelector('#order-main').addEventListener('change', (event) => {
    dishSelectChange('main', event.target.value);
});
document.querySelector('#order-drink').addEventListener('change', (event) => {
    dishSelectChange('drink', event.target.value);
});







const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2');
const inputTime = document.getElementById('time');
const form = document.getElementById('form');
function updateInputState() {
    if (radio2.checked) {
        inputTime.disabled = false;
        inputTime.setAttribute('required', 'required');
    } else {
        inputTime.disabled = true;
        inputTime.removeAttribute('required');
        inputTime.value = '';
    }
}
radio1.addEventListener('change', updateInputState);
radio2.addEventListener('change', updateInputState);
form.addEventListener('reset',
    function () {
        setTimeout(updateInputState, 0)
    }
);
updateInputState();
