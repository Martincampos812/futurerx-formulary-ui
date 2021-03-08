import React, { useEffect } from "react";
import { Collapse } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import './CostShareDetails.scss';
import { getCostShareDetailsData } from "../../../redux/slices/formulary/cost-ShareDetails/costShareDetailsActionCreation";
import DropDown from '../../shared/Frx-components/dropdown/DropDown';
import { RootState } from "../../../redux/store/index";

const CostShareDetail: React.FC = () =>
{
    
const costShareData = useSelector( ( state: RootState ) => state.costShareDetailsReducer );
const { Panel } = Collapse;
    


console.log( "line:25 noc", costShareData );
console.log("line:26 noc", costShareData.data );
const id = useSelector( ( state: RootState ) => state.application );

const f_id: any = id.formulary_id  ;
  const dispatch = useDispatch();
  useEffect( () =>
  {
    
    dispatch( getCostShareDetailsData( f_id ) )

    console.log( "good" );
    
    
      
  }, [] )
    
return (
        <div className="cost-share-details_content">
            <Collapse defaultActiveKey={['1']}>
                <Panel header="GROUP NAME" key="1">
                    <div className="headings">
                        <div className="item tier-number">tier number</div>
                        <div className="item tier-desc">tier description</div>
                        <div className="item cost-share">Cost share</div>
                        <div className="item cost-val">value</div>
                    </div>
                    <div className="body">
                        {costShareData.data.map(e => {
                            return (
                                <div className="row">
                                    <div className="item tier-number">{e.tierNumber}</div>
                                    <div className="item tier-desc">{e.tierDescription}</div>
                                    <div className="item cost-share"><DropDown options={['Copay','Co-Insurance']} value={e.costShare}/></div>
                                    <div className="item cost-val">
                                        {e.costVal === 'Co-Insurance' ? (
                                            <span className="prefix percent">%</span>  
                                        ) : (
                                            <span className="prefix">$</span>  
                                        )}
                                        <input type="text" placeholder={e.costVal}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}
export default CostShareDetail;