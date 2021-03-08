import { Tooltip } from '@material-ui/core';
import React, { useState } from 'react';



const OnHover = (props) => {
    return (
        <>
            <div className="pharmacy">{props.pharmacy}</div>
            <div className="address">{props.address.split('.')[0]}</div>
            <div className="phone">{props.phone}</div>
            {props.time && <div className="time">{props.time !== 'Closed' ? `Open until ${props.time.split('-')[1].replace('EST', '')}` : 'CLOSED'}</div>}
        </>
    )
}

const MyGreatPlace = (props) => {
    const [isSelected, setSelected] = useState(false)
    return (
        <Tooltip placement="top" title={OnHover(props.data)} classes={{ tooltip: 'map-tooltip', arrow: 'map-tooltip-arrow' }}>
            <div className="demo" onClick={() => { setSelected(!isSelected) }}>
                {props.isPreffered ? isSelected ? (<svg width="35" height="46" viewBox="0 0 35 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.4772 45.0719C2.42309 26.1473 0 24.2051 0 17.25C0 7.72306 7.72306 0 17.25 0C26.7769 0 34.5 7.72306 34.5 17.25C34.5 24.2051 32.0769 26.1473 19.0228 45.0719C18.1661 46.3094 16.3338 46.3093 15.4772 45.0719ZM17.25 24.4375C21.2196 24.4375 24.4375 21.2196 24.4375 17.25C24.4375 13.2804 21.2196 10.0625 17.25 10.0625C13.2804 10.0625 10.0625 13.2804 10.0625 17.25C10.0625 21.2196 13.2804 24.4375 17.25 24.4375Z" fill="#E5E5E5" />
                </svg>
                ) : (<svg width="35" height="46" viewBox="0 0 35 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.4772 45.0719C2.42309 26.1473 0 24.2051 0 17.25C0 7.72306 7.72306 0 17.25 0C26.7769 0 34.5 7.72306 34.5 17.25C34.5 24.2051 32.0769 26.1473 19.0228 45.0719C18.1661 46.3094 16.3338 46.3093 15.4772 45.0719ZM17.25 24.4375C21.2196 24.4375 24.4375 21.2196 24.4375 17.25C24.4375 13.2804 21.2196 10.0625 17.25 10.0625C13.2804 10.0625 10.0625 13.2804 10.0625 17.25C10.0625 21.2196 13.2804 24.4375 17.25 24.4375Z" fill="#2055B5" />
                </svg>
                    ) : (<svg width="35" height="46" viewBox="0 0 35 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.4772 45.0719C2.42309 26.1473 0 24.2051 0 17.25C0 7.72306 7.72306 0 17.25 0C26.7769 0 34.5 7.72306 34.5 17.25C34.5 24.2051 32.0769 26.1473 19.0228 45.0719C18.1661 46.3094 16.3338 46.3093 15.4772 45.0719ZM17.25 24.4375C21.2196 24.4375 24.4375 21.2196 24.4375 17.25C24.4375 13.2804 21.2196 10.0625 17.25 10.0625C13.2804 10.0625 10.0625 13.2804 10.0625 17.25C10.0625 21.2196 13.2804 24.4375 17.25 24.4375Z" fill="#E76262" />
                    </svg>)}
            </div>
        </Tooltip>

    );

}
export default MyGreatPlace;