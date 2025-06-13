document.addEventListener("DOMContentLoaded", async () => {
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false&_=${Date.now()}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    data.forEach((coin, index) => {
      const priceEl = document.querySelectorAll(".last-price")[index];
      const changeEl = document.querySelectorAll(".last-update")[index];
      const capEl = document.querySelectorAll(".market-cap")[index];

      if (priceEl)
        priceEl.textContent = `$${coin.current_price.toLocaleString()}`;
      if (changeEl) {
        changeEl.textContent = `${coin.price_change_percentage_24h.toFixed(
          2
        )}%`;
        changeEl.className = `table-data last-update ${
          coin.price_change_percentage_24h >= 0 ? "green" : "red"
        }`;
      }
      if (capEl) capEl.textContent = `$${coin.market_cap.toLocaleString()}`;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
