import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './pricetogglestyle.css';


export default function PriceToggle({priceToggle,handlePriceTypeChange}) {

  return (
    <div className='toggle-prices'>
    <ToggleButtonGroup
      value={priceToggle}
      exclusive
      onChange={handlePriceTypeChange}
      sx={{
        "& .Mui-selected": {
            color: "var(--blue) !important",
        },
        borderColor: "var(--blue)",
        border: "unset !important",
        "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid !important",
            borderColor: "unset",
            color: "var(--blue)",
        },
        "& .MuiToggleButton-standard": {
            color: "var(--blue)",
        },
      }}
    >
      <ToggleButton value="prices" className='toggle-btn'>Price</ToggleButton>
      <ToggleButton value="market_caps" className='toggle-btn'>Market Cap</ToggleButton>
      <ToggleButton value="total_volumes" className='toggle-btn'>Total Valume</ToggleButton>
    </ToggleButtonGroup>
    </div>
  );
}