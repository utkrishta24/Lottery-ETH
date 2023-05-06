import React from 'react'
import './InfoContract.css'

const InfoContract = ({title, value, noSymbol, loading}) => {
    return(
        <div className='ContractInfo'>
            <p className='Info__title'>{title}:</p>
            <p className='Info__value'>{!noSymbol && 'Ξ'} {value}</p>
        </div>
    )
}

export default InfoContract;