document.addEventListener("DOMContentLoaded", async () => {
  const cryptoSelect = document.getElementById("crypto");
  const priceEl = document.getElementById("price");
  const capEl = document.getElementById("market-cap");

  async function fetchCryptoData(coinId) {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      priceEl.textContent = `$${data.market_data.current_price.usd.toLocaleString()}`;
      capEl.textContent = `$${data.market_data.market_cap.usd.toLocaleString()}`;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  cryptoSelect.addEventListener("change", () => {
    fetchCryptoData(cryptoSelect.value);
  });

  // Initial load
  fetchCryptoData(cryptoSelect.value);
});
