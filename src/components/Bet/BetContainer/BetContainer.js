import React, { useContext, useState } from 'react'
import './BetContainer.css'
import '../InfoContainer/InfoContainer.css'
import '../../Login/Login.css'
import Loader from '../../Loader/Loader'
import Categories from '../Categories/Categories';
import Input from '../Input/Input';
import Swal from 'sweetalert2'
import { contractMakeBet, getContract } from '../../../controllers/contract'
import { NumberGuessedEvent } from '../../../controllers/events'
import { WalletContext } from '../../../context/WalletContext'
import { toast } from 'react-toastify';

const BetContainer = ({contract}) => {
    
    const context = useContext(WalletContext)

    const [betting, setBetting] = useState(false)

    const [categorie, setCategorie] = useState(-1)
    const [errors, setErrors] = useState({})

    const multipliers = {
        0:{
            type:'Bronze',
            multiplier:7,
            max:9
        },
        1:{
            type:"Emerald",
            multiplier:35,
            max:49
        },
        2:{
            type:"Diamond",
            multiplier:70,
            max:99
        },
    }

    const bet = async (e) => {
        e.preventDefault()
        if(!context.wallet){
            setErrors({_type:"Please login"})
            return
        }
        setBetting(true)
        const { amount, number } = e.target

        setErrors({})
        if(categorie === -1 || 
        (amount.value > contract.maxBet || amount.value < contract.minBet) ||
        (number.value > multipliers[categorie]?.max || !number.value)){
            if(categorie === -1) setErrors((prev)=>({...prev, _type:"Insert a valid type"}))
            if(amount.value > contract.maxBet) setErrors((prev)=>({...prev, _amount:"The amount must be lower than max bet"}))
            if(amount.value < contract.minBet) setErrors((prev)=>({...prev, _amount:"The amount must be higher than min bet"}))
            if(!number.value) setErrors((prev)=>({...prev, _number:"Insert a number"}))
            if(number.value > multipliers[categorie]?.max) setErrors((prev)=>({...prev, _number:`Insert a number up to ${multipliers[categorie].max}`}))
            setBetting(false)
            return
        }
        const {isConfirmed} = await Swal.fire({
            title: `${multipliers[categorie].type} Bet`,
            html: `You are betting to number <strong>${number.value}</strong> <br/> You will recieve <strong>Ξ ${Number(amount.value) * Number(multipliers[categorie].multiplier)}</strong> aprox`,
            confirmButtonText: "Let's bet!",
            confirmButtonColor:"var(--primary)",
            showCancelButton:true,
            cancelButtonColor:"var(--red)",
            reverseButtons:true,
        })

        if(isConfirmed){
            const bet = {
                amount: amount.value,
                number: number.value,
                categorie: categorie,
            }
            try {
                const {contract} = await getContract()
                await contractMakeBet(contract, bet)
            } catch (error) {
                console.log(error)
                setBetting(false)
            } finally{
                await NumberGuessedEvent(setBetting) //LISTEN IF USER WON
                toast.info('Waiting Chainlink Randomness...', {
                    position: "top-left",
                    autoClose: 150000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    theme:'dark',
                });
            }
        }else{
            setBetting(false)
        }
    }

    return(
        <article className='animate__animated animate__jackInTheBox'>
            <section className='Container Bet'>
                <p className='bet__title'>Make a bet!</p>
                <Categories
                categorieSelected={categorie}
                selectCategorie={setCategorie}
                />
                
                <form onSubmit={bet}>
                    <Input
                    type={categorie}
                    label="Number"
                    inputMessage="Insert a number between 0 ..."
                    name="number"
                    error={errors._number}/>
                    <Input
                    inputMessage="Insert the amount to bet"
                    label={"Amount to bet"}
                    name="amount"
                    error={errors._amount}/>

                    {
                        betting ?
                        <>
                        <br/>
                        <br/>
                        <Loader width={"10%"}/>
                        </>
                        :
                        <button>Bet!</button>
                    }

                    <p className='error type_error animate__animated animate__fadeInUp'>
                        {errors._type}
                    </p>
                </form>

            </section>
        </article>
    )
}

export default BetContainer;