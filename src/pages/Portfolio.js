import React, { useState } from 'react';
import { useCrypto } from '../contexts/CryptoContext';
import { useFire } from '../contexts/FireContext';
import useFirestore from '../hooks/useFirestore';
import '../styles/portfolio.css';

const Portfolio = () => {
  const { user } = useFire();
  const { coins } = useCrypto();
  const { docs } = useFirestore(user.uid, 'coins');
  const [walletValue, setWalletValue] = useState(0);
  console.log(docs);

  let currentCoin;

  return (
    <>
      <div className='portfolio-list'>
        <div className='portfolio-list-grid portfolio-list-column-names'>
          <p>Coin</p>
          <p>Quantity</p>
          <p>Buy For</p>
          <p>Current Price</p>
          <p>Profit/Loss</p>
        </div>

        {docs.map(({ coinName, id, quantity, buyPrice }) => {
          currentCoin = coins.find((coin) => coin.id === id);
          let priceDifference =
            currentCoin.current_price * parseFloat(quantity) -
            parseFloat(buyPrice) * parseFloat(quantity);

          return (
            <div key={id} className='portfolio-list-item portfolio-list-grid'>
              <div className='portfolio-list-item-name'>
                <img
                  src={currentCoin.image}
                  alt='cryptocurrency logo'
                  width='40'
                />
                <p>{coinName}</p>
              </div>
              <p>{parseFloat(quantity).toFixed(6)}</p>
              <p>{parseFloat(buyPrice).toFixed(3)}$</p>
              <p>{currentCoin.current_price.toFixed(3)}$</p>
              <p>{priceDifference.toFixed(2)}$</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Portfolio;
