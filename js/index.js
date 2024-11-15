// const usedCar = require("./usedCars");
import { usedCars } from './usedCars.js';

// usedCars[0].color
// usedCars[0].gasMileage
// usedCars[0].make
// usedCars[0].mileage
// usedCars[0].model
// usedCars[0].price
// usedCars[0].year

// The div that holds the car cards
let result = document.querySelector("#result");
let arrMake = document.querySelectorAll(".car-make");
let arrColor = document.querySelectorAll(".car-color");

// From https://stackoverflow.com/a/2901298
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

let capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
}

// returns a string containing the html code for displaying a card. 
let createCard = (car, id) => {
    // console.log(`createCard() ${car.year}`);
    return `
        <div id="${id}" class="card">
            <h3>${car.year} ${car.make} ${car.model}</h1>
            <p>$${numberWithCommas(car.price)}</p>
            <p>${numberWithCommas(car.mileage)} miles</p>
            <div id="more-${id}" style="display:none">
                <p>Color: ${car.color}</p>
                <p>${car.gasMileage}</p>
            </div>
            <p><button id="more-text-${id}" onClick='function more() {
                    info = document.querySelector("#more-${id}");
                    text = document.querySelector("#more-text-${id}");
                    if (info.style.display === "block") {
                        info.style.display = "none";
                        text.innerHTML = "more details...";
                    } else {
                        info.style.display = "block";
                        text.innerHTML = "...less details";
                    }
                }; more()'>more details...</button></p>
        </div>
    `
    // onClick idea from https://www.w3schools.com/howto/howto_js_read_more.asp
}

let filterCards = () => {
    let arrReturn = [];
    let arrCheckedBoxes = [];

    for (let i = 0; i < arrMake.length; i++) {
        if (arrMake[i].checked) {
            arrCheckedBoxes.push(arrMake[i].value);
        }
    }

    if (arrCheckedBoxes.length <= 0) {
        console.log("No checkboxes selected.");
        return;
    }

    // .inclueds() from https://stackoverflow.com/a/6116511
    for (let i = 0; i < usedCars.length; i++) {
        // console.log(`${usedCars[i].make} in ${arrCheckedBoxes}:    ${arrCheckedBoxes.includes(usedCars[i].make)}`);
        if (arrCheckedBoxes.includes(usedCars[i].make)) {
            arrReturn.push(usedCars[i]);
        }
    }

    // console.log(arrReturn);
    return arrReturn;
}

// Displays cards.
let displayCards = (arrCar, colPerRow = 4) => {
    if (!arrCar || arrCar.length <= 0) {
        // console.log("in empty displayCards()");
        result.innerHTML = `<p class="no-results">No search results.</p>`
        return;
    }


    let strResult = `<div class="result-row">`;
    
    // Starts at 1 since 0 % 4 == 0, making the first element in a row by itself.
    for (let i = 1; i < (arrCar.length + 1); i++) {
        strResult += createCard(arrCar[i - 1], `car-${(i - 1)}`);
        if (i % colPerRow == 0) {
            strResult += `</div><div class="result-row">`;
        }
    }

    result.innerHTML = strResult + `</div>`;
};

// Displays the entire car array.
let displayAllCards = () => {
    displayCards(usedCars);
}


document.querySelector("#btn-search").addEventListener("click", (e) => {
    // prevents page reload on submit
    e.preventDefault();
    // filterCards();
    displayCards(filterCards());
});








// init
displayAllCards();