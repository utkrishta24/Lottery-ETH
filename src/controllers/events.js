import { getContract } from './contract'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

export const BetDoneEvent = async (action) =>{
    const { contract } = await getContract();

    await contract.on('BetDone', async ()=>action())
}

export const WithdrawFundsEvent = async (action) => {
    const { contract, signer } = await getContract();
    const addr =  await signer.getAddress()

    await contract.on("WithdrawnUserFunds", (address, funds)=>{
        if(addr === address){
            executeAlert({
                icon:'success',
                title:'Withdrawn Funds'
            })
        }
        action()
        console.log(`Sent Ξ ${funds} to ${address}`)
    })
}
export const NumberGuessedEvent = async (action) =>{
    const { contract, signer } = await getContract();
    const addr =  await signer.getAddress()

    await contract.once('NumberGuessed', async (address, guessed, number, random)=>{
        console.log("My address-> " + address)
        console.log("Event address-> "+ addr)
        console.log("Guessed-> "+ guessed)

        toast.dismiss()

        let alert = {};
        if((address === addr) && guessed){
            alert = {
                icon:'success',
                title:'Number guessed',
                text:'You can withdraw your funds!',
            }
        }else{
            alert = {
                icon:'error',
                title:'Not guessed!',
                html:`You bet to: <strong>${number}</strong> <br/>The winning number was: <strong>${random}</strong> <br/> Good luck in your next intent`,
            }
        }
        executeAlert(alert)
        action(false)
    })
}

const executeAlert = (options) => {
    Swal.fire({
        ...options,
        showCloseButton:true,
        showConfirmButton:false,
    })
}