/**
 * Created by Mad Martigan on 2/10/2016.
 */
function vertical(board){
    var x; var o;
    var bLen = board.length;
    for(var i = 0;i < bLen; i++){
        x = 0;
        o = 0;
        for(var j = 0; j < bLen; j++){
            if(board[j][i] == "x"){
                x += 1;
            }
            else if(board[j][i] == "o"){
                o += 1;
            }
        }
        if(x == bLen){
            return "X";
        }
        else if(o == bLen){
            return "O";
        }
    }
    return false;
}
//put in your function variable in here to test
var winCheck = [vertical, vertical, vertical];

function checkWin(){
    for(var i = 0; i < winCheck.length; i++){
        var a = winCheck[0](b);
        if(a) return a + " WINS";
    }
    return false;
}




//test board
b = [["x","o","o"],["","x","o"],["x","x","x"]];
console.log(checkWin());
