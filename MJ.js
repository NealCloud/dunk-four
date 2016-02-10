b = [["x","o", ""],["x", "",""], ["x","o","o"]];

function horizontal (board) {
    var x; var o;
    var bLen = board.length;

    for(var i = 0; i < bLen ; i++){
        x = 0;
        o = 0;
        for(var j = 0; j < bLen ; j++ ){
            if (board[i][j] == "x"){
                x += 1;
            }
            else if (board[i][j] == "o"){
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


var hWinCheck = [horizontal, horizontal];

function testForWinner(){
    for(var i = 0; i < hWinCheck.length; i++){
        var h = hWinCheck[0](b);
        if(h) return h;
    }
    return false;
}
console.log(testForWinner());