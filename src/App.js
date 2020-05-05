import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");
  const [string, setString] = useState([]);
  const [lastResult, setLastResult] = useState("");
  const [lastMath, setLastMath] = useState("");
  const [displayResult, setDisplayResult] = useState(false);

  const numInput = (button) => {
    setDisplayResult(false);
    let newInput = button.target.value;
    let decimal = /\./;
    let number = /[0-9]/;
    if (number.test(newInput) || (newInput === "." && !decimal.test(input))) {
      setInput((prevInput) => (input !== "0" ? prevInput : "") + newInput);
    }
  };

  const negate = () => {
    setInput((prevInput) => prevInput * -1);
  };

  const opInput = (button) => {
    let newInput = button.target.value;
    setString(
      (prevString) =>
        (input === "0" && string !== ""
          ? prevString.slice(0, prevString.length - 1)
          : input === "."
          ? prevString + "0"
          : prevString + input) + newInput
    );
    equals(button);
  };

  const clear = () => {
    setInput("0");
    setString("");
    setLastResult("");
    // setLastMath("");
    setDisplayResult(false);
  };

  const equals = (button) => {
    let newInput = button.target.value;
    let result = eval(string + input);
    setInput("0");
    setLastResult(result.toString());
    setDisplayResult(true);
    if (newInput === "=") {
      setString(result.toString());
      // setLastMath(string + input);
    }
  };
  return (
    <div id="App">
      <div id="display">
        <p id="string">{string === "" ? "0" : string}</p>
        <p id="input">{displayResult ? lastResult : input}</p>
      </div>

      <button id="clear" onClick={clear}>
        c
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

      <NumButton id="equals" value="=" onClick={opInput} />

      {/* <button id="equals" value="=" onClick={equals}>
        =
      </button> */}
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
