import React, {useState} from 'react'
import Loader from '../../../components/Loader/Loader'
import './WithdrawFunds.css'
import Swal from 'sweetalert2'
import { contractWithdrawFunds, getContract } from '../../../controllers/contract'

const WithdrawFunds = ({userFunds, liquidity}) => {

    const [withdrawing, setWithdrawing] = useState(false)

    const withdraw = async () => {
        const _userFunds = Number(userFunds)
        const _liquidity = Number(liquidity)
        if(_liquidity < _userFunds){
            Swal.fire({
                icon:'error',
                title:"Can't withdraw",
                text:"Your balance is higher than contract liquidity.",
                confirmButtonText:"Shit!",
                confirmButtonColor:'var(--primary)'
            })
            return
        }
        const {isConfirmed} = await Swal.fire({
            icon:'info',
            title:'Withdraw funds',
            html:`You are going to withdraw <strong>Ξ ${userFunds}</strong> to your wallet.`,
            confirmButtonText:"Withdraw",
            confirmButtonColor:'var(--primary)',
            showCancelButton:true,
            cancelButtonText:'Cancel',
            reverseButtons:true
        })
        if(isConfirmed){
            setWithdrawing(true)
            try {
                const {contract} = await getContract()
                await contractWithdrawFunds(contract)
            } catch (error) {
                console.log(error)
            } finally{
                setWithdrawing(false)
            }
        }
        
    }

    if(withdrawing){
        return(
            <div className='withdraw__loader animate__animated animate__fadeIn'>
                <Loader width={"20%"}/>
            </div>
        )
    }
    return(
        (userFunds > 0) &&
        <div className='withdraw__button animate__animated animate__fadeInUp' onClick={withdraw}>
            Withdraw funds
        </div> 
    )
}

export default WithdrawFunds;