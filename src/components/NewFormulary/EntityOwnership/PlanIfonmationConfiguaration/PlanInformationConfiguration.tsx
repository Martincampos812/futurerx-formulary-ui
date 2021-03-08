import React, {Component} from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Input,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import "./PlanInformationConfiguration.scss";

interface Props {
  planConfigObject: any;
  onSave: () => any;
}
interface State {}

class PlanInformationConfiguration extends Component<Props, State> {
  state = {
    planConfigObject: {
      planInfoConfigName: "",
      planName: "",
      phonNumber: "",
      ttyValue: "",
      website: "",
      operationinfo: "",
    },
  };

  handleInputChange(e) {
    console.log(e.target.name);
    this.setState({
      planConfigObject: {
        ...this.state.planConfigObject,
        [e.target.name]: e.target.value,
      },
    });
  }

  componentDidMount = () => {
    this.setState({planConfigObject: this.props.planConfigObject});
  };

  render() {
    const {planConfigObject} = this.state;
    return (
      <div className="PlanInformationConfiguration">
        <Card className="planInformationConfiguration-card">
          <CardHeader
            className="planInformationConfiguration-card-header"
            title="PLAN INFORMATION CONFIGURATION"
          >
            {/* FORMULARY WITH ADJUDICATION */}
          </CardHeader>
          <CardContent className="planInformationConfiguration-card-container">
            <div className="lable-input-container">
              <Grid container className="grid-container">
                <Grid
                  item
                  container
                  sm={6}
                  className="grid-item-container grid-collumn-1"
                >
                  <Grid item className="grid-items">
                    <div className="label-div">
                      Plan Information Configuration Name
                    </div>
                    <div className="input-div">
                      <Input
                        className="input-element"
                        //   placeholder="First Name"
                        type="text"
                        disableUnderline={true}
                        // variant="outlined"
                        name="planInfoConfigName"
                        value={planConfigObject.planInfoConfigName}
                        onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                  <Grid item className="grid-items">
                    <div className="label-div">Plan Name</div>
                    <div className="input-div">
                      <Input
                        className="input-element"
                        //   placeholder="First Name"
                        type="text"
                        disableUnderline={true}
                        // variant="outlined"
                        name="planName"
                        value={planConfigObject.planName}
                        onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                  <Grid item className="grid-items">
                    <div className="label-div">Phone Number</div>
                    <div className="input-div">
                      <Input
                        className="input-element"
                        //   placeholder="First Name"
                        type="text"
                        disableUnderline={true}
                        // variant="outlined"
                        name="phonNumber"
                        value={planConfigObject.phonNumber}
                        onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                  <Grid item className="grid-items">
                    <div className="label-div">TTY</div>
                    <div className="input-div">
                      <Input
                        className="input-element"
                        //   placeholder="First Name"
                        type="text"
                        disableUnderline={true}
                        // variant="outlined"
                        name="ttyValue"
                        value={planConfigObject.ttyValue}
                        onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sm={6}
                  className=" grid-item-container grid-collumn-2"
                >
                  <Grid item className="grid-items">
                    <div className="label-div">Website</div>
                    <div className="input-div">
                      <Input
                        className="input-element"
                        //   placeholder="First Name"
                        type="text"
                        disableUnderline={true}
                        // variant="outlined"
                        name="website"
                        value={planConfigObject.website}
                        onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                  <Grid item className="grid-items">
                    <div className="label-div">Days/Hours of Operation</div>
                    <div className="input-div">
                      <Input
                        className="input-element input-multiline"
                        //   placeholder="First Name"
                        type="text"
                        multiline
                        rows={10}
                        disableUnderline={true}
                        // variant="outlined"
                        name="operationinfo"
                        value={planConfigObject.operationinfo}
                        onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <div className="btn-group">
            {/* <Button className="btn btn-cancel">Cancel</Button> */}
            <Button className="btn btn-save" onClick={this.props.onSave}>
              Save
            </Button>
            {/* <Link to={"/planinformation"} className="btn btn-save">
              Save
            </Link> */}
          </div>
        </Card>
      </div>
    );
  }
}

export default PlanInformationConfiguration;
