# Dunk Four

A tic tac toe / connect 4 game.
> make 3 or 4 baskets in row or vertical line to win

- [Live Demo](http://nealcloud.github.io/dunk-four/) 

### Features
  - player team selection
  - optional board size
  - classic mode and connect 4 options
  - timer selection
  - power up meter
  
### Lessons Learned
 - making turns for team
 - how to check all rows and columns for a match in a nested list
 

##### Script to Check for Win condition
##### parameters: a 'board' nested list [[],[],[]], numbers for the row and column starting point, and a string symbol 'X O' to check for match. 
```javascript
function checkWin(board, r, c, match){
    var col = parseInt(c);
    var row = parseInt(r);
    var marker =  board[row][col];
    var points = 0;
    var callstack = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[-1,1],[1,-1]];
    for(var i = 0 ; i < 8; i += 2){
        points = 1;
        points = searchMatches(points, row, col,callstack[i][0], callstack[i][1]);
        if( matchCheck()) return true;
        points = searchMatches(points, row, col, callstack[i+1][0], callstack[i+1][1]);
        if( matchCheck()) return true;
    }
    function matchCheck(){
        return (points == match);
    }
    function searchMatches( numpoint, numrow, numcol, direction, direction2){
        while(true) {
            numrow += direction;
            numcol += direction2;
            if(numpoint == match){
                break;
            }
            else if(numrow > board.length - 1 || numrow < 0 || numcol > board.length - 1 || numcol < 0){
                break;
            }
            //check if no match found
            else if( marker != board[numrow][numcol]) break;
            else if (marker == board[numrow][numcol])  numpoint++;
        }
        return numpoint;
    }
    return false;
}
```
### Live View
![ScreenShot](https://nealcloud.github.io/assets/img/c1.png)

### Version
1.5

### Tech
* [jQuery]

### Todos
 - [ ] update modal css
 - [ ] increase difficulty

### Bugs
 - Dunk meter sometimes not accurate
 
License
----
MIT

