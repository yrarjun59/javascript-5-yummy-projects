let blackJackGame = {
    'you':{'scoreSpan':'#your-blackjack-result', 'div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2' ,'3', '4', '5','6','7', '8', '9', '10', 'K', 'J','Q', 'A'],
    'cardsMap':{'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':10,'10':10, 'K':10, 'J':10, 'Q':10, 'A': [1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isHit':false,
    'isStand':false,
    'turnOver':false,    
}

const YOU = blackJackGame['you']
const DEALER = blackJackGame['dealer']

const hitSound = new Audio('sounds/swish.m4a')
const winSound = new Audio('sounds/cash.mp3')
const lossSound = new Audio('sounds/aww.mp3')
const drawSound = new Audio('sounds/draw.m4a')

// make a hit bottom active
document.querySelector('#blackjack-hit-button').addEventListener('click',hitButton)
document.querySelector('#blackjack-stand-button').addEventListener('click',standHitButton)
document.querySelector('#blackjack-deal-button').addEventListener('click',blackJackDeal)

function hitButton(){
    if(blackJackGame['isStand']===false){
        blackJackGame['isHit']=true;
        let card = randomCard()
        // console.log(card)
        showCard(card,YOU)
        updateScore(card, YOU)
        // console.log(YOU['score'])
        showScore(YOU)
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()* 13)
    return blackJackGame['cards'][randomIndex]
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
        let cardImage = document.createElement('img')
        cardImage.src = `images/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitSound.play()
    }
}


function sleep(ms){
    return new Promise(resolve =>setTimeout(resolve,ms))
}

async function standHitButton(){
    if(blackJackGame['isHit']===true){
        blackJackGame['isStand']=true
        while(DEALER['score']<16 && blackJackGame['isHit']===true){
            let card = randomCard();
            showCard(card,DEALER)
            updateScore(card,DEALER)
            showScore(DEALER);
            await sleep(1000)
        }

        blackJackGame['turnOver']=true
        let winner= computeWinner()
        showResult(winner)
    }
       
}

function blackJackDeal(){
    if(blackJackGame['turnOver']===true){
        blackJackGame['isStand']=false
        blackJackGame['isHit']=false
        let yourImages = document.querySelector([YOU['div']]).querySelectorAll('img')
        let dealerImages = document.querySelector([DEALER['div']]).querySelectorAll('img')
        
        for(let i=0;i<yourImages.length;i++){
            yourImages[i].remove()
        }
        
        for(let i=0;i<dealerImages.length;i++){
            dealerImages[i].remove()
        }   
        
        YOU['score'] = 0;
        
        DEALER['score'] = 0;
        
        document.querySelector(YOU['scoreSpan']).textContent = 0
        document.querySelector(YOU['scoreSpan']).style.color = "#ffffff"
        
        document.querySelector(DEALER['scoreSpan']).textContent = 0
        document.querySelector(DEALER['scoreSpan']).style.color = "#ffffff"
        
        document.querySelector('#black-jack-result').textContent = "Lets: Play"
        document.querySelector('#black-jack-result').style.color = "black"
        
        blackJackGame['turnOver']= true

    }
}


function updateScore(card, activePlayer){
    if (card==='A'){
        if (activePlayer['score']+ blackJackGame['cardsMap'][card][1] <=21){
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackJackGame['cardsMap'][card][0]
        }
    }
    else {
    activePlayer['score']+=blackJackGame['cardsMap'][card]    
    }
}


function showScore(activePlayer) {
    if (activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST";
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
}


// compute winner
function computeWinner(){
    let winner;
    if (YOU['score'] <=21){
        if(YOU['score']> DEALER['score'] || (DEALER['score']>21)){
            blackJackGame['wins']++;
            winner = YOU;
        }
        else if(YOU['score']< DEALER['score']){
            blackJackGame['losses']++;
            winner = DEALER;
        }
        else if(YOU['score'] === DEALER['score']){
            blackJackGame['draws']++;
        }
    }

    else if(YOU['score']>21 && DEALER['score']<=21){
        blackJackGame['losses']++;
        winner = DEALER
    }

    else if(YOU['score'] >21 && DEALER['score'] >21){
        blackJackGame['draws']++;
    }
    
    console.log(blackJackGame)
    return winner;

}

function showResult(winner){
    let message, messageColor;
    if(blackJackGame['turnOver']===true){

        if(winner ===  YOU){
            document.querySelector('#wins').textContent = blackJackGame['wins']
            message="YOU WON!"
            messageColor= 'green'
            winSound.play()
        }
        else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackJackGame['losses']
            message="YOU LOST!"
            messageColor= 'red'
            lossSound.play()
        }
        
        else{
            document.querySelector('#draws').textContent = blackJackGame['draws']
            message="GAME DREW!"
            messageColor= 'orange'
            drawSound.play()
        }
        
        document.querySelector('#black-jack-result').textContent = message
        document.querySelector('#black-jack-result').style.color = messageColor
        
    }
}