// import {transpositionCipherDecrypt, transpositionCipherEncrypt} from './transposition-cipher.js';

// const transpositionCipherEncryptButton = document.getElementById('transposition-encrypt-btn');
// const transpositionCipherDecryptButton = document.getElementById('transposition-decrypt-btn');
// const transpositionInput = document.getElementById('transposition-input');
// const transpositionKey = document.getElementById('transposition-key');
// const transpositionResult = document.getElementById('transposition-result');

// transpositionCipherEncryptButton.addEventListener('click', () => {
//     const plaintext = transpositionInput.value;
//     const key = transpositionKey.value;
//     const ciphertext = transpositionCipherEncrypt(plaintext, key);
//     transpositionResult.innerHTML = `${ciphertext}`;
//     transpositionResult.value = ciphertext;
// });

// transpositionCipherDecryptButton.addEventListener('click', () => {
//     const ciphertext = transpositionInput.value;
//     const key = transpositionKey.value;
//     const plaintext = transpositionCipherDecrypt(ciphertext, key);
//     transpositionResult.innerHTML = `${plaintext}`;
//     transpositionResult.value = plaintext;
// });

const encryptBtn = document.getElementById("transposition-encrypt-btn");
const decryptBtn = document.getElementById("transposition-decrypt-btn");
const inputText = document.getElementById("transposition-input");
const keyInput = document.getElementById("transposition-key");
const resultDiv = document.getElementById("transposition-result");

function transpositionCipherEncrypt(plaintext, key) {

    const numCols = key.length;
    const numRows = Math.ceil(plaintext.length / numCols);

    const paddedText = plaintext.padEnd(numRows * numCols, " ");
    const grid = [];

    for (let i = 0; i < numRows; i++) {
        grid.push(paddedText.slice(i * numCols, (i + 1) * numCols));
    }

    const keyOrder = key
        .split("")
        .map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char));

    let ciphertext = "";

    keyOrder.forEach(({ index }) => {
        for (let row of grid) {
            ciphertext += row[index];
        }
    });

    return ciphertext.trim();
}

function transpositionCipherDecrypt(ciphertext, key) {

    const numCols = key.length;
    const numRows = Math.ceil(ciphertext.length / numCols);

    const grid = Array.from({ length: numRows }, () =>
        Array(numCols).fill(" ")
    );

    const keyOrder = key
        .split("")
        .map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char));

    let charIndex = 0;

    keyOrder.forEach(({ index }) => {
        for (let row = 0; row < numRows; row++) {
            if (charIndex < ciphertext.length) {
                grid[row][index] = ciphertext[charIndex++];
            }
        }
    });

    return grid.map(row => row.join("")).join("").trim();
}


encryptBtn.addEventListener("click", () => {

    const text = inputText.value;
    const key = keyInput.value;

    if (!text || !key) {
        resultDiv.innerHTML = "<mark>Please enter text and key</mark>";
        return;
    }

    const result = transpositionCipherEncrypt(text, key);

    resultDiv.innerHTML = `<strong>Encrypted:</strong> ${result}`;
});


decryptBtn.addEventListener("click", () => {

    const text = inputText.value;
    const key = keyInput.value;

    if (!text || !key) {
        resultDiv.innerHTML = "<mark>Please enter text and key</mark>";
        return;
    }

    const result = transpositionCipherDecrypt(text, key);

    resultDiv.innerHTML = `<strong>Decrypted:</strong> ${result}`;
});
