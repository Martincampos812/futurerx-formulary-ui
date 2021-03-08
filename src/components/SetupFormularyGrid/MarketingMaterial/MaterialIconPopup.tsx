import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Input, InputAdornment} from "@material-ui/core";
import { Theme, withStyles } from "@material-ui/core/styles";
import CustomSelect from "../../shared/Frx-components/dropdown/DropDown";
import "../../ClaimsResult/ClaimsDailogPopup/ClaimsDailogPopup.scss";
import './MaterialIconList.scss';

const styles = (theme: Theme) => ({
    root: {
      height: "50%",
      width: "50%",
    },
  });
  
  interface DialogPopupProps {
    open: boolean;
    children: React.ReactNode;
    positiveActionText: string;
    ulpoadIconBtnText: string;
    negativeActionText?: string;
    title?: string;
    showActions: boolean;
    showCloseIcon?: boolean;
    className?: string;
    height?: any;
    width?: any;
    communicationPopupHeader?: boolean;
  
    handleClose: () => void;
    handleAction: (action: string) => void;
  }

  class MaterialIconPopup extends React.Component<DialogPopupProps> {
    render() {
      const {
        open,
        title,
        communicationPopupHeader,
        children,
        handleClose,
        handleAction,
        positiveActionText,
        ulpoadIconBtnText,
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
          className="material-icon-popup"
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            className="frx-dialog-root__heading"
          >
            <div className="popup-header-wrapper">
              <div className="title-search-bar">
                  {title}
                  {communicationPopupHeader ? (
                  <Input
                    className="search-input"
                    placeholder="First Name"
                    type="text"
                    disableUnderline={true}
                    startAdornment={
                      <svg
                        className="member-search__icon"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                          fill="#999999"
                        />
                      </svg> 
                    }
                  />
                  ) : (
                    ""
                  )}
              </div>
              <div className="popup-header-btn">
              {communicationPopupHeader ? (
                <span>
                  <Button className="popup-btn file-btn">Upload File</Button>
                  <Button className="popup-btn communication-btn">+ Add Communication</Button>
                </span>
                
                ) : (
                  ""
                )}
                {!showActions ? (
                  <span
                    className="frx-dialog-root__close-icon close-icon-material-popup"
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
            </div>
            </div>
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
              <Button
                className="frx-dialog-root__save-btn"
                onClick={(e) => handleAction("positive")}
                autoFocus
              >
                {ulpoadIconBtnText}
              </Button>
            </DialogActions>
          ) : (
            ""
          )}
        </Dialog>
      );
    }
  }
  
  export default withStyles(styles, { withTheme: true })(MaterialIconPopup);