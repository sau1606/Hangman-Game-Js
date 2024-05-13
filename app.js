const keyboardBtn = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetter, wrongGuessCount;
let maxGuess = 6;

const resetGame = () => {
    //resetting all the variables and UI elements
    correctLetter=[];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessText.innerHTML = `${wrongGuessCount} / ${maxGuess}`;
    keyboardBtn.querySelectorAll("button").forEach(Btn => Btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  //console.log(word);
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
    setTimeout(() => {
        
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : `Game Over!!`}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (btn, clickedLetter) => {
  //console.log(btn, clickedLetter);
  //checking clickedLetter is in the wordList or not
  if (currentWord.includes(clickedLetter)) {
    //showing all matched letter in the display box
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetter.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    //checking for wrong ans and updated the hangman image
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }

  btn.disabled = true;
  guessText.innerHTML = `${wrongGuessCount} / ${maxGuess}`;


  //calling gameover function if any of these condition meets
  if(wrongGuessCount === maxGuess) return gameOver(false);
  if(correctLetter.length === currentWord.length) return gameOver(true);
};

//creating keyboard button dynamically and adding event listener-->
for (let i = 97; i <= 122; i++) {
  const btn = document.createElement("button");
  btn.innerText = String.fromCharCode(i);
  //console.log(String.fromCharCode(i));
  keyboardBtn.appendChild(btn);
  btn.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);