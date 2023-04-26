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
	if (targetLetters.join('') === '我和我的韩国朋友觉得韩国菜是很好吃和很有趣' && boxLetters.length === 0) {
		correctButton.style.display = 'block';
		checkButton.style.display = 'none';
		resetButton.style.display = 'none';
	} else {
		incorrectButton.style.display = 'block';
		resetButton.style.display = 'none'; // hide reset button when incorrect
		setTimeout(() => {
				incorrectButton.style.display = 'none';
				resetButton.style.display = 'none'; // show reset button after try again
		}, 1000);
	}
}

resetButton.addEventListener('click', resetPuzzle);

checkButton.addEventListener('click', checkPuzzle);