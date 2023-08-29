import { useState } from 'react'
import './App.css'

function App() {
  const[equation, setEquation] = useState('');
  const[answer,setAnswer] = useState('');
  //eq removes all whitespace from the equation
  const eq = equation.trim();
  // isOperator tests for an operand match 
  const isOperator = (symbol:string)=> {
return /[-+/*]/g.test(symbol);
  };
  const handleButton = (symbol:string) => {
    // if the clear button is pressed answer is reset to an empty string and equation to 0
if(symbol === 'clear'){
  setAnswer('');
  setEquation('0');
  //when the symbol is subtract
} else if( symbol === 'subtract'){
  // if the answer is an empty string we do nothing.
  if (answer === '') return;
  //if the answers first character is a - we either remove that (slice) or place before the answer
  setAnswer(answer.toString().charAt(0) === '-'? answer.slice(1): '-' + answer);
} else if (isOperator(symbol)){
  //if we hav an operand we use the trimmed equation to return the equation + symbol.
setEquation(eq + " " + symbol + " ");
} else if (symbol === '='){
  handleCalculate();
} else if (symbol === '0'){
  //if the equation does not start with a 0
  if (equation.charAt(0) !== '0'){
setEquation(equation + symbol);
  }
} else if (symbol === '.'){
  //split the equation by operators
  const lastNumber = equation.split(/[-+/*]/g).pop();
  //if the is no last number i.e its the first input, return nothing
  if (!lastNumber) return;
  //if the last number already contains a decimal, return nothing
  if (lastNumber?.includes('.'))return;
  //if none of the above, add the decimal to the end of the equation
  setEquation(equation + symbol);
} else {
  // if the equation starts with a 0, replace it with a new symbol
  if (equation.charAt(0) === '0'){
    setEquation(equation.slice(1) + symbol);
  } else{
    // if it doesn't, append the new symbol.
    setEquation(equation + symbol);
  }
}
  };
  const handleCalculate = () => {
    // if the last character is an operand we do nothing
    if (isOperator(eq.charAt(eq.length - 1)))return;
    const parts = eq.split(" ");
    const newParts = [];
    //we iterate through the parts backwards
    for (let i = parts.length-1; i >= 0; i--) {
      //if the equation includes these and the previous part is also an operator
if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])){
  // we move the current operator to the newParts array
  newParts.unshift(parts[i]);
  //count the number of oprators and move backwards to skip them
  let j = 0;
  let k = i - 1;
  while(isOperator(parts[k])){
    k--;
    j++;
  }
  //skips the consecutive operators
  i-=j;
} else {
  //if not a special case (operator) we add to the newParts array
  newParts.unshift(parts[i]);
}
    }
    //join the newParts array back into a string with spaces
    const newEquation = newParts.join(' ');
    //newEquation is evalulated based on whether it starts with an operand or not
    if (isOperator(newEquation.charAt(0))){
      setAnswer(eval(answer + newEquation) as string);
    } else {
      setAnswer(eval(newEquation) as string);
    }
    //equation state is cleared to start a new calculation and the answer state is updated with result
    setEquation("");
  };

  return (
    <>
     <div className="container">
      <h1>Calculator</h1>
      <div id="calculator">
        <div id="display" style = {{textAlign:'right'}}>
          <div id="answer">{answer}</div>
          <div id="equation">{equation}</div>
        </div>
        <button id ="clear" onClick={() => handleButton('clear')}className="red">AC</button>
        <button id ="divide" onClick={() => handleButton('/')}className="lightgray">/</button>
        <button id ="multiply" onClick={() => handleButton('*')}className="lightgray">X</button>
        <button id ="seven" onClick={() => handleButton('7')}className="dark-gray">7</button>
        <button id ="eight" onClick={() => handleButton('8')}className="dark-gray">8</button>
        <button id ="nine" onClick={() => handleButton('9')}className="dark-gray">9</button>
        <button id ="subtract" onClick={() => handleButton('-')}className="lightgray">-</button>
        <button id ="four" onClick={() => handleButton('4')}className="dark-gray">4</button>
        <button id ="five" onClick={() => handleButton('5')}className="dark-gray">5</button>
        <button id ="six" onClick={() => handleButton('6')}className="dark-gray">6</button>
        <button id ="add" onClick={() => handleButton('+')}className="lightgray">+</button>
        <button id ="one" onClick={() => handleButton('1')}className="dark-gray">1</button>
        <button id ="two" onClick={() => handleButton('2')}className="dark-gray">2</button>
        <button id ="three" onClick={() => handleButton('3')}className="dark-gray">3</button>
        <button id ="equals" onClick={() => handleButton('=')}className="blue">=</button>
        <button id ="zero" onClick={() => handleButton('0')}className="dark-gray">0</button>
        <button id ="decimal" onClick={() => handleButton('.')}className="dark-gray">.</button>
      </div>
     </div>
    </>
  )
}

export default App
