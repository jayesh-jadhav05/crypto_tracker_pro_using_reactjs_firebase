import React from 'react'
import './liststyle.css';
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
// Tooltips display informative text when users hover over, focus on, or tap an element.
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumbes';
import { NavLink } from 'react-router-dom';

const ListComponent = ({ coin}) => {
    return (
        <NavLink to={`/coin/${coin.id}`} >
        <tr className='list-row'>
               <Tooltip title="Coin">
                    <td className='td-image'>
                        <img src={coin.image} alt={coin.name} className='coin-logo' />
                        <div className='list-name-cols'>
                            <p className='td-coin-symbol'>{coin.symbol}</p>
                            <p className='td-coin-name'>{coin.name}</p>
                        </div>
                    </td>  
                </Tooltip>
                {coin.price_change_percentage_24h > 0 ? (
                    <td className='list-cheap price-icon-td'>
                        <Tooltip title="Price Increase"><div className='td-price-chip'>{coin.price_change_percentage_24h.toFixed(2)}%</div></Tooltip>
                        <div className='td-icon'> <TrendingUpRoundedIcon /> </div>
                    </td>
                ) : (
                    <td className='list-cheap price-icon-td'>
                        <Tooltip title="Price Decrease"><div className='td-price-chip chip-red'>{coin.price_change_percentage_24h.toFixed(2)}%</div></Tooltip>
                        <div className='chip-red td-icon'> <TrendingDownRoundedIcon /> </div>
                    </td>
                )}
                
                <Tooltip title="Current Price"><td className='desktop-td-mkt'><h3 className='text-right-align td-h3' style={{ color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)" }}>${coin.current_price.toLocaleString()}</h3></td></Tooltip>
                <Tooltip title="Current Price"><td className='mobile-td-mkt'><h3 className='text-right-align td-h3' style={{ color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)" }}>${convertNumber(coin.current_price)}</h3></td></Tooltip>
                <Tooltip title="Total Volume"><td className='desktop-td-mkt'><p className='text-right-align common-p'>{coin.total_volume.toLocaleString()}</p></td></Tooltip>
                <Tooltip title="Total Volume"><td className='mobile-td-mkt'><p className='text-right-align common-p'>{convertNumber(coin.total_volume)}</p></td></Tooltip>
                <Tooltip title="Market Cap"><td className='desktop-td-mkt'><p className='text-right-align common-p'>${coin.market_cap.toLocaleString()}</p></td></Tooltip>
                <Tooltip title="Market Cap"><td className='mobile-td-mkt'><p className='text-right-align common-p'>${convertNumber(coin.market_cap)}</p></td></Tooltip>
                </tr> 
                </NavLink>
    )
}

export default ListComponent;