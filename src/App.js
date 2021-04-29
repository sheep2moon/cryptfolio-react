import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { cyan, indigo } from '@material-ui/core/colors';
import Layout from './components/Layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import CoinList from './pages/CoinList';
import CryptoProvider from './contexts/CryptoContext';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: cyan,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CryptoProvider>
          <Layout>
            <Switch>
              <Route exact path='/'>
                <CoinList />
              </Route>
              <Route exact path='/portfolio'>
                <Portfolio />
              </Route>
            </Switch>
          </Layout>
        </CryptoProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
