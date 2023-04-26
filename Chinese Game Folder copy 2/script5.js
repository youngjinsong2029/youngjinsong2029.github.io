const words = [
    'apple',
    'banana',
    'cherry',
    'grape'
  ];
  
  const letterBoxes = document.querySelectorAll('.letter-box');
  const wordContainers = document.querySelectorAll('.word-container .word');
  const resultContainer = document.querySelector('.result-container');
  
  let draggedWord = null;
  
  // Add event listeners to word boxes
  wordContainers.forEach(wordContainer => {
    wordContainer.addEventListener('dragstart', () => {
      draggedWord = wordContainer;
    });
  
    wordContainer.addEventListener('dragend', () => {
      draggedWord = null;
    });
  });
  
  // Add event listeners to letter boxes
  letterBoxes.forEach(letterBox => {
    letterBox.addEventListener('dragover', e => {
      e.preventDefault();
    });
  
    letterBox.addEventListener('drop', () => {
      if (draggedWord) {
        const word = draggedWord.innerText;
  
        // Remove the word from the word container
        draggedWord.parentNode.removeChild(draggedWord);
  
        // Check if the letters form a correct word
        const letters = Array.from(document.querySelectorAll(`[data-letter]`))
          .filter(letterBox => !letterBox.classList.contains('matched'))
          .map(letterBox => letterBox.getAttribute('data-letter'));
          
        if (letters.join('') === word) {
          resultContainer.innerHTML = '<button class="button correct-button">Correct!</button>';
        } else {
          resultContainer.innerHTML = '<button class="button try-again-button">Try Again</button>';
        }
      }
    });
  });