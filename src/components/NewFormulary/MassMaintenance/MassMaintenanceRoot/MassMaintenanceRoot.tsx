import * as React from "react";
import { Component } from "react";
import MassMaintenance from "../MassMaintenance";
import { getFormularyDetails } from "../../../../mocks/formulary/formularyDetails";

import "./MassMaintenance.scss";
import { RouteComponentProps } from "react-router-dom";
import {createBrowserHistory} from 'history';

const browserHistory = createBrowserHistory();

export interface MassMaintenanceRootProps extends RouteComponentProps<any> {}

export interface MassMaintenanceRootState {}

class MassMaintenanceRoot extends React.Component<
  MassMaintenanceRootProps,
  MassMaintenanceRootState
> {
  onBreadcrumbClick = () => {
    this.props.history.push("/")
    // this.props.history.push(`/formulary/list/${1}`);
    // browserHistory.push(`/formulary/list/${1}`);
  };
  render() {
    return (
      <div className="mass-maintenance-root">
        <MassMaintenance
          data={getFormularyDetails()}
          onBreadcrumbClick={this.onBreadcrumbClick}
          //history={this.props.history}
          {...this.props}
        />
      </div>
    );
  }
}

export default MassMaintenanceRoot;
