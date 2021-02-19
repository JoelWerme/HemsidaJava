// function changeScore(){
//     var score = parseInt(document.getElementById("number").value, 10);
//     score = isNaN(score) ? 0 : score;
//     score++;
//     document.getElementById("number").value = score;
// }

// var score = 0;

// function changeScore() {
//     document.getElementById("number").value = score++;
// }

window.addEventListener("load", () =>{

    const board = document.querySelector("#board");
    const ctx = board.getContext("2d");

    function gameBoard(){
        ctx.fillStyle = ("grey");
        ctx.strokeStyle = ("black");
        ctx.fillRect = (0, 0, board.width, board.height);
        ctx.strokeRect = (0, 0, board.width, board.height);
    }

    function main(){
        setTimeout(function onTick(){
            gameBoard();
            main();
        }, 100)
    }
    
});