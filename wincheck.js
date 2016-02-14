
function checkWin(board, r, c, match){
    var col = parseInt(c);
    var row = parseInt(r);

    var marker =  board[row][col];
    var points = 1;

    points = looper(board, points, row, col, marker, 1, 0 );
    if( winMet()) return true;
    points = looper(board, points, row, col, marker, -1, 0 );
    if( winMet()) return true;

    points = 1;
    points = looper(board, points, row, col, marker, 0, 1);
    if( winMet()) return true;
    points = looper(board, points, row, col, marker, 0, -1);
    if( winMet()) return true;

    points = 1;
    points = looper(board, points, row, col, marker, 1, 1);
    if( winMet()) return true;
    points = looper(board, points, row, col, marker, -1, -1);
    if( winMet()) return true;

    points = 1;
    points = looper(board, points, row, col, marker, -1, 1);
    if( winMet()) return true;
    points = looper(board, points, row, col, marker, 1, -1);
    if( winMet()) return true;

    function winMet(){
        if(points == match){
            return true;
        }
    }
    return false;
}

function looper(board, points, row, col, marker, increment, increment2){
    while(true) {
        row += increment;
        col += increment2;
        if(points == match){
            return points;
        }
        else if(row > board.length - 1 || row < 0 || col > board.length - 1 || col < 0){
            break;
        }
        else if( marker != board[row][col]){
            break;
        }
        else if (marker == board[row][col]){
            points++;
        }
    }
    return points;
}

