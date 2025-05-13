const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('Uppercase');
const lowercaseEl = document.getElementById('Lowercase');
const numbersEl = document.getElementById('Number');
const symbolsEl = document.getElementById('Symbol');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLowercase,
    upper: getRandomUppercase,
    number: getRandomNumbers,
    symbol: getRandomSymbols,
};

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typeCount = lower + upper + number + symbol;

    const typesArr = [
        { lower },
        { upper },
        { number },
        { symbol }
    ].filter(item => Object.values(item)[0]);

    if (typeCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typeCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

function getRandomLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumbers() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbols() {
    const symbols = "!@#$%&(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
    if (!password) return;

    // Copy to clipboard
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    }).catch(err => {
        console.error('Clipboard copy failed:', err);
    });
});

