import React, { useState } from 'react';
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
} from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

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
  page: {
    background: '#1a237e',
    width: '100%',
  },
}));

const Layout = ({ children }) => {
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      {/*Menu górne AppBar*/}
      <AppBar color='primary' className={classes.appbar}>
        <Toolbar
          className={classes.toolbar}
          onClick={() => setIsDrawerOpen(true)}
        >
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/*Wysuwane menu boczne*/}
      <SwipeableDrawer
        open={isDrawerOpen}
        className={classes.drawer}
        onOpen={() => setIsDrawerOpen(true)}
        onClose={() => setIsDrawerOpen(false)}
      >
        <List className={classes.drawerList}>
          {/*Zamknij menu boczne*/}
          <ListItem className={classes.listItem}>
            <Button onClick={() => setIsDrawerOpen(false)} color='primary'>
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
