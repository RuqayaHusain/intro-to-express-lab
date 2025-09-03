const express = require('express');
const validator = require('validator');

const app = express();
const PORT = 3000;

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


const getRandomNumber = (max) => {
    //retruns random number between 0 & defined Max Number (inclusive)
    return Math.floor(Math.random() * (max + 1));
}

app.get('/greetings/:userName', (req, res) => {
    res.send(`<h1>Hello there, ${req.params.userName}!</h1>`);
});

app.get('/roll/:inputNumber', (req, res) => {
    let inputValue = req.params.inputNumber;

    if(validator.isNumeric(inputValue)){
        inputValue = parseInt(inputValue);
        res.send(`<h1>You rolled a ${getRandomNumber(inputValue)}</h1>`);
    } else {
        res.send(`<h1>You must specify a number.</h1>`);
    }
});

app.get('/collectibles/:index', (req, res) => {
    const inputIndex = req.params.index;

    if(validator.isInt(inputIndex, {min: 0, max: 2})) {
            res.send(`<h1>So, you want the ${collectibles[inputIndex].name}? For ${collectibles[inputIndex].price}, it can be yours!</h1>`);
        } else {
            res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`);
        }
});

app.get('/shoes', (req, res) => {
    const minPrice = req.query['min-price'];
    const maxPrice = req.query['max-price'];
    const type = req.query.type;
    let filteredShoes = shoes;
    
    if(minPrice && validator.isInt(minPrice, { min: 0 })) {
        filteredShoes = filteredShoes.filter(val => val.price >= parseInt(minPrice));
    }

    if(maxPrice && validator.isInt(maxPrice, { min: 0 })) {
        filteredShoes = filteredShoes.filter(val => val.price <= parseInt(maxPrice));
    }
    
    if(type){
        filteredShoes = filteredShoes.filter(val => val.type === type);
    }

    res.send(filteredShoes);
});

app.listen(PORT, () => {
    console.log(`Listining on port: ${PORT}`);
});