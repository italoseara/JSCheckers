let rows, moving, clone, prediction;

let blackScore, whiteScore;

let xRel = 0;
let yRel = 0;
let table = [];
let holding = false;

let gameTurn = "white";

const move = new Audio('audios/move-self.webm');
const capture = new Audio('audios/capture.webm');
const promote = new Audio('audios/promote.webm');
const gameStart = new Audio('audios/game-start.webm');

// DRAW TABLE
let black = true;

for (let i = 0; i < 8; i++) {

    black = !black

    let div = document.createElement("div");
    div.setAttribute("class", `row`)

    for (let i = 0; i < 8; i++) {
        let square = document.createElement("div");

        if (black) {
            square.setAttribute("class", `square black`);
        } else {
            square.setAttribute("class", `square white`);
        }

        div.appendChild(square);
        black = !black
    }

    document.querySelector(".table").appendChild(div);
}

function restartGame() {
    gameStart.play();
    
    gameTurn = "white";
    document.querySelector("#score-black").textContent = 12;
    document.querySelector("#score-white").textContent = 12;
    
    // DRAW PIECES
    if (document.querySelector(`.active`))
        document.querySelector(`.active`).classList.toggle("active");
        
    document.querySelector(`#player-${gameTurn}`).classList.add("active");

    document.querySelectorAll(".piece, .prediction").forEach(todelete => {
        todelete.remove();
    })

    let piece = document.createElement("div");
    rows = document.querySelectorAll(".row")
    black = true;

    rows.forEach(element => {
        if ([0, 1, 2].includes([...rows].indexOf(element))) {
            piece.setAttribute("class", "piece black");

            element.querySelectorAll(".square").forEach(element2 => {
                if (element2.classList.contains("black")) {
                    element2.appendChild(piece.cloneNode());
                }
            })
        }

        if ([5, 6, 7].includes([...rows].indexOf(element))) {
            piece.setAttribute("class", "piece white");

            element.querySelectorAll(".square").forEach(element2 => {
                if (element2.classList.contains("black")) {
                    element2.appendChild(piece.cloneNode());
                }
            })
        }
    });

    // ANIMATION
    rows.forEach(element => {
        table.push(element.querySelectorAll(".square"));
    })

    prediction = document.createElement("div");
    prediction.setAttribute("class", "prediction");

    document.querySelectorAll(".piece").forEach(element => {
        element.addEventListener("mousedown", (e) => {
            movement(e, element);
        })
    });

    document.querySelector(".table").addEventListener("mousemove", (e) => { if (holding) moveClone(e); })
    document.querySelector(".table").addEventListener("mousedown", () => { holding = true; })
    document.querySelector(".table").addEventListener("mouseup", () => {
        holding = false;
        xRel = 0;
        yRel = 0;

        clone = document.querySelector(".clone");
        moving = document.querySelector(".moving");

        if (moving) moving.style.display = "block";
        if (clone) clone.remove();
    })

}

function getCoordinates(element) {
    for (let i = 0; i < table.length; i++) {
        let i2 = -1;

        for (let j = 0; j < [...table[i]].length; j++) {
            if ([...table[i]][j].contains(element))
                i2 = j;
        }
        if (i2 !== -1) return [i, i2];
    }
    return undefined;
}


function moveClone(e) {

    let clone = document.querySelector(".clone");
    let moving = document.querySelector(".moving");

    if (moving) {
        let moving_rect = moving.getBoundingClientRect()

        if (yRel == 0) {
            xRel = e.x - moving_rect.left;
            yRel = e.y - moving_rect.top;
        }
    }

    if (clone) {
        clone.style.left = (e.x - xRel) + 'px';
        clone.style.top = (e.y - yRel) + 'px';
    }

}

