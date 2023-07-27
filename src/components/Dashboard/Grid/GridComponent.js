import React, { useState } from 'react'
import './gridstyle.css';
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { NavLink } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import DeleteIcon from '@mui/icons-material/Delete';

const GridComponent = ({ coin, addToWatchList,isCheck}) => {

    const [Color,setColor] = useState({color:"(--white)"})

    return (
        <div className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`} >
            <div className='first-container'>
                <NavLink to={`/coin/${coin.id}`}>
                    <div className='info-flex'>
                        <img src={coin.image} alt={coin.name} className='coin-logo' />

                        <div className='name-col'>
                            <p className='coin-symbol'>{coin.symbol}</p>
                            <p className='coin-name'>{coin.name}</p>
                        </div>

                    </div>
                </NavLink>
                <div className='watchlist-container' onClick={() => addToWatchList(coin)}>
                    {
                        isCheck ?<StarRoundedIcon onClick={() => setColor({color:"#9176FF"})} style={Color}/>: <DeleteIcon style={{color:"red"}} />
                    }
                </div>
            </div>
            <NavLink to={`/coin/${coin.id}`}>
                {coin.price_change_percentage_24h > 0 ? (
                    <div className='chip-flex'>
                        <div className='price-chip'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                        <div className='icon-chip'> <TrendingUpRoundedIcon /> </div>
                    </div>
                ) : (
                    <div className='chip-flex'>
                        <div className='price-chip chip-red'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                        <div className='icon-chip chip-red'> <TrendingDownRoundedIcon /> </div>
                    </div>
                )}
                <div className='info-container'>
                    <h3 className='coin-price' style={{ color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)" }}>${coin.current_price.toLocaleString()}</h3>
                    <p className='total_volume'>Total Volume : {coin.total_volume.toLocaleString()}</p>
                    <p className='total_volume'>Market Cap : ${coin.market_cap.toLocaleString()}</p>
                </div>
            </NavLink>
        </div>
    )
}

export default GridComponent