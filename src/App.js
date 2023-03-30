import React from 'react';
import Block from './Block';
import './index.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const [fromCurency, setFromCurency] = useState('RUB')
  const [toCurency, setToCurency] = useState('KZT')
  const [fromPrice, setFromPrice] = useState('')
  const [toPrice, setToPrice] = useState('')
  const [rates, setRates] = useState({RUB:1})


  

  const onChangeFromPrice = (value) => {
    const prise = value/rates[fromCurency]
    setToPrice((prise*rates[toCurency]).toFixed(3))
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    const prise = value/rates[toCurency]
    setFromPrice((prise*rates[fromCurency]).toFixed(3))
    setToPrice(value)
  }

  
useEffect(() => {
  onChangeToPrice(toPrice)
},[toCurency])


useEffect(() => {
  onChangeFromPrice(fromPrice)
},[fromCurency])

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
      <Block value={fromPrice} onChangeValue={onChangeFromPrice} currency={fromCurency} onChangeCurrency={(cur) => setFromCurency(cur)} />
      <Block value={toPrice} onChangeValue={onChangeToPrice} currency={toCurency} onChangeCurrency={(cur) => setToCurency(cur)} />
    </div>
  );
}

export default App;