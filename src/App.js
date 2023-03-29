import React from 'react';
import Block from './Block';
import './index.scss';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [fromCurency, setFromCurency] = useState('RUB')
  const [toCurency, setToCurency] = useState('KZT')
  const [fromPrice, setFromPrice] = useState('')
  const [toPrice, setToPrice] = useState('')
  const [rates, setRates] = useState({RUB:1})

  const onChangeFromCurrency = (value) => {
    const prise = value/rates[fromCurency]
    setToPrice(prise*rates[toCurency])
    setFromPrice(value)
  }

  const onChangeToCurrency = (value) => {
    const prise = value/rates[toCurency]
    setFromPrice(prise*rates[fromCurency])
    setToPrice(value)
  }

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then(response => response.json())
      .then(data => {
        setRates({ ...rates, ...data.rates });
        
      })
      .catch(err => {
        console.warn(err);
        alert('not found valet')
      })
  }, [])


  return (
    <div className="App">
      <Block value={fromPrice} onChangeValue={onChangeFromCurrency} currency={fromCurency} onChangeCurrency={(cur) => setFromCurency(cur)} />
      <Block value={toPrice} onChangeValue={onChangeToCurrency} currency={toCurency} onChangeCurrency={(cur) => setToCurency(cur)} />
    </div>
  );
}

export default App;
