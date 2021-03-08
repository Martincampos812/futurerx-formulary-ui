import React from "react";
import "./Formulary.scss";
// Material - ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Components
import FormularySearch from "./Components/FormularySearch/FormularySearch";
import FormularyTable from "./Components/FormularyTable/FormularyTable";
import {
  formularyGridData,
  formularyGenericGridData,
  formularyAlternativeGridData,
} from "../../mocks/grid/formulary-table";
import { formularyGridColumns } from "../../utils/grid/columns";
import FormularyDetailedTable from "./Components/FormularyTable/FormularyDetailedTable";

export interface FormularyProps {
  history: any;
}

class Formulary extends React.Component<FormularyProps> {
  state = {
    isFetchingData: false,
    data: [] as any[],
    filteredData: [] as any[],
    mainTableView: true,
    selectedData: undefined,
    searchHistory: [],
    searchInput: "",
    activeOption: 0,
    filteredOptions: [] as any[],
    showOptions: false,
    searchData: false,
  };

  componentDidMount() {
    const data = formularyGridData();
    this.setState({ data, filteredData: data });
  }

  onSearchHistoryCreation = (data: any) => {
    if (this.state.searchHistory.length >= 2) return;

    this.setState({
      searchHistory: [...this.state.searchHistory, data],
      selectedData: data,
      mainTableView: false,
    });
  };

  onBreadcrumbChange = (item: any) => {
    console.log("crumb chage ", item);
    const idx = this.state.searchHistory.findIndex(
      (historyItem: { id: number }) => historyItem.id === item.id
    );

    let history: any[] = [...this.state.searchHistory];
    if (idx !== -1 && idx !== history.length - 1) {
      history = [...history.slice(0, idx), item];
    }
    console.log("history of search ", history);
    let mainTableView = false;
    if (history.length < 1) mainTableView = true;
    this.setState({
      searchHistory: [...history],
      mainTableView,
      selectedData: item,
    });
  };

  /**
   * @function handleSearch
   * to handle the search from FrxSearch and update data set passed to FrxGrid
   *
   * TODO: fix a type for the searchObject
   * @author Deepak_T
   */
  handleSearch = (searchObject) => {
    console.log(searchObject);
    this.setState({ isFetchingData: true });
    if (searchObject && searchObject.status) {
      setTimeout(() => {
        const newData = this.state.data.filter(
          (d) => d.status === searchObject.status
        );
        this.setState({ isFetchingData: false, filteredData: newData });
      }, 2000);
    } else {
      this.setState({ isFetchingData: false });
    }
  };

  handleChange = (event) => {
    // this.setState({ searchInput: event.target.value });
    //   () => {
    //   this.globalSearch();
    // });
    const { data } = this.state;
    const searchInput = event.target.value;
    // let filteredOptions = data.filter(optionName => {
    //   return optionName.labelname
    //     .toLowerCase()
    //     .indexOf(searchInput.toLowerCase())> -1;
    // });
    const filteredOptions = data.filter(
      (option) =>
        option.labelname.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
    );
    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      searchInput: event.target.value,
    });
  };

  handleOptionOnClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      searchInput: e.target.innerText,
    });
  };

  handleOnKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        searchInput: filteredOptions[activeOption].labelname,
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  globalSearch = () => {
    let { searchInput, data, filteredData } = this.state;
    let validate = this.searchValidate();
    if (validate) {
      let filteredData = data.filter((value) => {
        return value.labelname
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      this.setState({
        filteredData,
        searchData: true,
      });
      console.log("filteredData", filteredData);
    }
  };

  // simple seach input validator
  searchValidate = () => {
    let emptySearchField = "";
    if (!this.state.searchInput) {
      emptySearchField = "";
    } else {
      return true;
    }
  };

  render() {
    const maincolumns = formularyGridColumns();
    const {
      filteredData,
      data,
      searchData,
      searchHistory,
      activeOption,
      filteredOptions,
      showOptions,
      searchInput,
    } = this.state;
    const { handleChange, handleOptionOnClick, handleOnKeyDown } = this;
    let optionList;
    if (showOptions && searchInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="formulary-filtered-options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active";
              }
              return (
                <li
                  className={className}
                  key={index}
                  onClick={handleOptionOnClick}
                >
                  {optionName.labelname}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <span>Drug Name Not Found</span>
          </div>
        );
      }
    }
    return (
      <>
        <div
          className={
            searchData
              ? "formulary-searching-root-table"
              : "formulary-searching-root"
          }
        >
          <FormularySearch
            searchInput={searchInput}
            handleChange={handleChange}
            globalSearch={this.globalSearch}
            handleOnKeyDown={handleOnKeyDown}
            optionList={optionList}
          />
        </div>
        {this.state.mainTableView ? (
          <>
            {searchData === filteredData.length > 0 &&
            searchHistory.length === 0 ? (
              <FormularyTable
                onSearchHistoryCreation={this.onSearchHistoryCreation}
                isFetchingData={this.state.isFetchingData}
                onBreadcrumbChange={this.onBreadcrumbChange}
                handleSearch={this.handleSearch}
                searchHistory={this.state.searchHistory}
                history={this.props.history}
                columns={maincolumns}
                data={filteredData && filteredData.length ? filteredData : data}
                selectedData={this.state.selectedData}
              />
            ) : (
              <div className="formulary-no-records">
                {/* <span>No records*</span> */}
              </div>
            )}
          </>
        ) : (
          <>
            {searchData === filteredData.length > 0 &&
            searchHistory.length > 0 ? (
              <FormularyDetailedTable
                onSearchHistoryCreation={this.onSearchHistoryCreation}
                onBreadcrumbChange={this.onBreadcrumbChange}
                handleSearch={this.handleSearch}
                searchHistory={this.state.searchHistory}
                history={this.props.history}
                columns={maincolumns}
                data={filteredData && filteredData.length ? filteredData : data}
                alternateGridData={formularyAlternativeGridData()}
                filteredData={filteredData}
                genericGridData={formularyGenericGridData()}
                selectedData={this.state.selectedData}
                isFetchingData={this.state.isFetchingData}
              />
            ) : (
              <div>{/* <span>No records*</span> */}</div>
            )}
          </>
        )}
      </>
    );
  }
}

export default Formulary;
