import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import Box from '@material-ui/core/Box';
import Button from "../../shared/Frx-components/button/Button";
import './PlainLanguageDescriptor.scss';
import { connect } from "react-redux";
import { fetchPlainLanguageDescriptorDropDownList,saveTable,changeClassDescription,setTableValues,setPlainLanguageDescriptorListName,getPlainLanguageDescriptorTable,changeCategoryDescription, createPlainLanguageDescriptorDropDownList} from "../../../redux/slices/formulary/marketing_materials/plainLanguageDescriptorSlice";
// import { saveLanguageDescriptorTable} from "../../../redux/slices/formulary/marketing_materials/plainLanguageDescriptorService";

class PlainLanguageDescriptor extends React.Component<any, any> {
  
componentDidMount=()=>{
    // this.props.fetchPlainLanguageDescriptorDropDownList(this.props.current_formulary?.id_base_formulary)
    this.props.fetchPlainLanguageDescriptorDropDownList(3299)
    // this.props.getPlainLanguageDescriptorTable(3299)
    // this.props.getPlainLanguageDescriptorTable(this.props.current_formulary?.id_base_formulary)
    // this.props.fetchPlainLanguageDescriptorDropDownList(2755)
  }
  render() {
    return (
      <div className="plain-language-container">
          <div className="list-wrapper">
            <Grid container>
                <Grid item xs={6}>
                    <div className="list-name-wrapper">
                        <Grid item xs={8}>
                        <div className="group">
                            <label>List Names</label>
                            <input value={this.props.list_name_value} onChange={e=>this.props.setPlainLanguageDescriptorListName(e.target.value)} type="text" className="base-input" />
                        </div>
                        </Grid>
                        <Grid item xs={3}>
                            <Box display="flex" justifyContent="flex-end" className="create-list-btn">
                                <Button onClick={async()=>{
                                    await this.props.createPlainLanguageDescriptorDropDownList({"name":this.props.list_name_value,"base_formulary_id":this.props.current_formulary?.id_base_formulary,"type":"create"})
                                    this.componentDidMount()
                                    }}  label="Create List" />
                            </Box>
                        </Grid>
                        
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="list-name-wrapper">
                        <Grid item xs={8}>
                            <div className="group">
                                <label>
                                SELECTED LIST
                                </label>
                                {
                                    this.props.active_lang_descriptor&&<DropDown
                                        defaultValue={this.props.active_lang_descriptor}
                                        className="list-dropdown"
                                        isOptionsObj={true}
                                        options={this.props.dropdown_list.map(x=>({label: x.name, value: x.lang_descriptor_id}))}
                                        onChange={e=>this.props.setTableValues(e)}
                                    />
                                }
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <Box display="flex" justifyContent="flex-end" className="apply-btn">
                                <Button label="Apply" onClick={()=>this.props.setTableValues(this.props.table.lang_descriptor_id)} />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box display="flex" justifyContent="flex-end" className="apply-btn clone-btn">
                                <Button label="Clone" onClick={async()=>{
                                        await this.props.createPlainLanguageDescriptorDropDownList({"name":this.props.list_name_value,"base_formulary_id":this.props.current_formulary?.id_base_formulary,"type":"clone",lang_descriptor_id: this.props.active_lang_descriptor})
                                        this.componentDidMount()
                                    }}/>
                            </Box>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12}>
                <div className="plain-language-grid-container">
                        <div className="plain-category">
                            <div className="plain-headings plain-border-bottm">Category</div>
                            {this.props.table.categories.map(x=>
                                <div className="plain-border-bottm plain-text plain-height">{x.category_name}</div>
                            )}
                        </div>
                        <div className="plain-category-desc">
                            <div className="plain-headings plain-border-bottm">Category descriptor</div>
                            {this.props.table.categories.map((x,i)=>
                                <div className="plain-border-bottm plain-input plain-height"><input type="text" value={x.description} onChange={e=>this.props.changeCategoryDescription(i, e.target.value)}/></div>
                            )}
                        </div>
                        <div className="plain-class">
                           <div className="plain-headings plain-border-bottm">class</div>
                            {this.props.table.classes.map(x=>
                                <div className="plain-border-bottm plain-text plain-height">{x.class_name}</div>
                            )}
                        </div>
                        <div className="plain-class-desc">
                            <div className="plain-headings plain-border-bottm">class descriptor</div>
                            {this.props.table.classes.map((x,i)=>
                                <div className="plain-border-bottm plain-input plain-height"><input type="text" value={x.description} onChange={e=>this.props.changeClassDescription(i, e.target.value)}/></div>
                            )}
                        </div>
                    </div> 
                    <Box display="flex" justifyContent="flex-end" className="create-list-btn">
                        <Button onClick={async()=>{
                            this.props.saveTable({
                                categories:this.props.table.categories.filter(x=>x.is_updated==true).map(x=>({...x, classes:x.classes.map(c=>({...(this.props.table.classes.find(i=>i.class_name==c.class_name)||c)}))})),
                                classes:this.props.table.classes.filter(x=>x.is_updated==true),
                                lang_descriptor_id:this.props.table.lang_descriptor_id
                            })
                            // this.componentDidMount()
                            // this.props.setTableValues(this.props.active_lang_descriptor)
                        }}  label="Save" />
                    </Box>
                </Grid>
            </Grid>
          </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPlainLanguageDescriptorDropDownList: (params) => dispatch(fetchPlainLanguageDescriptorDropDownList(params)),
        setPlainLanguageDescriptorListName: (params) => dispatch(setPlainLanguageDescriptorListName(params)),
        createPlainLanguageDescriptorDropDownList: (params) => dispatch(createPlainLanguageDescriptorDropDownList(params)),
        getPlainLanguageDescriptorTable: (params) => dispatch(getPlainLanguageDescriptorTable(params)),
        changeCategoryDescription: (index, value) => dispatch(changeCategoryDescription({index,value})),
        changeClassDescription: (index, value) => dispatch(changeClassDescription({index,value})),
        setTableValues: (params) => dispatch(setTableValues(params)),
        saveTable: (params) => dispatch(saveTable(params)),
    };
  }
const mapStateToProps = (state) => {
// debugger
    return {
        current_formulary: state?.application?.formulary,
        dropdown_list: state?.plain_language_descriptor?.dropdown_list,
        list_name_value: state?.plain_language_descriptor?.create_list_name_value,
        // table: [{categories:[],classes:[]}],
        table: (state?.plain_language_descriptor?.table||[]),
        active_lang_descriptor: state?.plain_language_descriptor?.active_lang_descriptor,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PlainLanguageDescriptor)