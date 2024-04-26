import React, { useEffect, useState } from "react";
import "../CurrencySwap/CurrencySwap.scss";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import SkeletonCurrencySwap from "./SkeletonCurrencySwap/SkeletonCurrencySwap";

export default function CurrencySwap() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [tokenList, setTokenList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState("Result");
  const [error, setError] = useState("");
  const [isSubmit, SetIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skeleton, SetSkeleton] = useState(true);
  const selectedCurrencyTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-start">
          <img className="mr-2" src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${option.currency}.svg`} alt="SVG" />
          <div>{option.currency}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const CurrencyOptionTemplate = (option) => {
    return (
      <div className="flex align-items-start">
        <img className="mr-2" src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${option.currency}.svg`} alt="SVG" />
        <div>{option.currency}</div>
      </div>
    );
  };
  /////////////////////////

  const handleSwap = async () => {
    if (!fromCurrency || !toCurrency || !amount) {
      setError("Please select both currency and enter the quantity");
      return;
    }
    if (fromCurrency === toCurrency) {
      setError("Please choose two different currency to redeem");
      return;
    }
    if (!fromCurrency.price || !toCurrency.price) {
      setError("One of the two selected currency has no price");
      return;
    }
    // SetIsSubmit(true);
    setLoading(true);
    setTimeout(() => {
      // SetIsSubmit(false);
      setLoading(false);
      setResult((amount * fromCurrency.price) / toCurrency.price);
      setError("");
    }, 2000);
  };

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
        console.error("Error loading currency list:", error);
      });
    setTimeout(SetSkeleton(false), 1500);
  }, []);
  return (
    <div className=" m-auto">
      {skeleton ? (
        <SkeletonCurrencySwap />
      ) : (
        <div className="fadein animation-duration-1000">
          <div className="w-12 card flex justify-content-start p-2">
            <FloatLabel className="w-12">
              <InputText className="w-12" id="username" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <label htmlFor="username">Amount</label>
            </FloatLabel>
          </div>
          <div className="flex justify-content-start  p-2">
            <div className="card flex justify-content-start pr-1">
              <Dropdown
                value={fromCurrency}
                onChange={(e) => {
                  setFromCurrency(e.value);
                }}
                options={tokenList}
                optionLabel="currency"
                placeholder="Select a Currency"
                filter
                valueTemplate={selectedCurrencyTemplate}
                itemTemplate={CurrencyOptionTemplate}
                className="w-full md:w-15rem"
              />
            </div>
            <div className="card flex justify-content-start">
              <Dropdown
                value={toCurrency}
                onChange={(e) => {
                  setToCurrency(e.value);
                }}
                options={tokenList}
                optionLabel="currency"
                placeholder="Select a Currency"
                filter
                valueTemplate={selectedCurrencyTemplate}
                itemTemplate={CurrencyOptionTemplate}
                className="w-full md:w-15rem"
              />
            </div>
          </div>
          <div className="card flex justify-content-start p-2">
            <Button className="w-3" onClick={handleSwap} loading={loading} label="Swap" />
            <InputText className="w-9 ml-3 opacity-100" disabled placeholder="Result" value={result} />
          </div>
        </div>
      )}
      {isSubmit && (
        <div class="overlay flex  justify-content-center align-items-center">
          <h2 className="text-white-alpha-90">Loading...</h2>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
