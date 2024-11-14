// const usedCar = require("./usedCars");
import { usedCars } from './usedCars.js';

// console.log(usedCars[0]);

document.querySelector("#btn-search").addEventListener("click", (e) => {
    // prevents page reload on submit
    e.preventDefault();

    console.log(usedCars[0]);
});