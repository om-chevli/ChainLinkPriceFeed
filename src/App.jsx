import { useState } from "react";
import "./App.css";
import PriceFeedContract from "./artifacts/contracts/ChainLinkPriceFeed.sol/PriceFeed.json";
import { ethers } from "ethers";

function App() {
  const priceFeedAddress = "0xA234aB5E7F571392abA06842ab0454f132810195"; // Update with the deployed address of your PriceFeed contract
  const feedId = 1; // Update with the ID of the feed you want to fetch

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPair, setSelectedPair] = useState(1);

  // Mapping of conversion pairs to their corresponding feed IDs
  const pairs = {
    "BTC/USD": 1,
    "ETH/USD": 2,
    "LINK/USD": 3,
    "BTC/ETH": 4,
  };

  async function fetchPrice() {
    try {
      setLoading(true);
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        priceFeedAddress,
        PriceFeedContract.abi,
        signer
      );

      // Call updatePrice to ensure fetching the latest price
      await contract.updatePrice(selectedPair);

      const fetchedPrice = await contract.getLastFetchedPrice(selectedPair);
      console.log("Fetched Price:", fetchedPrice);
      let formattedPrice = fetchedPrice;
      const btcUsdPrice = fetchedPrice / 10 ** 8; // Assuming the price is in satoshis and you want to convert it to USD
      if (selectedPair != 4) {
        formattedPrice = btcUsdPrice.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      } else {
        formattedPrice = fetchedPrice / 10 ** 18;
      }

      setPrice(formattedPrice);
      setLoading(false);
    } catch (err) {
      setError(err.message || err);
      setLoading(false);
    }
  }

  // Event handler for radio button change
  const handlePairChange = (event) => {
    setSelectedPair(event.target.value);
  };

  return (
    <div className="App">
      <h1>Chainlink Price Feed</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          <div>
            {/* Radio buttons for selecting conversion pairs */}
            {Object.entries(pairs).map(([pair, pairId]) => (
              <div key={pair} className="radio-group">
                <input
                  className="radio-option"
                  type="radio"
                  id={pair}
                  name="pair"
                  value={pairId}
                  onChange={handlePairChange}
                />
                <label htmlFor={pair}>{pair}</label>
              </div>
            ))}
          </div>
          <p>Current Price: {price !== null ? price.toString() : "N/A"}</p>
          <button onClick={fetchPrice} disabled={loading}>
            Fetch Price
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
