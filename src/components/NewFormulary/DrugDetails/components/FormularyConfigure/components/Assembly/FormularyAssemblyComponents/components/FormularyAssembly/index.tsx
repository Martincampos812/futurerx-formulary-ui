import React, { Component } from "react";
import FormularyAssemblyComponentListItem from "../FormularyAssemblyComponentListItem";
import FormularyAssemblyComponentExpandableListitem from './../FormularyAssemblyComponentExpandableListitem';

interface FormularyAssemblyProps {
  data?: any;
  sections?: any;
  onComponentRemove?: any;
  assemblyLabel?: string;
  onComponentView?:any
}

interface FormularyAssemblyState {

}
class FormularyAssembly extends Component<FormularyAssemblyProps, FormularyAssemblyState> {
  
  renderSection = (section:any, key: number) => {
    const { data } = this.props;
    
    let list = data.filter( item => item.tag === section.text);
    
    return (
      <FormularyAssemblyComponentExpandableListitem key={key} title={section.text} count={list.length}>              
        {
          list.map((currentComponent, key) => <FormularyAssemblyComponentListItem type="assembly" key={key} {...currentComponent} onRemove={this.props.onComponentRemove} onView={this.props.onComponentView} />)
        }
      </FormularyAssemblyComponentExpandableListitem>
    )
  }
  
  
  render() { 
    const {data, sections} = this.props;
    
    return (
      <div className="formulary-assembly">
        <div className="formulary-assembly__container">
          <div className="formulary-assembly__container-header">
            <div className="formulary-assembly__container-header-title">{this.props.assemblyLabel} Assembly</div>
          </div>
          
          <div className="formulary-assembly__container-body">
            {
              sections.map((section, key) => (
                this.renderSection(section, key)
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default FormularyAssembly;
