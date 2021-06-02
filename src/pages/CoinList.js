import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { useCrypto } from '../contexts/CryptoContext';

import Row from '../components/CoinListTable/Row';
import ColumnNames from '../components/CoinListTable/ColumnNames';
import CoinDetailsModal from '../components/CoinDetailsModal';

const CoinList = () => {
  const { coins } = useCrypto();
  const [modalCoin, setModalCoin] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setModalCoin(null);
  };

  return (
    <Container>
      <ColumnNames />
      {coins &&
        coins.map((coin) => (
          <Row
            key={coin.symbol}
            coin={coin}
            setModalCoin={setModalCoin}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      {modalCoin && (
        <CoinDetailsModal
          props={{ isModalOpen, setIsModalOpen, modalCoin, handleClose }}
        ></CoinDetailsModal>
      )}
    </Container>
  );
};

export default CoinList;
