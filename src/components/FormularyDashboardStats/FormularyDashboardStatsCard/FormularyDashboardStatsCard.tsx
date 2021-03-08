import React from 'react';
import { getStats } from '../../../mocks/formulary/dashboardStats';

import './FormularyDashboardStatsCard.scss';

const FormularyDashboardStatsCard = (props) => {
  const { variant = 1, title } = props;
  
  
  return (
    <div className={`formulary-dashboard-stats-card formulary-dashboard-stats-card--variant-${variant}`}>
      <div className="formulary-dashboard-stats-card__body">
        {
          getStats().map(({label, value}, key)=> (            
            <div className="stat-data">
                <div className="stat-data__label">{label}</div>
                <div className="stat-data__value">{value}</div>
            </div>
          ))
        }
      </div>
      <div className="formulary-dashboard-stats-card__footer">{title}</div>
    </div>
  )
}

export default FormularyDashboardStatsCard
