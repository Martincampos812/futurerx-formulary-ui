import React from "react";
import "../MemberCostshare.scss";

interface DeductibleStageProps {
  deductible: Array<{
    deductibleBrandName: string;
    deductibleAmount: string;
    deductibleInfo?: string;
  }>;
}

class DeductibleStage extends React.Component<DeductibleStageProps> {
  state = {};
  render() {
    return (
      <div className="member-costshare-root__info">
        <h5 className="member-costshare-root__info--heading">No Deductible</h5>
        <span className="member-costshare-root__info--content">
          Because there is no deductible for the plan, this payment stage does
          not apply to you Deductible
        </span>
        <h5 className="member-costshare-root__info--heading">Deductible</h5>
        {this.props.deductible.map((e: any, i) => (
          <p key={i + ""} className="member-costshare-root__info--content">
            You begin in this payment stage when you fill your first
            prescription of the year. During this stage, you pay the full cost
            of your <b>{e.deductibleBrandName}</b> drugs. Your “full cost” is
            usually lower than the normal full price of the drug since our plan
            has negotiated lower costs for most drugs.The “deductible” is the
            amount you must pay for your Part D prescription drugs before the
            plan begins to pay its share. You stay in this stage until you have
            paid <b>{e.deductibleAmount}</b> for your <b>{e.deductibleInfo}</b>
          </p>
        ))}
      </div>
    );
  }
}

export default DeductibleStage;
