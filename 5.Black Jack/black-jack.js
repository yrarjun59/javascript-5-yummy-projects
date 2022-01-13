const blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result', 'div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box','score':0},
    'card':['2','3', '4', '5', '6', '7', '8', '9','10', 'J', 'Q', 'K', 'A']
}
    
const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

//make a sound for hit bottom
let hitSound = new Audio('sounds/swish.m4a')

// make a hit botton active
document.querySelector('#blackjack-hit-button').addEventListener('click',hitCardButton)
document.querySelector('#blackjack-deal-button').addEventListener('click',dealButton)


function hitCardButton(){
    let card = radomCard()
    console.log(card)
    showCard(card,YOU)
}

function radomCard(){
    let randomIndex = Math.floor(Math.random() *13)
    return blackjackGame['card'][randomIndex]
}


function showCard(card,activePlayer){
    let cardImage = document.createElement('img')
    cardImage.src =`images/${card}.png`
    document.querySelector(activePlayer['div']).appendChild(cardImage)
    hitSound.play()
}



function dealButton(){
    let yourImage = document.querySelector(YOU['div']).querySelectorAll('img')
    let dealerImage = document.querySelector(DEALER['div']).querySelectorAll('img')

    for (let i=0; i<yourImage.length;i++){
        yourImage[i].remove()
    }

    for (let i=0; i<dealerImage.length;i++){
        dealerImage[i].remove()
    }
}

