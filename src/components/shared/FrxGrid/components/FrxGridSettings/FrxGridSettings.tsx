/**
 * Component to be used with grid settings drawer for actual settings view
 * @author Deepak_T
 * @version 1.0.0
 *
 * TODO: Refactor css class names
 */

//react imports
import * as React from "react";
import { Component } from "react";
import "./FrxGridSettings.scss";

//3rd party imports
import * as _ from "lodash";

//models imports
import { Column } from "../../../../../models/grid.model";

// import "./grid-settings.styles.scss";

interface FrxGridSettingsProps<RecordType> {
  onShowColumn: (column: Column<RecordType>) => void;
  onCancelSettings: () => void;
  onApplySettings: () => void;
  onHideColumn: (column: Column<RecordType>) => void;
  fixedColumns: string[];
  visibleColumns: Column<RecordType>[];
  hiddenColumns: Column<RecordType>[];
  columns?: Column<RecordType>[];
}

class FrxGridSettings extends Component<FrxGridSettingsProps<any>> {
  /**
   * @function getAvailableColumns
   * to get the list of non hidden columns
   * @author Deepak_T
   */
  getAvailableColumns = () => {
    const visibleColumns = _.cloneDeep(this.props.visibleColumns);
    return visibleColumns.map((column: Column<any>) => {
      return (
        <React.Fragment key={column.key}>
          <div
            onClick={() => this.onHideColumn(column)}
            className="frx-grid-settings__column-container__displayed-columns__list__item"
          >
            <span className="frx-grid-settings__column-container__displayed-columns__list__item__label">
              {column.displayTitle}
              {!this.props.fixedColumns.includes(column.key) ? (
                <i
                  onClick={() => this.onHideColumn(column)}
                  className="fa fa-minus-circle frx-grid-settings__column-container__displayed-columns__list__item__label__icon"
                ></i>
              ) : null}
            </span>
          </div>
        </React.Fragment>
      );
    });
  };

  /**
   * @function getHiddenColumns
   * to get the list of hidden columns
   * @author Deepak_T
   */
  getHiddenColumns = () => {
    const hiddenColumns = _.cloneDeep(this.props.hiddenColumns);
    return hiddenColumns.map((column: Column<any>) => {
      return (
        <div
          key={column.key}
          onClick={() => this.onShowColumn(column)}
          className="frx-grid-settings__column-container__available-columns__list__item"
        >
          <span className="frx-grid-settings__column-container__available-columns__list__item__label">
            {column.displayTitle}
            <i
              onClick={() => this.onShowColumn(column)}
              className="fa fa-plus-circle frx-grid-settings__column-container__available-columns__list__item__label__icon"
            ></i>
          </span>
        </div>
      );
    });
  };

  /**
   * @function onHideColumn
   * to move a column from displayed to available list
   * @param column Column object of generic data type T
   * @author Deepak_T
   */
  onHideColumn = (column: Column<any>) => {
    if (this.props.fixedColumns.includes(column.key)) return;
    this.props.onHideColumn(column);
  };

  /**
   * @function onShowColumn
   * to move a column from available to displayed list
   * @param column Column object of generic data type T
   * @author Deepak_T
   */
  onShowColumn = (column: Column<any>) => {
    this.props.onShowColumn(column);
  };

  /**
   * @function onApplySettings
   * to apply the new grid setings
   * @author Deepak_T
   */
  onApplySettings = () => {
    this.props.onApplySettings();
  };

  /**
   * @function onCancelSettings
   * to cancel the settings drawer
   * @author Deepak_T
   */
  onCancelSettings = () => {
    this.props.onCancelSettings();
  };

  render() {
    return (
      <div className="frx-grid-settings">
        <p className="frx-grid-settings__column-heading">
          Select columns to display on the grid. Tap Apply when finished.
        </p>
        <div className="frx-grid-settings__column-container">
          <div className="frx-grid-settings__column-container__available-columns">
            <h4 className="frx-grid-settings__column-container__available-columns__title">
              Available Columns
            </h4>

            {this.props.hiddenColumns && this.props.hiddenColumns.length > 0 ? (
              <div className="frx-grid-settings__column-container__available-columns__list scroll-bar">
                {this.getHiddenColumns()}
              </div>
            ) : null}
          </div>
          <div className="frx-grid-settings__column-container__displayed-columns">
            <h4 className="frx-grid-settings__column-container__displayed-columns__title">
              Displayed Columns
            </h4>

            {this.props.visibleColumns &&
            this.props.visibleColumns.length > 0 ? (
              <div className="frx-grid-settings__column-container__displayed-columns__list scroll-bar">
                {this.getAvailableColumns()}
              </div>
            ) : null}
          </div>
        </div>
        <div className="frx-grid-settings__actions">
          <button
            onClick={(e) => this.onCancelSettings()}
            className="frx-grid-settings__actions__btn frx-grid-settings__actions__btn--cancel"
          >
            Cancel
          </button>
          <button
            className="frx-grid-settings__actions__btn frx-grid-settings__actions__btn--apply"
            onClick={(e) => this.onApplySettings()}
          >
            Apply
          </button>
        </div>
      </div>
    );
  }
}

export default FrxGridSettings;
