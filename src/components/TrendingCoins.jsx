import React, { useContext, useEffect, useState } from 'react'
import { crypto } from '../CurrencyContext'
import { Trending } from '../utils/constants';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // for smooth autoplay

const TrendingCoins = () => {
    const {currency} = useContext(crypto)
    const [trending , settrending] = useState([]);
    const [loading, setloading] = useState(true);

    //fetch api
    const getTrending = async () => {
      try {
        const data = await fetch(Trending(currency));
        const json = await data.json();
    
        if (json && Array.isArray(json)) {
          settrending(json);
        
          settrending(json);
          setloading(false);
        } else {
          console.error("Unexpected response:", json);
        }
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };
    // console.log(trending)

    useEffect(() => {
      const timeout = setTimeout(() => {
        getTrending();
      }, 500); // 0.5 second delay
    
      return () => clearTimeout(timeout);
    }, [currency]);
  return (
    <div className='absolute top-0 left-0 w-full h-full flex justify-center bg-gradient-to-t from-black/60 md:bg-gradient-to-t md:from-black items-center'>
      <Swiper
  modules={[Autoplay]}
  spaceBetween={10}
  slidesPerView={3}
  autoplay={{ delay: 2000 }}
  loop={trending.length >= 4}
>
  {trending.map((coin) => (
    <SwiperSlide key={coin.id}>
      <div className="text-white p-4 rounded-xl text-center">
        <img src={coin.image} alt={coin.name} className=" w-10 md:w-40 mt-60 md:my-auto mx-auto mb-2" />
        <h2 className=" text-sm md:text-xl font-normal md:font-semibold">{coin.symbol.toUpperCase()}</h2>
        <p className="text-sm md:text-xl font-normal md:font-semibold">
          {currency === 'INR' ? '₹' : currency === 'USD' ? '$' : ''}{coin.current_price.toLocaleString()}
        </p>
        <p className={`text-sm md:text-xl font-normal md:font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
    </div>
  )
}

export default TrendingCoins
