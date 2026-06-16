const bootLines = [
"Booting Apple Lisa OS...",
"Loading Birthday Protocol...",
"Verifying User...",
"User Found: LIZA",
"Age Confirmed: 28",
"Searching for Birthday File...",
"Ready."
];

let line = 0;

const bootText = document.getElementById("boot-text");

function bootSequence(){

    if(line < bootLines.length){

        bootText.innerHTML += bootLines[line] + "\n";

        line++;

        setTimeout(bootSequence,700);

    }else{

        setTimeout(()=>{

            document.getElementById("boot-screen").classList.add("hidden");
            document.getElementById("game-screen").classList.remove("hidden");

            startGame();

        },1000);

    }

}

bootSequence();

const size = 8;

let board = [];

const normalMines = [
9,14,21,37,42,50,61
];

const birthdayMine = 0;

function startGame(){

    board=[];

    const gameBoard = document.getElementById("board");

    gameBoard.innerHTML="";

    for(let i=0;i<64;i++){

        const cell = document.createElement("div");

        cell.className="cell";

        cell.dataset.index=i;

        cell.addEventListener("click",()=>clickCell(i,cell));

        gameBoard.appendChild(cell);

        board.push(cell);

    }

}

function clickCell(index,cell){

    if(cell.classList.contains("revealed")) return;

    if(index===birthdayMine){

        unlockBirthday();

        return;

    }

    if(normalMines.includes(index)){

        crash();

        return;

    }

    cell.classList.add("revealed");

    cell.textContent=countAdjacent(index);

}

function countAdjacent(index){

    const row=Math.floor(index/size);
    const col=index%size;

    let count=0;

    for(let r=-1;r<=1;r++){

        for(let c=-1;c<=1;c++){

            if(r===0 && c===0) continue;

            const nr=row+r;
            const nc=col+c;

            if(
                nr>=0 &&
                nr<size &&
                nc>=0 &&
                nc<size
            ){

                const n=nr*size+nc;

                if(normalMines.includes(n))
                    count++;

            }

        }

    }

    return count===0 ? "" : count;

}

function crash(){

    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("crash-screen").classList.remove("hidden");

}

function restartGame(){

    document.getElementById("crash-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");

    startGame();

}

function unlockBirthday(){

    document.getElementById("game-screen").classList.add("hidden");

    document.getElementById("birthday-screen").classList.remove("hidden");

}

document.addEventListener("click",(e)=>{

    if(e.target.id==="celebrate"){

        confetti();

    }

});

function confetti(){

    for(let i=0;i<150;i++){

        const piece=document.createElement("div");

        piece.className="confetti";

        piece.style.left=Math.random()*100+"vw";

        piece.style.background=
        `hsl(${Math.random()*360},100%,50%)`;

        document.body.appendChild(piece);

        let y=-20;

        const fall=setInterval(()=>{

            y+=5;

            piece.style.top=y+"px";

        },20);

        setTimeout(()=>{

            clearInterval(fall);

            piece.remove();

        },4000);

    }

}
