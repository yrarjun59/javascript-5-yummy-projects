function generateCat(){
    let image = document.createElement('img')
    image.setAttribute('id','img')
    let div = document.getElementById('flex-cat-gen')
    image.src = 'cat-4.gif'
    div.appendChild(image)
    console.log("Cat added....")
}

// function generateCat(){
//     var image = document.createElement('img');
//     var div = document.getElementById('flex-cat-gen');
//     image.src = "cat-4.gif";
//     div.appendChild(image);
// };

function removeCat(){
    document.getElementById('img').remove()
    console.log("Cat removed....")

}