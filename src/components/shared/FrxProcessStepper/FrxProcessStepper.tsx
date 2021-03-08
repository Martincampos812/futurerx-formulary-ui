import React from 'react'
import './FrxProcessStepper.scss';

const STATUS = {
  COMPLETED: "completed",
  PROCESSING: "processing",
  PENDING: "pending",
}

const data = [
  {
    step: "1",
    label: "Work In Progress",
    status: STATUS.COMPLETED
  },
  {
    step: "2",
    label: "Review",
    status: STATUS.PROCESSING
  },
  {
    step: "3",
    label: "Approved",
    status: STATUS.PENDING
  },
  {
    step: "4",
    label: "In production",
    status: STATUS.PENDING
  },
]

const getProcessingStep = () => {
  const stepIndex = data.map(x=>x.status).indexOf(STATUS.PROCESSING);
  return stepIndex !== -1 ? stepIndex : data.length + 10; 
}

const FrxProcessStepper = () => {
  return (
    <div className="steps-container">
      { 
        data.map(({step, label, status}, key)=>(
          <div className="process-step" key={key}>
            <div className={`process-step__count process-step__count--${status}`}>
              {step}
              {data.length - 1 !== key && <div className={`process-bar process-bar--${key < getProcessingStep() ? STATUS.COMPLETED : STATUS.PENDING}`} /> }
            </div>
            <div className={`process-step__label process-step__label--${getProcessingStep() === key ? STATUS.PROCESSING : 'idle'}`}>{label}</div>
          </div> 
        ))
      }
    </div>
  )
}

export default FrxProcessStepper
