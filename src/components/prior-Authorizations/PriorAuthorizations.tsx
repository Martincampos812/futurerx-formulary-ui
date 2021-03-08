import React from 'react';
import { Button } from "@material-ui/core";
import { getPaAppealData, getPAInitialData } from '../../mocks/grid/prior-auto-mock';
import { _pacases_appeal, _pacases_initial } from '../../utils/grid/columns';
import './PriorAuthorizations.scss'
import TestClaimsGrid from '../TestClaimsGrid/TestClaimsGrid';
import FrxMiniTabs from '../shared/FrxMiniTabs/FrxMiniTabs';
import { getPaCasesSearchData } from '../../mocks/search/pa-cases-search-mock';

interface Props {

}
interface State {
    activeMiniTabIndex: number;
}

const miniTabs = [
    { id: 1, text: "Initial Cases" },
    { id: 2, text: "Appeals" }
]
export default class PriorAuthorizations extends React.Component<Props, State>{
    state = {
        activeMiniTabIndex: 0
    }

    render() {
        return (
            <div className="prior-auth-root-container">
                <div className="content">
                    <TestClaimsGrid type="CLAIMS" header={(callBack: any) => {
                        return (<>
                            <div className="buttongroup-root">
                                <div className="heading">Prior Authorizations</div>
                                <div className="button">
                                    <Button> + New PA</Button>
                                    <Button> + Appeal</Button>
                                </div>
                            </div>
                            <FrxMiniTabs
                                tabList={miniTabs}
                                activeTabIndex={this.state.activeMiniTabIndex}
                                onClickTab={(num: number) => { this.setState({ activeMiniTabIndex: num }) }}
                            /></>)
                    }}
                        onColumnCellClick={""} 
                        columns={this.state.activeMiniTabIndex === 1 ? _pacases_appeal : _pacases_initial}
                        searchOptions={this.state.activeMiniTabIndex === 1 ? getPaCasesSearchData : getPaCasesSearchData}
                        data={this.state.activeMiniTabIndex === 1 ? getPaAppealData : getPAInitialData}
                        settingsWidth={20}
                        />
                        

                </div>
            </div>
        )
    }
}