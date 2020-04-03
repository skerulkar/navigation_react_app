import React from 'react';
import classes from './InfoControl.css';

const infoControl = (props) => {
    let paragraph = null;
    if(props.value === 'dropdown') {
        paragraph = <div>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</div>
    } else if (props.value === 'dropdown1') {
        paragraph = <div>The purpose of Pattern Based Writing: Quick & Easy Essay is to quickly and easily teach students how to organize information and make points clear. Then in the Writing with Purpose section of the writing program, students learn to apply their new writing strategies to different types, kinds, genres, and modes of writing. The truth is that it’s quick and easy to get students to write many different types of paragraphs when they have the right foundation.</div>
    }
    return (
        <div className={classes.Para}>
            {paragraph}
        </div>
    );
};

export default infoControl;