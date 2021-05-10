import { Button, TextField } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import '../styles/coinModal.css';
import { timestamp, fireStore } from '../firebase/config';
import { useFire } from '../contexts/FireContext';

const AddCoin = ({ modalCoin }) => {
  const quantityRef = useRef();
  const buyForRef = useRef();
  const [errors, setErrors] = useState({});
  const { user } = useFire();
  const collectionRef = fireStore.collection('users').doc(user.uid);

  const handleAddCoin = () => {
    if (!quantityRef.current.value) {
      console.log('quantity input error');
      return setErrors({ ...errors, quantity: true });
    }
    if (!buyForRef.current.value) {
      console.log('buyFor input error');
      return setErrors({ ...errors, buyFor: true });
    }
    const coinData = {
      addedAt: timestamp(),
      coinName: modalCoin.name,
      quantity: quantityRef.current.value,
      buyPrice: buyForRef.current.value,
    };

    collectionRef
      .collection('coins')
      .doc(modalCoin.id)
      .set(coinData)
      .then(() => {
        console.log('document successfully written');
      })
      .catch((error) => {
        console.log('errror writing document', error);
      });
  };

  return (
    <div className='add-coin-container'>
      <div className='add-coin-inputs'>
        <TextField type='number' inputRef={quantityRef} label='Quantity' />
        <TextField type='number' inputRef={buyForRef} label='Bought for' />
      </div>
      <Button variant='contained' color='primary' onClick={handleAddCoin}>
        Add
      </Button>
    </div>
  );
};

export default AddCoin;
