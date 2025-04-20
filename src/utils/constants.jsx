import logo from '../assets/Logo.svg';

export const LOGO = logo;

export const BG_URL = "https://images.unsplash.com/photo-1639152201720-5e536d254d81?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGNyeXB0b2N1cnJlbmN5fGVufDB8fDB8fHww"

export const CoinList = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
  
  export const SingleCoin = (id) =>
    `https://api.coingecko.com/api/v3/coins/${id}`;
  
  export const HistoricalChart = (id, days = 365, currency) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
  
  export const Trending = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

