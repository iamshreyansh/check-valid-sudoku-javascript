var Test = ( function (){

    var individualRows, individualColumns, individualGrids;

    init = function(data)
    {
        splitUtils(data);
        return this;
    };

    isValid = function()
    {
        return (validateSudoku(individualRows) && validateSudoku(individualColumns) && validateSudoku(individualGrids));
    };

    validateSudoku = function(data)
    {
        for (var row = 0; row < 9; row++) 
        {
            data[row].sort();
            
            for (var col = 0; col < 9; col++) 
            {
                var value = data[row][col], adjacent = data[row][col + 1]; 
                if (!(value && value > 0 && value < 10))
                    return false;
            
                if (col !== 8 && value === adjacent)
                    return false;
            }
        }
        return true;
    };

    splitUtils = function(data)
    {
        individualRows = data;
        individualColumns = [];
        individualGrids = [];

        for (var i = 0; i < 9; i++) 
        {
            individualColumns.push([]);
            individualGrids.push([]);
        }
        
        for (var row = 0; row < 9; row++) 
        {
            for (var col = 0; col < 9; col++) 
            {
                individualColumns[col][row] = data[row][col];

                gridRow = Math.floor( row / 3 );
                gridCol = Math.floor( col / 3 );
                gridIndex = gridRow * 3 + gridCol;

                individualGrids[gridIndex].push(data[row][col]);               
            }
        }

    };

    return {
        init: init,
        isValid: isValid
    };
})();


var board = [
    [7,2,6,4,9,3,8,1,5],
    [3,1,5,7,2,8,9,4,6],
    [4,8,9,6,5,1,2,3,7],
    [8,5,2,1,4,7,6,9,3],
    [6,7,3,9,8,5,1,2,4],
    [9,4,1,3,6,2,7,5,8],
    [1,9,4,8,3,6,5,7,2],
    [5,6,7,2,1,4,3,8,9],
    [2,3,8,5,7,9,4,6,1]

];

console.log(Test.init(board).isValid());