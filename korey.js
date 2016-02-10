/**
 * Created by klo on 2/10/2016.
 */
var b = [["x","o","x"],["","x",""],["","","x"]];
var c = [["x","o","x","o"],["o","x","o","o"],["o","o","x","o"],["o","o","o","x"]];
//var x = 0;



function leftToRightDiagonal(array) {
    var counterX = 0;
    var counterO = 0;
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < array.length; j++) {
            if (array[i + j][j] == "x") {
                counterX++;
            }
            else if(array[i - j][j] == "o"){
                counterO++;
            }
        }
    }
    if(counterO == array.length){
        console.log("O wins");
    }
    else if(counterX == array.length){
        console.log("X wins");
    }
    else{
        console.log("no match");
    }
}

function rightToLeftDiagonal(array) {
    var counterX = 0;
    var counterO = 0;
    for (var i = array.length - 1; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if(array[i - j][j] == "o") {
                counterO++;
            }
            else if(array[i - j][j] == "x"){
                counterX++;
            }
        }
    }
    if(counterO == array.length){
        console.log("O wins");
    }
    else if(counterX == array.length){
        console.log("X wins");
    }
}

leftToRightDiagonal(b);
rightToLeftDiagonal(c);