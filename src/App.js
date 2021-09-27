import './App.css';
import { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';
const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=59e38883131e44c023d38ff0ac2409b5';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  
  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        const secondCurrency = Object.keys(data.rates)[1];
        setCurrencyOptions([...Object.keys(data.rates)]);
        setFromCurrency(firstCurrency);
        setToCurrency(secondCurrency);
        setExchangeRate(data.rates[firstCurrency])
      });
  }, []);

  // This part below doesn't work 
  // because "Your current Subscription Plan does not support HTTPS Encryption"

  // useEffect(() => {
  //   fetch(`${BASE_URL}&base=${fromCurrency}&symbols=${toCurrency}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     setExchangeRate(data.rates[toCurrency]);
  //     });
  // }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}

      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;

