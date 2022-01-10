function ageInDays(){
    var bornYear = prompt("Which year you born??")
    var d = new Date();
    d1 = d.getFullYear()
    var ageInDays = (d1 - bornYear) * 365
    var h1 = document.createElement('h1')
    var textAnswer = document.createTextNode(`You are ${ageInDays} days old`)
    h1.setAttribute("id","ageInDays")
    h1.appendChild(textAnswer)
    document.getElementById('flex-box-result').appendChild(h1)

}

function reset(){
    document.getElementById('ageInDays').remove()
    console.log("Removed")
}