const boxes = document.querySelectorAll('.box');
const targets = document.querySelectorAll('.target-box');
const checkButton = document.getElementById('check-button');
const resetButton = document.getElementById('reset-button');
const correctButton = document.getElementById('correct-button');
const incorrectButton = document.getElementById('incorrect-button');

boxes.forEach(box => {
  box.addEventListener('dragstart', dragStart);
  box.addEventListener('dragend', dragEnd);
});

let draggedBox = null;

function dragStart() {
  draggedBox = this;
  setTimeout(() => this.classList.add('invisible'), 0);
}

function dragEnd() {
  draggedBox = null;
  this.classList.remove('invisible');
}

targets.forEach(target => {
  target.addEventListener('dragover', dragOver);
  target.addEventListener('dragenter', dragEnter);
  target.addEventListener('dragleave', dragLeave);
  target.addEventListener('drop', drop);
});

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
  this.classList.add('hovered');
}

function dragLeave() {
  this.classList.remove('hovered');
}

function drop() {
  this.classList.remove('hovered');
  if (this.children.length === 0) {
    this.appendChild(draggedBox);
    checkPuzzle();
  }
}

function resetPuzzle() {
  // Remove all boxes from targets
  targets.forEach(target => {
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
  });

  // Shuffle boxes and add them back to container
  const container = document.querySelector('.container');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  const shuffledBoxes = shuffle([...boxes]);
  shuffledBoxes.forEach(box => container.appendChild(box));
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function checkPuzzle() {
    const targetLetters = Array.from(targets).map(target => target.textContent.trim());
    const boxLetters = Array.from(boxes).map(box => box.parentElement.textContent.trim());
  
    // Check if all boxes have been placed in targets
    const totalBoxes = boxes.length;
    let placedBoxes = 0;
    targets.forEach(target => {
      if (target.children.length > 0) {
        placedBoxes++;
      }
    });
  
    if (targetLetters.join('') === '我会死戈飞因为我觉得他无用' && placedBoxes === totalBoxes) {
      correctButton.style.display = 'block';
      checkButton.style.display = 'none';
      resetButton.style.display = 'block';
    } else {
      incorrectButton.style.display = 'block';
      resetButton.style.display = 'block';
      setTimeout(() => {
        incorrectButton.style.display = 'none';
        resetButton.style.display = 'block';
      }, 1000);
    }
  }

resetButton.addEventListener('click', resetPuzzle);

incorrectButton.addEventListener('click', () => {
    window.location.href = 'Part2.html';
  });

correctButton.addEventListener('click', () => {
    window.location.href = 'Bonus.html';
  });