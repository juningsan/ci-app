/**
 * Created by linwai on 2017/11/24.
 */
import React from 'react';
import './card.css';
import Cardlist from '../cardlist.js';
const Card = ({index})=>{
    return(
        <div className="container">
            <div className="inner">
                {Cardlist[index]}
            </div>
        </div>
    )
}
export default Card;