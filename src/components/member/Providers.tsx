import React from 'react';
import FrxInfoCard from '../shared/FrxInfoCard/FrxInfoCard';
import MemberDetailsPopup from './MemberDetailsPopup';
import "./Providers.scss";
import axios from "axios";


interface ProvidersProps {
    providersData: any
}

class Providers extends React.Component<ProvidersProps> {
    
    state = {
        openPopup: false,
    }

    onHeadingClick = () => {
        console.log('invoked onHeadingClick', this.state.openPopup)

        this.setState({
            openPopup: !this.state.openPopup
        })
    }
    render() {
        const {providersData} = this.props;
        let memberDetails: any[] = []
        providersData.map((data, i) => {
        memberDetails = [
            {
                column1: "PCP",
                column2: data.pcp,
                column2Tooltip: [
                    {
                        title: "",
                        list: [
                            {
                                field: "Member's Physician Since",
                                value: data.physician_since
                            },
                            {
                                field: "In Network",
                                value: data.in_network
                            },
                            {
                                field: "NPI",
                                value: data.npi
                            }
                        ]
                    },
                    {
                        title: "Location 1",
                        list: [
                            {
                                field: "Address",
                                value: data.address1
                            },
                            {
                                field: "Phone",
                                value: data.phone1
                            },
                            {
                                field: "Fax",
                                value: data.fax1
                            }
                        ]
                    },
                    {
                        title: "Location 2",
                        list: [
                            {
                                field: "Address",
                                value: data.address2
                            },
                            {
                                field: "Phone",
                                value: data.phone2
                            },
                            {
                                field: "Fax",
                                value: data.fax2
                            }
                        ]
                    }
                ],
            },
            {
                column1: "Pharmacy (Primary)",
                column2: data.primary_pharmacy,
                column2Tooltip: [
                    {
                        title: "CVS mail-order",
                        list: [
                            {
                                field: "NPI",
                                value: data.primary_pharmacy_npi
                            },
                            {
                                field: "NCPDP#",
                                value: "217917777"
                            },
                            {
                                field: "In Network",
                                value: "Yes"
                            },
                            {
                                field: "Preferred Network",
                                value: "Yes"
                            },
                            {
                                field: "Address",
                                value: data.primary_pharmacy_address
                            },
                            {
                                field: "Phone",
                                value: data.primary_pharmacy_phone
                            },
                            {
                                field: "Fax",
                                value: data.primary_pharmacy_fax
                            }
                        ]
                    }
                ]
            },
            {
                
                column1: "Pharmacy (Secondary)",
                column2: data.secondary_pharmacy,
                column2Tooltip: [
                    {
                        title: "Walgreens Pharmacy",
                        list: [
                            {
                                field: "NPI",
                                value: data.secondary_pharmacy_npi
                            },
                            {
                                field: "NCPDP#",
                                value: "217917777"
                            },
                            {
                                field: "In Network",
                                value: "Yes"
                            },
                            {
                                field: "Preferred Network",
                                value: "Yes"
                            },
                            {
                                field: "Address",
                                value: data.secondary_pharmacy_address
                            },
                            {
                                field: "Phone",
                                value: data.secondary_pharmacy_phone
                            },
                            {
                                field: "Fax",
                                value: data.secondary_pharmacy_fax
                            }
                        ]
                    }
                ]
            }
        ]
        })
        return(
            <div className="providers-root">
                 <FrxInfoCard
                    heading="Providers"
                    itemList={memberDetails}
                    onHeadingClick={this.onHeadingClick}
                />
                {
                    this.state.openPopup ? 
                    (
                        <MemberDetailsPopup
                            isOpen={this.state.openPopup}
                            onClose={this.onHeadingClick}
                            panelName ="providers-tab"
                        />
                    ) 
                    :
                    ""
                }
            </div>
        );
    }
}

export default Providers;