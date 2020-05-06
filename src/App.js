import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");
  const [formula, setFormula] = useState([]);
  const [result, setRresult] = useState("");
  const clear = () => {
    setInput("0");
    setFormula([]);
    setRresult("");
  };

  useEffect(() => {
    setRresult((prevResult) =>
      eval([prevResult, ...formula.slice(-3, -1)].join(""))
    );
  }, [formula]);

  const numInput = (button) => {
    let newInput = button.target.value;
    let decimal = /\./;
    let number = /[0-9]/;
    if (number.test(newInput) || (newInput === "." && !decimal.test(input))) {
      setInput((prevInput) => (input !== "0" ? prevInput : "") + newInput);
    }
  };

  const validatedInput = (v) => {
    if (v === ".") {
      return "0";
    } else {
      return v;
    }
  };

  const negate = () => {
    setInput((prevInput) => validatedInput(prevInput) * -1);
  };

  const opInput = (button) => {
    let operator = button.target.value;
    setFormula((prevFormula) => [
      ...prevFormula,
      validatedInput(input), //To avoid inputs of only a decimal sign.
      operator,
    ]);
    setInput("0");
  };

  const equals = (button) => {};
  return (
    <div id="App">
      <div id="display">
        <p id="formula">{formula}</p>
        <p id="input">{input}</p>
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

      {/* <NumButton id="equals" value="=" onClick={opInput} /> */}
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
