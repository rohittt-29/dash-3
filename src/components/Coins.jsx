import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import { crypto } from '../CurrencyContext';
import { SingleCoin } from '../utils/constants';
import  { SkeletonDemo }  from './Shimmer';
import CointChart from './CointChart';
import Footer from './Footer';

const Coins = () => {
  const { id } = useParams();
  const [coin, setcoin] = useState();
  const { currency } = useContext(crypto);

  const fetchcoin = async () => {
    const res = await fetch(SingleCoin(id));
    const data = await res.json();
    setcoin(data);
  };

  useEffect(() => {
    fetchcoin();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white">
    <Header />
  
    <main className="flex-1 mt-10 md:mt-20">
      {coin ? (
        <div className="p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          {/* LEFT */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-4 mb-4">
              {coin.image?.large && (
                <img
                  src={coin.image.large}
                  alt={coin.name}
                  className="w-20 h-20 object-contain"
                />
              )}
              <h1 className="text-3xl font-semibold">{coin.name}</h1>
            </div>
  
            <p
              className="text-gray-300 mb-4"
              dangerouslySetInnerHTML={{
                __html: coin?.description?.en?.split('. ')[0],
              }}
            />
  
            <div className="text-gray-200">
              <p className="text-xl font-semibold mt-2">Rank: {coin.market_cap_rank}</p>
              <p className="text-xl font-semibold mt-2">
                Current Price: {currency === 'INR' ? '₹' : '$'}
                {coin?.market_data?.current_price?.[currency.toLowerCase()]}
              </p>
              <p className="text-xl font-semibold mt-2">
                Market Cap: {currency === 'INR' ? '₹' : '$'}
                {coin?.market_data?.market_cap?.[currency.toLowerCase()]?.toLocaleString()}
              </p>
            </div>
          </div>
  
          {/* RIGHT */}
          <div className="w-auto md:w-2/3">
            <CointChart currency={currency} />
          </div>
        </div>
      ) : (
        <div className="p-6 max-w-7xl mx-auto">{SkeletonDemo()}</div>
      )}
    </main>
  
    <Footer />
  </div>
  );
  
};

export default Coins;
