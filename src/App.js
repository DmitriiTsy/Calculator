import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import ButtonWrapper from "./components/ButtonWrapper/ButtonWrapper";
import Button from "./components/Button/Button";

import React, { useState } from 'react'

const elementValues = ["C", "+-", "%","/", 7, 8, 9, "X", 4, 5, 6, "-", 1, 2, 3, "+",0, ".", "="];

const App = () => {
    let [buttonPressed, setButtonPressed] = useState({
        sign: "",
        number: 0,
        result: 0,
      });

    const toLocaleString = (number) =>
      String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
    const removeSpaces = (number) => number.toString().replace(/\s/g, "");

    const functionToChooseHandler = (element) => {
        switch(element) {
            case "C":
                return cleanInputHandler(element)
            case "+-":
                return invertInputHandler(element)
            case "%":
                return percentageInputHandler(element)
            case "=":
                return equalsInputHandler(element)
            case "/":
                return signInputHandler(element)
            case "X":
                return signInputHandler(element)
            case "-":
                return signInputHandler(element)
            case "+":
                return signInputHandler(element)
            case ".":
                return commasInputHandler(element)
            default:
                return numberberInputHandler(element)
        }
    }

    const numberberInputHandler = (element) => {
        const value = element;
        
        if (removeSpaces(buttonPressed.number).length < 16) {
          setButtonPressed({
            ...buttonPressed,
            number:
              buttonPressed.number === 0 && value === "0"
                ? "0"
                : removeSpaces(buttonPressed.number) % 1 === 0
                ? toLocaleString(Number(removeSpaces(buttonPressed.number + value)))
                : toLocaleString(buttonPressed.number + value),
            result: !buttonPressed.sign ? 0 : buttonPressed.result,
          });
        }
     }

    const cleanInputHandler = () => {
        setButtonPressed({
            ...buttonPressed,
            sign: "",
            number: 0,
            result: 0,
          });
    }

    const invertInputHandler = () => {
        setButtonPressed({
            ...buttonPressed,
            number: buttonPressed.number ? toLocaleString(removeSpaces(buttonPressed.number) * -1) : 0,
            result: buttonPressed.result ? toLocaleString(removeSpaces(buttonPressed.result) * -1) : 0,
            sign: "",
          });
    }

    const percentageInputHandler = () => {
        let number = buttonPressed.number ? parseFloat(removeSpaces(buttonPressed.number)) : 0;
        let result = buttonPressed.result ? parseFloat(removeSpaces(buttonPressed.result)) : 0;
    
        setButtonPressed({
          ...buttonPressed,
          number: (number /= Math.pow(100, 1)),
          result: (result /= Math.pow(100, 1)),
          sign: "",
        });
    }

    const equalsInputHandler = () => {
        if (buttonPressed.sign && buttonPressed.number) {
            const math = (a, b, sign) =>
              sign === "+"
                ? a + b
                : sign === "-"
                ? a - b
                : sign === "X"
                ? a * b
                : a / b;
      
            setButtonPressed({
              ...buttonPressed,
              result:
                buttonPressed.number === "0" && buttonPressed.sign === "/"
                  ? "Can't divide with 0"
                  : toLocaleString(
                      math(
                        Number(removeSpaces(buttonPressed.result)),
                        Number(removeSpaces(buttonPressed.number)),
                        buttonPressed.sign
                      )
                    ),
              sign: "",
              number: 0,
            });
          }
    }

    const signInputHandler = (element) => {
        const value = element;
    
        setButtonPressed({
          ...buttonPressed,
          sign: value,
          result: !buttonPressed.result && buttonPressed.number ? buttonPressed.number : buttonPressed.result,
          number: 0,
        });
    }

    const commasInputHandler = (element) => {
        const value = element;
    
        setButtonPressed({
          ...buttonPressed,
          number: !buttonPressed.number.toString().includes(".") ? buttonPressed.number + value : buttonPressed.number,
        });
    }
  
    return (
      <Wrapper>
        <Screen value={buttonPressed.number ? buttonPressed.number : buttonPressed.result} />
        <ButtonWrapper>
          {elementValues.map((element, i) => {
            return (
              <Button
                key={i}
                className={element === "=" ? "equals" : ""}
                value={element}
                onClick={
                    (event) => {
                        event.preventDefault()
                        functionToChooseHandler(element)
                    }
                    }
              />
            );
          })}
        </ButtonWrapper>
      </Wrapper>
    );
  };

export default App;