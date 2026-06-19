
var images = [
    "image/ASP.Net.webp",
    "image/C.Plus.webp",
    "image/c.webp",
    "image/HTML.jpg",
    "image/JavaScript.webp",
    "image/PHP.webp",
    "image/python.webp",
    "image/SQL.webp",
];

var firstCard = null;
var secondCard = null;
var canFlip = true;

var matches = 0;
var moves = 0;
var seconds = 0;

var timeRunning = false;
var timerInterval;

function startgame() {

    var gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";

    var cardImages = images.concat(images);

    cardImages.sort(function () {
        return Math.random() - 0.5;
    });

    for (var i = 0; i < cardImages.length; i++) {

        var card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-front">
                <i class="fas fa-heart"></i>
            </div>

            <div class="card-back">
                <img src="${cardImages[i]}" alt="">
            </div>
        `;

        card.dataset.image = cardImages[i];
        card.onclick = flipCard;

        gameBoard.appendChild(card);
    }

    firstCard = null;
    secondCard = null;
    canFlip = true;

    matches = 0;
    moves = 0;
    seconds = 0;

    timeRunning = false;

    clearInterval(timerInterval);

    updateStats();
}

function flipCard() {

    if (!canFlip) return;
    if (this.classList.contains("flipped")) return;
    if (this.classList.contains("matched")) return;

    if (!timeRunning) {
        startTimer();
    }

    this.classList.add("flipped");

    if (firstCard == null) {
        firstCard = this;
    } else {
        secondCard = this;
        canFlip = false;

        moves++;
        updateStats();

        checkMatch();
    }
}

function checkMatch() {

    var match =
        firstCard.dataset.image === secondCard.dataset.image;

    if (match) {

        setTimeout(function () {

            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            matches++;

            updateStats();
            resetCards();

            if (matches === 8) {
                endGame();
            }

        }, 500);

    } else {

        setTimeout(function () {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetCards();

        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    canFlip = true;
}

function startTimer() {

    timeRunning = true;

    timerInterval = setInterval(function () {
        seconds++;
        updateStats();
    }, 1000);
}

function updateStats() {

    document.getElementById("moves").textContent = moves;
    document.getElementById("matches").textContent = matches + "/8";

    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;

    if (secs < 10) {
        secs = "0" + secs;
    }

    document.getElementById("time").textContent =
        mins + ":" + secs;
}

function endGame() {

    clearInterval(timerInterval);

    document.getElementById("finalMoves").textContent = moves;

    document.getElementById("finalTime").textContent =
        document.getElementById("time").textContent;

    document.getElementById("winModel").classList.add("show");
}

function newgame() {

    document.getElementById("winModel").classList.remove("show");

    clearInterval(timerInterval);

    startgame();
}
