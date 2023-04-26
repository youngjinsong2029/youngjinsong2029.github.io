const draggableBoxes = document.querySelectorAll('.box');
const targetBoxes = document.querySelectorAll('.target-box');
const checkButton = document.getElementById('check-button');
const correctButton = document.getElementById('correct-button');
const incorrectButton = document.getElementById('incorrect-button');

let isDragging = false;
let currentBox = null;

// Add event listeners to draggable boxes
for (const box of draggableBoxes) {
box.addEventListener('dragstart', dragStart);
box.addEventListener('dragend', dragEnd);
}

// Add event listeners to target boxes
for (const targetBox of targetBoxes) {
targetBox.addEventListener('dragover', dragOver);
targetBox.addEventListener('dragenter', dragEnter);
targetBox.addEventListener('dragleave', dragLeave);
targetBox.addEventListener('drop', drop);
}

// Drag functions
function dragStart() {
isDragging = true;
currentBox = this;
setTimeout(() => this.style.display = 'none', 0);
}

function dragEnd() {
isDragging = false;
this.style.display = 'flex';
currentBox = null;
}

// Drop functions
function dragOver(e) {
e.preventDefault();
}

function dragEnter(e) {
e.preventDefault();
this.style.backgroundColor = '#e6e6e6';
}

function dragLeave() {
this.style.backgroundColor = '#f2f2f2';
}

function drop() {
if (isDragging) {
this.appendChild(currentBox);
this.style.backgroundColor = '#f2f2f2';
}
}

// Check function
checkButton.addEventListener('click', function() {
let isCorrect = true;

for (let i = 0; i < targetBoxes.length; i++) {
if (targetBoxes[i].textContent !== 'ABCDEFGH'[i]) {
isCorrect = false;
break;
}
}

if (isCorrect) {
correctButton.style.display = 'block';
incorrectButton.style.display = 'none';
} else {
correctButton.style.display = 'none';
incorrectButton.style.display = 'block';
}
}); 