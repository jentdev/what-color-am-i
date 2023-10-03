// generate a color and store result
let randomColor = generateColor();
let currentColor = '0, 0, 0';

//  display color square after dom loaded
document.addEventListener('DOMContentLoaded', displayColor(randomColor));

// add eventListener to sliders
document.getElementById('range-red').addEventListener('input', changeColor);
document.getElementById('range-green').addEventListener('input', changeColor);
document.getElementById('range-blue').addEventListener('input', changeColor);

// generate new color when hit play again
let newGame = document.getElementById('reset');
newGame.addEventListener('click', clearBoard);

// calculate result when click submit
document.getElementById('submit-guess').addEventListener('click', calcOnClick);

// dummy function to call calc function
function calcOnClick () {
    let resultval = document.getElementById('resultval');
    resultval.value = calc(randomColor, currentColor);
}

// function to generate random number
function generateColor () {
    let rRed = Math.floor(Math.random() * 256);
    let rGreen = Math.floor(Math.random() * 256);
    let rBlue = Math.floor(Math.random() * 256);
    let rColor = `${rRed}, ${rGreen}, ${rBlue}`; 
    return rColor;
}

// function to display generated color to dom
function displayColor (color) {
    let displayRandomColor = document.getElementById('random-color');
    displayRandomColor.style.background = `rgb(${color})`;
}

// function to change slider color as you drag
function changeColor () {
    let red = document.getElementById('range-red').value;
    let redval = document.getElementById('redval');
    redval.value = red;
    let green = document.getElementById('range-green').value;
    let greenval = document.getElementById('greenval');
    greenval.value = green;
    let blue = document.getElementById('range-blue').value;
    let blueval = document.getElementById('blueval');
    blueval.value = blue;
    currentColor = `${red}, ${green}, ${blue}`;
    let printColor = document.getElementById('guessed-color');
    printColor.style.background = `rgba(${currentColor})`;
    let guessedRGB = document.getElementById('guessed-rgb');
    let guessedHex = document.getElementById('guessed-hex');
    guessedRGB.innerHTML = `(${currentColor})`;
    guessedHex.innerHTML = `${rgbToHex(currentColor).toUpperCase()}`;
}

// function to reset everything
function clearBoard () {
    currentColor = '0, 0, 0';
    let rangeRed = document.getElementById('range-red');
    let rangeGreen = document.getElementById('range-green');
    let rangeBlue = document.getElementById('range-blue');
    let guessedBg = document.getElementById('guessed-color');
    rangeRed.value = 0;
    rangeGreen.value = 0;
    rangeBlue.value = 0;
    guessedBg.style.background = '#000';
    let displayContainer = document.getElementById('random-result');
    let displayGuessed = document.getElementById('guessed-result');
    let clearGuessedRGB = document.getElementById('guessed-rgb');
    let clearGuessedHex = document.getElementById('guessed-hex');
    clearGuessedHex.innerHTML = '#000000';
    clearGuessedRGB.innerHTML = '(0, 0, 0)';  
    randomColor = generateColor();
    displayColor(randomColor);

}

// function to calculate score
// function to calculate score
function calc (random, guessed) {
    let rResult = random.split(', ');
    let gResult = guessed.split(', ');
    let [rr, rg, rb] = random.split(', ');
    let rDiff = Math.abs(rResult[0] - gResult[0]);
    let gDiff = Math.abs(rResult[1] - gResult[1]);
    let bDiff = Math.abs(rResult[2] - gResult[2]);

    let percentage = 100 - (((rDiff / 255) + (gDiff / 255) + (bDiff / 255)) / 3 * 100);

    let guessedHex =  rgbToHex(guessed);
    let randomHex =  rgbToHex(random);
    return [percentage.toFixed(2), rr, rg, rb, guessedHex.toUpperCase(), randomHex.toUpperCase()];
}

// function to convert from num to hex
function toHex (val) {
    const hex = Number(val).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}

// function to convert all 3 vals to hex
function rgbToHex (color) {
    let str = color.split(', ');
    return `#${toHex(str[0])}${toHex(str[1])}${toHex(str[2])}`;
}

function openWin() {
  window.open();
}
