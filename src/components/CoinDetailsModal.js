import { Button, Container, Modal, Paper, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import '../styles/coinModal.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    width: '100%',
    maxWidth: '800px',
  },
  closeButton: {
    backgroundColor: '#00000010',
    borderRadius: '50%',
  },
}));

const CoinDetailsModal = ({ props }) => {
  const classes = useStyles();
  const { isModalOpen, handleClose, modalCoin } = props;
  console.log(modalCoin);

  return (
    <Container>
      <Modal open={isModalOpen} onClose={handleClose} className={classes.modal}>
        <Paper className={classes.paper}>
          <div className='coin-details-container'>
            <div className='coin-details-head'>
              <div className='coin-details-name'>
                <img
                  src={modalCoin.image}
                  className='row-name-img'
                  alt=''
                  width='60'
                />
                <Typography>{modalCoin.name}</Typography>
              </div>

              <Button className={classes.closeButton} onClick={handleClose}>
                <CloseIcon button />
              </Button>
            </div>
            <div className='coin-details-list'>
              <ul>
                <li className='coin-details-list-item'>
                  <p>Current price: </p>
                  <p>{modalCoin.current_price} $</p>
                </li>
                <li className='coin-details-list-item'>
                  <p>Market cap: </p>
                  <p>{modalCoin.market_cap} $</p>
                </li>
                <li className='coin-details-list-item'>
                  <p>High 24h: </p>
                  <p>{modalCoin.high_24h} $</p>
                </li>
                <li className='coin-details-list-item'>
                  <p>Low 24h: </p>
                  <p>{modalCoin.low_24h} $</p>
                </li>
                <li className='coin-details-list-item'>
                  <p>Price change 24h: </p>
                  <p>{modalCoin.price_change_24h} $</p>
                </li>
                <li className='coin-details-list-item'>
                  <p>Percentage change 24h </p>
                  <p>{modalCoin.price_change_percentage_24h} %</p>
                </li>
              </ul>
            </div>
          </div>
        </Paper>
      </Modal>
    </Container>
  );
};

export default CoinDetailsModal;
