import React from 'react'
import './FrxStatusField.scss';

const FrxStatusField = (props) => {
  const {text = "", variant = "1", fill = "fill", type = "block"} = props;
  
  return (
    <div className={`status-field-${type}`}>
      <div className={`status-field-${type}__container status-field-${type}__variant-${variant}--${fill}`}>  
        <div className={`status-field-${type}__text`}>{text}</div>
      </div>
    </div>
  )
}

export default FrxStatusField
