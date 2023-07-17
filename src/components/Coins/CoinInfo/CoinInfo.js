import React, { useState } from 'react'
import './coininfostyle.css';

const CoinInfo = ({ heading, desc }) => {
    const shortDesc = desc.slice(0, 350) + "<p style='color:var(--grey)'> Read More...</p>";
    const longDesc = desc + "<p style='color:var(--grey)'> Read Less...</p>";
    const [flag, setFlag] = useState(false);

    return (
        <div className='grey-wrapper coininfo'>
            <h2 className='coin-info-heading'>{heading}</h2>
            {
                desc.length > 350 ? (
                    <p className='coin-info-desc' onClick={() => setFlag(!flag)} dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }} />
                ) : (
                    <p dangerouslySetInnerHTML={{__html: desc}}/>
                )
            }
        </div>
    )
}

export default CoinInfo