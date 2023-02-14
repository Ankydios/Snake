var depart = 10;
var ligne = Math.floor((depart-1) / 17);
var colonne = (depart-1) % 17 + 1;
var serpent = document.getElementById("case"+String(depart));
var positionSerpent = depart;
serpent.style.backgroundColor = "blue";
let action = {up: false, down:false, right: false, left: false}

function direction_clavier() {
    if (action.up) {
        return 'up'
    }
    else if (action.down) {
        return 'down'
    }
    else if (action.right) {
        return 'right'
    }
    else if (action.left) {
        return 'left'
    }
    else {
        return 'none'
    }
    }


window.onkeydown = function(e) {
    console.log(e)
    switch (e.code) {
        case "ArrowDown":
            action.up = false;
            action.down = true;
            action.right = false;
            action.left = false;
            break;
        case "ArrowUp":
            action.up = true;
            action.down = false;
            action.right = false;
            action.left = false;
            break;
        case "ArrowRight":
            action.up = false;
            action.down = false;
            action.right = true;
            action.left = false;
            break;
        case "ArrowLeft":
            action.up = false;
            action.down = false;
            action.right = false;
            action.left = true;
            break;
    }
}

function bouge() {
    // Colorer la nouvelle case en bleu
    var lastSerpent = document.getElementById("case"+String(positionSerpent));
    ligne =  Math.floor((positionSerpent-1) / 17);
    colonne = (positionSerpent-1) % 17 + 1;
    direction = direction_clavier()
    console.log(direction)
    switch(direction) {
        case 'up':{
            if (ligne != 0) {
                ligne--;
            } 
            else {
                ligne = 14;
            }
            break;
        }
        case 'down':{
            if (ligne != 14) {
                ligne++;
            } 
            else {
                ligne = 0;
            }
            break;
        }
        case 'right':{
            if (colonne != 17) {
                colonne++;
            } 
            else {
                colonne = 1;
            }
            break;
        }
        case 'left':{
            if (colonne != 1) {
                colonne--;
            } 
            else {
                colonne = 17;
            }
            break;
        }
        case 'none':{
            break;
        }
        }
    
    positionSerpent = ligne*17+colonne;
    serpent = document.getElementById('case'+String(positionSerpent));
    serpent.style.backgroundColor = "blue";

    // Enlever la couleur bleue de la case précédente
    lastSerpent.style.backgroundColor = "";
    return positionSerpent
    }

setInterval(function() {
    bouge()
}, 100);