import React from "react";
import ButtonPopover from '../buttonPopover';

export default function inputDropDown(props: any){
    return (
        <div className="input-dropdown">
            <input type="text" id="standard-basic" value={props.value} className="input-field" placeholder={props.placeholder} />
            <ButtonPopover resolved={props.resolved} click={props.click}/>
        </div>
    )
}