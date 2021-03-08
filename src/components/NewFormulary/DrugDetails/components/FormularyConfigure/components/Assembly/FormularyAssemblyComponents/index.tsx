import React, { Component } from "react";
import { getAssemblyComponentList } from "../../../../../../../../mocks/FormularyAssemblyComponentMock";

import FormularyAssembly from './components/FormularyAssembly';
import FormularyComponents from './components/FormularyComponents';
import FormularyComponentDetails from './components/FormularyComponentDetails';
import DialogPopup from "../../../../../../../shared/FrxDialogPopup/FrxDialogPopup" 


import './FormularyAssemblyComponents.scss';

const FormularyAssemblySections = [
  { id: 1, text: "Tier" },
  { id: 2, text: "QL" },
  { id: 3, text: "ST" },
  { id: 4, text: "PA" },
  { id: 5, text: "Drug Details" },
]

interface AssemblyListComponent {
  id?: any;
  title?: string;
  tag?: string;
  description?: string;
}


interface FormularyAssemblyComponentsProps {
  id?: any;
  title?: string;
  tag?: string;
  description?: string;
}

interface FormularyAssemblyComponentsState {
  componentList?: any
  assemblyList?: any
  viewFormularyAssembly?: boolean,
  selectedComponent?: AssemblyListComponent | null
}


class FormularyAssemblyComponents extends Component<FormularyAssemblyComponentsProps, FormularyAssemblyComponentsState> {
  state: any = {
    componentList: [...getAssemblyComponentList()],
    assemblyList: Array(),
    viewFormularyAssembly: false,
    selectedComponent: null
  }
  
  getListItemIndex = (id: number) => {
    const { componentList } = this.state;
    
    return componentList.map(item=>item.id).indexOf(id); 
  }
  
  handleOnComponentAdd = (index: number) => {
    const { assemblyList, componentList } = this.state;
    let newList = [...assemblyList, componentList[index]]
    
    this.setState({
      assemblyList: JSON.parse(JSON.stringify(newList))
    });
  }
  
  handleOnComponentRemoveFromAssembly = (id: number) => {
    const { assemblyList } = this.state;
    let removeItemIndex = assemblyList.map(item=>item.id).indexOf(id); 
    let newList = [...assemblyList];
    newList.splice(removeItemIndex, 1);
    
    this.setState({
      assemblyList: JSON.parse(JSON.stringify(newList))
    });
  }

  handleOpenModal = (id: number) => {
    const { componentList } = this.state;
    let itemIndex = this.getListItemIndex(id);
    
    console.log({...componentList[itemIndex]})
    this.setState({
      viewFormularyAssembly: true,
      selectedComponent: {...componentList[itemIndex]}
    });
  }
  
  handleCloseModal = () => {
    this.setState({
      viewFormularyAssembly: false,
      selectedComponent: null
    });
  }
  
  render() {
    const { viewFormularyAssembly, selectedComponent } = this.state;
    return (
      <>
        <div className="formulary-assembly-components">
          <div className="formulary-assembly-components__container">
            <div className="formulary-assembly-components__container-header">
              <h4 className="formulary-assembly-components__container-header-title">formulary component assembly</h4>
              <div className="formulary-assembly-components__container-header-actions">
                <div className="action">Buy from Bazaar</div>  
              </div>
            </div>
            
            <div className="formulary-assembly-components__container-body">
              <FormularyComponents data={this.state.componentList} onComponentAdd={this.handleOnComponentAdd} onComponentView={this.handleOpenModal}/>
              <FormularyAssembly assemblyLabel="Formulary" data={this.state.assemblyList} sections={FormularyAssemblySections} onComponentRemove={this.handleOnComponentRemoveFromAssembly}/>
            </div>
          </div>
        </div>
        
        {
          (viewFormularyAssembly && this.state.selectedComponent !== null ) && 
          <DialogPopup
            showCloseIcon={true}
            positiveActionText="View Full Component"
            negativeActionText="Cancel"
            title={selectedComponent.title || ""}
            handleClose={this.handleCloseModal}
            handleAction={()=>{}}
            showActions={true}
            open={viewFormularyAssembly}
            popupMaxWidth={"lg"}
            className="root-add-new-tag-popup"
          >
            <FormularyComponentDetails/>
          </DialogPopup>
        }
      </>
      
    );
  }
}

export default FormularyAssemblyComponents;
