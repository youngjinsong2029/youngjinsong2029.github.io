const buttons = document.querySelectorAll('.button');
let correctCount = 0;
let firstButton = null;
let processing = false;

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
          firstButton.innerHTML = 'Button ' + (Array.from(buttons).indexOf(firstButton) + 1);
          button.classList.remove('revealed', 'incorrect');
          button.innerHTML = 'Button ' + (Array.from(buttons).indexOf(button) + 1);
          firstButton = null;
          processing = false;
        }, 1000);
      }
    }

    if (correctCount === buttons.length) {
      alert('Congratulations, you won!');
    }
  });
});