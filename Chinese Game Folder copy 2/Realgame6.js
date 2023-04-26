const sentenceContainer = document.querySelector('.sentence-container');
const inputContainer = document.querySelector('.input-container');
const inputWords = document.querySelectorAll('.input-word');
const checkButton = document.querySelector('#check-button');

let correctOrder = ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'];

// Shuffle the words in the sentence container
for (let i = sentenceContainer.children.length; i >= 0; i--) {
  sentenceContainer.appendChild(sentenceContainer.children[Math.random() * i | 0]);
}

// Add event listeners to the draggable words
const draggableWords = sentenceContainer.querySelectorAll('.word');
draggableWords.forEach(word => {
  word.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.textContent);
  });
});

// Add event listeners to the input words
let selectedInputWord = null;
inputWords.forEach(word => {
  word.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  word.addEventListener('dragenter', (e) => {
    e.target.classList.add('dragover');
  });
  word.addEventListener('dragleave', (e) => {
    e.target.classList.remove('dragover');
  });
  word.addEventListener('drop', (e) => {
    e.preventDefault();
    selectedInputWord = e.target;
    let draggedWord = e.dataTransfer.getData('text/plain');
    selectedInputWord.innerText = draggedWord;
    e.target.classList.remove('dragover');
  });
});

// Add event listener to the sentence input check button
checkButton.addEventListener('click', () => {
  let userOrder = [];
  inputWords.forEach(word => {
    userOrder.push(word.innerText);
  });
  if (userOrder.length !== correctOrder.length) {
    // User did not enter the correct number of words
    inputContainer.classList.add('incorrect');
  } else {
    // Check if user entered the words in the correct order
    let isCorrect = true;
    for (let i = 0; i < correctOrder.length; i++) {
      if (userOrder[i] !== correctOrder[i]) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      // User entered the correct sentence
      inputContainer.classList.remove('incorrect');
      inputContainer.classList.add('correct');
      inputWords.forEach(word => {
        word.setAttribute('draggable', false);
      });
      checkButton.setAttribute('disabled', true);
    } else {
      // User entered incorrect sentence
      inputContainer.classList.add('incorrect');
    }
  }
});