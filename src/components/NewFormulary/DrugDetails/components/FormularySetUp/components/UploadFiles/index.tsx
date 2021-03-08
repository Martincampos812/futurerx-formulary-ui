import React, { Component } from 'react'
import Button from '../../../../../../shared/Frx-components/button/Button';
import DialogPopup from '../../../../../../shared/FrxDialogPopup/FrxDialogPopup';
import Choice from './components/Choice';
import FileUpload from './components/fileUpload';
import './UploadFiles.scss';

export interface UploadFilesProps {
  
}

export interface UploadFilesState {
  modalStatus?: boolean;
  loadingFileType?: string;
  choiceType?: string;
  step?: number;
  showFileModal?: boolean;
}

const initialState = {
  step: 1,
  modalStatus: false,
  loadingFileType: "",
  choiceType: "",
  showFileModal: false
}

/**
 * Handling the state for all the step of upload files here in the UploadFiles component
 */

class UploadFiles extends Component<UploadFilesProps, UploadFilesState> {
  state = {
    step: 1,
    modalStatus: true,
    loadingFileType: "",
    choiceType: "",
    showFileModal: false
  }
  
  handleCloseModal = () => {
    this.setState({...JSON.parse(JSON.stringify({...initialState}))});
  }
  
  handleOpenModal = () => {
    this.setState({
      modalStatus: true
    })
  }
  
  handleChoice = (key, value) => {
    this.setState({
      [key] : value
    });
  }
  
  handleContinueAction = () => {
    const { step, loadingFileType } = this.state;
    if(step === 1) {
      if(loadingFileType) {
        this.setState({
          step: 2
        })
      }
    }else if(step === 2){
      this.setState({
        step: 3,
        modalStatus: false,
        showFileModal: true
      })
    }
    
    /**Todo: Handle the modal step logic here, When user clicks on continue for step 2, Set the step to 3 */
  }
  
  render() { 
    const { modalStatus, choiceType, loadingFileType, step, showFileModal } = this.state;
    return ( 
      <div>
        {/* <Button
            label="Upload Files"
            htmlFor="upload-file"
            className="upload-button"
            onClick={this.handleOpenModal}
        /> */}
        
        {
          modalStatus &&   
          <DialogPopup
              showCloseIcon={true}
              positiveActionText="Continue"
              negativeActionText="Cancel"
              title={"SELECT FILE FOR UPLOAD"}
              handleClose={this.handleCloseModal}
              handleAction={this.handleContinueAction}
              showActions={true}
              open={modalStatus}
              popupMaxWidth={"lg"}
              className="root-add-new-tag-popup"
            >
              {
                (step === 1 || step === 2 ) &&
                <Choice onChange={this.handleChoice} choiceType={choiceType} loadingFileType={loadingFileType} step={step}/>
              }
            </DialogPopup>
        }
        { showFileModal &&
          <FileUpload onClose={this.handleCloseModal}/>
        }
      </div>
    );
  }
}

export default UploadFiles;