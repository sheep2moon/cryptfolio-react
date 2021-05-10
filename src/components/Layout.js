import React, { useEffect, useState } from 'react';
import {
  Button,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  IconButton,
  AppBar,
  Typography,
} from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { useFire } from '../contexts/FireContext';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  toolbar: theme.mixins.toolbar,
  toolbarButton: {
    color: '#fff',
  },
  page: {
    background: '#181818',
    width: '100%',
  },
  drawerCloseButton: {
    width: '100%',
    padding: '1rem',
  },
}));

const Layout = ({ children }) => {
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loginButtonText, setLoginButtonText] = useState('Login');
  const classes = useStyles();
  const { user, logout } = useFire();
  const menuItems = [
    {
      text: 'Lista',
      icon: <ViewListIcon color='primary' />,
      path: '/',
    },
    {
      text: 'Portfolio',
      icon: <AccountBalanceWalletIcon color='primary' />,
      path: '/portfolio',
    },
  ];
  console.log(user);
  const handleLoginButton = () => {
    console.log(user);
    if (user) {
      logout();
      history.push('/');
    } else {
      history.push('/login');
    }
  };
  useEffect(() => {
    if (user) {
      setLoginButtonText('Logout');
    } else {
      setLoginButtonText('Login');
    }
  }, [user]);
  return (
    <div className={classes.root}>
      {/*Menu górne AppBar*/}
      <AppBar color='primary' className={classes.appbar}>
        <Toolbar className={classes.toolbar} color='primary'>
          <IconButton
            className={classes.toolbarButton}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          {user && <Typography>{user.email}</Typography>}
        </Toolbar>
      </AppBar>
      {/*Wysuwane menu boczne*/}
      <SwipeableDrawer
        color='primary'
        open={isDrawerOpen}
        className={classes.drawer}
        onOpen={() => setIsDrawerOpen(true)}
        onClose={() => setIsDrawerOpen(false)}
      >
        <List className={classes.drawerList}>
          {/*Zamknij menu boczne*/}
          <ListItem className={classes.listItem}>
            <Button
              onClick={() => setIsDrawerOpen(false)}
              color='primary'
              className={classes.drawerCloseButton}
            >
              <CloseIcon />
            </Button>
          </ListItem>
          {/*Linki*/}
          {menuItems.map((item) => (
            <ListItem
              className={classes.listItem}
              button
              onClick={() => {
                setIsDrawerOpen(false);
                history.push(item.path);
              }}
              key={item.text}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem
            className={classes.listItem}
            button
            onClick={() => {
              handleLoginButton();
              setIsDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <VpnKeyIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary={loginButtonText} />
          </ListItem>
        </List>
      </SwipeableDrawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
