const buttons = document.querySelectorAll('.button');
let correctCount = 0;
let firstButton = null;
let processing = false;

function shuffleButtons() {
  buttons.forEach(button => {
    button.classList.remove('revealed', 'correct', 'incorrect');
    button.innerHTML = '?';
  });

  const shuffledButtons = Array.from(buttons).sort(() => Math.random() - 0.5);

  shuffledButtons.forEach(button => {
    document.querySelector('#container').appendChild(button);
  });

  correctCount = 0;
  firstButton = null;
  processing = false;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (processing) {
      return;
    }

    if (button.classList.contains('revealed')) {
      return;
    }

    button.classList.add('revealed');
    button.innerHTML = button.dataset.letter;

    if (firstButton === null) {
      firstButton = button;
    } else {
      processing = true;

      if (firstButton.dataset.letter === button.dataset.letter) {
        firstButton.classList.add('correct');
        button.classList.add('correct');
        correctCount += 2;
        firstButton = null;
        processing = false;
      } else {
        firstButton.classList.add('incorrect');
        button.classList.add('incorrect');
        setTimeout(() => {
          firstButton.classList.remove('revealed', 'incorrect');
          firstButton.innerHTML = '?';
          button.classList.remove('revealed', 'incorrect');
          button.innerHTML = '?';
          firstButton = null;
          processing = false;
        }, 1000);
      }
    }

    if (correctCount === buttons.length) {
      alert('You have compeleted my full game! Great Job!');
      shuffleButtons();
    }
  });
});