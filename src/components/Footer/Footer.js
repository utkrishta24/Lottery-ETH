import React from 'react'
import { ADDRESS } from '../../config/ContractConfig'
import './Footer.css'

const Footer = () => {

    const links = [
        {title:'Contract', icon: 'github', url:'https://github.com/utkrishta24/'},
        {title:'FrontEnd', icon: 'github', url:'https://github.com/utkrishta24/'},
        {title:'Twitter', icon: 'twitter', url:'https://twitter.com/utkrishta24/'},
        {title:'Etherscan', icon: 'ethereum', url:`https://goerli.etherscan.io/address/${ADDRESS}`}
    ]

    return(
        <footer>
            {
                links.map(link=>
                    <a className='repo' href={link.url} target="_blank" rel="noreferrer">
                        <i className={`fab fa-${link.icon}`}/>
                        <p>{link.title}</p>
                    </a>
                )
            }
        </footer>
    )
}

export default Footer;