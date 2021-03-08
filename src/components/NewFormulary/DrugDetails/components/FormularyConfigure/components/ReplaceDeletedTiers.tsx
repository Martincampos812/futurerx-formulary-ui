import React from 'react';
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";

const ReplaceDeletedTiers = (props:any) => {
    let htmlElement = null;
    if(props.data.length > 0){
        htmlElement = props.data.map((e,index) => (
            <div className="gridRow">
                <div className="dropdown-col">
                    <DropDown
                    className="tier-description-dropdown"
                    placeholder="Select"
                    options={props.options}
                    value={props.options.indexOf(e.tier_name) !== -1 ? e.tier_name : ''}
                    onSelect={(event) => props.updateTierOption(event,e.id_tier_label)}
                    />
                </div>
                <div className="tiername-col">{props.tierNames[index]}</div>
                <div className="tierdesc-col">{e.tier_label}</div>
            </div>
        ))
    }
    return (
        <>
            <div className="gridRow header">
                <div className="dropdown-col">Tier Reassignment</div>
                <div className="tiername-col">Tier Number</div>
                <div className="tierdesc-col">Tier Description</div>
            </div>
            {htmlElement}
        </>
    );
}

export default ReplaceDeletedTiers;