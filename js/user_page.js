$(document).ready(function(){
	createRandomBingoTable("#usertable");
	createRandomBingoTable("#cputable");
	eventBindings();
});

var my3DArray = new Array(), cpu3DArray = new Array(),my2DArray = new Array(), cpu2DArray = new Array(),
row = [0,0,0,0,0], column = [0,0,0,0,0];


function eventBindings() {
	$("#usertable .column").click(function() {
	    if ($(this).hasClass("available")) {  		
    		var number = $(this).text();
    		setUserTableValue(this, number);
    		setCpuTableValue(this, number);
		}
		else {
		    //nothing
		}
	});
}

function setUserTableValue(that, number) {
	$(that).removeClass("available").addClass("selected");
	var position = my2DArray.indexOf(parseInt(number));
	var res = arrayPositionToMatrixPosition(position);
	my3DArray[res[0]][res[1]] = true;
	// console.log(my3DArray);
}

function setCpuTableValue(that, number) {
    //its different...
    $('#cputable .column[data-number="'+number+'"]').removeClass("available").addClass("selected");
    var position = cpu2DArray.indexOf(parseInt(number));
    var res = arrayPositionToMatrixPosition(position);
    cpu3DArray[res[0]][res[1]] = true;
}

function checkBingo(user) {
    if (user == "me") {
        
    }
    else if (user == "computer") {
        
    }
}

function checkTables() {
    var rowCount1 = 0;
    for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
            if (my3DArray[0][j] == true) {
                rowCount1++;
            }
            if (my3DArray[1][j] == true) {
                rowCount2++;
            }
            if (my3DArray[1][j] == true) {
                rowCount2++;
            }
            if (j==4){
                if (rowCount1 == 5) {
                    row[0] = 1;
                }
            }
        }
        
    }
}

function matrixPositionToArrayPosition(i,j) {
    return (((i*5)+1) + j -1);
}

function arrayPositionToMatrixPosition(num) {
    // parseInt(22/5) 
    return [(parseInt(num/5)),(num%5)];
}

function createRandomBingoTable(tableId) {
	var count = 25, 
	generatorBingoArray = [], // a template for storing randomly created bingo values
	position, // position in the array from '0' index
	table = $(tableId);	
	
	while (count != 0) {
        var randomNumber = Math.floor((Math.random() * 25) + 1);
        if (generatorBingoArray.indexOf(randomNumber) > -1) {
            continue;
        }
        else {
            generatorBingoArray.push(randomNumber);
            count--;
        }
    }
	
	if (tableId == "#usertable") {
	    my2DArray = generatorBingoArray;
	    my3DArray.length = 0;
    	my3DArray = new Array(5);
    	for (var i=0; i <5; i++)
    		my3DArray[i]=new Array(5);
    	
    	for (var i=0; i<5; i++) {
    		var html = "<div class='row'>";
    		for (var j=0; j<5; j++) {
    			position = matrixPositionToArrayPosition(i,j);// -1 to make it index from 0th position in array
    			my3DArray[i][j] = false;
    			html+= "<div class='column available'>"+my2DArray[position]+"</div>";
    		}
    		html += "</div>";
    		table.append(html);
    	} 
    	
	}
	else if (tableId == "#cputable") {
	    cpu2DArray = generatorBingoArray;
	    cpu3DArray.length = 0;
	    cpu3DArray = new Array(5);
        for (var i=0; i <5; i++)
            cpu3DArray[i]=new Array(5);
        
        for (var i=0; i<5; i++) {
            var html = "<div class='row'>";
            for (var j=0; j<5; j++) {
                position = matrixPositionToArrayPosition(i,j);// -1 to make it index from 0th position in array
                cpu3DArray[i][j] = false;
                html+= "<div class='column available' data-number='"+cpu2DArray[position]+"'>"+cpu2DArray[position]+"</div>";
            }
            html += "</div>";
            table.append(html);
        }
        
	}
}
