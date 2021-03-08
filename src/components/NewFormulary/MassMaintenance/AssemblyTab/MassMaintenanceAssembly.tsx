import React from 'react';
import "./MassMaintenanceAssembly.scss";
import Button from "../../../shared/Frx-components/button/Button";
import DialogPopup from "../../../shared/FrxDialogPopup/FrxDialogPopup" 
import MassMaintenanceAssemblyTabRight from "../../DrugDetails/components/FormularyConfigure/components/Assembly/FormularyAssemblyComponents/components/FormularyAssembly/index";
import MassMaintenanceAssemblyTabLeft from "../../DrugDetails/components/FormularyConfigure/components/Assembly/FormularyAssemblyComponents/components/FormularyComponents/index";
import FormularyComponentDetails from '../../DrugDetails/components/FormularyConfigure/components/Assembly/FormularyAssemblyComponents/components/FormularyComponentDetails/index';
import { getAssemblyComponentList } from "../../../../mocks/FormularyAssemblyComponentMock";

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

interface FormularyAssemblyComponentsState {
    componentList?: any
    assemblyList?: any
    viewFormularyAssembly?: boolean,
    selectedComponent?: AssemblyListComponent | null
}

class MassMaintenanceAssembly extends React.Component<any, FormularyAssemblyComponentsState> {
    state: any = {
        componentList: [...getAssemblyComponentList()],
        assemblyList: Array(),
        viewFormularyAssembly: false,
        selectedComponent: null
    }

      
    handleOnComponentAdd = (index: number) => {
      const { assemblyList, componentList } = this.state;
      let newList = [...assemblyList, componentList[index]]

      this.setState({
        assemblyList: JSON.parse(JSON.stringify(newList))
      });
    }

    getListItemIndex = (id: number) => {
        const { componentList } = this.state;
        return componentList.map(item=>item.id).indexOf(id); 
    }

    handleOpenModal = (id: number) => {
      const { componentList } = this.state;
      let itemIndex = this.getListItemIndex(id);

      console.log("openModal",{...componentList[itemIndex]})
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

    handleOnComponentRemoveFromAssembly = (id: number) => {
        const { assemblyList } = this.state;
        let removeItemIndex = assemblyList.map(item=>item.id).indexOf(id); 
        let newList = [...assemblyList];
        newList.splice(removeItemIndex, 1);
        
        this.setState({
          assemblyList: JSON.parse(JSON.stringify(newList))
        });
    }

    render() {
        const { viewFormularyAssembly, selectedComponent } = this.state;
        return (
            <div className="bordered mass-maintenance-assembly-root">
                <div className="complete-header">
                    <span>mass maintenance component assembly</span>
                </div>
                <div className="assembly-root">
                <MassMaintenanceAssemblyTabLeft 
                data={this.state.componentList} 
                onComponentAdd={this.handleOnComponentAdd} 
                onComponentView={this.handleOpenModal}
                />
                <MassMaintenanceAssemblyTabRight 
                data={this.state.assemblyList} 
                sections={FormularyAssemblySections} 
                onComponentRemove={this.handleOnComponentRemoveFromAssembly}
                assemblyLabel="Mass Maintenance"
                onComponentView={this.handleOpenModal}
                />
                <>
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
                </div>
                <div className="action-btn">
                    <Button label="Save"/>
                </div>
            </div>
        );
    }
}


export default MassMaintenanceAssembly;
