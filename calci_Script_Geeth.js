//function to get history
function getHistory(){
	return document.getElementById("history_value").innerText;
}
//function to print history
function printHistory(num){
	document.getElementById("history_value").innerText=num;
}
//function to get output
function getOutput(){
	return document.getElementById("output_value").innerText;
}
//function to print output
function printOutput(num){
	document.getElementById("output_value").innerText=num;
}
// this to handle on click event for the operators and do the required operations
var operator = document.getElementsByClassName("operators");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		// for clear function passing empty characters into history and output.
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		/* for backspace we check ouptut has a value and remove the last value by selecting substring 
		of it elimanting last element*/
		else if(this.id=="backspace"){
			var output=getOutput().toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		/* finaly in it not the clear or backspace buttons other are all related to mathematical evaluation
		hence we pass them into eval by adding output and history values*/
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:output;
				history=history+output;
				if(this.id=="="){
					//Here we are checking for 1 divided by 0 condition and raising exeception
					if (history == "1/0"){
						alert("Exception:Wrong operation performed, value is either undefined or infinity when 1 is divided by zero");
						printHistory("");
						printOutput("");
					}
					else{
						var result=eval(history);
						// here we check for output having 9 digits or more just by having the largest 9 digit number.
						if (result > 999999999){
							alert("Error: output value Exceeds 9digits");
							printHistory("");
							printOutput("");
						}
						else{
							printOutput(result);
							printHistory("");
						}
					}
				}
				else{
					// this helps to add more operators in case we need to perform 3+2*4-9 etc
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
// this to handle on click event for the numbers and do the required operations
var number = document.getElementsByClassName("numbers");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=getOutput();
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			console.log(typeof(output));
			// checking if the input passed by the user is not more than 9 digits and raising alert error.
			if (output.length > 9){
				alert("error: This calculator can handle atmost 9digits as input");
				printHistory("");
				printOutput("");
			}
			else{
				printOutput(output);
			}
			
		}
	});
}