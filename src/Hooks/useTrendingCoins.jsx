import React, { useContext, useEffect, useState } from 'react'
import { Trending } from '../utils/constants';
import { crypto } from '../CurrencyContext';

const useTrendingCoins = () => {
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
}

export default useTrendingCoins
