import React, { useContext, useState, useEffect } from 'react';

const CryptoContext = React.createContext();

export function useCrypto() {
  return useContext(CryptoContext);
}

const url =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

const CryptoProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState();

  const getCoins = async () => {
    setIsLoading(true);
    const response = await fetch(url);
    const coins = await response.json();
    setAllCoins(coins);
    setCoins(coins);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      const newCoins = allCoins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchTerm) ||
          coin.symbol.toLowerCase().includes(searchTerm)
      );
      setCoins(newCoins);
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  useEffect(() => {
    getCoins();
  }, []);

  const value = {
    coins,
    setSearchTerm,
  };

  return (
    <CryptoContext.Provider value={value}>
      {!isLoading && children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
