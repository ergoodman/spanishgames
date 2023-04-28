const words = [
  'Hay',
  'Una',
  'Chica',
  'La',
  'chica',
  'se',
  'llama',
  'Abril',
  'Vive',
  'en',
  'Uruguay',
  'Vive',
  'con',
  'su',
  'familia',
  'Tiene',
  'un',
  'hermano',
  'Su',
  'hermano',
  'se',
  'llama',
  'Julio',
  'Tiene',
  'una',
  'madre'
];

function checkWords() {
  const wordsFound = [];
  const tableCells = document.querySelectorAll('#word-search td');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const found = findWord(word, tableCells);
    if (found) {
      wordsFound.push(word);
    }
  }

  const wordsToFind = document.querySelectorAll('#words-to-find li');
  for (let i = 0; i < wordsToFind.length; i++) {
    const word = wordsToFind[i].textContent;
    if (wordsFound.includes(word)) {
      wordsToFind[i].style.textDecoration = 'line-through';
    } else {
      wordsToFind[i].style.textDecoration = 'none';
    }
  }
}

function findWord(word, tableCells) {
  const directions = [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 }
  ];

  for (let i = 0; i < tableCells.length; i++) {
    if (tableCells[i].textContent === word.charAt(0)) {
      for (let j = 0; j < directions.length; j++) {
        const found = checkDirection(word, tableCells, tableCells[i], directions[j]);
        if (found) {
          return true;
        }
      }
    }
  }

  return false;
}

function checkDirection(word, tableCells, startCell, direction) {
 let current = startCell;
  for (let i = 1; i < word.length; i++) {
    const row = current.parentNode.rowIndex + direction.y;
    const col = current.cellIndex + direction.x;
    if (row < 0 || row >= tableCells.length || col < 0 || col >= tableCells[row].cells.length) {
      return false;
    }
    current = tableCells[row].cells[col];
    if (current.textContent !== word.charAt(i)) {
      return false;
    }
  }

  return true;
}
