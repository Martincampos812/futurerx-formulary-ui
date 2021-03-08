import React from "react";
import { Route, Switch } from "react-router-dom";
import Static from "../components/static/Static";
import NavBar from "../../src/components/navigation-bar/NavBar";
import MarketingMaterial from "../components/SetupFormularyGrid/MarketingMaterial";
import FormularyRoot from "../components/NewFormulary/FormularyRoot";
import EntityOwnershipContainer from "../components/NewFormulary/EntityOwnership/EntityOwnershipContainer";
import MassMaintenanceRoot from "../components/NewFormulary/MassMaintenance/MassMaintenanceRoot/MassMaintenanceRoot";

class MainRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <NavBar /> */}
        <Switch>
          <Route
            exact
            path={["/", "/formulary", "/formulary/mass-maintenance", "/formulary/alternatives"]}
            render={(props) => <FormularyRoot {...props} />}
          />
          {/* <Route
            exact
            path={["/", "/formulary", "/formulary/list/:id"]}
            render={props => <FormularyRoot {...props} />}
          /> */}
          <Route exact path="/static" render={props => <Static {...props} />} />
          <Route
            exact
            path="/entityownership"
            render={props => <EntityOwnershipContainer {...props} />}
          />
          <Route
            exact
            path={["/formulary/marketing", "/formulary/marketing/:name"]}
            render={props => <MarketingMaterial {...props} />}
          ></Route>

          <Route
            exact
            path={["/formulary/maintenance", "/formulary/maintenance/:name/:id"]}
            render={props => <MassMaintenanceRoot {...props} />}
          ></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default MainRouter;
