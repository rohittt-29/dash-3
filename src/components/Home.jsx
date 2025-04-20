import React from 'react';
import Header from './Header';
import { BG_URL } from '../utils/constants';
import TrendingCoins from './TrendingCoins';
import CoinsTable from './CoinsTable';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      
      {/* Main Content */}
      <main className="flex-1">
        <Header />
        
        <div className="relative">
          <img className="w-full mt-25 object-cover" src={BG_URL} alt="bg" />
          
          <div className="absolute w-full md:w-2/3 left-1/2 top-0 mt-20 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
            <h1 className="text-2xl font-normal md:text-5xl md:mt-26 md:font-semibold italic">Dash 3</h1>
            <p className="font-light  mt-3 text-white text-lg md:text-3xl md:w-3/4 mx-auto">
              Track, Analyze, and Grow Your
              <span className="italic text-green-500 font-semibold"> Crypto Portfolio </span>
              with Real-Time Insights and Smarter Decisions.
            </p>
          </div>

          <TrendingCoins />
        </div>

        <CoinsTable />
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};


export default Home;
