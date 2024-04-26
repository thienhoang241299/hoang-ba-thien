import React, { useEffect, useState } from "react";
import "../CurrencySwap/CurrencySwap.scss";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import SkeletonCurrencySwap from "./SkeletonCurrencySwap/SkeletonCurrencySwap";

// Main component
export default function CurrencySwap() {
  // Initialize state
  const [fromCurrency, setFromCurrency] = useState(""); // State for the currency to convert from
  const [toCurrency, setToCurrency] = useState(""); // State for the currency to convert to
  const [tokenList, setTokenList] = useState([]); // State for the list of available tokens
  const [amount, setAmount] = useState(0); // State for the amount to convert
  const [result, setResult] = useState("Result"); // State for the result of the conversion
  const [error, setError] = useState(""); // State for any error messages
  const [isSubmit, SetIsSubmit] = useState(false); // State for whether the form has been submitted
  const [loading, setLoading] = useState(false); // State for whether the component is loading
  const [skeleton, SetSkeleton] = useState(true); // State for whether to show the skeleton component

  // Template for dropdown menu
  const selectedCurrencyTemplate = (option, props) => {
    if (option) {
      // If an option is selected, display the currency's icon and name
      return (
        <div className="flex align-items-start">
          <img className="mr-2" src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${option.currency}.svg`} alt="SVG" />
          <div>{option.currency}</div>
        </div>
      );
    }

    // If no option is selected, display the placeholder text
    return <span>{props.placeholder}</span>;
  };

  // Template for option in dropdown menu
  const CurrencyOptionTemplate = (option) => {
    // Display the currency's icon and name for each option in the dropdown menu
    return (
      <div className="flex align-items-start">
        <img className="mr-2" src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${option.currency}.svg`} alt="SVG" />
        <div>{option.currency}</div>
      </div>
    );
  };

  // Function to handle when user clicks Swap button
  const handleSwap = async () => {
    // Check if both currencies and the amount have been selected
    if (!fromCurrency || !toCurrency || !amount) {
      setError("Please select both currency and enter the quantity");
      return;
    }

    // Check if the two selected currencies are different
    if (fromCurrency === toCurrency) {
      setError("Please choose two different currency to redeem");
      return;
    }

    // Check if both selected currencies have a price
    if (!fromCurrency.price || !toCurrency.price) {
      setError("One of the two selected currency has no price");
      return;
    }
    // SetIsSubmit(true);
    // Set the loading state to true
    setLoading(true);
    setTimeout(() => {
      // SetIsSubmit(false);
      // After 2 seconds, calculate the result and reset the loading and error states
      setLoading(false);
      setResult((amount * fromCurrency.price) / toCurrency.price);
      setError("");
    }, 2000);
  };
  // useEffect function to fetch data from API
  useEffect(() => {
    // Fetch the list of available tokens and their prices
    fetch("https://interview.switcheo.com/prices.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the tokenList state with the fetched data
        setTokenList(data);
      })
      .catch((error) => {
        console.error("Error loading currency list:", error);
      });
    // After 1.5 seconds, hide the skeleton component
    setTimeout(SetSkeleton(false), 1500);
  }, []);

  return (
    <div className=" m-auto">
      {skeleton ? (
        // If the skeleton state is true, display the SkeletonCurrencySwap component
        <SkeletonCurrencySwap />
      ) : (
        // Otherwise, display the CurrencySwap component
        <div className="fadein animation-duration-1000">
          <div className="w-12 card flex justify-content-start p-2">
            <FloatLabel className="w-12">
              <InputText className="w-12" id="username" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <label htmlFor="username">Amount</label>
            </FloatLabel>
          </div>
          <div className="flex justify-content-start  p-2">
            <div className="card flex justify-content-start pr-1">
              {/* Dropdown for selecting the currency to convert from */}
              <Dropdown
                value={fromCurrency} // The currently selected currency
                onChange={(e) => {
                  setFromCurrency(e.value); // Update the selected currency when the user makes a selection
                }}
                options={tokenList} // The list of available currencies
                optionLabel="currency" // The property of the option object to use as the label
                placeholder="Select a Currency" // Placeholder text
                filter // Enable filtering of options
                valueTemplate={selectedCurrencyTemplate} // Template for the selected value
                itemTemplate={CurrencyOptionTemplate} // Template for the options in the dropdown menu
                className="w-full md:w-15rem" // CSS classes
              />
            </div>
            <div className="card flex justify-content-start">
              {/* Dropdown for selecting the currency to convert to */}
              <Dropdown
                value={toCurrency} // The currently selected currency
                onChange={(e) => {
                  setToCurrency(e.value); // Update the selected currency when the user makes a selection
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
      {/* Overlay for displaying a loading message while the conversion is being calculated, but i disable it */}
      {isSubmit && (
        <div class="overlay flex  justify-content-center align-items-center">
          <h2 className="text-white-alpha-90">Loading...</h2>
        </div>
      )}
      {/* Display any error messages */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
