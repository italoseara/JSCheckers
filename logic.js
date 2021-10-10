// LOGIC
let gameState = "white";
var move = new Audio('audios/move-self.webm');
var capture = new Audio('audios/capture.webm');
var promote = new Audio('audios/promote.webm');

function movement(e, element) {

    if (gameState != element.classList[1]) return;

    document.querySelectorAll(".prediction").forEach(element => {
        element.remove();
    })

    document.querySelectorAll(".clone").forEach(element => {
        element.remove();
    })

    if (document.querySelector(".moving"))
        document.querySelector(".moving").classList.remove("moving");

    // MOVING
    let clone = element.cloneNode();
    clone.innerHTML = element.innerHTML;
    clone.classList.add("clone");
    clone.style.position = "absolute";
        
    document.body.appendChild(clone);
    element.classList.add("moving");
    
    moveClone(e)
    element.style.display = "none";
    // ======

    const coords = getCoordinates(element);
    
    drawPredictions(element, coords)

    document.querySelectorAll(".prediction").forEach(element_prediction => {
        element_prediction.addEventListener("mouseup", () => {
    
            let moving_piece = document.querySelector(".moving");
            let clone = document.querySelector(".clone");
            
            if (clone) {
                clone.remove()
                moving_piece.style.display = "block";
            }
            
            const coords = getCoordinates(element_prediction);
            let promotion = false;

            if (
                !element.classList.contains("dame") &&
                element.classList[1] == "white" &&
                coords[0] == 0
            ) {
        
                element.classList.add("dame");
                element.innerHTML = `<i class="fas fa-crown" style="font-size:36px; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--white-piece-outer);"></i>`;

                promote.play();
                promotion = true;
        
            } else if (
                !element.classList.contains("dame") &&
                element.classList[1] == "black" &&
                coords[0] == 7
            ) {
        
                element.classList.add("dame");
                element.innerHTML = `<i class="fas fa-crown" style="font-size:36px; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--black-piece-outer);"></i>`;

                promote.play();
                promotion = true;
            } 

            element_prediction.parentNode.appendChild(moving_piece);
            
            document.querySelectorAll(".prediction").forEach(e => {
                e.remove();
            })

            if (element_prediction.classList[1]) {
                let x = element_prediction.classList[1][0];
                let y = element_prediction.classList[1][2];

                table_array[x][y].firstChild.remove();

                if (drawPredictions(element, getCoordinates(element))) {
                    gameState = gameState == "white" ? "black" : "white";
                } else {
                    document.querySelectorAll(".prediction").forEach(e => {
                        e.remove();
                    })
                }
                if (!promotion)
                    capture.play();
            } else {
                if (!promotion)
                    move.play();
            }
            
            gameState = gameState == "white" ? "black" : "white";
    
        })
    })
}


function drawPredictions(element, coords) {

    let eatable = false;
    let prediction_copy;

    if (element.classList.contains("black") || element.classList.contains("dame")) {

        try {

        if (table_array[coords[0]+1][coords[1]+1])
            
            prediction_copy = prediction.cloneNode();

            if (!table_array[coords[0]+1][coords[1]+1].firstChild)
                table_array[coords[0]+1][coords[1]+1]
                    .appendChild(prediction_copy.cloneNode());
            
            else {
                if (table_array[coords[0]+1][coords[1]+1].firstChild
                    .classList[1] != element.classList[1] &&
                    table_array[coords[0]+2][coords[1]+2] &&
                    !table_array[coords[0]+2][coords[1]+2].firstChild
                ) {
                    prediction_copy.classList.add(`${[coords[0]+1]}-${[coords[1]+1]}`);

                    table_array[coords[0]+2][coords[1]+2]
                        .appendChild(prediction_copy.cloneNode());

                    eatable = true;
                }
            }
        
        } catch (error) { }

        try {

        if (table_array[coords[0]+1][coords[1]-1])

            prediction_copy = prediction.cloneNode();

            if (!table_array[coords[0]+1][coords[1]-1].firstChild)
                table_array[coords[0]+1][coords[1]-1]
                    .appendChild(prediction_copy.cloneNode());
            
            else {
                if (table_array[coords[0]+1][coords[1]-1].firstChild
                    .classList[1] != element.classList[1] &&
                    table_array[coords[0]+2][coords[1]-2] && 
                    !table_array[coords[0]+2][coords[1]-2].firstChild
                ) {
                    prediction_copy.classList.add(`${[coords[0]+1]}-${[coords[1]-1]}`);

                    table_array[coords[0]+2][coords[1]-2]
                        .appendChild(prediction_copy.cloneNode());

                    eatable = true;
                }
            }

        } catch (error) { }

    } 
    
    if (element.classList.contains("white") || element.classList.contains("dame")) {

        try {

        if (table_array[coords[0]-1][coords[1]+1])

            prediction_copy = prediction.cloneNode();

            if (!table_array[coords[0]-1][coords[1]+1].firstChild)
                table_array[coords[0]-1][coords[1]+1]
                    .appendChild(prediction_copy.cloneNode());
            
            else {
                if (table_array[coords[0]-1][coords[1]+1].firstChild
                    .classList[1] != element.classList[1] &&
                    table_array[coords[0]-2][coords[1]+2] &&
                    !table_array[coords[0]-2][coords[1]+2].firstChild
                ) {
                    prediction_copy.classList.add(`${[coords[0]-1]}-${[coords[1]+1]}`);

                    table_array[coords[0]-2][coords[1]+2]
                        .appendChild(prediction_copy.cloneNode());

                    eatable = true;
                }
            }

        } catch (error) { }

        try {

        if (table_array[coords[0]-1][coords[1]-1])
        
            prediction_copy = prediction.cloneNode();

            if (!table_array[coords[0]-1][coords[1]-1].firstChild)
                table_array[coords[0]-1][coords[1]-1]
                    .appendChild(prediction_copy.cloneNode());
            
            else {
                if (table_array[coords[0]-1][coords[1]-1].firstChild
                    .classList[1] != element.classList[1] &&
                    table_array[coords[0]-2][coords[1]-2] && 
                    !table_array[coords[0]-2][coords[1]-2].firstChild
                ) {
                    prediction_copy.classList.add(`${[coords[0]-1]}-${[coords[1]-1]}`);

                    table_array[coords[0]-2][coords[1]-2]
                        .appendChild(prediction_copy.cloneNode());

                    eatable = true;
                }
            }
        
        } catch (error) { }
            
    }
    
    return eatable;
}