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

  // Whilethere are elements to shuffle
  while (currentIndex !== 0) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function checkPuzzle() {
  let correct = true;

  // Check if each box is in the correct target
  targets.forEach((target, index) => {
    if (target.firstChild.textContent !== `第${index+1}`) {
      correct = false;
    }
  });

  // Show appropriate button and message
  if (correct) {
    correctButton.style.display = 'block';
  } else {
    incorrectButton.style.display = 'block';
  }
}

checkButton.addEventListener('click', checkPuzzle);
resetButton.addEventListener('click', resetPuzzle);
correctButton.addEventListener('click', () => window.location.href = 'part2-3.html');
incorrectButton.addEventListener('click', () => {
  incorrectButton.style.display = 'none';
  resetPuzzle();
});

// Shuffle boxes on page load
window.addEventListener('load', resetPuzzle);