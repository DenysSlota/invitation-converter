import { useState, useEffect } from 'react';
import { Block } from './Block';
import './Convert.css';

function Convert() {
  const [fromCurrency, setFromCurrency] = useState('UAN') ;
  const [toCurrency, setToCurrency] = useState('UAN') ;
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json())
    .then((json) => {
        setRates(json.rates);
        console.log(json.rates)
    })
    .catch((err) => {
        alert('failed to get information');
    });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setFromPrice(value);
    setToPrice(result.toFixed(3));
  }

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency, fromPrice]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency, toPrice]);

  return (
    <div className="Convert">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default Convert;