const bootLines = [
"Booting Apple Lisa OS...",
"Loading system memory...",
"Checking time alignment...",
"Steve Jobs age sync: OK",
"Liza age sync: 28 CONFIRMED",
"Searching for Birthday File...",
"Ready."
];

let i = 0;
const bootText = document.getElementById("bootText");

function boot(){
    if(i < bootLines.length){
        bootText.textContent += bootLines[i] + "\n";
        i++;
        setTimeout(boot,600);
    } else {
        setTimeout(()=>{
            document.getElementById("boot").classList.add("hidden");
            document.getElementById("game").classList.remove("hidden");
        },800);
    }
}

boot();

/* GAME LOGIC */

const corners = document.querySelectorAll(".corner");

/* ONLY ONE WINNING CORNER */
const WINNING_CORNER = Math.floor(Math.random() * 4);

corners.forEach(c => {
    c.addEventListener("click", () => {

        const id = parseInt(c.dataset.id);

        if(id === WINNING_CORNER){
            showWin();
        } else {
            showFail();
        }

    });
});

function showFail(){

    document.getElementById("game").classList.add("hidden");
    document.getElementById("fail").classList.remove("hidden");

    setTimeout(()=>{
        document.getElementById("fail").classList.add("hidden");
        document.getElementById("game").classList.remove("hidden");
    },1200);

}

function showWin(){

    document.getElementById("game").classList.add("hidden");
    document.getElementById("win").classList.remove("hidden");

    document.getElementById("message").innerHTML = `
        
            
            The Apple Lisa was revolutionary.
            <br>
            But unlike the Apple Lisa...
            <br>
            you've aged incredibly well.
            <br><br>

            Over the last 28 years you've collected:
            <br><br>

            ✓ Amazing memories
            <br>
            ✓ Great friends
            <br>
            ✓ Endless stories
            <br>
            ✓ A huge amount of coffee knowledge
            <br><br>

            Thank you for being one of my favourite humans.
            <br><br>

            Here's to version 28.0. please go and make it as amazing as the last 27 years!!
    `;
}

/* CONFETTI */

function confetti(){

    for(let i=0;i<120;i++){

        const d = document.createElement("div");

        d.style.position="fixed";
        d.style.width="8px";
        d.style.height="8px";
        d.style.left=Math.random()*100+"vw";
        d.style.top="-10px";
        d.style.background=`hsl(${Math.random()*360},100%,50%)`;

        document.body.appendChild(d);

        let y=-10;

        const fall=setInterval(()=>{
            y+=5;
            d.style.top=y+"px";
        },20);

        setTimeout(()=>{
            clearInterval(fall);
            d.remove();
        },3000);
    }
}
