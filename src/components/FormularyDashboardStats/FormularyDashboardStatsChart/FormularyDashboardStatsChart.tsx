import React from 'react';

import { getStatsChart } from './../../../mocks/formulary/dashboardStats';

import './FormularyDashboardStatsChart.scss';

const FormularyDashboardStatsChart = (props) => {
  const stats = getStatsChart()
  return (
  <div className="circle-charts-container">
    <div className="circle-charts-container__content">
      <svg className="circle-chart-1" viewBox="0 0 40 40" width="195" height="195" xmlns="http://www.w3.org/2000/svg">
        <circle className="circle-chart__background" stroke="#efefef" stroke-width="3" fill="none" cx="20" cy="20" r="18"></circle>
        <circle className="circle-chart__circle" stroke="#F4AF64" stroke-width="3" stroke-dasharray={`${stats.value1},100`} stroke-linecap="round" fill="none" cx="20" cy="20" r="18"></circle>
      </svg>

      <svg className="circle-chart-2" viewBox="0 0 40 40" width="159" height="159" xmlns="http://www.w3.org/2000/svg">
        <circle className="circle-chart__background" stroke="#efefef" stroke-width="3.4" fill="none" cx="20" cy="20" r="18"></circle>
        <circle className="circle-chart__circle" stroke="#9498A2" stroke-width="3.4" stroke-dasharray={`${stats.value2},100`} stroke-linecap="round" fill="none" cx="20" cy="20" r="18"></circle>
      </svg>

      <svg className="circle-chart-3" viewBox="0 0 40 40" width="126.61" height="126.61" xmlns="http://www.w3.org/2000/svg">
        <circle className="circle-chart__background" stroke="#efefef" stroke-width="3.8" fill="none" cx="20" cy="20" r="18"></circle>
        <circle className="circle-chart__circle" stroke="#FAACAC" stroke-width="3.8" stroke-dasharray={`${stats.value3},100`} stroke-linecap="round" fill="none" cx="20" cy="20" r="18"></circle>
      </svg>

      <svg className="circle-chart-4" viewBox="0 0 40 40" width="98" height="98" xmlns="http://www.w3.org/2000/svg">
        <circle className="circle-chart__background" stroke="#efefef" stroke-width="4.2" fill="none" cx="20" cy="20" r="18"></circle>
        <circle className="circle-chart__circle" stroke="#684999" stroke-width="4.2" stroke-dasharray={`${stats.value4},100`} stroke-linecap="round" fill="none" cx="20" cy="20" r="18"></circle>
      </svg>
      
      <div className="chart-data">
        <div className="chart-data__container">  
          <div className="chart-data__value">{!(isNaN(props.total))?props.total:stats.average}</div>
          {props.isValidation && <div className="chart-data__label">Validations</div>}
        </div>
      </div>
    </div>
  </div>
  )
}

export default FormularyDashboardStatsChart
