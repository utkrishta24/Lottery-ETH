import React, { useState } from 'react';
import './App.css'
import Header from './components/Header/Header';
import Login from './components/Login/Login';

import InfoContainer from './components/Bet/InfoContainer/InfoContainer';
import BetContainer from './components/Bet/BetContainer/BetContainer';
import { WalletProvider } from './context/WalletContext';
import Footer from './components/Footer/Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [contract, setContractValues] = useState({})



  return (
    <WalletProvider>
      <>
      <Header/>
      <Login />

      <main>
        <InfoContainer setContractValues={setContractValues}/>
        <BetContainer contract={contract}/>
      </main>
      <Footer />
      </>
      <ToastContainer />
    </WalletProvider>
  );
}

export default App;
