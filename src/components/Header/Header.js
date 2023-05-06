import React, { useContext } from 'react'
import { WalletContext } from '../../context/WalletContext'
import './Header.css'

const Header = () => {

    const walletContext = useContext(WalletContext)
    const { wallet } = walletContext

    const extractMiddle = (str) => {
        if(!str) return
        const first = str.substr(0, 2);
        const second = str.substr(str.length - 5, str.length - 1)
        return first + "..." + second
    }

    if(!wallet){
        return null
    }

    return(
        <header>
            <p className='address animate__animated animate__fadeInUp'>{extractMiddle(wallet)}</p>
        </header>
    )
}

export default Header;