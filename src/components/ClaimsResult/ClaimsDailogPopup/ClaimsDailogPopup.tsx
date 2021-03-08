import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Theme, withStyles } from "@material-ui/core/styles";
import CustomSelect from "../../shared/Frx-components/dropdown/DropDown";
import React from "react";
import "./ClaimsDailogPopup.scss";

const styles = (theme: Theme) => ({
  root: {
    //minWidth: "640px" //  @mk
    height: "100%",
    width: "100%",
  },
});

interface DialogPopupProps {
  open: boolean;
  children: React.ReactNode;
  positiveActionText: string;
  negativeActionText?: string;
  title?: string;
  showActions: boolean;
  showCloseIcon?: boolean;
  className?: string;
  height?: any;
  width?: any;
  // classes: Partial<Record<DialogClassKey, string>>;

  handleClose: () => void;
  handleAction: (action: string) => void;
}

class ClaimsDialogPopup extends React.Component<DialogPopupProps> {
  render() {
    const {
      open,
      title,
      children,
      handleClose,
      handleAction,
      positiveActionText,
      negativeActionText,
      showActions,
      height,
      width,
      showCloseIcon,
    } = this.props;
    return (
      <Dialog
        fullScreen
        disableEnforceFocus
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        // maxWidth="xl"
        // className={this.props.className ? this.props.className : "dialog-popup"}
        className="dialog-popup"
        // style={{ minWidth: "1000px", minHeight: "600px" }}
        // style={{ minWidth: "95%", minHeight: "600px" }}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="frx-dialog-root__heading"
        >
          {title}
          {!showActions ? (
            <span
              className="frx-dialog-root__close-icon"
              onClick={(e) => handleClose()}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99418 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600272 0.000414325C0.460452 0.00581497 0.32782 0.0637771 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.3529 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99418 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z"
                  fill="#666666"
                />
              </svg>
            </span>
          ) : (
            ""
          )}
          {showCloseIcon ? (
            <span
              className="frx-dialog-root__close-icon"
              onClick={(e) => handleClose()}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99418 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600272 0.000414325C0.460452 0.00581497 0.32782 0.0637771 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.3529 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99418 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z"
                  fill="#666666"
                />
              </svg>
            </span>
          ) : (
            ""
          )}
        </DialogTitle>
        <DialogContent className="scroll-bar">{children}</DialogContent>
        {showActions ? (
          <DialogActions className="frx-dialog-root__btn-actions">
            <Button
              className="frx-dialog-root__save-btn"
              onClick={(e) => handleAction("positive")}
              autoFocus
            >
              {positiveActionText}
            </Button>
          </DialogActions>
        ) : (
          ""
        )}
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ClaimsDialogPopup);
