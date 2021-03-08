import React from 'react';
import Paper from '@material-ui/core/Paper';
import FormularyDashboardStatsCard from './FormularyDashboardStatsCard/FormularyDashboardStatsCard';
import FormularyDashboardStatsChart from './FormularyDashboardStatsChart/FormularyDashboardStatsChart';

import './FormularyDashboardStats.scss';

const FormularyDashboardStats = (props) => {
  const isValidation = props.isValidation !== undefined ? props.isValidation : undefined;
  return (
    <div className="formulary-dashboard-stats-outer-container">
      <Paper elevation={0}>
        <div className="title">FORMULARY DASHBOARD</div>
        <div className="inner-container">
          <FormularyDashboardStatsChart />
          
          <div className="stats-card-container">  
            <FormularyDashboardStatsCard title="MEDICARE" variant="1"/>
            <FormularyDashboardStatsCard title="MEDICAID" variant="2"/>
            <FormularyDashboardStatsCard title="COMMERCIAL" variant="3"/>
            <FormularyDashboardStatsCard title="EXCHANGE" variant="4"/>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default FormularyDashboardStats
