import React from 'react';
import '../../styles/rowStyle.css';

const Row = ({ coin, setModalCoin }) => {
  return (
    <>
      <div className='row-container' onClick={() => setModalCoin(coin)}>
        <div className='row-name-container'>
          <img src={coin.image} width='60' alt='' />
          <p>{coin.name}</p>
        </div>
        <div>
          <p>{coin.current_price} $</p>
        </div>
        <div>
          <p>{coin.market_cap} $</p>
        </div>
        <div>
          <p>{coin.low_24h} $</p>
        </div>
        <div>
          <p>{coin.high_24h} $</p>
        </div>
        <div
          style={
            coin.price_change_percentage_24h > 0
              ? { color: 'green' }
              : { color: 'red' }
          }
        >
          <p>{coin.price_change_percentage_24h.toFixed(2)} %</p>
        </div>
      </div>
    </>
  );
};

export default Row;
