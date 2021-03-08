import React from 'react'
import './Label.scss';

const Label = (props) => {
  const { children, required=false } = props;
  return (
    <label className="label-text" {...props}>
      {children}
      {required && <span className="asterik">*</span>}
    </label>
  )
}

export default Label
