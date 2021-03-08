import React, { Fragment } from "react";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import { setFullFormulary, setLocationHome } from "./../application/applicationSlice";

export class MessagingView extends React.Component<any, any> {
  state = {
    showMsg: false,
    vertical: "top",
    horizontal: "center",
    UUID: this.props?.uniqueID,
  };

  handleClose = () => {};

  componentDidMount() {
    console.log("MSG -M ======================== "+this.props.uniqueID + " - " + this.props.mode );
  
  }


  componentDidUpdate() {
    console.log("MSG ======================== "+this.props.uniqueID + " - " +this.props.mode );
  
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    console.log("###### - - - - - - - - - ");
    console.log(newProps);
  }


  render() {
    return (
        <h4>MESSAGING.......................</h4>
        // <Snackbar
        //   anchorOrigin={{ vertical: "top", horizontal: "right" }}
        //   open={this.state.showMsg}
        //   onClose={this.handleClose}
        //   message="I love snacks"
        //   key={this.state.vertical + this.state.horizontal}
        // />
    );
  }
}


const mapStateToProps = state => {
  return {
    mode: state?.setup?.mode,
    currentFormulary: state.setup.formulary,
    formularyVersionList: state.header.formulary_version_list,
    formularyLobId: state?.application?.formulary_lob_id,
    uniqueID: state?.messaging?.uuid
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setLocationHome: a => dispatch(setLocationHome(a))
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagingView);
