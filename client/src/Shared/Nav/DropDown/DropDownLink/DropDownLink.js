import React from 'react';
import styles from './DropDownLink.module.css';

const DropDownLink = (props) => {
    return (
        <div id={styles.dropDownLink} onClick={props.clickProp}>
            <p style={{marginRight: "30px"}}>{props.children}</p>
        </div>
    )
}

export default DropDownLink;