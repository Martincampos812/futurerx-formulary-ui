import React, {Component} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {Grid} from "@material-ui/core";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import {IconButton} from "@material-ui/core";
import "./BreadCrumPanel.scss";

interface Props {
  checked: boolean;
  //   arrowIconState: boolean;
  //   onHandleIcons: () => void;
  //   onHandleCheckBoxState: () => void;
  label: string;
  value: string | number;
  id?: string;
  // onChange?: (e, id, checked) => any;
  item?: any;
  children?: any;
  collaps?: any;
  isDefault: any;
  updateDefault: () => any;
  isCollalpseTointitialState: () => any;
  //   conen
}
interface State {}

class BreadCrumPanel extends Component<Props, State> {
  state = {
    arrowIconState: false,
    checked: false,
    // this.props.checked,
  };

  onHandleIcons = () => {
    if (this.props.collaps) {
      this.props.isCollalpseTointitialState();
    } else {
      this.setState({
        arrowIconState: !this.state.arrowIconState,
        checked: !this.state.checked,
      });
    }
    // this.setState({arrowIconState: !this.state.arrowIconState});
  };

  onHandleCheckBoxState = () => {
    this.setState({checked: !this.state.checked});
  };

  // componentDidMount() {
  //   this.props.collaps
  //     ? this.setState({checked: !this.props.collaps})
  //     : console.log("[comdidmount]:", this.props.collaps);
  // }
  // componentDidUpdate() {
  //   this.props.collaps
  //     ? this.setState({checked: !this.props.collaps})
  //     : console.log("[comdidmount]:", this.props.collaps);

  //   console.log("[update phase]:");
  // }

  render() {
    // const temp = this.state.arrowIconState && this.props.collaps;
    // ? this.props.collaps
    // : this.state.arrowIconState;

    // console.log("[temp:" + temp);
    const showChild = this.props.collaps
      ? !this.props.collaps
      : this.state.arrowIconState || this.state.checked;

    console.log("[showChild]: ", showChild);

    return (
      <div className="BreadCrumPanel" id={this.props.id ? this.props.id : ""}>
        <Grid
          container
          alignItems="center"
          className="breadCrumPanel-grid-container"
        >
          <Grid item className="breadCrumPanel-grid-item-arrowIcon">
            <span className="arrow-icon-container">
              <IconButton onClick={this.onHandleIcons} className="arrow-icon">
                {showChild ? (
                  // this.state.arrowIconState
                  // temp
                  <svg
                    className="arrow-icon"
                    onClick={this.onHandleIcons}
                    style={{cursor: "pointer"}}
                    width="10"
                    height="5"
                    viewBox="0 0 10 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.40104 0.333374H8.70308C9.20824 0.333374 9.46082 0.854386 9.10324 1.15972L5.45363 4.27853C5.23227 4.46754 4.87185 4.46754 4.65049 4.27853L1.00089 1.15972C0.643307 0.854386 0.895884 0.333374 1.40104 0.333374Z"
                      fill="#707683"
                    />
                  </svg>
                ) : (
                  <svg
                    className="arrow-icon"
                    style={{cursor: "pointer"}}
                    onClick={this.onHandleIcons}
                    width="5"
                    height="10"
                    viewBox="0 0 5 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.333344 8.59902L0.333344 1.29698C0.333344 0.791821 0.854356 0.539244 1.15969 0.896825L4.27849 4.54643C4.46751 4.76779 4.46751 5.12821 4.27849 5.34957L1.15969 8.99917C0.854356 9.35675 0.333344 9.10418 0.333344 8.59902Z"
                      fill="#707683"
                    />
                  </svg>
                )}
              </IconButton>
            </span>
          </Grid>
          <Grid item className="breadCrumPanel-grid-item-checkbox">
            <Checkbox
              color="primary"
              className="checkbox"
              checked={
                this.state.checked
                // this.state.arrowIconState
                // this.props.checked
                // ? this.props.checked : this.state.checked
              }
              // onChange={(e) =>
              //   this.props.onChange(e, this.props.item, this.props.checked)
              // }
              onChange={
                // this.onHandleIcons
                this.onHandleCheckBoxState
              }
              size="small"

              //   inputProps={{"aria-label": "primary checkbox"}}
            />
          </Grid>
          <Grid item className="breadCrumPanel-grid-label-starIcon-container">
            <div className="label-starIcon-container">
              <label className="label">{this.props.label}:</label>
              <span className="value">{this.props.value}</span>
              <span className="star-icon-container">
                <IconButton onClick={this.props.updateDefault}>
                  {this.props.isDefault ? (
                    <svg
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.07735 0.417241L4.54689 3.52037L1.12267 4.01958C0.508605 4.10865 0.262511 4.86568 0.707824 5.29927L3.18517 7.71333L2.59923 11.1235C2.49376 11.7399 3.14298 12.2016 3.68673 11.9133L6.75001 10.3032L9.81329 11.9133C10.357 12.1993 11.0063 11.7399 10.9008 11.1235L10.3149 7.71333L12.7922 5.29927C13.2375 4.86568 12.9914 4.10865 12.3774 4.01958L8.95314 3.52037L7.42267 0.417241C7.14845 -0.135885 6.35392 -0.142916 6.07735 0.417241Z"
                        fill="#C4C4C4"
                      />
                    </svg>
                  ) : (
                    <svg
                      // style={{backgroundColor: "#C4C4C4"}}
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="#C4C4C4"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3774 4.01952L8.95314 3.5203L7.42267 0.41718C7.14845 -0.135946 6.35392 -0.142977 6.07735 0.41718L4.54689 3.5203L1.12267 4.01952C0.508605 4.10859 0.262511 4.86562 0.707824 5.29921L3.18517 7.71327L2.59923 11.1234C2.49376 11.7398 3.14298 12.2016 3.68673 11.9133L6.75001 10.3031L9.81329 11.9133C10.357 12.1992 11.0063 11.7398 10.9008 11.1234L10.3149 7.71327L12.7922 5.29921C13.2375 4.86562 12.9914 4.10859 12.3774 4.01952ZM9.10782 7.31952L9.66329 10.5633L6.75001 9.03281L3.83673 10.5633L4.3922 7.31952L2.03439 5.02265L5.2922 4.54921L6.75001 1.59609L8.20782 4.54921L11.4656 5.02265L9.10782 7.31952Z"
                        fill="#C4C4C4"
                      />
                    </svg>
                  )}
                </IconButton>
              </span>
            </div>
          </Grid>
        </Grid>
        {/* <div> */}
        {showChild
          ? // temp
            this.props.children
          : null}
        {/* </div> */}
        {/* <div className="hirarchy">{content}</div> */}
      </div>
    );
  }
}

export default BreadCrumPanel;
