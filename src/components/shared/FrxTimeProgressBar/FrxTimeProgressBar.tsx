import React from 'react'
import './FrxTimeProgressBar.scss';

const FrxTimeProgressBar = (props) => {
  const {text, progress = 0} = props;
  
  const getProgressStatus = () => {
    switch (true) {
      case progress <= 25:
          return 25
        break;
      case progress <= 50:
        return 50
      break;
      case progress <= 75:
        return 75
      break;
      case progress <= 100:
        return 100
      break;
      default:
        break;
    }
  }
  return (
    <div className="time-process">
      <div className="time-process__container">
        <div className="time-process__text">{text}</div>
        <div className={`time-process__progress time-process__progress--${getProgressStatus()}`} style={{width: `${progress+1}%`}}></div>
      </div>
    </div>
  )
}

export default FrxTimeProgressBar
