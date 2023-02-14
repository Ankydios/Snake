var depart = 127;
var ligne = Math.floor((depart-1) / 17);
var colonne = (depart-1) % 17 + 1;
var positionCorps = [depart,depart-1,depart-2,depart-3,depart-4]
var taille = positionCorps.length
for (let i = 0 ; i<taille ; i++) {
    var corps = document.getElementById("case"+String(positionCorps[i]));
    if (i == 0) {
        corps.style.backgroundColor = "#4e7cF6";
    }
    else {
        corps.style.backgroundColor = '#2C5AB4';
    }
}
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
    // Nouvelle position serpent
    oldPositionHead = positionCorps[0]
    lastPositionSnake = positionCorps[positionCorps.length - 1]
    ligne =  Math.floor((oldPositionHead-1) / 17);
    colonne = (oldPositionHead-1) % 17 + 1;
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
    
    if (direction != 'none') {
    positionHead = ligne*17+colonne;
    var copie_queue = positionCorps.slice(0,positionCorps.length);
    positionCorps[0] = ligne*17+colonne;
    for (let i = 1; i < positionCorps.length; i++) {
        positionCorps[i] = copie_queue[i-1];
    }
    positionCorps[0] = positionHead

    //Colorier en bleu la nouvelle case
    head = document.getElementById('case'+String(positionHead));
    head.style.backgroundColor = "#4e7cF6";
    console.log(positionHead,'tete')
    // Enlever la couleur bleue de la case précédente
    lastSerpent = document.getElementById("case"+String(lastPositionSnake));
    lastSerpent.style.backgroundColor = "";
    neck = document.getElementById("case"+String(copie_queue[0]));
    neck.style.backgroundColor = "#2C5AB4";
    }
}

setInterval(function() {
    bouge()
}, 70);