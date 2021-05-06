import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { cyan, teal } from '@material-ui/core/colors';
import Layout from './components/Layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import CoinList from './pages/CoinList';
import CryptoProvider from './contexts/CryptoContext';
import FireProvider from './contexts/FireContext';
import Login from './components/Login';
import Register from './components/Register';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: cyan,
    type: 'dark',
  },
  typography: {
    color: 'white',
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  paper: {
    backgroundColor: '#181818',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <FireProvider>
          <CryptoProvider>
            <Layout>
              <Switch>
                <Route exact path='/'>
                  <CoinList />
                </Route>
                <Route exact path='/portfolio'>
                  <Portfolio />
                </Route>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
              </Switch>
            </Layout>
          </CryptoProvider>
        </FireProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
