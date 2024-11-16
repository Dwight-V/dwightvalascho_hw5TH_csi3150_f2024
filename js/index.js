// const usedCar = require("./usedCars");
import { usedCars } from './usedCars.js';

// usedCars[0].color
// usedCars[0].gasMileage
// usedCars[0].make
// usedCars[0].mileage
// usedCars[0].model
// usedCars[0].price
// usedCars[0].year


// From https://stackoverflow.com/a/2901298
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}



// #region filter stuff
let filterYear = () => {
    let yearStartInput = document.querySelector("#year-start-input");
    let yearEndInput = document.querySelector("#year-end-input");

    if (!yearEndInput.value && !yearStartInput.value) {
        console.log("No year selected.");
        return;
    }

    
    let arrReturn = [];
    // Could use year*Input.placeholder for the alternate value, but may change what the placeholder says.
    let yearStart = yearStartInput.value || 0;
    let yearEnd = yearEndInput.value || 2024;
    
    // Checks for cars with years within the range (inclusive on both ends).
    for (let i = 0; i < usedCars.length; i++) {
        const carYear = usedCars[i].year;
        if (carYear >= yearStart && carYear <= yearEnd) {
            arrReturn.push(usedCars[i]);
        }
    }

    // console.log("filter year:" + arrReturn);
    return arrReturn;
}

let filterMake = () => {
    let arrReturn = [];
    let arrCheckedBoxes = [];
    let arrMake = document.querySelectorAll(".car-make");

    for (let i = 0; i < arrMake.length; i++) {
        if (arrMake[i].checked) {
            arrCheckedBoxes.push(arrMake[i].value);
        }
    }

    if (arrCheckedBoxes.length <= 0) {
        console.log("No checkboxes selected.");
        return;
    }

    // .includes() from https://stackoverflow.com/a/6116511
    for (let i = 0; i < usedCars.length; i++) {
        // console.log(`${usedCars[i].make} in ${arrCheckedBoxes}:    ${arrCheckedBoxes.includes(usedCars[i].make)}`);
        if (arrCheckedBoxes.includes(usedCars[i].make)) {
            arrReturn.push(usedCars[i]);
        }
    }

    // console.log(`filter make: ${arrReturn}`);
    return arrReturn;
}

let filterMileage = () => {
    let arrReturn = [];

    let mileageInput = document.querySelector("#mileage-input");

    // The mileage input is empty, so return nothing.
    if (!mileageInput.value) {
        return;
    }

    // Checks if each car has <= the mileage specified by the user
    for (let i = 0; i < usedCars.length; i++) {
        if (usedCars[i].mileage <= mileageInput.value) {
            arrReturn.push(usedCars[i]);
        }
    }

    return arrReturn;
}

let filterPrice = () => {
    let arrReturn = [];
    let priceInput = document.querySelector("#price-input");


    // The input is empty, so return nothing.
    if (!priceInput.value) {
        return;
    }

    // Checks if each car costs <= to the value specified by the user
    for (let i = 0; i < usedCars.length; i++) {
        if (usedCars[i].price <= priceInput.value) {
            arrReturn.push(usedCars[i]);
        }
    }

    return arrReturn;
}

let filterColor = () => {
    let arrReturn = [];
    let arrCheckedBoxes = [];
    let arrColor = document.querySelectorAll(".car-color");

    for (let i = 0; i < arrColor.length; i++) {
        if (arrColor[i].checked) {
            arrCheckedBoxes.push(arrColor[i].value);
        }
    }

    if (arrCheckedBoxes.length <= 0) {
        console.log("No color checkboxes selected.");
        return;
    }

    // .includes() from https://stackoverflow.com/a/6116511
    for (let i = 0; i < usedCars.length; i++) {
        // console.log(`${usedCars[i].color}`);
        if (arrCheckedBoxes.includes(usedCars[i].color.toLowerCase())) {
            arrReturn.push(usedCars[i]);
        }
    }

    console.log(`filter color:`);
    console.log(arrCheckedBoxes);
    console.log(arrReturn);
    return arrReturn;
}
// #endregion


// #region card stuff
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

// Displays cards.
let displayCards = (arrCar, colPerRow = 4) => {
    // The div that holds the car cards
    let result = document.querySelector("#result");
    
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
// #endregion


// #region click events
document.querySelector(".logo").addEventListener("click", (e) => {
    // displayAllCards();
    document.querySelector("#btn-clear").click();
});

document.querySelector("#btn-search").addEventListener("click", (e) => {
    // prevents page reload on submit
    e.preventDefault();
    // filterMake();
    let arrDisplay = [];
    arrDisplay = arrDisplay.concat(filterYear());
    arrDisplay = arrDisplay.concat(filterMake());
    arrDisplay = arrDisplay.concat(filterMileage());
    arrDisplay = arrDisplay.concat(filterPrice());
    arrDisplay = arrDisplay.concat(filterColor());

    // Removes undefined values from array. From https://stackoverflow.com/a/28607462
    arrDisplay = arrDisplay.filter( Boolean );

    // Removes duplicates from array. From https://stackoverflow.com/a/9229821
    arrDisplay = [...new Set(arrDisplay)];

    displayCards(arrDisplay);
});
// #endregion







// init
displayAllCards();