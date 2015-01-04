$(document).ready(function() {
	createRandomBingoTable("#usertable");
	createRandomBingoTable("#cputable");
	eventBindings();
});

var my2DArray = new Array(), //2d array of user to store true/false values
cpu2DArray = new Array(), //2d array of computer to store true/false values
my1DArray = new Array(), //array to store values of user's numbers
cpu1DArray = new Array(), //array to store values of cpu's numbers
user = new Object(), computer = new Object();

user["row"] = [0, 0, 0, 0, 0];
user["column"] = [0, 0, 0, 0, 0];
user["forward_diagonal"] = 0;
user["backward_diagonal"] = 0;

computer["row"] = [0, 0, 0, 0, 0];
computer["column"] = [0, 0, 0, 0, 0];
computer["forward_diagonal"] = 0;
computer["backward_diagonal"] = 0;

function eventBindings() {
	$("#usertable .column").click(function() {
		if ($(this).hasClass("available")) {
			var number = $(this).text();
			setUserTableValue(this, number);
			setCpuTableValue(this, number);
		} else {
			//nothing
		}
	});
}

function setUserTableValue(that, number) {
	$(that).removeClass("available").addClass("selected");
	var position = my1DArray.indexOf(parseInt(number));
	var res = arrayPositionToMatrixPosition(position);
	my2DArray[res[0]][res[1]] = true;
	checkTables("user");
	checkBingo("user");
}

function setCpuTableValue(that, number) {
	//its different...
	$('#cputable .column[data-number="' + number + '"]').removeClass("available").addClass("selected");
	var position = cpu1DArray.indexOf(parseInt(number));
	var res = arrayPositionToMatrixPosition(position);
	cpu2DArray[res[0]][res[1]] = true;
	checkTables("computer");
	checkBingo("computer");
}

function checkBingo(username) {
	if (username == "user") {
		var bingoCount = 0;
		if (user["forward_diagonal"] == 1) {
			bingoCount++;
		}
		if (user["backward_diagonal"] == 1) {
			bingoCount++;
		}
		for (var i = 0; i < 5; i++) {
			if (user["row"][i] == 1) {
				bingoCount++;
			}
			if (user["column"][i] == 1) {
				bingoCount++;
			}
		}
		if (bingoCount >= 5) {
			alert("User wins!!");
		}
	} else if (username == "computer") {
		var bingoCount = 0;
		if (computer["forward_diagonal"] == 1) {
			bingoCount++;
		}
		if (computer["backward_diagonal"] == 1) {
			bingoCount++;
		}
		for (var i = 0; i < 5; i++) {
			if (computer["row"][i] == 1) {
				bingoCount++;
			}
			if (computer["column"][i] == 1) {
				bingoCount++;
			}
		}
		if (bingoCount >= 5) {
			alert("Computer wins!!");
		}
	}
}

function checkTables(username) {
	var rowCount = [0, 0, 0, 0, 0], columnCount = [0, 0, 0, 0, 0], forwardDiagonalCount = 0, backwardDiagonalCount = 0;

	if (username == "user") {
		//traverse all elements
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {

				//row check
				if (my2DArray[i][j] == true) {
					rowCount[i]++;
					if (rowCount[i] == 5) {
						user["row"][i] = 1;
					}
				}
				//column check
				if (my2DArray[j][i] == true) {
					columnCount[i]++;
					if (columnCount[i] == 5) {
						user["column"][i] = 1;
					}
				}
				//forward diagonal check
				if (i == j) {
					if (my2DArray[i][j] == true) {
						forwardDiagonalCount++;
						if (forwardDiagonalCount == 5) {
							user["forward_diagonal"] = 1;
						}
					}
				}
			}
			//backward diagonal check
			if (my2DArray[i][4 - i] == true) {
				backwardDiagonalCount++;
				if (backwardDiagonalCount == 5) {
					user["backward_diagonal"] = 1;
				}
			}
		}
	} else if (username == "computer") {
		//traverse all elements
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {

				//row check
				if (cpu2DArray[i][j] == true) {
					rowCount[i]++;
					if (rowCount[i] == 5) {
						computer["row"][i] = 1;
					}
				}
				//column check
				if (cpu2DArray[j][i] == true) {
					columnCount[i]++;
					if (columnCount[i] == 5) {
						computer["column"][i] = 1;
					}
				}
				//forward diagonal check
				if (i == j) {
					if (cpu2DArray[i][j] == true) {
						forwardDiagonalCount++;
						if (forwardDiagonalCount == 5) {
							computer["forward_diagonal"] = 1;
						}
					}
				}
			}
			//backward diagonal check
			if (cpu2DArray[i][4 - i] == true) {
				backwardDiagonalCount++;
				if (backwardDiagonalCount == 5) {
					computer["backward_diagonal"] = 1;
				}
			}
		}
	}
}

function matrixPositionToArrayPosition(i, j) {
	return (((i * 5) + 1) + j - 1);
}

function arrayPositionToMatrixPosition(num) {
	// parseInt(22/5)
	return [(parseInt(num / 5)), (num % 5)];
}

function createRandomBingoTable(tableId) {
	var count = 25, generatorBingoArray = [], // a template array for storing randomly created bingo values
	position, // position in the array from '0' index
	table = $(tableId);

	while (count != 0) {
		var randomNumber = Math.floor((Math.random() * 25) + 1);
		if (generatorBingoArray.indexOf(randomNumber) > -1) {
			continue;
		} else {
			generatorBingoArray.push(randomNumber);
			count--;
		}
	}

	if (tableId == "#usertable") {
		my1DArray = generatorBingoArray;
		my2DArray.length = 0;
		my2DArray = new Array(5);
		for (var i = 0; i < 5; i++)
			my2DArray[i] = new Array(5);

		for (var i = 0; i < 5; i++) {
			var html = "<div class='row'>";
			for (var j = 0; j < 5; j++) {
				position = matrixPositionToArrayPosition(i, j);
				// -1 to make it index from 0th position in array
				my2DArray[i][j] = false;
				html += "<div class='column available'>" + my1DArray[position] + "</div>";
			}
			html += "</div>";
			table.append(html);
		}

	} else if (tableId == "#cputable") {
		cpu1DArray = generatorBingoArray;
		cpu2DArray.length = 0;
		cpu2DArray = new Array(5);
		for (var i = 0; i < 5; i++)
			cpu2DArray[i] = new Array(5);

		for (var i = 0; i < 5; i++) {
			var html = "<div class='row'>";
			for (var j = 0; j < 5; j++) {
				position = matrixPositionToArrayPosition(i, j);
				// -1 to make it index from 0th position in array
				cpu2DArray[i][j] = false;
				html += "<div class='column available' data-number='" + cpu1DArray[position] + "'>" + cpu1DArray[position] + "</div>";
			}
			html += "</div>";
			table.append(html);
		}
	}
}
