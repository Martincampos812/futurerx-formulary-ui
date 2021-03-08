import React from 'react';
import "../MemberCostshare.scss";

// ant -table //
import { Table } from 'antd';
// components
import  {columns, data  }  from '../../../mocks/MemberCostshare';

interface IntialCoverageStageProps {
    intialCoverageStage: Array<{
        coverageTierName: string;
        covergePayment: string;
        covergeAmount?: string;
        covergeThreshold:string;
    }>;
}

class IntialCoverageStage extends React.Component<IntialCoverageStageProps> {
    state = {

    }
    render() {
        return(
            <div className="member-costshare-root__info">
            {this.props.intialCoverageStage.map((e: any) => 
                <>
                <h5 className="member-costshare-root__info--heading">No Deductible</h5>
                <span className="member-costshare-root__info--content">You begin this stage when you fill your first prescription of the year.</span>
                <h5 className="member-costshare-root__info--heading">Deductible that applies to all drugs</h5>
                <p className="member-costshare-root__info--content">During this stage, the plan pays its share of the cost</p>
                <h5 className="member-costshare-root__info--heading">Deductible that applies to some drugs</h5>
            <p className="member-costshare-root__info--content">During this stage, the plan pays its share of the cost of your <b>{e.coverageTierName}</b> drugs and you pay your share of the cost.” After you (or others on your behalf) have met your <b>{e.coverageTierName}</b> deductible, the plan pays its share of the costs of your <b>{e.coverageTierName}</b> drugs and you pay your share. 
            <br /><br />You stay in this stage until your year-to-date <b>{e.covergePayment}</b> During the Initial Coverage Stage, the plan pays its share of the cost of your covered prescription drugs, and you pay your share (your <b>{e.covergeAmount}</b>). Your share of the cost will vary depending on the drug and where you fill your prescription.<br /><br /> 
            <span>When you (or those paying on your behalf) have spent a total of <b>{e.covergeThreshold}</b> in out-of-pocket costs within the calendar year, you will move from the Initial Coverage Stage to the Catastrophic Coverage Stage.</span></p>
                </>
                )}
                <Table className="member-costshare-root__coveragestage-table" pagination={false} columns={columns} dataSource={data} scroll={{ x: 1300 }} />
            </div>
        );
    }
}

export default IntialCoverageStage;