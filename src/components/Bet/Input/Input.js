import React from 'react'
import './Input.css'
import '../InfoContainer/InfoContainer.css'

const Input = ({label, type, inputMessage, name, error}) => {
    
    const categories = {
        0: 9,
        1: 49,
        2: 99,
    }

    return(
        <div className='form-controller'>
            <label>{label}</label>
            
            <input type="number"
            placeholder={`${inputMessage} ${categories[type] || ''}`}
            name={name} step="any"/>

            <p className='error animate__animated animate__fadeInLeft'>{error}</p>
        </div>
    )
}

export default Input;