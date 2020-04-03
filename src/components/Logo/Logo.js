import React from 'react';
import ReactLogo from '../../assets/images/React.png';

import classes from './Logo.css';


const logo = (props) => (
    <div className = {classes.Logo} style={{height:props.height}}>
        <img src={ReactLogo} alt="reactLogo" />
    </div>
);

export default logo;