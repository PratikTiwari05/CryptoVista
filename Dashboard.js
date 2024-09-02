const cryptoSelect = document.getElementById('crypto');
const priceElem = document.getElementById('price');
const marketCapElem = document.getElementById('market-cap');
const priceChartCtx = document.getElementById('priceChart').getContext('2d');

let chart;

// Function to fetch data and update the UI
function fetchData() {
    const crypto = cryptoSelect.value;
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currentPrice = data.prices[data.prices.length - 1][1];
            const marketCap = data.market_caps[data.market_caps.length - 1][1];

            priceElem.textContent = `$${currentPrice.toFixed(2)}`;
            marketCapElem.textContent = `$${marketCap.toFixed(2)}`;

            updateChart(data.prices);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to update the chart with new data
function updateChart(prices) {
    const labels = prices.map(price => new Date(price[0]).toLocaleDateString());
    const data = prices.map(price => price[1]);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(priceChartCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price (USD)',
                data: data,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderWidth: 2,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Price: $${context.raw.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    },
                    ticks: {
                        callback: function(value) {
                            return `$${value.toFixed(2)}`;
                        }
                    },
                    grid: {
                        borderDash: [5, 5]
                    }
                }
            }
        }
    });
}

// Event listener for changing cryptocurrency
cryptoSelect.addEventListener('change', fetchData);

// Initial data fetch
fetchData();
