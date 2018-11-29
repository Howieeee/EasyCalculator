function progress(){
	var txt = document.form.txt.value;
	var seq = txt.split("\n");
	var output=""
	for (var i = 0; i<10;i++)
	{
	    var result=calc(seq[i]); //第i筆測資
		output=output+"<br>"+result;
	}
    document.getElementById('out').innerHTML= output;
}
function calc(str)
{
	var error = false;
    /* 
       str : first sequence
    */
    var len = str.length;
	var answer = 0;
    /*----------------- Your Code Start-------------*/
	var seq = new Array();
	
	
	for(var i=0;i<len;i++){
		var c = str.charAt(i);
		if(c !=" ")
			seq.push(c);
	}
	//document.write(seq.length);
	
	var operatorStack = new Array();
	//operatorStack.push("#");
	var postFix = new Array();
	
	for(var i=0;i<seq.length;i++){
		var ch =  seq[i];
		//document.writeln(ch+"<br>");
		if(!isNaN(ch)) //數字就push
			postFix.push(ch);
		else if(ch == "(") //左括號push
			operatorStack.push(ch);
		else if(ch ==")"){//右括號則pop到直到看到左括號
			var opStackTop = operatorStack[operatorStack.length-1];

			while(opStackTop!="("){
				postFix.push(opStackTop); //把運算子push進postFix stack
				operatorStack.pop(); 
				opStackTop = operatorStack[operatorStack.length-1];
				
			}
			operatorStack.pop(); 
		}
		else if(ifOperatorVaild(ch)){ //合法運算子
			var opStackTop = operatorStack[operatorStack.length-1];

			while(inStackPriority(opStackTop) <= comingCharPriority(ch)){
				postFix.push(opStackTop);
				operatorStack.pop();
				opStackTop = operatorStack[operatorStack.length-1];
			}
			operatorStack.push(ch);
			
		}else { //非法運算子
			error = true;
		}
		
		
	}
	for(var i= operatorStack.length-1;i>=0;i--)
		postFix.push(operatorStack[i]);
	
	var calSeq = new Array();
	calSeq.push("#");
	for(var i=postFix.length-1;i>=0;i--){
		if(postFix[i]== "(" || postFix[i] == ")")
			error = true;
		calSeq.push(postFix[i]);
	}
	if(!error){
	var calStack = new Array();
	for(var i=calSeq.length-1;i>=0;i--){
		if(calSeq[i]=="#")
			break;
		if(!isNaN(calSeq[i])) //是數字就push進去
			calStack.push(calSeq[i]);
		else { //運算子
			var num2 = parseInt(calStack[calStack.length-1]);
			calStack.pop();
			var num1 = parseInt(calStack[calStack.length-1]);
			calStack.pop();
			var result = cal(num1,num2,calSeq[i]);
			calStack.push(result);
		}
	}
	

	
		answer = calStack[calStack.length-1];
		if(isNaN(answer))
			answer = "error";
		document.getElementById('out').innerHTML= answer;
		//document.write(answer+"<br>");
	}else{
		answer = "error";
		document.getElementById('out').innerHTML= answer;
		//document.write("error<br>");
	}
    /* Hint: 
       var s = str.substr(x,1) // the character s in the position x of str
    */

    /*----------------- Your Code End --------------*/
	return answer;
}

function ifOperatorVaild(ch){
	if(ch != "+" && ch != "-"&& ch != "*"&& ch != "/"&& ch != "^")
		return false;
	else
		return true;
}
function inStackPriority(ch){
	switch(ch){
		case "(": return 8;
		case "+": return 3;
		case "-": return 3;
		case "*": return 2;
		case "/": return 2;
		case "^": return 1;
		default: return 9;
		//case "(": return ;
	}
	
}
function comingCharPriority(ch){
	switch(ch){
		case "(": return 0;
		case "+": return 3;
		case "-": return 3;
		case "*": return 2;
		case "/": return 2;
		case "^": return 1;
		default: return 0;
		//case "(": return ;
	}
}

function cal(num1,num2,operator){
	switch(operator){
		case "+": return num1+num2;
		case "-": return num1-num2;
		case "*": return num1*num2;
		case "/": return num1/num2;
		case "^": return Math.pow(num1,num2);
		default: return 0;
	}
}


