import React from 'react'
import './Categories.css'

const Categories = ({selectCategorie, categorieSelected}) => {

    const categories = [
        {title: "Bronze", multiplier:"(0-9) / 7", value: 0},
        {title: "Emerald", multiplier:"(0-49) / 35", value: 1},
        {title: "Diamond", multiplier:"(0-99) / 70", value: 2},
    ]

    return(
        <article className='categories'>
            {
                categories.map(cat=>
                    <div onClick={()=>selectCategorie(cat.value)} key={cat.value}
                    className={`categorie ${(categorieSelected === cat.value) && 'selected'}`}>
                        <p className='categorie__title'>{cat.title}</p>
                        <p className='categorie__mutliplier'>{cat.multiplier}x</p>
                    </div>
                )
            }
        </article>
    )
}

export default Categories;