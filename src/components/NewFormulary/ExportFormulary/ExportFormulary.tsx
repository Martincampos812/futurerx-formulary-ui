import React from 'react';
import showMessage from "../../../components/NewFormulary/Utils/Toast";
import {
    exportReport,
} from "../../../redux/slices/formulary/hpms/hpmsService";
import { saveAs } from "file-saver";
import { connect } from "react-redux";
import {
    postStandardReports,
} from "../../../redux/slices/formulary/hpms/hpmsActionCreation";

function mapDispatchToProps(dispatch) {
    return {
      postStandardReports: (a) => dispatch(postStandardReports(a)),
    };
}

const mapStateToProps = (state) => {
    return {
      formulary: state?.application?.formulary,
      formulary_lob_id: state?.application?.formulary_lob_id,
    };
};
class ExportFormulary extends React.Component<any,any>{
    state={
        fileData: [] as any[]
    }
    onExportHandler = () => {
        let apiDetails = {};
        apiDetails["apiPart"] = "api/1/standard-reports";
        apiDetails["pathParams"] = "/" + this.props.formulary.id_formulary;
        apiDetails["keyVals"] = [{ key: "index", value: 0 }, { key: "limit", value: 10 }];


        apiDetails["messageBody"] = {
            "filter": [],
            "search_key": "",
            "sort_by": ["template_group_name"],
            "sort_order": ["asc"],
            "template_type": 1,
            "formulary_id": this.props.formulary.id_formulary,
            base_formulary_id: this.props.formulary.id_base_formulary,
        }
        this.props.postStandardReports(apiDetails).then((json) => {
            const data = json.payload.data;
            const file_Data = data.filter(e => e.standard_reporting_name === 'FRX Standard Full Formulary File');
            const fileId = file_Data.length > 0 ? file_Data[0].id_standard_reporting : undefined;
            this.setState({
              fileData: file_Data  
            }, () => {
                if(fileId !== undefined){
                    this.handleExport(fileId) 
                }
            })
        });
    }
    handleExport = async (key: any) => {
        let apiDetails_1 = {
            apiPart: "api/1/formulary-export",
            pathParams: `/${this.props.formulary.id_formulary}/${this.props.formulary_lob_id}/false`
        };

        let isError = false;
        try {
            const response = await exportReport(apiDetails_1);
            console.log(response.headers);
            let content_type = response.headers['content-type'];
            let data = response.data;
            if (response.data) {
              let tmp_file = this.state.fileData.filter((obj) => obj.id_standard_reporting == key);
              let fileName = tmp_file[0].standard_reporting_name.replace(' ', '_') + "_Export";
              if (content_type && content_type == "xlsx") {
                const file = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                saveAs(file, fileName + ".xlsx");
              } else {
                const file = new Blob([data], { type: "text/csv" });
                saveAs(file, fileName + ".csv");
              }    
              this.setState({
                isRequestFinished: true
              });
            } else {
              showMessage("Error while exporting", "error");
              this.setState({
                isRequestFinished: true
              });
              isError = true;
            }
        } catch (err) {
            console.log(err);
            showMessage("Error while exporting", "error");
            this.setState({
              isRequestFinished: true
            });
            isError = true;
        }
    }
    render(){
        const Element = this.props.hasIcons !== undefined ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.onExportHandler}>
                <path d="M6.75 0H9.25C9.66562 0 10 0.334375 10 0.75V6H12.7406C13.2969 6 13.575 6.67188 13.1812 7.06563L8.42813 11.8219C8.19375 12.0562 7.80937 12.0562 7.575 11.8219L2.81562 7.06563C2.42188 6.67188 2.7 6 3.25625 6H6V0.75C6 0.334375 6.33437 0 6.75 0ZM16 11.75V15.25C16 15.6656 15.6656 16 15.25 16H0.75C0.334375 16 0 15.6656 0 15.25V11.75C0 11.3344 0.334375 11 0.75 11H5.33437L6.86562 12.5312C7.49375 13.1594 8.50625 13.1594 9.13437 12.5312L10.6656 11H15.25C15.6656 11 16 11.3344 16 11.75ZM12.125 14.5C12.125 14.1562 11.8438 13.875 11.5 13.875C11.1562 13.875 10.875 14.1562 10.875 14.5C10.875 14.8438 11.1562 15.125 11.5 15.125C11.8438 15.125 12.125 14.8438 12.125 14.5ZM14.125 14.5C14.125 14.1562 13.8438 13.875 13.5 13.875C13.1562 13.875 12.875 14.1562 12.875 14.5C12.875 14.8438 13.1562 15.125 13.5 15.125C13.8438 15.125 14.125 14.8438 14.125 14.5Z" fill="#1D54B4"/>
            </svg>
        ) : 'Export'
        return Element;
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ExportFormulary);