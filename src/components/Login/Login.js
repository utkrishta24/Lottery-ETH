import React, { useContext } from 'react'
import { WalletContext } from '../../context/WalletContext'
import './Login.css'

const Login = ({action}) => {

    const walletContext = useContext(WalletContext)
    const {connect, wallet} = walletContext

    if(wallet){
        return null
    }

    return(
        <header className='animate__animated animate__fadeInUp'>
            <button className='Login' onClick={connect}>Login with Metamask</button>
        </header>
    )
}

export default Login;