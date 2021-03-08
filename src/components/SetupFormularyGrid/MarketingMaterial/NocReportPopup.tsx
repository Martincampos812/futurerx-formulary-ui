import React, { Fragment,useEffect,useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch,useSelector } from 'react-redux';
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import Box from '@material-ui/core/Box';
import Button from "../../shared/Frx-components/button/Button";
import FrxMiniTabs from "../../shared/FrxMiniTabs/FrxMiniTabs";
import { NOCMarketingColumns } from "../../../utils/grid/columns";
import { NocReportMock } from "../../../mocks/NocReportMock";
import { getNocReportData } from "../../../redux/slices/formulary/nocReport/nocReportActionCreation";
import {RootState} from "../../../redux/store/index"
import "./MarketingMaterial.scss";
import { dispatch } from "d3";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import { AnyAaaaRecord, AnyARecord } from "dns";



const NocReportPopup = () => {
  
  const NocReportState = useSelector( ( state: RootState ) => state.nocReportReducer );
  const id = useSelector( ( state: RootState ) => state.application );

  console.log( id.formulary_id );
  const f_id: any = id.formulary_id  ;
  console.log( "line:25 noc", NocReportState );
  console.log( "line:26 noc", NocReportState.data );
  console.log( "" );

  const [requestpayload, setRequestPayload] = useState( {
    filter: [],
    search_key:""
} )
  const dispath = useDispatch();
  useEffect( () =>
  {
    
    dispath( getNocReportData( { requestpayload, f_id } ) )

    console.log( "good" );
    
    
      
  }, [])


  
    return (
        <div className="bordered">
          <FrxDrugGridContainer
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => {}}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="TIER"
            enableSettings
            columns={NOCMarketingColumns()}
            scroll={{ x: 2000, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
          data={ NocReportState.data}
            rowSelection={{
              columnWidth: 50,
              fixed: true,
              type: "checkbox",
            }}
          />
        </div>
    )
  
}
export default NocReportPopup 