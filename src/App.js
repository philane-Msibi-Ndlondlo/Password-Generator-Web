import React, { useState } from "react";
import "./App.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const numbers = "1234567890";
const symbols = "!@#$%^&()_-+}{][/";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function App() {
  const [passwordLength, setpasswordLength] = useState(0);
  const [haveNumbers, sethaveNumbers] = useState(false);
  const [haveSymbols, sethaveSymbols] = useState(false);
  const [haveLowerCaseLetters, sethaveLowerCaseLetters] = useState(false);
  const [haveUppercaseLetters, sethaveUppercaseLetters] = useState(false);
  const [password, setpassword] = useState("");
  const [copied, setcopied] = useState(false);

  const _handlePasswordLength = (e) => {
    setpasswordLength(e.target.value);
  };

  const _handleHaveNumbers = (e) => {
    sethaveNumbers(e.target.checked);
  };

  const _handleHaveSymbols = (e) => {
    sethaveSymbols(e.target.checked);
  };

  const _handleLowerCaseLetters = (e) => {
    sethaveLowerCaseLetters(e.target.checked);
  };

  const _handleUpperCaseLetters = (e) => {
    sethaveUppercaseLetters(e.target.checked);
  };

  const _generateLowerCaseLetter = () =>
    lowerLetters[Math.floor(Math.random() * lowerLetters.length)];

  const _generateUpperCaseLetter = () =>
    upperLetters[Math.floor(Math.random() * upperLetters.length)];

  const _generateNumbers = () =>
    numbers[Math.floor(Math.random() * numbers.length)];

  const _generateSymbol = () =>
    symbols[Math.floor(Math.random() * symbols.length)];

  const _generatePassword = async (e) => {
    e.preventDefault();

    let passwordValue = [];
    let passwordFinal = "";

    if (
      !haveNumbers &&
      !haveSymbols &&
      !haveLowerCaseLetters &&
      !haveUppercaseLetters
    ) {
      alert(
        "Please Check password conditions. Lowercase Letters, uppercase Letters, Numbers or Symbols"
      );
      return;
    }

    if (passwordLength < 8 || passwordLength > 20) {
      alert(
        "Strong or rememberable passwords must have length of 8 - 20 characters."
      );
      return;
    }

    for (let i = 0; i < passwordLength; i++) {
      if (haveNumbers) {
        passwordValue.push(_generateNumbers());
      }

      if (haveSymbols) {
        passwordValue.push(_generateSymbol());
      }

      if (haveLowerCaseLetters) {
        passwordValue.push(_generateLowerCaseLetter());
      }

      if (haveUppercaseLetters) {
        passwordValue.push(_generateUpperCaseLetter());
      }

      passwordFinal +=
        passwordValue[Math.floor(Math.random() * passwordValue.length)];

      setpassword(passwordFinal);
    }
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>

      <div className="tips">
        <h4>Safety Tips:</h4>
        <p>
          1. Strong & hard-to-guess passwords must have Lowercase, symbols,
          numbers and Uppercase characters.
        </p>
        <p>2. Keep your passwords safe.</p>
        <p>3. Passwords MUST be known by you ONLY.</p>
      </div>
      <div className="form">
        <div className="resultsDiv">
          <p className="results">{password}</p>
          <CopyToClipboard text={password}>
            <button
              className="copyBtn"
              onClick={() => {
                setcopied(true);

                setTimeout(() => {
                  setcopied(false);
                }, 2000);
              }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </CopyToClipboard>
        </div>
        <div className="form-group">
          <div>
            <label>Password Length:</label>
          </div>
          <div>
            <input
              className="input"
              min="2"
              max="20"
              type="number"
              value={passwordLength}
              onChange={_handlePasswordLength}
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <label>Include Numbers:</label>
          </div>
          <div>
            <input
              className="input"
              type="checkbox"
              value={haveNumbers}
              onChange={_handleHaveNumbers}
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <label>Include Symbols:</label>
          </div>
          <div>
            <input
              className="input"
              type="checkbox"
              value={haveSymbols}
              onChange={_handleHaveSymbols}
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <label>Include Lowercase Letters:</label>
          </div>
          <div>
            <input
              className="input"
              type="checkbox"
              value={haveLowerCaseLetters}
              onChange={_handleLowerCaseLetters}
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <label>Include Uppercase Letters:</label>
          </div>
          <div>
            <input
              className="input"
              type="checkbox"
              value={haveUppercaseLetters}
              onChange={_handleUpperCaseLetters}
            />
          </div>
        </div>
        <div className="form-group">
          <button className="btn" onClick={(e) => _generatePassword(e)}>
            GENERATE PASSWORD
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
