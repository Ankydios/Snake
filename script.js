// VARIABLES
var musique_de_qualite = document.createElement("audio");
var score = document.getElementById('score');
score.innerHTML = "RUSSES TUÉS : 0"
var test_musique = true
var depart = 127;
var ligne = Math.floor((depart-1) / 17);
var colonne = (depart-1) % 17 + 1;
var positionCorpsInit = [depart,depart-1,depart-2];
let positionCorps = positionCorpsInit
var taille = positionCorps.length;
var last_dir = 'right'
function generate_pomme() {
    var positionsPossiblesPomme = [];
    for (let i = 0; i <= 255; i++) {
    positionsPossiblesPomme.push(i);
    }

    for (let i = 0; i < positionCorps.length - 1; i++) {
        let a = positionCorps[i]
        positionsPossiblesPomme = positionsPossiblesPomme.filter(item => item != a)
    }

    let indexAleatoire = Math.floor(Math.random() * positionsPossiblesPomme.length);
    let positionPomme = positionsPossiblesPomme[indexAleatoire]
    return positionPomme
}

let positionPomme = generate_pomme()
let action = {up: false, down:false, right: false, left: false};

//COULEURS
for (let i = 0 ; i<taille ; i++) {
    var corps = document.getElementById("case"+String(positionCorps[i]));
    if (i == 0) {
        corps.style.backgroundColor = "#4e7cF6";
    }
    else {
        corps.style.backgroundColor = '#2C5AB4';
    }
}
var pomme = document.getElementById("case"+String(positionPomme));
pomme.style.backgroundColor = '#FB335B';

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
    switch (e.code) {
        case "ArrowDown":
            if (last_dir != 'up') {
                action.up = false;
                action.down = true;
                action.right = false;
                action.left = false;
                break;
            }
        case "ArrowUp":
            if (last_dir != 'down') {
                action.up = true;
                action.down = false;
                action.right = false;
                action.left = false;
                break;
            }
        case "ArrowRight":
            if (last_dir != 'left') {
                action.up = false;
                action.down = false;
                action.right = true;
                action.left = false;
                break;
            }
        case "ArrowLeft":
            if (last_dir != 'right') {
                action.up = false;
                action.down = false;
                action.right = false;
                action.left = true;
                break;
            }
    }
    if (test_musique) {
        musique()
    }
    test_musique = false
}

function mange() {
    if (positionPomme == positionCorps[0]) {
        positionCorps.push(positionCorps[positionCorps.length-1])
        positionPomme = generate_pomme()
        pomme = document.getElementById("case"+String(positionPomme));
        pomme.style.backgroundColor = '#FB335B';
        var myAudio = document.createElement("audio");
        myAudio.src = "BAH"+String(Math.floor(Math.random() * 7) + 1)+".mp3";
        myAudio.play(); 
        score.innerHTML = "RUSSES TUÉS : " + String(positionCorps.length - 3);
    }
}

function musique() {
    musique_de_qualite.src = "BNO.mp3";
    musique_de_qualite.play();
    musique_de_qualite.volume = 0.10;
}

function bouge() {
    // Nouvelle position serpent
    oldPositionHead = positionCorps[0]
    lastPositionSnake = positionCorps[positionCorps.length - 1]
    ligne =  Math.floor((oldPositionHead-1) / 17);
    colonne = (oldPositionHead-1) % 17 + 1;
    direction = direction_clavier()
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
    last_dir = direction
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
    // Enlever la couleur bleue de la case précédente
    lastSerpent = document.getElementById("case"+String(lastPositionSnake));
    lastSerpent.style.backgroundColor = "";
    neck = document.getElementById("case"+String(copie_queue[0]));
    neck.style.backgroundColor = "#2C5AB4";
    }
}

game = setInterval(function() {
    bouge()
    mange()
    console.log(positionPomme)
    if (positionCorps.slice(1,positionCorps.length).includes(positionCorps[0])) {
        musique_de_qualite.pause()
        var myAudio = document.createElement("audio");
        myAudio.src = "GAMEOVER.mp3";
        myAudio.play(); 
        clearInterval(game)
    }
}, 70);