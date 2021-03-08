import React from 'react';
import "../MemberCostshare.scss";


interface CoverageGapStageProps {
    coverageGap: Array<{
        genericCoverage: string;
        coverageThreshold: string;
    }>;
}

class CoverageGapStage extends React.Component<CoverageGapStageProps> {
    state = {
    }

    render() {
        return(
            <div className="member-costshare-root__info">
                {this.props.coverageGap.map((e: any) => 
                <>
                <h5 className="member-costshare-root__info--heading">No additional Gap Coverage</h5>
                <span className="member-costshare-root__info--content">During this stage, you pay 25% of the price for brand name drugs (plus a portion of the dispensing fee) and 25% of the price for generic drugs. </span>
                <h5 className="member-costshare-root__info--heading">With additional Gap Coverage only in the gap</h5>
                <p className="member-costshare-root__info--content">For generic drugs, you pay <b>{e.genericCoverage}</b> For brand name drugs, you pay 25% of the price (plus a portion of the dispensing fee).</p>
                <h5 className="member-costshare-root__info--heading">Some Gap Coverage in the gap</h5>
                <p className="member-costshare-root__info--content">You stay in this stage until your year-to-date “out-of-pocket costs” (your payments) reach a total of <b>{e.coverageThreshold}</b> This amount and rules for counting costs toward this amount have been set by Medicare.</p>
                <h5 className="member-costshare-root__info--heading">No Gap Coverage</h5>
                <p className="member-costshare-root__info--content">Because there is no coverage gap for the plan, this payment stage does not apply to you.</p>
                </>
                )}
            </div>
        );
    }
}

export default CoverageGapStage;