var cards = document.querySelectorAll(".memory-card").forEach(card => card.addEventListener("click", flipCard));
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const memBtn = document.getElementById('memoryBtn');
let memBtnClicked = false;
var timeLeft = 120;
const newGameBtn = document.getElementById('newGameBtn');
let mainWindow = document.getElementById('main');
let timer = document.getElementById('timer');


memBtn.addEventListener('click', function () {
    memBtnClicked = !memBtnClicked;
    console.log(memBtnClicked)
    if (memBtnClicked) {
        mainWindow.style.visibility = 'visible'
        newGameBtn.style.visibility = 'visible';
    }
    else {
        newGameBtn.style.visibility = 'hidden';
        mainWindow.style.visibility = 'hidden'

    }
})


newGameBtn.addEventListener('click', () => {
    startTimer();
    startGame();
})

startTimer = () => {
    let timeLeft = 120;
    setInterval(() => {
        if (timeLeft > 0) {
            timeLeft = timeLeft - 1;
            timer.innerHTML = "Time left " + timeLeft;
        }
        else {
            return;
        }
    }, 1000);
}

startGame = () => {
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    proveriPogodak();


}
function proveriPogodak() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);

}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
(function shuffle() {
    cards.forEach(card => {
        let randomPas = Math.floor(Math.random() * 16);
        card.style.order = randomPas;
    });
})();




