function rpsGame(yourChoice){

    var humanChoice, botChoice

    humanChoice = yourChoice.id
    console.log('Your Choice:',humanChoice)
    
    botChoice = numberToChoice(randToRpsInt())
    console.log('Computer Choice:',botChoice)

    result = decideWinner(humanChoice, botChoice) //==>[0,1]
    console.log(result)
    
    message = finalMessage(result) //==>You Won!
    console.log(message)
    
    rpsFrontEnd(humanChoice,botChoice,message)

}

function randToRpsInt(){
    return Math.floor(Math.random() *3);
}

function numberToChoice(number){
    return ['rock','scissor','paper'][number];
}


function decideWinner(yourChoice,computerChoice){

    let rpsDatabases = {
        'rock':{'rock':0.5,'scissor':1,'paper':0},
        'scissor':{'rock':0,'scissor':0.5,'paper':1},
        'paper':{'rock':1,'scissor':0,'paper':0.5},
    }

    var yourScore = rpsDatabases[yourChoice][computerChoice]
    var computerScore = rpsDatabases[computerChoice][yourChoice]

    return [yourScore, computerScore]

}

function finalMessage([yourScore, computerScore]){
    if(yourScore===0.5){
        return {'message':' Game Tied!','color':'Orange'}
    }
    else if(yourScore===0){
        return {'message':'You lost!','color':'Red'}
    }
    else{
        return {'message':'You Won!','color':'Green'}
    }

}


function rpsFrontEnd(humanImageChoice, computerImageChoice, finalMessage){
    var imagesDatabase= {
        'rock':document.getElementById('rock').src,
        'scissor':document.getElementById('scissor').src,
        'paper':document.getElementById('paper').src,
    }

    // Remove all the images
    document.getElementById('rock').remove()
    document.getElementById('scissor').remove()
    document.getElementById('paper').remove()

    var humanDiv = document.createElement('div')
    var messageDiv = document.createElement('div')
    var computerDiv = document.createElement('div')

    humanDiv.innerHTML = "<img src = '"+ imagesDatabase[humanImageChoice]+ "'+ style = 'box-shadow:0px 10px 50px rgba(37, 50, 233, 1) ' />"
    messageDiv.innerHTML = "<h1 style = 'color:"+finalMessage['color'] +";font-size:60px;padding:30px'>"+finalMessage['message']+"</h1>"
    computerDiv.innerHTML = "<img src = '"+ imagesDatabase[computerImageChoice]+ "'+ style = 'box-shadow:0px 10px 50px rgba(243,38,24,1)' />"
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv)
    document.getElementById('flex-box-rps-div').appendChild(messageDiv)
    document.getElementById('flex-box-rps-div').appendChild(computerDiv)

}