import { shift_cipher_encryption, shift_cipher_decryption, caesar_brute_force_decrypt } from './Caesar_Cipher.js';

const caesarEncryptButton = document.getElementById('btn-Encrypt');
const caesarDecryptButton = document.getElementById('btn-Decrypt');
const resultDiv = document.getElementById('caesar-result');

caesarEncryptButton.addEventListener('click', () => {
    const plaintext = document.getElementById('input-Caesar').value;

    if (plaintext.length === 0) {
        resultDiv.innerHTML = `<p>Please Enter Valid Input</p>`;
        return;
    }

    const ciphertext = shift_cipher_encryption(plaintext, 3);
    resultDiv.innerHTML = `<p>${ciphertext}</p>`;
});

caesarDecryptButton.addEventListener('click', () => {
    const ciphertext = document.getElementById('input-Caesar').value;

    if (ciphertext.length === 0) {
        resultDiv.innerHTML = `<p>Please Enter Valid Input</p>`;
        return;
    }

    const plaintext = shift_cipher_decryption(ciphertext, 3);
    resultDiv.innerHTML = `<p>${plaintext}</p>`;
});



const shiftEncryptButton = document.getElementById('shift-encrypt-btn');
const shiftDecryptButton = document.getElementById('shift-decrypt-btn');
const shiftBruteForceButton = document.getElementById('shift-brute-force-btn');
const shiftResultDiv = document.getElementById('Result-ii');

shiftEncryptButton.addEventListener('click', () => {
    const plaintext = document.getElementById('General-Shift-Cipheri').value;
    const key = parseInt(document.getElementById('General-Shift-Cipher-num').value);

    const ciphertext = shift_cipher_encryption(plaintext, key);

    shiftResultDiv.innerHTML = `<p>${ciphertext}</p>`;
});

shiftDecryptButton.addEventListener('click', () => {
    const ciphertext = document.getElementById('General-Shift-Cipheri').value;
    const key = parseInt(document.getElementById('General-Shift-Cipher-num').value);

    const plaintext = shift_cipher_decryption(ciphertext, key);

    shiftResultDiv.innerHTML = `<p>${plaintext}</p>`;
});

shiftBruteForceButton.addEventListener('click', () => {
    const ciphertext = document.getElementById('General-Shift-Cipheri').value;

    if (ciphertext.length === 0) {
        shiftResultDiv.innerHTML = `<p>Please enter valid input!!</p>`;
        return;
    }

    const result = caesar_brute_force_decrypt(ciphertext);

    shiftResultDiv.innerHTML = result
        .map((result, index) => `<p>k=${index + 1}: ${result.plaintext}</p>`)
        .join('');
});
