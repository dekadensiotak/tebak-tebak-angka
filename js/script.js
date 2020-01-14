let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const turns = document.querySelector(`.turns`);
const reward = document.querySelector('.reward');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let rewardLink = [
  "https://drive.google.com/open?id=1DdOmI3cxs7MamovpuNG2b0TBziI4l0eF",
  "https://drive.google.com/open?id=1AfFkW1-3vu-tqh67KTFZo-hT5cQ22MXg",
  "https://drive.google.com/open?id=1k8WTWk4mXliOviYzpVlbPQnJTWdKNSuM"
]
let turnCount = 10;
let guessCount = 1;
let resetButton;

function checkGuess() {
  let userGuess = Number(guessField.value);
  let turnLeft = turnCount - guessCount;
  if (guessCount === 1) {
    guesses.textContent = 'Tebakan sebelumnya: ';
  }
  guesses.textContent += userGuess + ', ';
  turns.textContent = 'Sisa tebakan : ' + turnLeft;  

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Horeeee! Tebakan lu bener!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameWin();
  } else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER YOU MORON!!!';
    setGameOver();
  } else {
    lastResult.textContent = 'Salah bangsat!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Tebakan lu kekecilan!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Tebakan lu kegedean!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

guessField.addEventListener('keyup', function(event) {
  if (event.code === 'Enter') {
    document.querySelector('.guessSubmit').click();
  }
});

function setGameWin() {
  guessField.disabled = true;
  guessSubmit.disabled = true;

  randomReward = Math.floor(Math.random() * rewardLink.length);
  generateReward = rewardLink[randomReward];
  reward.setAttribute("href", generateReward);
  reward.textContent = 'Klik untuk hadiah';
  
  resetButton = document.createElement('button');
  resetButton.textContent = 'Maen lagi dong Bro!';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Maen lagi dong!';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}