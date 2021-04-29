import React from 'react';
import '../../styles/rowStyle.css';
const ColumnNames = () => {
  return (
    <>
      <div className='row-container column-names'>
        <div className='row-name-container'>
          <p>Nazwa</p>
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
      </div>
    </>
  );
};

export default ColumnNames;
