import React from "react";
import SimpleGrid from "../../../../shared/Frx-formulary/SimpleGrid/SimpleGrid";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import PlusIcon from "../../../../../assets/icons/PlusIcon.svg";

const MMDDSelectedFormulariesGrid = (props) => {
  const { gridColumns, maintenanceFormularies, addNew } = props;
  return (
    <div className="bordered details-top">
      <div>
        <PanelHeader
          title="SELECTED FORMULARIES"
          tooltip="SELECTED FORMULARIES"
        />
      </div>
      <div className="inner-container p-20">
        <div>
          <SimpleGrid
            columns={gridColumns}
            data={maintenanceFormularies?.list}
          />
        </div>
        <div className="dynamic-row-addition">
          <span onClick={addNew}>
            <img src={PlusIcon} alt="PlusIcon" />
            &nbsp;
            <span className="__add-new-row">add new</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MMDDSelectedFormulariesGrid;
