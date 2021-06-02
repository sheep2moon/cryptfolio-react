import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Container,
  makeStyles,
} from '@material-ui/core';
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

import React, { useEffect, useState } from 'react';
import { useCrypto } from '../contexts/CryptoContext';
import { useFire } from '../contexts/FireContext';
import useFirestore from '../hooks/useFirestore';
import '../styles/portfolio.css';
import { teal } from '@material-ui/core/colors';
import { fireStore } from '../firebase/config';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: teal[500],
    color: '#fff',
  },
}));

const Portfolio = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useFire();
  const { coins } = useCrypto();
  const { docs } = useFirestore(user.uid, 'coins');
  const [walletStats, setWalletStats] = useState({});
  const collectionRef = fireStore.collection('users').doc(user.uid);

  useEffect(() => {
    let sumDiff = 0;
    let sumCurrent = 0;
    let sumBuy = 0;
    docs.forEach((coin) => {
      const currentCoin = coins.find((lcoin) => lcoin.id === coin.id);
      const buyForSum = parseFloat(coin.buyPrice) * parseFloat(coin.quantity);
      const currentSum = currentCoin.current_price * parseFloat(coin.quantity);
      const diff = currentSum - buyForSum;
      sumDiff += diff;
      sumCurrent += currentSum;
      sumBuy += buyForSum;
    });

    setWalletStats({
      buyFor: sumBuy,
      current: sumCurrent,
      difference: sumDiff,
    });
    setIsLoading(false);
  }, [docs, coins]);

  const handleDelete = (id) => {
    collectionRef.collection('coins').doc(id).delete();
  };

  return (
    <>
      {!isLoading && (
        <Container>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <ShopOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Total wallet buy price'
                secondary={walletStats.buyFor.toFixed(2) + ' $'}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <AttachMoneyOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Wallet current value'
                secondary={walletStats.current.toFixed(2) + ' $'}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <MonetizationOnOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Wallet profit/loss'
                secondary={walletStats.difference.toFixed(2) + ' $'}
              />
            </ListItem>
          </List>
        </Container>
      )}

      <div className='portfolio-list'>
        <div className='portfolio-list-grid portfolio-list-column-names'>
          <p>Coin</p>
          <p>Quantity</p>
          <p>Buy For</p>
          <p>Current Price</p>
          <p>Profit/Loss</p>
          <p>Delete</p>
        </div>

        {docs.map(({ coinName, id, quantity, buyPrice }) => {
          const currentCoin = coins.find((coin) => coin.id === id);
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
              <button
                className='delete-button'
                onClick={() => handleDelete(id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Portfolio;
