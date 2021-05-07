import React from 'react';
import '../../styles/rowStyle.css';

const Row = ({ coin, setModalCoin, setIsModalOpen }) => {
  return (
    <>
      <div
        className='row-container'
        onClick={() => {
          setModalCoin(coin);
          setIsModalOpen(true);
        }}
      >
        <div className='row-name-container'>
          <div className='row-name-img'>
            <img src={coin.image} width='60' alt='' />
          </div>
          <p>{coin.name}</p>
        </div>
        <div>
          <p>{coin.current_price} $</p>
        </div>
        <div className='column-mobile-hidden column-medium-hidden'>
          <p>{coin.market_cap} $</p>
        </div>
        <div className='column-mobile-hidden'>
          <p>{coin.low_24h} $</p>
        </div>
        <div className='column-mobile-hidden'>
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
