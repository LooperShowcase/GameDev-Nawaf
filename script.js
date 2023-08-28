const cardsContainer = document.querySelector(".cards");
let firstCard, secondCard;
let cards = [];
let card;
let score = 0;
let lockBoard = false;
let startedTimer = false;
let ended =false;
document.querySelector(".Score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    GenerateCards();
    console.log(cards);
  });

function shuffleCards() {
  let currentIndex = cards.length;
  let randomIndex;
  let temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function GenerateCards() {
  for (card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
        <div class="front">
            <img class="front-image" src=${card.image} />
        </div>
        <div class="back"></div>
        `;
    cardElement.addEventListener("click", flipCard); // add this
    cardElement.addEventListener("touchstart", flipCard);
    cardsContainer.appendChild(cardElement);
  }
}

function flipCard() {
    if (!startedTimer) {
        startedTimer = true;
        startTimer();
    }
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
    
  }

  secondCard = this;
  document.querySelector(".Score").textContent = score;
  lockBoard = true;
  checkForMatch(); // add this
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
if(score === 9)
{
    ended = true;
    startConfetti()
}
}
function unlockBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.removeEventListener("touchstart", flipCard);
  secondCard.removeEventListener("touchstart", flipCard);
  score = score + 1;
  unlockBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    unlockBoard();
  }, 1000);
}

function restart() {
  score = 0;
  unlockBoard();
  shuffleCards();
  document.querySelector(".Score").textContent = score;
  cardsContainer.innerHTML = "";
  GenerateCards();
}

function startTimer() {
    // Set the duration of the timer in seconds
    var duration = 60;

    // Get the current timestamp
    var startTime = new Date().getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {
        if (ended) {
            return;
        }
        // Get the current timestamp
        var currentTime = new Date().getTime();

        // Calculate the elapsed time in seconds
        var elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

        // Calculate the remaining seconds
        var remainingSeconds = duration - elapsedSeconds;

        // Display the remaining seconds in the element with id="demo"
        document.getElementById("demo").innerHTML = remainingSeconds;
        console.log(remainingSeconds);

        // If the timer reaches 0, stop the interval and display "EXPIRED"
        if (remainingSeconds <= 0) {
            ended = true;
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
            lockBoard = true;
        }
    }, 1000);
}
function stopTime()
{
    if(flipCard == 9)
    {
        setTimeout;
    }
}
