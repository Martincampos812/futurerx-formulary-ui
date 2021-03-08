import React from "react";
import "./FormularySearch.scss";
// material - ui
import {Container, Grid, Button} from "@material-ui/core";

//Mock
import {FormularyInfo} from "../../../../mocks/FormularyMock";

// Components
import TextBox from "../../../shared/Frx-components/text-box/TextBox";
import Dropdown from "../../../shared/Frx-components/dropdown/DropDown";


export interface FormularySearchProps {
    searchInput: string;
    handleChange: any;
    globalSearch: any;
    handleOnKeyDown: any;
    optionList: any
}

class FormularySearch extends React.Component<FormularySearchProps> {




    render() {
        return(
            <div className="formulary-search-root">
                <div className="formulary-search-root__header">
                <h3 className="formulary-search-root__header--heading">Formulary Search</h3>
                <Button className="formulary-search-root__header--button">
                + New PA
                </Button>
                </div>
                <div className="formulary-search-root__information">
                    <div className="formulary-search-root__information--data">
                    {FormularyInfo.map((labelValue, i) => 
                    <React.Fragment key={i+''}>
                        <div className="formulary-search-root__information--data__fields">
                            <label>Formulary ID</label>
                            <span>{labelValue.formulary_id}</span>
                        </div>
                        <div className="formulary-search-root__information--data__fields">
                            <label>Version Number</label>
                            <span>{labelValue.version_number}</span>
                        </div>
                        <div className="formulary-search-root__information--data__fields">
                            <label>Effective Date</label>
                            <span>{labelValue.effective_date}</span>
                        </div>
                        <div className="formulary-search-root__information--data__fields">
                            <label>Last Updated</label>
                            <span>{labelValue.last_updated}</span>
                        </div>
                    </React.Fragment>
                    )}
                    </div>
                    <div className="formulary-search-root__information--actions">
                    <div className="formulary-search-root__information--actions__inputs">
                    <TextBox id="query" onKeyDown={this.props.handleOnKeyDown} onChange={this.props.handleChange} value={this.props.searchInput} placeholder="Search Drug Name" className="search-formulary" />
                    {this.props.optionList}
                    <svg className="search-formulary-icon" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z" fill="#999999"/>
                    </svg>
                    <div className="input-devider-border"></div>
                    <Dropdown 
                    className="search-formulary-select"
                    dropdownClassName="search-formulary-select-options" 
                    placeholder="Therapeutic Class / Category" 
                    dropdownStyle={{ minWidth: "39.5%"}}
                    options={[
                        "A",
                        "ANALGESICS",
                        "NONSTEROIDAL ANTI-INFLAMMATORY DRUGS",
                        "OPIOID ANALGESICS, LONG-ACTING",
                        "OPIOID ANALGESICS, SHORT-ACTING",
                        "ANESTHETICS",
                        "LOCAL ANESTHETICS"
                    ]} 
                    />
                    </div>
                    <Button 
                    onClick={this.props.globalSearch} 
                    className="search-formulary-button">
                        Search
                    </Button>
                    </div>
                    <i className="formulary-search-root__information--description">Use the input to search by drug name, or use the dropdown to select from the list of classes.</i>
                </div>
            </div>
        );
    }
}

export default FormularySearch;