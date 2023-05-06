import { useState, createContext, useEffect } from 'react';
import {requestAccount, checkIfWalletIsConnected, isGoerliNetwork, changeNetwork, listenIfLogout} from '../controllers/web3'

const WalletContext = createContext();


const WalletProvider = ({children}) => {

    const [connecting, setConnecting] = useState(false)
    const [wallet, setWallet] = useState('')
    const [validNetwork, setValidNetwork] = useState('')

    const connect = async () => {
        setConnecting(true)
        const address = await requestAccount()
        setWallet(address)
        setConnecting(false)
    }

    const checkConnection = async () => {
        const connection = await checkIfWalletIsConnected()
        setWallet(connection)
    }

    const checkNetwork = async () => {
        const isInGoerli = isGoerliNetwork()
        setValidNetwork(isInGoerli)
        if(!isInGoerli) await changeNetwork(setValidNetwork)
        return isInGoerli
    }

    useEffect(()=>{
        const check = async () => {
          console.log("valid net: ", validNetwork)
          if(!validNetwork){
            const allow = await checkNetwork()
            if(!allow) return
          }
    
          await Promise.allSettled([
            checkConnection(),
            new Promise(resolve=>setTimeout(resolve, 600))
          ])
          listenIfLogout(setWallet)
          
          setConnecting(false)
        }
        
        check()
    }, [validNetwork])


    return(
        <WalletContext.Provider value={{wallet, validNetwork, connecting, connect}}>
            {children}
        </WalletContext.Provider>
    )
}

export { WalletContext, WalletProvider }