import React from 'react';
import './Word.css';

function Word(props) {
    return (
        <div className="word">
            {props.children}
        </div>
    )
}


export default Word

