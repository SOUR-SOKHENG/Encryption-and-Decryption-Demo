function transpositionCipherEncrypt(plaintext, key) {
    const numCols = key.length;
    const numRows = Math.ceil(plaintext.length / numCols);
    const paddedPlaintext = plaintext.padEnd(numRows * numCols, ' '); // Pad plaintext to fit the grid
    const grid = [];


    for (let i = 0; i < numRows; i++) {
        grid.push(paddedPlaintext.slice(i * numCols, (i + 1) * numCols));
    }

    const sortedKey = Array.from(key).map((char, index) => ({ char, index })).sort((a, b) => a.char.localeCompare(b.char));
    const ciphertext = sortedKey.map(({ index }) => grid.map(row => row[index]).join('')).join('');

    return ciphertext.trim(); 
}

function transpositionCipherDecrypt(ciphertext, key) {
    const numCols = key.length;
    const numRows = Math.ceil(ciphertext.length / numCols);
    const paddedCiphertext = ciphertext.padEnd(numRows * numCols, ' '); // Pad ciphertext to fit the grid
    const grid = Array.from({ length: numRows }, () => Array(numCols).fill(' '));

    const sortedKey = Array.from(key).map((char, index) => ({ char, index })).sort((a, b) => a.char.localeCompare(b.char));
    const sortedIndices = sortedKey.map(({ index }) => index);

    let charIndex = 0;
    for (let i = 0; i < numCols; i++) {
        const colIndex = sortedIndices[i];
        for (let j = 0; j < numRows; j++) {
            if (charIndex < paddedCiphertext.length) {
                grid[j][colIndex] = paddedCiphertext[charIndex++];
            }
        }
    }

    return grid.map(row => row.join('')).join('').trim();
}


export { transpositionCipherDecrypt, transpositionCipherEncrypt };