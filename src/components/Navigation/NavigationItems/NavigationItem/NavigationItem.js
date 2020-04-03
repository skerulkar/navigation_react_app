import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom'

const navigationItem = (props) => {
    
    return(
        <li className={classes.NavigationItem}>
            {
                props.disabled ? null :
                <NavLink
                    to={props.link}
                    exact={props.exact}
                    activeClassName={classes.active}
                    disabled={props.isAuthorized}>
                        {props.children}
                </NavLink>
            }
        </li>
    )
};

export default navigationItem;