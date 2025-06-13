"use strict";

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header active
 */

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 300) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", activeHeader);

/**
 * toggle active on add to fav
 */

const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
};

addEventOnElem(addToFavBtns, "click", toggleActive);

/**
 * scroll revreal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.5) {
      sections[i].classList.add("active");
    } else {
      sections[i].classList.remove("active");
    }
  }
};

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

// At top or bottom of index.js:

// Fetch top N coins and populate main page table
async function fetchTopCoins() {
  const tableBody = document.getElementById("crypto-table-body");
  if (!tableBody) return;
  const apiUrl =
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h";
  try {
    const resp = await fetch(apiUrl, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    tableBody.innerHTML = ""; // clear existing rows
    data.forEach((coin, idx) => {
      const tr = document.createElement("tr");
      tr.className = "table-row";
      // star button cell
      const favTd = document.createElement("td");
      favTd.className = "table-data";
      favTd.innerHTML = `
        <button class="add-to-fav" aria-label="Add to favourite" data-add-to-fav>
          <ion-icon name="star-outline" class="icon-outline"></ion-icon>
          <ion-icon name="star" class="icon-fill"></ion-icon>
        </button>`;
      tr.appendChild(favTd);

      // rank
      const rankTh = document.createElement("th");
      rankTh.className = "table-data rank";
      rankTh.scope = "row";
      rankTh.textContent = idx + 1;
      tr.appendChild(rankTh);

      // name + icon
      const nameTd = document.createElement("td");
      nameTd.className = "table-data";
      nameTd.innerHTML = `
        <div class="wrapper">
          <img src="${coin.image}" width="20" height="20" alt="${
        coin.name
      } logo" class="img">
          <h3>
            <a href="#" class="coin-name">${coin.symbol.toUpperCase()} <span class="span">${coin.symbol.toUpperCase()}/USD</span></a>
          </h3>
        </div>`;
      tr.appendChild(nameTd);

      // last price
      const priceTd = document.createElement("td");
      priceTd.className = "table-data last-price";
      priceTd.textContent = `$${coin.current_price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
      tr.appendChild(priceTd);

      // 24h %
      const changeTd = document.createElement("td");
      changeTd.className =
        "table-data last-update " +
        (coin.price_change_percentage_24h >= 0 ? "green" : "red");
      changeTd.textContent = `${
        coin.price_change_percentage_24h !== null
          ? coin.price_change_percentage_24h.toFixed(2)
          : "0.00"
      }%`;
      tr.appendChild(changeTd);

      // market cap
      const capTd = document.createElement("td");
      capTd.className = "table-data market-cap";
      capTd.textContent = `$${coin.market_cap.toLocaleString()}`;
      tr.appendChild(capTd);

      // sparkline / last 7 days small chart; if desired, use coin.sparkline_in_7d.price
      const sparkTd = document.createElement("td");
      sparkTd.className = "table-data";
      // optional: insert sparkline SVG/canvas or leave blank
      sparkTd.innerHTML = "";
      tr.appendChild(sparkTd);

      // more actions cell (if originally present)
      const moreTd = document.createElement("td");
      moreTd.className = "table-data";
      moreTd.innerHTML = `<a href="Dashboard.html?coin=${coin.id}" class="btn btn-primary">View</a>`;
      tr.appendChild(moreTd);

      tableBody.appendChild(tr);
    });

    // Re-bind any event listeners on newly added elements if needed (e.g., add-to-fav).
    // e.g., re-run your existing add-to-fav logic here.
  } catch (err) {
    console.error("Failed to fetch top coins:", err);
    // Optionally show a user-visible message.
  }
}

// Call on load
window.addEventListener("DOMContentLoaded", () => {
  fetchTopCoins();
  // Optionally refresh every X minutes:
  // setInterval(fetchTopCoins, 5 * 60 * 1000);
});

document.addEventListener("DOMContentLoaded", async () => {
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false&_=${Date.now()}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const priceEls = document.querySelectorAll(".last-price");
    const changeEls = document.querySelectorAll(".last-update");
    const capEls = document.querySelectorAll(".market-cap");

    data.forEach((coin, index) => {
      if (priceEls[index])
        priceEls[index].textContent = `$${coin.current_price.toLocaleString()}`;
      if (changeEls[index]) {
        const change = coin.price_change_percentage_24h;
        changeEls[index].textContent = `${change.toFixed(2)}%`;
        changeEls[index].style.color = change >= 0 ? "limegreen" : "red";
      }
      if (capEls[index])
        capEls[index].textContent = `$${coin.market_cap.toLocaleString()}`;
    });
  } catch (error) {
    console.error("Failed to fetch crypto data:", error);
  }
});
