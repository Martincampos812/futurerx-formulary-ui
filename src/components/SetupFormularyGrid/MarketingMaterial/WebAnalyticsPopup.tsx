import React, { Fragment,useEffect,useState } from "react";
import Grid from "@material-ui/core/Grid";
import CustomAccordion from "../../shared/Frx-components/accordion/CustomAccordion";
import FrxDrugGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import Box from '@material-ui/core/Box';
import { Container } from "@material-ui/core";
import Button from "../../shared/Frx-components/button/Button";
import { DatePicker, Select } from "antd";
import "./MarketingMaterial.scss";
import icon from "../../../assets/img/analytics1.png";
import icon2 from "../../../assets/img/analytics2.png";
import { useDispatch, useSelector } from 'react-redux';

import { getWebAnalyticalData } from "../../../redux/slices/formulary/webAnalytical/webAnalyticalAction";
import { RootState } from "../../../redux/store/index";

const WebAnalyticsPopup = () =>
{
    
    const upcounter = useSelector( ( state: RootState ) => state.webAnalyticalReducer );
    const [requestpayload, setRequestPayload] = useState( {
        base_formulary_id: 3391,
        formulary_id: 4019,
        from_date: "2021-02-08",
        to_date: "2021-02-15"
    } )

  console.log( upcounter );
  const dispath = useDispatch();
  useEffect( () =>
  {
    async function getWebData()
    {
      const id: string = "/3790";
      await dispath( getWebAnalyticalData( requestpayload) )
      
    
    }
    
    getWebData();
    //console.log( "line 38", counter );
  }, [])

  
    return (
        <div className="web-analytics-container">
              <div className="formulary-id-name">
                  <h6>Formulary ID:<span>2438</span></h6>
                  <h6>Name:<span>2021Care111-01</span></h6>
              </div>
              <div className="analytic-date-btn-wrapper">
                <div className="analytic-date-wrapper">
                    <div className="form">
                            <label>
                            From
                        </label>
                        <DatePicker
                            className="analytic-date"
                            placeholder=""
                            suffixIcon={
                            <svg
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="ant-picker-suffix"
                            >
                                <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                                fill="#C4C4C4"
                                />
                            </svg>
                            }
                        />
                    </div>
                    <div className="form">
                            <label>
                            To
                        </label>
                        <DatePicker
                            className="analytic-date"
                            placeholder=""
                            suffixIcon={
                            <svg
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="ant-picker-suffix"
                            >
                                <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                                fill="#C4C4C4"
                                />
                            </svg>
                            }
                        />
                    </div>
                </div>
                <div className="btn-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z" fill="#1D54B4"/>
                </svg>
                <Button label="View" />
                </div>
              </div>
              <CustomAccordion name="Contract name here">
                    <Container>
                        <div className="top-rated-searches-container">
                            <div className="top-rated-searches-wrapper">
                                <h3>Top 5 Searched Categories/Classes</h3>
                                <div className="icon-wrapper">
                                    <img src={icon} />
                                </div>
                            </div>
                            <div className="top-rated-searches-wrapper">
                                <h3>Top 5  Searched Drugs by Label Name</h3>
                                <div className="icon-wrapper">
                                    <img src={icon2} />
                                </div>
                            </div>
                            <div className="top-rated-searches-wrapper">
                                <h3>Top 5  Searched Drugs by Label Name</h3>
                                <div className="icon-wrapper">
                                    <img src={icon2} />
                                </div>
                            </div>
                        </div>
                    </Container>
               </CustomAccordion>
        </div>
    );
  
}
export default WebAnalyticsPopup;
