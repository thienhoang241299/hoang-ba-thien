import React, { useEffect, useState } from "react";
import "../CurrencySwap/CurrencySwap.scss";
import axios from "axios";

export default function CurrencySwap() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [tokenList, setTokenList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTokenList(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách token:", error);
      });
  }, []);

  const handleSwap = async () => {
    setResult((amount * fromCurrency) / toCurrency);
  };

  return (
    <div>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {tokenList.map((token, index) => (
          <option key={index} value={token.price}>
            {token.currency}
          </option>
        ))}
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {tokenList.map((token, index) => (
          <option key={index} value={token.price}>
            {token.currency}
          </option>
        ))}
      </select>
      <button onClick={handleSwap}>Swap</button>
      <p>Result: {result}</p>
    </div>
  );
}
