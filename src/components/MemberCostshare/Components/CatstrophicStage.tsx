import React from 'react';
import "../MemberCostshare.scss";

interface CatstrophicStageProps {
    catstrophicStage: Array<{
        catstrophicMove: string;
        catstrophicThreshold: string;
        catstrophicBenefits: string;
        catstrophicCostSharingOption1: string;
        catstrophicOtherCostSharing: string;
        catstrophicCostSharingOption2: string;
        catastrophicCostShareDesc: string;
    }>;
}

class CatstrophicStage extends React.Component<CatstrophicStageProps> {
    state = {
    }
    
    render() {
        return(
            <div className="member-costshare-root__info">
            {this.props.catstrophicStage.map((e: any) => 
                <>
                <h5 className="member-costshare-root__info--heading"></h5>
            <p className="member-costshare-root__info--content">During this stage, the plan will pay most of the cost of your drugs for the rest of the calendar year (through December 31, [YYYY]). When you (or those paying on your behalf) have spent a total of <b>{e.catstrophicThreshold}</b> in out-of-pocket costs within the calendar year, you will move from the <b>{e.catstrophicMove}</b> to the Catastrophic Coverage Stage.<br /><br />You qualify for the Catastrophic Coverage Stage when your out-of-pocket costs have reached the $[insert YYYY. out-of-pocket threshold] limit for the calendar year. Once you are in the Catastrophic Coverage Stage, you will stay in this payment stage until the end of the calendar year.<br /><br />During this stage, the plan will pay most of the cost for your drugs.<br /><br />Plans <b>{e.catstrophicBenefits}</b></p><br />
                <span className="member-costshare-root__info--content">Option 1:</span>
            <p className="member-costshare-root__info--content">Your share of the cost for a covered drug will be either coinsurance or a copayment, whichever is the larger amount: – either – coinsurance of 5% of the cost of the drug – or – <b>{e.catstrophicCostSharingOption1}</b> for a generic drug or a drug that is treated like a generic and <b>{e.catstrophicOtherCostSharing}</b> for all other drugs. Our plan pays the rest of the cost.</p><br />
                <p className="member-costshare-root__info--content">Our plan pays the rest of the cost.</p><br />
                <span className="member-costshare-root__info--content">Option 2:</span>
            <p className="member-costshare-root__info--content"><b>{e.catstrophicCostSharingOption2}</b> We will pay the rest. <b>{e.catastrophicCostShareDesc}</b></p>
                </>
            )}
            </div>
        );
    }
}

export default CatstrophicStage;