import React, { useState } from 'react'
import classes from './Input.css';

function Input(props) {
    const [showSelectOptions, setShowSelectOptions ] = useState(false);
    const [selectedValue, setSelectedValue ] = useState('');
    let inputElement = null;
   
    //props.options
     const handleInputChange = (value) => {
        props.onInputChange(value);
    };

    const handleSelectChange = (value) => {
        console.log(value);
        setSelectedValue(value.level_name);
        props.onInputChange(value.level_value);
        setShowSelectOptions(false);
    }
    const updateSelectOption = (isToggle) => {
        if(isToggle) {
            setShowSelectOptions(!showSelectOptions);
        } else {
            setShowSelectOptions(false);
        }
    }

    switch (props.type) {
        case 'text':
            inputElement = <input type="text" placeholder={props.placeholder} 
                            onChange={(event) => handleInputChange(event.target.value)}
                            value={ props.cleanInput ? '' : props.value }
                            
                            className={['input__text', `${props.isTextCenter ? 'text-center' : ''}`].join(' ')} autoFocus/>;
            break;
        case 'select':
            inputElement = (
                <div className="custom-select-container">
                    <div className="custom-select-box" onClick={() => { updateSelectOption(true) }}>
                        {
                            selectedValue ? selectedValue : 'Difficulty Level'
                        }
                    </div>
                    {
                        showSelectOptions ? 
                                        <ul className="options-container">
                                            {
                                             
                                                props.options.map((value, index) => <li onClick={() => {handleSelectChange(value)}} className="options-container__option" key={value.level_id}>{value.level_name}</li>)
                                            }
                                        </ul>
                                        : null
                    }
                    
                </div>
            );
            break;
        default:
            inputElement = null;
            break;
    }
    return (
        <div className={classes.input}>
            {inputElement}
        </div>
    )
}

export default Input
