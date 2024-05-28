import React, { useState } from 'react';
import Button from './components/Button';
import Display from './components/Display';
import './App.css';

const App = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [lastInputValue, setLastInputValue] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      if (displayValue.length < 9) {
        setDisplayValue((prev) => (prev === '' ? digit : prev + digit));
      }
    }
  };

  const inputDot = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('.');
      setWaitingForSecondOperand(false);
    } else if (!displayValue.includes('.') && displayValue.length < 9) {
      setDisplayValue((prev) => (prev === '' ? '0.' : prev + '.'));
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator) {
      if (isNaN(inputValue)) {
        setDisplayValue('ERROR');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        return;
      }
      
      const secondOperand = lastInputValue !== null ? lastInputValue : inputValue;
      const result = performCalculation[operator](firstOperand, secondOperand);
      const resultString = String(result);

      if (result < 0 || resultString.length > 9 || result > 999999999) {
        setDisplayValue('ERROR');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        return;
      }

      setDisplayValue(resultString.substring(0, 9));
      setFirstOperand(result);
      setLastInputValue(secondOperand);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand,
  };

  const resetCalculator = () => {
    setDisplayValue('');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setLastInputValue(null);
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="keypad">
        <Button label="AC" onClick={resetCalculator} />
        <Button label="/" onClick={() => handleOperator('/')} />
        <Button label="*" onClick={() => handleOperator('*')} />
        <Button label="-" onClick={() => handleOperator('-')} />
        <Button label="7" onClick={() => inputDigit('7')} />
        <Button label="8" onClick={() => inputDigit('8')} />
        <Button label="9" onClick={() => inputDigit('9')} />
        <Button label="+" onClick={() => handleOperator('+')} />
        <Button label="4" onClick={() => inputDigit('4')} />
        <Button label="5" onClick={() => inputDigit('5')} />
        <Button label="6" onClick={() => inputDigit('6')} />
        <Button label="=" onClick={() => handleOperator('=')} />
        <Button label="1" onClick={() => inputDigit('1')} />
        <Button label="2" onClick={() => inputDigit('2')} />
        <Button label="3" onClick={() => inputDigit('3')} />
        <Button label="0" onClick={() => inputDigit('0')} />
        <Button label="." onClick={inputDot} />
      </div>
    </div>
  );
};

export default App;
