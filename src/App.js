import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");
  const [string, setString] = useState([]);
  const [lastResult, setLastResult] = useState("");
  const [displayResult, setDisplayResult] = useState(false);
  const [lastOperator, setLastOperator] = useState("");
  const [lastFormula, setLastFormula] = useState([]);

  const numInput = (button) => {
    if (lastOperator === "=") {
      clear();
    }
    setDisplayResult(false);
    let newInput = button.target.value;
    let decimal = /\./;
    let number = /[0-9]/;
    if (number.test(newInput) || (newInput === "." && !decimal.test(input))) {
      setInput((prevInput) => (input !== "0" ? prevInput : "") + newInput);
    }
  };

  const negate = () => {
    if (displayResult) {
      setInput(lastResult);
    }
    setDisplayResult(false);
    setInput((prevInput) => prevInput * -1);
  };

  const opInput = (button) => {
    let operator = button.target.value;
    setLastOperator(operator);
    let lastInput = string.length - 1;
    if (input === "0" && ["+", "-", "*", "/"].includes(string[lastInput])) {
      setString((prevString) => [prevString.slice(0, lastInput), operator]);
    } else if (input === ".") {
      setString((prevString) => [...prevString, 0, operator]);
      equals(button);
    } else {
      setString((prevString) => [
        ...prevString,
        !displayResult ? input : null,
        operator,
      ]);
      equals(button);
    }
  };

  const clear = () => {
    setInput("0");
    setString("");
    setLastResult("");
    setDisplayResult(false);
    setLastOperator("");
    setLastFormula([]);
  };

  const equals = (button) => {
    let result = eval([...string, !displayResult ? input : null].join(""));
    setInput("0");
    setLastResult(result.toString());
    setDisplayResult(true);
    if (button.target.value === "=") {
      setLastOperator("=");
      setLastFormula([...string, input]);
      setString([result.toString()]);
    }
  };
  return (
    <div id="App">
      <div id="display">
        <p id="string">
          {lastOperator === "=" ? [...lastFormula, "="] : string}
        </p>
        <p id="input">{displayResult ? lastResult : input}</p>
      </div>

      <button id="clear" onClick={clear}>
        C
      </button>

      <NumButton id="seven" value="7" onClick={numInput} />
      <NumButton id="eight" value="8" onClick={numInput} />
      <NumButton id="nine" value="9" onClick={numInput} />
      <NumButton id="divide" value="/" onClick={opInput} />

      <NumButton id="four" value="4" onClick={numInput} />
      <NumButton id="five" value="5" onClick={numInput} />
      <NumButton id="six" value="6" onClick={numInput} />
      <NumButton id="multiply" value="*" onClick={opInput} />

      <NumButton id="one" value="1" onClick={numInput} />
      <NumButton id="two" value="2" onClick={numInput} />
      <NumButton id="three" value="3" onClick={numInput} />
      <NumButton id="subtract" value="-" onClick={opInput} />

      <NumButton id="negate" value="+/-" onClick={negate} />
      <NumButton id="zero" value="0" onClick={numInput} />
      <NumButton id="decimal" value="." onClick={numInput} />
      <NumButton id="add" value="+" onClick={opInput} />

      <NumButton id="equals" value="=" onClick={equals} />
    </div>
  );
}

const NumButton = (props) => {
  return (
    <button id={props.id} value={props.value} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default App;
