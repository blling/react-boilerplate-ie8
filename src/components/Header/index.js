import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.css';

export const Header = () => (
  <div>
    <h1>IE8 React Redux Starter Kit</h1>
    <Link to="/" className={classes.activeRoute}>
      Home
    </Link>
    {' · '}
    <Link to="/counter" className={classes.activeRoute}>
      Counter
    </Link>
  </div>
);

export default Header;
