let all_buttons = document.querySelectorAll('.btn')
console.log(all_buttons)

let copyAllButtons = []
for(let i=0; i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1])
}
// console.log(copyAllButtons)

function buttonColorChange(buttonColor){
    if (buttonColor.value === "red"){
        redColor();
    }
    else if(buttonColor.value === "green"){
        greenColor();
    }

    else if(buttonColor.value === "reset"){
        resetColor();
    }
    else if(buttonColor.value === "random"){
        randomColors();
    }
}


function redColor(){
    for(let i=0; i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger")
    }
}

function greenColor(){
    for(let i=0; i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-success")
    }
}


function resetColor(){
    for(let i=0;i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i])
    }
}


function randomColors(){
    let choices = ["btn-primary", "btn-secondary", "btn-sucess","btn-danger","btn-warning", "btn-info"]
    for(let i=0; i<all_buttons.length; i++){
        let randomNumber = Math.floor(Math.random() *6)
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber])
    
    }

}