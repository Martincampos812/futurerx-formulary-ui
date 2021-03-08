import React from 'react';
import { connect } from "react-redux";
import {uploadFileColumns} from "../../../utils/grid/columns";
import FrxGridContainer from "../../shared/FrxGrid/FrxDrugGridContainer";
import FileExpanded from './fileExpanded';
import TableGrid from './GridList';
import { loadImportFiles } from '../../../redux/slices/formulary/import_export/formularyImportSlice';

class TemplateList extends React.Component<any,any>{
    state = {
        templateList: []
    }
    UNSAFE_componentWillReceiveProps(newProps){
        let newList = [];
        if(newProps.importFiles.length > 0){
            const importedTemplates = newProps.importFiles;
            newList = importedTemplates.map((e,index) => {
                return {
                    id: index,
                    key: e.id_formulary_file,
                    file_name: e.file_name,
                    upload_status: e.import_status,
                    user: e.user,
                    uload_date: e.date_time,
                    child: e.children
                }
            });
        }
        this.setState({
            templateList: newList
        })
    }
    componentDidMount(){
        const flID = this.props.formulary_id;
        this.props.loadImportFiles(flID);
    }
    getChildData = (childData) => {
        let newList = [];
        if(childData.length > 0){
            newList = childData.map((e,index) => {
                return {
                    id: index,
                    key: e.id_formulary_file,
                    file_name: e.file_name,
                    upload_status: e.import_status,
                    user: e.user,
                    uload_date: e.date_time,
                    child: e.children
                }
            });
        }
        return newList;
    }
    expandDetails = (id,child) => {
        if(child !== undefined){
            if(child.length > 0){
                return <TableGrid 
                    expandDetails={this.expandDetails}
                    uploadFileColumns={uploadFileColumns()}
                    templateList={this.getChildData(child)}
                    showHeader={false}
                />
            }else{
                return <FileExpanded 
                            formulary_id={this.props.formulary_id} 
                            file_id={id} 
                            loadKeyType={this.props.loadKeyType}
                            isShowDetailsHandler={this.props.isShowDetailsHandler}
                            changesOnlyList={this.props.changesOnlyList}/>
            }
        }else{
            return <FileExpanded 
                formulary_id={this.props.formulary_id} 
                file_id={id} 
                loadKeyType={this.props.loadKeyType}
                isShowDetailsHandler={this.props.isShowDetailsHandler}
                changesOnlyList={this.props.changesOnlyList}/>
        }
    }
    render(){
        return (
            <TableGrid 
                expandDetails={this.expandDetails}
                uploadFileColumns={uploadFileColumns()}
                templateList={this.state.templateList}
                showHeader={true}
            />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        mode: state?.setup?.mode,
        importFiles: state?.import?.importFiles
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loadImportFiles: (a) => dispatch(loadImportFiles(a)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(TemplateList);