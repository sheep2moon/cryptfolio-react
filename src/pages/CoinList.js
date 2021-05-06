import { Avatar, Card, CardHeader, Container, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useCrypto } from '../contexts/CryptoContext';

import Row from '../components/CoinListTable/Row';
import ColumnNames from '../components/CoinListTable/ColumnNames';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  searchInput: {
    backgroundColor: '#fff',
    width: '30%',
  },
}));

const CoinList = () => {
  const classes = useStyles();
  const { coins } = useCrypto();
  const [modalCoin, setModalCoin] = useState();
  console.log(coins);

  const handleClose = () => {
    setModalCoin(null);
  };

  return (
    <Container>
      <ColumnNames />
      {coins &&
        coins.map((coin) => (
          <Row key={coin.symbol} coin={coin} setModalCoin={setModalCoin} />
        ))}
      {modalCoin && (
        <Modal open={modalCoin} onClose={handleClose} className={classes.modal}>
          <Card>
            <CardHeader
              avatar={
                <Avatar>
                  <img src={modalCoin.image} width='60' alt='' />
                </Avatar>
              }
            />
          </Card>
        </Modal>
      )}
    </Container>
  );
};

export default CoinList;
