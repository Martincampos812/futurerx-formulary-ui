import React from 'react';
import "./PDEStatusDialog.scss";
import DialogPopup from "../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import {PDEStatusDialogAcceptedInfo, PDEStatusDialogRejectedInfo} from "../../../../../../mocks/ClaimGridModelMock";

export const PDEStatusDialogAccepted = (props: any) => { 
        return(
        <DialogPopup
                className="pde-status-dialogue-root"
                open={props.pdeStatusDialog}
                positiveActionText=""
                negativeActionText=""
                title=""
                // showCloseIcon
                showActions={false}
                handleClose={props.handlePdeStatusDialog}
                handleAction={() => {
                console.log("do some action");
                }}
                height="100vh"
            >
            <div className="pde-status-dialogue-root__info">
                <div className="pde-status-dialogue-root__info--header">
                    <span>Field no</span>
                    <span>Field name</span>
                    <span>Values</span>
                </div>
                <div className="pde-status-dialogue-root__info--list scroll-bar">
                    {PDEStatusDialogAcceptedInfo.map((field, i) => 
                    <div key={i + ""} className="pde-status-dialogue-root__info--list__fields">
                    <span>{field.id}</span>
                    <span>{field.fieldName}</span>
                    <span>{field.fieldValue}</span>
                    </div>
                    )}
                </div>
            </div>
        </DialogPopup>
    );
}

export const PDEStatusDialogDeletion = (props: any) => { 
    return(
        <div className="pde-status-dialogue-root">
            
        </div>
    );
}

export const PDEStatusDialogRejected = (props: any) => { 
    return(
        <DialogPopup
                className="pde-status-dialogue-root"
                open={props.pdeStatusDialog}
                positiveActionText=""
                negativeActionText=""
                title=""
                // showCloseIcon
                showActions={false}
                handleClose={props.handlePdeStatusDialog}
                handleAction={() => {
                console.log("do some action");
                }}
                height="100vh"
            >
            <div className="pde-status-dialogue-root__info">
                <div className="pde-status-dialogue-root__info--header">
                    <span>Field no</span>
                    <span>Field name</span>
                    <span>Values</span>
                </div>
                <div className="pde-status-dialogue-root__info--list scroll-bar">
                    {PDEStatusDialogRejectedInfo.map((field, i) => 
                    <div key={i + ""} className="pde-status-dialogue-root__info--list__fields">
                    <span>{field.id}</span>
                    <span>{field.fieldName}</span>
                    <span>{field.fieldValue}</span>
                    </div>
                    )}
                </div>
            </div>
        </DialogPopup>
    );
}
