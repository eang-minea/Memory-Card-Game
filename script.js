var images = [
    "c:\Users\USER\Documents\ASP.Net.webp",
    "c:\Users\USER\Documents\ASP.Net.webp",
    "c:\Users\USER\Documents\ASP.Net.webp",
    "c:\Users\USER\Documents\ASP.Net.webp",
    "c:\Users\USER\Documents\ASP.Net.webp",
    "c:\Users\USER\Documents\ASP.Net.webp",
    "c:\Users\USER\Documents\ASP.Net.webp",
    "c:\Users\USER\Documents\ASP.Net.webp",
];


var firstCard = null
var secondCard = null
var canFlip = true
var matches = 0
var moves = 0
var secomds = 0
var timeRunning = false
var timerInterval;


function startgame() {
    var gameBoard = document.getElementById("gameBoard")
    gameBoard.innerHTML = ""

    var cardImages = images.concat(images) 

    cardImages.sort(function() {
        return Math.random() - 0.5
    })

    for (var i = 0; i < cardImages.length; i++) {
        var card = document.createElement('div');
        card.className = "card";
        card.innerHTML = `
        <div class="card-front"><i class="fas fa-heart></i</div>
        <div class="card-back"><img src="${cardImages[i]}" alt=""></div>
        `
        card.onclick = flipCard;
        card.dataset.image = cardImages [i]
        gameBoard.appendChild(card)
    }

}
























