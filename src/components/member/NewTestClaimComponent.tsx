import React from "react";
import DialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import Container from '@material-ui/core/Container';
import {TopSection} from './NewTestClaim/TopSection'
import {NewTestClaim} from './NewTestClaim/NewTestClaim';


interface NewTestClaim5Props {
  isOpen: boolean;
  onClose: () => void;
  panelName: string;
  title?: string;
  classes?: any;
}

interface NewTestClaim5State {
  isTestClaimDialogOpen:boolean;
}

class NewTestClaimComponent extends React.Component<
NewTestClaim5Props,
NewTestClaim5State
> {
  state = {
    isTestClaimDialogOpen:this.props.isOpen,
  };

  handleNewTestClaimEditDialogAction = (action: string) => {
    this.setState({ isTestClaimDialogOpen: false });
    this.props.onClose();
  };

  handleNewTestClaimEditDialogClose = () => {
    console.log("dialog close ");
    this.setState({ isTestClaimDialogOpen: false });
    this.props.onClose();
  };

  render() {
    const { isTestClaimDialogOpen} = this.state;
    return (
      <React.Fragment>
        <DialogPopup
          positiveActionText="Edit"
          negativeActionText="Cancel"
          title="New Test Claim"
          handleClose={this.handleNewTestClaimEditDialogClose}
          handleAction={this.handleNewTestClaimEditDialogAction}
          open={isTestClaimDialogOpen}
          showActions={false}
          className="new-test-claim-popup-root"
          componentTitle = {true}
        >

          <Container className="new-test-claim-components-container scroll-bar">
       
            <TopSection/>
            <NewTestClaim/>
          </Container>
        </DialogPopup>
      </React.Fragment>
    );
  }
}

export default NewTestClaimComponent;
