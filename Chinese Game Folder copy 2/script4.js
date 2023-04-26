const wordContainer = document.querySelector('.word-container');
const letterContainer = document.querySelector('.letter-container');
const resetButton = document.querySelector('#reset-button');

let words = ['quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'];
let shuffledWords = shuffleArray(words);
let letterBoxCount = 8;

let correctAnswer = shuffledWords.join('');
let currentAnswer = '';

let letterBoxes = document.querySelectorAll('.letter-box');

function resetGame() {
    shuffledWords = shuffleArray(words);
    correctAnswer = shuffledWords.join('');
    currentAnswer = '';
    letterContainer.innerHTML = ''; // Clear the letter container
    for (let i = 0; i < letterBoxCount; i++) {
      const letter = document.createElement('div');
      letter.classList.add('letter-box');
      letter.setAttribute('id', `letter-box-${i}`);
      letterContainer.appendChild(letter);
    }
    wordContainer.innerHTML = ''; // Clear the word container
    for (let i = 0; i < shuffledWords.length; i++) {
      const word = document.createElement('div');
      word.classList.add('word');
      word.setAttribute('draggable', true);
      word.textContent = shuffledWords[i];
      wordContainer.appendChild(word);
    }
  }

// add event listener to words
wordContainer.addEventListener('dragstart', dragStart);
wordContainer.addEventListener('dragend', dragEnd);

// add event listeners to letter boxes
letterBoxes.forEach((letterBox) => {
  letterBox.addEventListener('dragover', dragOver);
  letterBox.addEventListener('dragenter', dragEnter);
  letterBox.addEventListener('dragleave', dragLeave);
  letterBox.addEventListener('drop', drop);
});

// add event listener to reset button
resetButton.addEventListener('click', resetGame);

function dragStart(event) {
  const target = event.target;
  target.classList.add('dragging');
}
function dragStart(event) {
    const target = event.target;
    target.classList.add('dragging');
  }

function dragEnd(event) {
  const target = event.target;
  target.classList.remove('dragging');
}


function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
  const target = event.target;
  target.classList.add('hovering');
}

function dragLeave(event) {
  const target = event.target;
  event.target.classList.remove('hovering');
}
function dragLeave(event) {
    const target = event.target;
    event.target.classList.remove('hovering');
  }

function drop(event) {
  const target = event.target;
  const draggedLetterBox = document.querySelector('.dragging');
  const letter = draggedLetterBox.textContent;
  if ((target.textContent === '' || target.id === 'letter-box-3') && currentAnswer.length < letterBoxCount) {
    target.textContent = letter;
    currentAnswer += letter;
    draggedLetterBox.remove();
    target.classList.remove('hovering');
  } else {
    draggedLetterBox.classList.remove('dragging');
  }
}

function resetGame() {
  shuffledWords = shuffleArray(words);
  correctAnswer = shuffledWords.join('');
  currentAnswer = '';
  letterBoxes.forEach((letterBox) => {
    letterBox.textContent = '';
  });
  for (let i = 0; i < letterBoxCount; i++) {
    const letter = document.createElement('div');
    letter.classList.add('word');
    letter.setAttribute('draggable', true);
    letter.textContent = shuffledWords[i];
    wordContainer.appendChild(letter);
  }
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

