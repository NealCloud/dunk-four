
function checkWin(board, r, c, match){
    //get starting column and row coordinates
    var col = parseInt(c);
    var row = parseInt(r);
    //get starting value in array (x or o);
    var marker =  board[row][col];
    //initialize points to compare with matches needed
    var points = 0;
    //stack of searches through the array
    //row up/ row down/column up/column down/diagonal left to right down/ up /diagonal right to left down/ up
    var callstack = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[-1,1],[1,-1]];
    //loop that calls each search needed
    for(var i = 0 ; i < 8; i += 2){
        //reset point to one
        points = 1;
        //call a search in one direction
        points = searchMatches(board, points, row, col, marker, callstack[i][0], callstack[i][1]);
        if( matchCheck()) return true;
        //call a search in opposite direction
        points = searchMatches(board, points, row, col, marker, callstack[i+1][0], callstack[i+1][1]);
        if( matchCheck()) return true;
    }
    //check if enough matches have been found;
    function matchCheck(){
        if(points == match){
            return true;
        }
    }
    return false;
}

function searchMatches(board, points, row, col, marker, increment, increment2){
    while(true) {
        //searches through array depending on the increment number given [0 no moves 1 move forward -1 move backward]
        row += increment;
        col += increment2;
        //return if enough matches found;
        if(points == match){
            return points;
        }
        //make sure its still in array bounds;
        else if(row > board.length - 1 || row < 0 || col > board.length - 1 || col < 0){
            break;
        }
        //check if no match found
        else if( marker != board[row][col]){
            break;
        }
        //check if match found
        else if (marker == board[row][col]){
            points++;
        }
    }
    //return points
    return points;
}

