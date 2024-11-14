// const usedCar = require("./usedCars");
import { usedCars } from './usedCars.js';

// usedCars[0].color
// usedCars[0].gasMileage
// usedCars[0].make
// usedCars[0].mileage
// usedCars[0].model
// usedCars[0].price
// usedCars[0].year

let result = document.querySelector("#result");

// From https://stackoverflow.com/a/2901298
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// returns a string containing the html code for displaying a card. 
let createCard = (car, id) => {
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

// Displays cards.
let displayCards = (colPerRow) => {
    let strResult = `<div class="result-row">`;
    
    // Starts at 1 since 0 % 4 == 0, making the first element in a row by itself.
    for (let i = 1; i < usedCars.length; i++) {
        // console.log(`Beginning  i: ${i}`);
        strResult += createCard(usedCars[i - 1], `car-${(i - 1)}`);
        if (i % colPerRow == 0) {
            // console.log(`In if  i: ${i}`);
            strResult += `</div><div class="result-row">`;
        }
    }
    strResult += `</div>`;

    result.innerHTML = strResult;

};

document.querySelector("#btn-search").addEventListener("click", (e) => {
    // prevents page reload on submit
    e.preventDefault();

    console.log(usedCars[0]);
});

displayCards(4);