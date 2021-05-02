import { TextField } from '@material-ui/core';
import React from 'react';
import { useCrypto } from '../../contexts/CryptoContext';
import '../../styles/rowStyle.css';
const ColumnNames = () => {
  const { setSearchTerm } = useCrypto();
  const handleSearchBar = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  return (
    <>
      <div className='row-container column-names'>
        <div className='row-name-container'>
          <TextField
            label='Szukaj'
            variant='filled'
            className='search-coins-input'
            onChange={(e) => handleSearchBar(e)}
          />
        </div>
        <div>
          <p>Cena</p>
        </div>
        <div>
          <p>Market Cap</p>
        </div>
        <div>
          <p> Minimum 24h</p>
        </div>
        <div>
          <p> Maximum 24h</p>
        </div>
        <div>
          <p> Zmiana % 24h</p>
        </div>
      </div>
    </>
  );
};

export default ColumnNames;
