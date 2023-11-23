

//get DOM elements
const cases = [...document.getElementsByClassName("case")]; // nodelist -> array
let joueur = document.getElementById("joueur");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let scoreNul = document.getElementById("scoreNul");




//var X = "<span style='color: red;'>X</span>";




// game's memory
let state = {
  joueurEnCours: 1,
  scoreJ1: 0,
  scoreJ2: 0,
  matchNul: 0,
  c1: 0,
  c2: 0,
  c3: 0,
  c4: 0,
  c5: 0,
  c6: 0,
  c7: 0,
  c8: 0,
  c9: 0,
};




const resetState = () => { //reset the grid
  joueurEnCours = 1;
  state.c1 = 0;
  state.c2 = 0;
  state.c3 = 0;
  state.c4 = 0;
  state.c5 = 0;
  state.c6 = 0;
  state.c7 = 0;
  state.c8 = 0;
  state.c9 = 0;
};




const verifierVictoire = () => { //test all the possibilities to win
  if (
    (state.c1 == state.c2 && state.c2 == state.c3 && state.c1 > 0) ||
    (state.c1 == state.c4 && state.c4 == state.c7 && state.c1 > 0) ||
    (state.c1 == state.c5 && state.c5 == state.c9 && state.c1 > 0) ||
    (state.c3 == state.c5 && state.c5 == state.c7 && state.c7 > 0) ||
    (state.c2 == state.c5 && state.c5 == state.c8 && state.c2 > 0) ||
    (state.c3 == state.c6 && state.c6 == state.c9 && state.c3 > 0) ||
    (state.c4 == state.c5 && state.c5 == state.c6 && state.c4 > 0) ||
    (state.c7 == state.c8 && state.c8 == state.c9 && state.c7 > 0)
  ) {
    console.log("winner !");
    return true;
  } else if ( //if all cases are full and there is no win, return null for a draw game
    state.c1 !== 0 &&
    state.c2 !== 0 &&
    state.c3 !== 0 &&
    state.c4 !== 0 &&
    state.c5 !== 0 &&
    state.c6 !== 0 &&
    state.c7 !== 0 &&
    state.c8 !== 0 &&
    state.c9 !== 0
  ) {
    return null;
  } else {
    return false;
  }
};

var username = prompt("Veuillez entrer le nom du joueur 1:");

    //Verify if there is a username
    if (username != null && username.trim() !== "") {
        //Use username
        document.querySelector("#nom1").textContent = "Score de " + username + " : 0" ;
        document.querySelector("#joueur").textContent = username;
    } else {
        //if there is no name
        alert("Vous devez saisir un nom d'utilisateur.");
    }

var username2 = prompt("Veuillez entrer le nom du joueur 2:");

    //Verify if there is a username
    if (username2 != null && username2.trim() !== "") {
        //User username
        document.querySelector("#nom2").textContent = "Score de " + username2 + " : 0";
    } else {
        //if there is no name
        alert("Vous devez saisir un nom d'utilisateur.");
    }


const jouerCase = (e) => {
  let idCase = e.target.id;




  //if case already played : nothing
  if (state[idCase] !== 0) return;




  state[idCase] = state.joueurEnCours;




  let isVctoire = verifierVictoire();




  if (isVctoire === true) { //if victory, display play again button and score


    document.querySelector("#play-again").style.display = "inline";
    document.querySelector("#score").style.display = "none";
    document.querySelector("#fin").style.display = "inline";




    if (state.joueurEnCours == 1) { //if player 1 wins, add 1 to his score and display the score of the game
      state.scoreJ1++;
      document.querySelector("#nom1").textContent = "Score de " + username + " : " + state.scoreJ1;
      document.querySelector("#fin").textContent = "Victoire de " + username;
    } else { //if player 2 wins, add 1 to his score and display the score of the game
      state.scoreJ2++;
      document.querySelector("#nom2").textContent = "Score de " + username2 + " : " + state.scoreJ2;
      document.querySelector("#fin").textContent = "Victoire de " + username2;
    }


   
  } else if (isVctoire === null) { //if draw, add 1 to draw games and display the score of the game
    // si nul




    state.matchNul++;
    scoreNul.textContent = state.matchNul;
    joueur.textContent = username;


    //if draw, display play again button and score
    document.querySelector("#play-again").style.display = "inline";
    document.querySelector("#score").style.display = "none";
    document.querySelector("#fin").style.display = "inline";
    document.querySelector("#fin").textContent = "Match Nul";


   
  } else if (isVctoire === false) {
    //else game continue
    if (state.joueurEnCours == 1) {
      state.joueurEnCours = 2;
      e.target.textContent = "X";
      joueur.textContent = username2;
      turn = "O";
        document.querySelector(".bg").style.left = "5rem";
    } else {
      state.joueurEnCours = 1;
      e.target.textContent = "O";
      joueur.textContent = username;
      turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
  }
};




cases.forEach((el) => {
  el.addEventListener("click", jouerCase);
});


document.querySelector("#play-again").addEventListener("click", ()=>{ //reset the game when play again button is pressed
    resetState();
    cases.forEach((c) => (c.textContent = ""));
    document.querySelector("#play-again").style.display = "none";
    document.querySelector("#score").style.display = "inline";
    document.querySelector("#fin").style.display = "none";
})


