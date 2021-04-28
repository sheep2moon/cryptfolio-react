import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useCrypto } from '../contexts/CryptoContext';
import { DataGrid } from '@material-ui/data-grid';

const CoinList = () => {
  const { coins } = useCrypto();
  const [rows, setRows] = useState([]);
  console.log(coins);

  const prepareRowsData = (coins) => {
    const tempRows = [];
    coins.forEach((coin) => {
      tempRows.push({
        id: coin.id,
        col1: coin.symbol.toUpperCase(),
        col2: coin.name,
        col3: coin.current_price.toFixed(4),
        col4: coin.market_cap,
        col5: coin.low_24h.toFixed(4),
        col6: coin.high_24h.toFixed(4),
        col7: coin.price_change_percentage_24h.toFixed(2),
        col8: coin.last_updated.slice(11, 16),
      });
    });
    setRows(tempRows);
  };
  useEffect(() => {
    if (coins) {
      prepareRowsData(coins);
    }
  }, [coins]);

  const columns = [
    { field: 'col1', headerName: 'Symbol', width: 120 },
    { field: 'col2', headerName: 'Nazwa', width: 180 },
    { field: 'col3', headerName: 'Cena', width: 150 },
    { field: 'col4', headerName: 'Wolumen', width: 150 },
    { field: 'col5', headerName: 'Najniższa 24h', width: 180 },
    { field: 'col6', headerName: 'Najwyższa 24h', width: 180 },
    { field: 'col7', headerName: '24h(%)', width: 100 },
    { field: 'col8', headerName: 'Aktualizacja', width: 140 },
  ];

  return (
    <Container>
      {rows && (
        <DataGrid autoHeight rows={rows} columns={columns} pageSize={20} />
      )}
    </Container>
  );
};

export default CoinList;
