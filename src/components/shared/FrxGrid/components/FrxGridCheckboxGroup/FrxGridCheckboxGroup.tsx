/**
 * Component for wrapping checkbox header cell & body cell column in grid
 * @author Santosh_JS
 * @version 1.0.0
 */

import * as React from "react";
import FrxGridCheckboxHeaderCell from "../FrxGridCheckboxHeaderCell/FrxGridCheckboxHeaderCell";
import FrxGridRowSelectionCell from "../FrxGridRowSelectionCell/FrxGridRowSelectionCell";
import "./FrxGridCheckboxGroup.scss";

interface FrxGridCheckboxGroupCellProps {
  isHeaderCell: boolean;
  currentRowRecord?: any;
  onSelectMulitple: (e, record) => void;
  onSelectAll: (e) => void;
  allRecordsLength?: number;
  selectedRowArrLength: number;
}

export default function FrxGridCheckboxGroupCell(
  props: FrxGridCheckboxGroupCellProps | any
) {
  const {
    isHeaderCell,
    currentRowRecord,
    onSelectMulitple,
    selectedRowArrLength,
    allRecordsLength,
    onSelectAll,
  } = props;

  let indeterminateCheckbox = false;
  let isHeadChecked = false;
  if (allRecordsLength) {
    if (selectedRowArrLength <= 0 || selectedRowArrLength >= allRecordsLength) {
      indeterminateCheckbox = false;
      if (selectedRowArrLength >= allRecordsLength) isHeadChecked = true;
    } else {
      indeterminateCheckbox = true;
    }
  }

  let isChecked = false;
  if (!isHeaderCell) {
    isChecked = currentRowRecord.checked || false;
  }
  return (
    <div className="frx-grid-checkbox-group-root">
      {isHeaderCell ? (
        <FrxGridCheckboxHeaderCell
          onSelectAll={onSelectAll}
          isChecked={isHeadChecked}
          // empty and full => false || mid => true
          isIndeterminate={indeterminateCheckbox}
        />
      ) : (
        <FrxGridRowSelectionCell
          onSelectMulitple={onSelectMulitple}
          currentRowRecord={currentRowRecord}
          isChecked={isChecked}
        />
      )}
    </div>
  );
}
