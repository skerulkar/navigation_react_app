import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/home" disabled={props.disabled}>Home</NavigationItem>
        <NavigationItem link="/tasks" disabled={props.disabled}>Tasks</NavigationItem>
        <NavigationItem link="/user" disabled={props.disabled}>User</NavigationItem>
    </ul>
);

export default navigationItems;