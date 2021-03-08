import React from "react";
import SubmissionForm from "./SubmissionForm";
import CostForm from "./CostForm";
import AuthPrescriberForm from "./AuthrizationPrescriberForms";
import DiagnosisDURForms from "./diagnosisDURForms";
import CoordinationBenefits from "./CoordinationBenefits";
import MultiIngredientCompound from "./MultiIngredientCompound";
import NxTransaction from "./NxTransaction";

export class NewTestClaim extends React.Component<any, any> {
  state = {
    submissionType: "Multi-IngredientCompound",
  };
  render() {
    const submissionType = this.state.submissionType;
    return (
      <React.Fragment>
        {submissionType === "D.O Standard" ||
        submissionType === "Multi-IngredientCompound" ||
        submissionType === "Coordination of Benefits" ||
        submissionType === "FIR Transaction" ? (
          <SubmissionForm />
        ) : null}
        {submissionType === "D.O Standard" ||
        submissionType === "Multi-IngredientCompound" ||
        submissionType === "Coordination of Benefits" ? (
          <>
            <CostForm />
            <AuthPrescriberForm />
            <DiagnosisDURForms />
          </>
        ) : null}
        {submissionType === "Multi-IngredientCompound" ? <MultiIngredientCompound /> : null}
        {submissionType === "Coordination of Benefits" ? <CoordinationBenefits /> : null}
        {submissionType === "Nx Transaction" ? <NxTransaction /> : null}
      </React.Fragment>
    );
  }
}
