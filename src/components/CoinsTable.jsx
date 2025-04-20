import React, { useContext, useEffect, useState } from 'react';
import { crypto } from '../CurrencyContext';
import { CoinList } from '../utils/constants';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useNavigate } from 'react-router-dom';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const { currency } = useContext(crypto);
  const [search, setSearch] = useState('');
  const [page , setPage ] = useState(1);
  const coinsPerPage = 10;
  const navigate = useNavigate();

  const getCoins = async () => {
    try {
      const res = await fetch(CoinList(currency));
      const data = await res.json();
      if (Array.isArray(data)) {
        setCoins(data);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (err) {
      console.error("Error fetching coins:", err);
    }
  };
  

  useEffect(() => {
    getCoins();
  }, [currency]);

  const handleSearch = () => {
    if (Array.isArray(coins)) {
      return coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }
    return []; // Return an empty array if coins is not an array
  };
  

  const paginatedCoins = handleSearch().slice(
    (page - 1) * coinsPerPage,
    page * coinsPerPage
  );
  const totalPages = Math.ceil(handleSearch().length / coinsPerPage);

  return (
    <div className="pt-24 px-6 md:px-10  max-w-7xl mx-auto min-h-screen text-white">
<h1 className="text-2xl sm:text-4xl font-normal text-center text-gray-200 mb-8">
        <span className="italic font-serif ">Explore</span> Top Coins by Market Cap
      </h1>

      {/* 🔧 Search input box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a coin..."
          onChange={(e) => setSearch(e.target.value)}
  className="w-full max-w-md px-4 py-2 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 z-10"
        />
      </div>

      {/* 🔧 Scrollable div with styled scrollbar */}
      <div className="overflow-x-auto max-h-[300px] md:max-h-[500px] rounded border border-gray-600 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
        <Table className="w-full cursor-pointer text-left text-sm">
          <TableHeader>
            <TableRow className="sticky top-0 bg-gray-300 text-white z-20">
              <TableHead>Coin</TableHead>
              <TableHead><h1 className='ml-6 md:mx-auto'>Price</h1></TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedCoins.map((coin) => ( 
              <TableRow key={coin.id}  onClick={() => navigate(`/coins/${coin.id}`)}  className={`${coin.price_change_percentage_24h >= 0 ? 'hover:bg-green-300/30' : 'hover:bg-red-300/30'} transition`}>
                <TableCell className="flex items-center gap-3 py-3">
                  <img   onClick={() => navigate(`/coins/${coin.id}`)}   src={coin.image} alt={coin.name} className="h-6 w-6" />
                  <div>
                    <p className="text-white text-xs md:text-sm md:font-medium">{coin.name}</p>
                    <p className="text-gray-400 text-xs md:text-sm uppercase">{coin.symbol}</p>
                  </div>
                </TableCell >
                <TableCell>
                 <h1 className='text-xs md:textsm ml-5 mx-auto'> {currency === 'INR' ? '₹' : currency === 'USD' ? '$' : ''}{coin.current_price.toLocaleString()}</h1>
                </TableCell>
                <TableCell className={coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">
                  ₹ {coin.market_cap.toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
    {/* Pagination Controls */}
<div className="w-full overflow-x-auto">
  <Pagination>
    <PaginationContent className="flex flex-nowrap space-x-1">
      <PaginationItem>
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setPage((prev) => Math.max(prev - 1, 1));
          }}
        />
      </PaginationItem>

      {[...Array(totalPages)].map((_, index) => (
        <PaginationItem key={index}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage(index + 1);
            }}
            className={`min-w-[32px] px-2 text-center ${
              page === index + 1 ? 'bg-gray-700 text-white' : ''
            }`}
          >
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem>
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setPage((prev) => Math.min(prev + 1, totalPages));
          }}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</div>

    </div>
  );
};

export default CoinsTable;
