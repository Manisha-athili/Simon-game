let gameSeq = [];
let userSeq = [];
let scoreArray = [];
let largest =0;


let btns =["red","yellow", "green", "violet"];

let started = false;
let level = 0;

let h1Level =  document.getElementById('level');
let h3 = document.querySelector('h3');
let p = document.querySelector('p');
let h1 = document.querySelector('.h1');
let para = document.querySelector("#para");        // it will heps to position the helpbtn


let score = 0;

// Create and insert Help Button
let helpBtn = document.createElement("button");   // here states the creating helpbutton to get help.
helpBtn.innerText =" Help Box ! ";
helpBtn.classList.add('helpbtn');
para.insertAdjacentElement('afterend', helpBtn);

    
// Create section for showing colors and OK button for closing the help
let helpColors = document.createElement("section");   
let okButton = document.createElement("button");        // ok button

// Help Button click event
helpBtn.addEventListener("click", showColors); 



function showColors(){                                   // this is the event when help but is clicked.
    helpColors.innerHTML = `<strong>Colors:</strong> ${gameSeq.join(", ")}`;             // this brings colors to help box
    helpColors.classList.add('colorsOfHelp'); 
    helpBtn.insertAdjacentElement('afterend',helpColors);    // position of colors

    okButton.innerHTML = ` Close `;
    okButton.classList.add("okbtn");
    helpColors.insertAdjacentElement('afterend',okButton);
}

// Close Help Event
okButton.addEventListener("click",closeHelp);

function closeHelp(){
        helpColors.remove();
        okButton.remove();         // this will remove the colors box
    }

// -- -- -- -- -- -- starte the game by pressing keyboard key

let startbtn = document.createElement("button");
startbtn.classList.add('startbtn'); 
startbtn.innerText= " START ";
h3.append(startbtn);

startbtn.addEventListener("click", function (){      //  press key  function use to start the game
    if(started == false){
        console.log("Game Started");
        started = true;
        levelUp();
                             // function calling
    }
});

function btnFlash(btn){                        // used to flash the button  randomly by the system
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash")},300);
}

function btnPress() {
    let btn = this;
    btnFlash(btn);                     
    btncolor = btn.getAttribute("id");            // we get the clicked color by id 
    // console.log(btncolor);
    userSeq.push(btncolor);                 // id == color
    checkAns(userSeq.length-1);               //it will print current level
}

let allBtns = document.querySelectorAll(".btn");
    for(btn of allBtns){
        btn.addEventListener("click", btnPress)
    };

function checkAns(idx){
                                                     
    if(userSeq[idx]=== gameSeq[idx]){                 // Check if the user's sequence at the given index matches the game's sequence
        if (userSeq.length === gameSeq.length) {
                                                    // If the user's sequence length equals the game's sequence length                                 
                const timepassed = setTimeout(() => {
                h3.innerHTML = `${level} passed`;
                }, 500);                                   // Clear the interval after 200 milliseconds

                score = level*10;
                setTimeout(levelUp, 500);
                p.innerHTML = `Your Score <b> <br>${score}</b>`;
                
        }
    }else{
        h1Level.innerText = `Level 0${level} You Failed `;
        h3.innerText= `GAME OVER !`;
        createStartButton();
        scoreArray.push(score);
        highestscore();
        reset();
        
    }
}
 function levelUp() {
   
    userSeq = []; // it will help to empty thecolors and helps to take all colors
    level++;
    h1Level.innerText = `level 0${level}`;
    

    let randIdx = Math.floor (Math.random() * btns.length);   // used to genarate random values
    let randColor = btns[randIdx];         // color is trigered with the help of random val as index.
    setTimeout( () => { h3.innerHTML= `Click ${randColor} Color along with the previous ${level - 1} colors.`;
        }, 500);
   
    let randBtn = document.querySelector(`.${randColor}`) // used to access the random val colored btn
    gameSeq.push(randColor);
    
    btnFlash(randBtn); // random btn choose
 }

 function highestscore() {
    largest = Math.max(largest, ...scoreArray);

    para.innerHTML = `Highest Score <br>${largest}`;
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;  
    score =0;
    
}
 
function createStartButton() {
    startbtn = document.createElement("button");
    startbtn.classList.add('startbtn');
    startbtn.innerText = " RESTART";
    h3.insertAdjacentElement("afterend", startbtn);

    startbtn.addEventListener("click", function () {
        if (!started) {
            console.log("Game Started");
            started = true;
            this.remove();
            levelUp();
        }
    });
}








   


