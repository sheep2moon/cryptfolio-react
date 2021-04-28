import React, { useContext, useState, useEffect } from 'react';

const CryptoContext = React.createContext();

export function useCrypto() {
  return useContext(CryptoContext);
}

const url =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCoins = async () => {
    setIsLoading(true);
    const response = await fetch(url);
    const coins = await response.json();
    setCoins(coins);
    setIsLoading(false);
  };

  useEffect(() => {
    getCoins();
  }, []);

  const value = {
    coins,
  };

  return (
    <CryptoContext.Provider value={value}>
      {!isLoading && children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
