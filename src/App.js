import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");
  const [formula, setFormula] = useState([]);
  const [result, setRresult] = useState("");
  const [lastButton, setLastButton] = useState("");
  const [displayResult, setDispayResult] = useState(false);

  /* Calculating the latest result whenever the formula is updated. */
  useEffect(() => {
    if (input !== "0") {
      setRresult((prevResult) =>
        eval([prevResult, ...formula.slice(-3, -1)].join(""))
      );
    }
    if (!["CE", "number"].includes(lastButton)) {
      //Avoiding resetting the input after overwriting results from equals
      setInput("0");
    }
  }, [formula]);

  const clear = (param) => {
    setLastButton(typeof param === "object" ? "CE" : "number");
    setInput(typeof param === "object" ? "0" : param);
    setFormula([]);
    setRresult("");
    setDispayResult(false);
  };

  const backspace = () => {
    if (["number"].includes(lastButton)) {
      if (
        (parseInt(input) > 0 && input.length > 1) ||
        (parseInt(input) < 0 && input.length > 2)
      ) {
        setInput((prevInput) => prevInput.slice(0, prevInput.length - 1));
      } else {
        setInput("0");
      }
    }
  };

  /* Handling numeral input*/
  const numInput = (button) => {
    setLastButton("number");
    let newInput = button.target.value;
    setDispayResult(false);
    let decimal = /\./;
    let number = /[0-9]/;
    if (!["=", "CE"].includes(lastButton)) {
      /* Dismissing starting zeroes and lone decimal signs */
      if (number.test(newInput) || (newInput === "." && !decimal.test(input))) {
        setInput((prevInput) => (input !== "0" ? prevInput : "") + newInput);
      }
      /* Clearing everything if a number is entered immediatelty after equals */
    } else {
      clear(newInput);
    }
  };

  /* Changing lone decimal signes into zero */
  const validatedInput = (v) => {
    if (v === ".") {
      return "0";
    } else {
      return v;
    }
  };

  /* Negating the current input */
  const negate = () => {
    setLastButton("number");
    setDispayResult(false);
    if (lastButton !== "=") {
      setInput((prevInput) => (validatedInput(prevInput) * -1).toString());
      /* Negating the result if pressed immediately after equals */
    } else {
      clear((result * -1).toString());
    }
  };

  /* Handling oprerator inputs */
  const opInput = (button) => {
    setLastButton(button.target.value);
    let operator = button.target.value;
    if (lastButton !== "=") {
      if (input !== "0") {
        setFormula((prevFormula) => [
          ...prevFormula,
          validatedInput(input),
          operator,
        ]);
        /* Switching operators when input is zero */
      } else {
        setFormula((prevFormula) => [...prevFormula.slice(0, -1), operator]);
      }
    } else {
      setFormula((prevFormula) => [...prevFormula.slice(0, -1), operator]);
    }
    setDispayResult(true);
  };

  const equals = () => {
    if (lastButton !== "=") {
      setLastButton("=");
      setFormula((prevFormula) => [...prevFormula, validatedInput(input), "="]);
      setDispayResult(true);
    }
  };
  return (
    <div id="App">
      <div id="display">
        <p id="formula">
          {lastButton !== "="
            ? displayResult
              ? formula.slice(0, -1).concat("=", result)
              : formula.slice(0, -1)
            : formula}
        </p>
        <p id="input">
          {lastButton !== "="
            ? displayResult
              ? formula[formula.length - 1]
              : formula.length !== 0
              ? formula[formula.length - 1] + input
              : input
            : result}
        </p>
      </div>

      <Button id="clear" value="CE" onClick={clear} />
      <Button id="backspace" value="&larr;" onClick={backspace} />

      <Button id="seven" value="7" onClick={numInput} />
      <Button id="eight" value="8" onClick={numInput} />
      <Button id="nine" value="9" onClick={numInput} />
      <Button id="divide" value="/" onClick={opInput} />

      <Button id="four" value="4" onClick={numInput} />
      <Button id="five" value="5" onClick={numInput} />
      <Button id="six" value="6" onClick={numInput} />
      <Button id="multiply" value="*" onClick={opInput} />

      <Button id="one" value="1" onClick={numInput} />
      <Button id="two" value="2" onClick={numInput} />
      <Button id="three" value="3" onClick={numInput} />
      <Button id="subtract" value="-" onClick={opInput} />

      <Button id="negate" value="+/-" onClick={negate} />
      <Button id="zero" value="0" onClick={numInput} />
      <Button id="decimal" value="." onClick={numInput} />
      <Button id="add" value="+" onClick={opInput} />

      <Button id="equals" value="=" onClick={equals} />
    </div>
  );
}

const Button = (props) => {
  return (
    <button id={props.id} value={props.value} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default App;
