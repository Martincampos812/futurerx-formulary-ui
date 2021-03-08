import React from "react";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import DropDownMap from "../../shared/Frx-components/dropdown/DropDownMap";
import Button from "../../shared/Frx-components/button/Button";
import "./Alternatives.scss";
import SelectedAlternatives from "./SelectedDrugs";
import PrioritizeAlternatives from "./PrioritizeAlternatives";
import SelectFormularies from "./SelectFormularies";
import FrxLoader from "../../shared/FrxLoader/FrxLoader";
import {
  LOBS,
  TOAST_SUCCESS_TYPE,
  TOAST_INFO_TYPE,
  TOAST_WARNING_TYPE,
  TOAST_ERROR_TYPE,
  TOAST_MESSAGE_WARN_SELECT,
  TOAST_MESSAGE_SUCC_RESP,
} from "./helperStrings";
// redux actions
import {
  GET_FORMULARY_LOBS,
  GET_DRUGS_LIST,
  POST_DRUGS_LIST_UPDATE,
  GET_ALTERNATIVES_DRUGS_LIST,
  PUT_ALTERNATIVES_LIST,
  GET_FORMULARIES_LIST,
  SAVE_FORMULARIES_LIST,
  GET_ALL_MASTER_ALTERNATIVES_LIST_ONSEARCH,
  ADD_ALTERNATIVES_AND_GET_ID,
  KEY_INDEX,
  KEY_LIMIT,
} from "../../../api/http-common-fetch";
import {
  loadInitialState,
  fetchFormularyLobs,
  fetchDrugsList,
  updateAlternatives,
  updateDrugsListAlternativeAndFetchAlternatives,
  updatePrioritiesListAndFetchFormulariesList,
  saveFormularyWithAddedAlternatives,
  searchAlternatives,
  addAlternative,
} from "../../../redux/slices/alternatives/alternativeSlice";
import { setAdvancedSearch } from "../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { postMessage } from "../../../redux/slices/formulary/messaging/messagingSlice";

export interface IAlternativesState {
  showAlternativesForSelectedLob: boolean;
  applySelectedAlternative: boolean;
  showSelectFormulariesGrid: boolean;
  selectedLob: number;
  selectedLobText: string;
  drugsList: any[]; //based on response data ,eventually come from store
  drugsListCount: number; // no of data inapi response.
  formulariesList: any[]; //based on response data ,eventually come from store
  formulariesListCount: number; // no of data inapi response.
  alternativesList: any[]; //comes from store after api call
  formularyLobs: any[];
  isSearchOpen: boolean;
  addAlternative: number | undefined;
  // searchedAlternative: any;
  removedAlternativesList: number[];
  loadAlternativesSearch: boolean;
}

/**
 * @class Alternatives (Parent Heirarchy)
 * UI - DT
 * API - SJS
 * @author Deepak_T, SantoshJS
 */
class Alternatives extends React.Component<any, IAlternativesState> {
  constructor(props) {
    super(props);

    this.state = {
      showAlternativesForSelectedLob: false, // default false
      applySelectedAlternative: false, // default false
      showSelectFormulariesGrid: false, // default false
      loadAlternativesSearch: false,
      selectedLob: 0,
      selectedLobText: "",
      drugsList: [],
      drugsListCount: 0, //  update on api call
      formulariesList: [], //based on response data ,eventually come from store
      formulariesListCount: 0,
      alternativesList: [],
      formularyLobs: [],
      isSearchOpen: false,
      addAlternative: undefined,
      removedAlternativesList: [],
    };
    this.addAlternativeHandler = this.addAlternativeHandler.bind(this);
  }

  alternativesAppliedToformulary: number[] = [];

  initialPayload: any = {
    index: 0,
    limit: 10,
    filter: [],
    id_lob: 4,
    search_by: null,
    search_key: "",
    search_value: [],
    sort_by: [],
    sort_order: [],
  };

  initialDrugsPayload: any = {
    additional_filter: {
      is_add: false,
      is_all_tiers: false,
      is_exd: false,
      is_fff: false,
      is_frf: false,
      is_hi: false,
      is_ibf: false,
      is_lis: false,
      is_non_frf: false,
      is_otc: false,
      is_pa: false,
      is_pgc: false,
      is_st: false,
      is_user_defined1: false,
      is_user_defined2: false,
      is_user_defined3: false,
      is_user_defined4: false,
      is_user_defined5: false,
      is_vbid: false,
      tiers: [],
    },
    covered: {},
    not_covered: { drug_ids: [] },
    is_advance_search: false,
    filter: [{ prop: "lob_name", operator: "is", value: [4] }],
    search_key: "",
  };

  initialFormulariesPayload: any = {
    filter: [{ prop: "lob_name", operator: "is", value: [4] }],
    search_key: "",
    sort_by: ["contract_year", "lob_name", "formulary_name", "status"],
    sort_order: ["asc", "asc", "asc", "asc"],
  };

  drugsPagination: any = {
    index: 0,
    limit: 10,
  };

  formulariesPagination: any = {
    index: 0,
    limit: 10,
  };

  drugsPayload: any = {
    additional_filter: {
      is_add: false,
      is_all_tiers: false,
      is_exd: false,
      is_fff: false,
      is_frf: false,
      is_hi: false,
      is_ibf: false,
      is_lis: false,
      is_non_frf: false,
      is_otc: false,
      is_pa: false,
      is_pgc: false,
      is_st: false,
      is_user_defined1: false,
      is_user_defined2: false,
      is_user_defined3: false,
      is_user_defined4: false,
      is_user_defined5: false,
      is_vbid: false,
      tiers: [],
    },
    covered: {},
    not_covered: { drug_ids: [] },
    is_advance_search: false,
    filter: [{ prop: "lob_name", operator: "is", value: [4] }],
    search_key: "",
  };

  formulariesPayload: any = {
    filter: [{ prop: "lob_name", operator: "is", value: [4] }],
    search_key: "",
    sort_by: ["contract_year", "lob_name", "formulary_name", "status"],
    sort_order: ["asc", "asc", "asc", "asc"],
  };

  cleanAlternativeState(cleanLobsArr = true) {
    const INITIAL_STATE = {
      isLoading: false,
      payload: {
        lobs: cleanLobsArr ? null : this.state.formularyLobs,
        drugs: null,
        alternatives: null,
        formularies: null,
        alternativesSearch: [],
        response: null,
      },
      error: null,
    };
    this.props.loadInitialState(INITIAL_STATE);
    this.cleanAdvanceSearch();
  }

  /**
   * @function lobSelectionChange
   * handler for lob dropdown to choose an lob to apply
   * options - [{id: null, value: 4, text: "Commercial", ischecked: false},
   *            {id: null, value: 3, text: "Exchange", ischecked: false},
   *            {id: null, value: 2, text: "Medicaid", ischecked: false},
   *            {id: null, value: 1, text: "Medicare", ischecked: false}]
   * Single selection
   * @param selectedLob the lob chosen
   * @author Deepak_T
   */
  lobSelectionChange = (selectedLob: number) => {
    const selectedLobText = LOBS[selectedLob - 1];

    this.drugsPagination = { ...this.initialPayload };
    this.formulariesPagination = { ...this.initialPayload };
    this.drugsPayload = { ...this.initialDrugsPayload };
    this.formulariesPayload = { ...this.initialFormulariesPayload };
    this.setState(
      {
        drugsList: [],
        alternativesList: [],
        formulariesList: [],
        removedAlternativesList: [],
        selectedLob,
        selectedLobText,
        showAlternativesForSelectedLob: false,
        applySelectedAlternative: false,
        showSelectFormulariesGrid: false,
      },
      () => this.cleanAlternativeState(false)
    );
  };

  /**
   * @function applyDrugsSortHandler
   * handler for sorting when data for grid is fetched from server
   * @param key column key on sorting is applied
   * @param order ascend | descend
   * @author Deepak_T
   */
  applyDrugsSortHandler = (key: string, order: string) => {
    if (order) {
      console.log("key and order ", key, order);
      const listPayload = { ...this.drugsPayload };
      listPayload.sort_by = [key];
      const sortorder = order && order === "ascend" ? "asc" : "desc";
      listPayload.sort_order = [sortorder];
      this.drugsPayload = listPayload;
    } else {
      this.drugsPayload = this.initialDrugsPayload;
    }
    //call api to fetch
    this.fetchDataForAlternativeListGrid();
  };

  /**
   * @function applyFormulariesSortHandler
   * handler for sorting when data for grid is fetched from server
   * @param key column key on sorting is applied
   * @param order ascend | descend
   * @author Deepak_T
   */
  applyFormulariesSortHandler = (key: string, order: string) => {
    if (order) {
      console.log("key and order ", key, order);
      const listPayload = { ...this.formulariesPayload };
      listPayload.sort_by = [key];
      const sortorder = order && order === "ascend" ? "asc" : "desc";
      listPayload.sort_order = [sortorder];
      this.formulariesPayload = listPayload;
    } else {
      this.formulariesPayload = this.initialFormulariesPayload;
    }
    //call api to fetch
    this.onApplyPriorityGridAction(true);
  };

  /**
   * @function uniqByKeepLast
   * helper function to remove duplicates
   */
  uniqByKeepLast = (data) => {
    const result = Array.from(new Set(data.map((s) => s.columnKey))).map(
      (column) => {
        const getOrder =
          data.find((s) => s.columnKey === column).order === "ascend"
            ? "asc"
            : "desc";
        return {
          columnKey: column,
          order: getOrder,
        };
      }
    );
    return result;
  };

  /**
   * @function applyDrugsMultiSortHandler
   * handler for multi sorting when data for grid is fetched from server
   * @param sorter contains columns in order of priority on multi sorting is applied
   *
   * @author Deepak_T
   */
  applyDrugsMultiSortHandler = (sorter) => {
    console.log("multi sorted columns ", sorter);
    const listPayload = { ...this.drugsPayload };
    const updatedSorter = this.uniqByKeepLast(sorter);
    const sort_by = updatedSorter.map((e) => e.columnKey);
    const sort_order = updatedSorter.map((e) => e.order);
    listPayload.sort_by = sort_by;
    listPayload.sort_order = sort_order;
    this.drugsPayload = listPayload;

    //call api to fetch
    this.fetchDataForAlternativeListGrid();
  };

  /**
   * @function applyFormulariesMultiSortHandler
   * handler for multi sorting when data for grid is fetched from server
   * @param sorter contains columns in order of priority on multi sorting is applied
   *
   * @author Deepak_T
   */
  applyFormulariesMultiSortHandler = (sorter) => {
    console.log("multi sorted columns ", sorter);
    const listPayload = { ...this.formulariesPayload };
    const updatedSorter = this.uniqByKeepLast(sorter);
    const sort_by = updatedSorter.map((e) => e.columnKey);
    const sort_order = updatedSorter.map((e) => e.order);
    listPayload.sort_by = sort_by;
    listPayload.sort_order = sort_order;
    this.formulariesPayload = listPayload;

    //call api to fetch
    this.onApplyPriorityGridAction(true);
  };

  /**
   * @unction alternativeListTriDotClick
   * handler for tridot click
   * @param item menu item chosen from action items
   * @param data the row on which chosen menu action has to happen
   *
   * @author Deepak_T
   */
  alternativeListTriDotClick = (item: any, data: any) => {
    //do whatever action you want here
    console.log(item, data);
  };

  formulariesListTriDotClick = (item: any, data: any) => {
    //do whatever action you want here
    console.log(item, data);
  };

  /**
   * @function onApplyDrugsFilterHandler
   * handler for filtering when data for grid is fetched from server
   * @param filters contain information on filters chosen
   *
   */
  onApplyDrugsFilterHandler = (filters) => {
    const fetchObjectKeys = Object.keys(filters);
    if (fetchObjectKeys && fetchObjectKeys.length > 0) {
      const fetchedProps = Object.keys(filters)[0];
      const fetchedOperator =
        filters[fetchedProps][0].condition === "is like"
          ? "is_like"
          : filters[fetchedProps][0].condition === "is not"
          ? "is_not"
          : filters[fetchedProps][0].condition === "is not like"
          ? "is_not_like"
          : filters[fetchedProps][0].condition === "does not exist"
          ? "does_not_exist"
          : filters[fetchedProps][0].condition;
      const fetchedValues =
        filters[fetchedProps][0].value !== ""
          ? [filters[fetchedProps][0].value.toString()]
          : [];
      const newFilters = [
        {
          prop: fetchedProps,
          operator: fetchedOperator,
          values: fetchedValues,
        },
      ];
      this.drugsPayload.filter = newFilters;
      //call api to fetch
      this.fetchDataForAlternativeListGrid();
    } else {
      this.drugsPayload.filter = [];
      //call api to fetch
      this.fetchDataForAlternativeListGrid();
    }
  };

  /**
   * @function onApplyFormulariesFilterHandler
   * handler for filtering when data for grid is fetched from server
   * @param filters contain information on filters chosen
   *
   */
  onApplyFormulariesFilterHandler = (filters) => {
    const fetchObjectKeys = Object.keys(filters);
    if (fetchObjectKeys && fetchObjectKeys.length > 0) {
      const fetchedProps = Object.keys(filters)[0];
      const fetchedOperator =
        filters[fetchedProps][0].condition === "is like"
          ? "is_like"
          : filters[fetchedProps][0].condition === "is not"
          ? "is_not"
          : filters[fetchedProps][0].condition === "is not like"
          ? "is_not_like"
          : filters[fetchedProps][0].condition === "does not exist"
          ? "does_not_exist"
          : filters[fetchedProps][0].condition;
      const fetchedValues =
        filters[fetchedProps][0].value !== ""
          ? [filters[fetchedProps][0].value.toString()]
          : [];
      const newFilters = [
        {
          prop: fetchedProps,
          operator: fetchedOperator,
          values: fetchedValues,
        },
      ];
      this.formulariesPayload.filter = newFilters;
      //call api to fetch
      this.onApplyPriorityGridAction(true);
    } else {
      this.formulariesPayload.filter = [];
      //call api to fetch
      this.onApplyPriorityGridAction(true);
    }
  };

  /**
   * @function onPageSizeDrugsList
   * handler for fetching data from server when items per page is changed
   */
  onPageSizeDrugsList = (pageSize) => {
    this.drugsPagination = { ...this.initialPayload };
    this.drugsPagination.limit = pageSize;
    //call api to fetch
    this.fetchDataForAlternativeListGrid();
  };

  /**
   * @function onPageSizeFormulariesList
   * handler for fetching data from server when items per page is changed
   */
  onPageSizeFormulariesList = (pageSize) => {
    this.formulariesPagination = { ...this.initialPayload };
    this.formulariesPagination.limit = pageSize;
    //call api to fetch
    this.onApplyPriorityGridAction(true);
  };

  /**
   * @function onDrugsListGridPageChangeHandler
   * handler for fetching data from server when page number is changed
   */
  onDrugsListGridPageChangeHandler = (pageNumber: any) => {
    this.drugsPagination.index = (pageNumber - 1) * this.drugsPagination.limit;
    //call api to fetch
    this.fetchDataForAlternativeListGrid();
  };

  /**
   * @function onFormulariesListGridPageChangeHandler
   * handler for fetching data from server when page number is changed
   */
  onFormulariesListGridPageChangeHandler = (pageNumber: any) => {
    this.formulariesPagination.index =
      (pageNumber - 1) * this.formulariesPagination.limit;
    //call api to fetch
    this.onApplyPriorityGridAction(true);
  };

  /**
   * @function onClearFilterHandlerDrugsList
   * handler for fetching data from server when filters are cleared
   */
  onClearFilterHandlerDrugsList = () => {
    this.drugsPagination = { ...this.initialPayload };
    this.drugsPayload = { ...this.initialDrugsPayload };
    this.drugsPayload.filter = [...this.initialDrugsPayload.filter];
    //call api to fetch
    this.fetchDataForAlternativeListGrid();
  };

  /**
   * @function onClearFilterHandlerFormulariesList
   * handler for fetching data from server when filters are cleared
   */
  onClearFilterHandlerFormulariesList = () => {
    this.formulariesPagination = { ...this.formulariesPagination };
    this.formulariesPayload = {
      ...this.initialFormulariesPayload,
    };
    this.formulariesPayload.filter = [...this.initialFormulariesPayload.filter];
    //call api to fetch
    this.onApplyPriorityGridAction(true); // true to call only formulary list
  };

  async componentDidMount() {
    let apiDetails = {};
    apiDetails["apiPart"] = GET_FORMULARY_LOBS;
    await this.props.fetchFormularyLobs();
    this.setState(
      {
        selectedLob: 4,
        selectedLobText: LOBS[3],
        showAlternativesForSelectedLob: true, // temp for now to fetch drugs by default with COMM lOB > should be on lob apply
      },
      () => this.fetchDataForAlternativeListGrid()
    );
  }

  cleanAdvanceSearch = () => {
    let payload = {
      advancedSearchBody: null,
      populateGrid: false,
      closeDialog: false,
      listItemStatus: {},
    };
    this.drugsPayload = this.initialDrugsPayload;
    this.props.setAdvancedSearch(payload);
  };

  componentWillUnmount() {
    this.cleanAlternativeState();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.showToaster(nextProps.error.message, TOAST_ERROR_TYPE);
    }

    if (nextProps.formularyLobs) {
      this.setState({
        formularyLobs: nextProps.formularyLobs,
      });
    }

    if (nextProps.drugsList) {
      const drugsList: any[] = nextProps.drugsList.result;
      const count: number = nextProps.drugsList.count;
      const data = drugsList.map((row, index) => {
        const rowData = { ...row };
        rowData["id"] = index + 1;
        rowData["key"] = index + 1;
        return rowData;
      });
      this.setState({
        drugsList: data,
        // drugsList,
        drugsListCount: count,
        // showAlternativesForSelectedLob: true,
      });
    }

    if (nextProps.advanceSearchPayload) {
      this.drugsPayload = {
        ...this.drugsPayload,
        ...nextProps.advanceSearchPayload,
      };
      this.fetchDataForAlternativeListGrid();
      this.advanceSearchClosekHandler();
      this.cleanAdvanceSearch();
    }

    // if (nextProps.alternativesList.length > 0) {
    //   const data: any[] = nextProps.alternativesList;
    //   const alternativesList = data.map((row, index) => {
    //     const rowData = { ...row };
    //     rowData["index"] = index + 1;
    //     rowData["key"] = (index + 1).toString();
    //     return rowData;
    //   });
    //   this.setState({
    //     alternativesList,
    //   });
    // }

    if (nextProps.formulariesList) {
      const formulariesList: any[] = nextProps.formulariesList.data;
      const count: number = nextProps.formulariesList.count;
      const data = formulariesList.map((row, index) => {
        const rowData = { ...row };
        rowData["id"] = index + 1;
        rowData["key"] = index + 1;
        return rowData;
      });
      this.setState({
        formulariesList: data,
        formulariesListCount: count,
        showSelectFormulariesGrid: true,
      });
    }

    if (nextProps.formularySaved) {
      if (nextProps.formularySaved.message === "ok")
        this.showToaster(
          TOAST_MESSAGE_SUCC_RESP + this.alternativesAppliedToformulary,
          TOAST_SUCCESS_TYPE
        );
      else {
        this.showToaster(nextProps.formularySaved.message, TOAST_ERROR_TYPE);
      }
    }
  }

  /**
   * @function onApplySelectedLob
   * to display alternatives for the this.state.selectedlob
   */
  onApplySelectedLob = () => {
    if (this.state.selectedLob === 0) {
      this.showToaster(TOAST_MESSAGE_WARN_SELECT + "LOB", TOAST_WARNING_TYPE);
      return;
    }
    this.setState(
      {
        showAlternativesForSelectedLob: true,
      },
      () => {
        this.fetchDataForAlternativeListGrid();
      }
    );
  };

  /**
   * @function fetchDataForAlternativeListGrid
   * to fetch alternative list data from store
   * TODO: once apis are ready maybe data fetchign can be done in alternatives component
   * @author Deepak_T
   */
  fetchDataForAlternativeListGrid = () => {
    const payload = {
      apiPart: GET_DRUGS_LIST,
      pathParams: this.state.selectedLob === 0 ? 4 : this.state.selectedLob,
      keyVals: [
        { key: KEY_INDEX, value: this.drugsPagination.index },
        { key: KEY_LIMIT, value: this.drugsPagination.limit },
      ],
      messageBody: this.drugsPayload,
    };

    this.props.fetchDrugsList(payload);
  };

  applySelectedAlternativeHandler = (selectedAlternatives) => {
    if (selectedAlternatives.length === 0) {
      this.showToaster(TOAST_MESSAGE_WARN_SELECT + "drug", TOAST_WARNING_TYPE);
      return;
    }
    const drugs = selectedAlternatives.map((drug) => drug.toString());
    this.setState({
      applySelectedAlternative: true,
    });
    const requestPayloadOrBodyUpdate = {
      selected_drugs: drugs,
    };

    const requestPayloadOrBodyPriority = {
      rxcuis: drugs,
    };

    const payload = {
      update: {
        apiPart: POST_DRUGS_LIST_UPDATE + this.state.selectedLob,
        messageBody: requestPayloadOrBodyUpdate,
      },
      alternatives: {
        apiPart: GET_ALTERNATIVES_DRUGS_LIST + this.state.selectedLob,
        messageBody: requestPayloadOrBodyPriority,
      },
    };

    this.props.updateDrugsListAlternativeAndFetchAlternatives(payload);
  };

  onApplyPriorityGridAction = (onlyFetchFormulariesList: boolean) => {
    const alternatives = this.state.alternativesList.map((priority: any) => {
      return {
        alternative_rxcui: priority.alternative_rxcui,
        id_alternative_drug: priority.id_alternative_drug,
        label_name: priority.label_name,
        priority: priority.priority,
      };
    });

    const removed_alternatives = this.state.removedAlternativesList;

    const payload = {
      onlyFetchFormulariesList,
      update: {
        apiPart: PUT_ALTERNATIVES_LIST,
        pathParams: this.state.selectedLob,
        messageBody: {
          alternatives,
          removed_alternatives,
        },
      },

      formularies: {
        apiPart: GET_FORMULARIES_LIST,
        keyVals: [
          { key: KEY_INDEX, value: this.formulariesPagination.index },
          { key: KEY_LIMIT, value: this.formulariesPagination.limit },
        ],
        messageBody: this.formulariesPayload,
      },
    };

    this.props.updatePrioritiesListAndFetchFormulariesList(payload);
  };

  onSaveFormulariesHandler = (selectedFormulary) => {
    if (selectedFormulary.length === 0) {
      this.showToaster(
        TOAST_MESSAGE_WARN_SELECT + "formulary",
        TOAST_WARNING_TYPE
      );
      return;
    }
    const alternatives_drugs = this.state.alternativesList.map(
      (priority: any) => priority.id_alternative_drug
    );
    const formularies = selectedFormulary;

    const payload = {
      apiPart: SAVE_FORMULARIES_LIST,
      pathParams: this.state.selectedLob,
      messageBody: {
        alternatives_drugs,
        formularies,
      },
    };

    this.alternativesAppliedToformulary = formularies;
    this.props.saveFormularyWithAddedAlternatives(payload);
  };

  onCancelFormulariesHandler = () => {
    this.drugsPagination = { ...this.initialPayload };
    this.formulariesPagination = { ...this.initialPayload };
    this.drugsPayload = { ...this.initialDrugsPayload };
    this.formulariesPayload = { ...this.initialFormulariesPayload };
    this.setState({
      drugsList: [],
      alternativesList: [],
      formulariesList: [],
      removedAlternativesList: [],
      showAlternativesForSelectedLob: false,
      applySelectedAlternative: false,
      showSelectFormulariesGrid: false,
    });

    this.cleanAlternativeState(true);
    this.showToaster("Cleared data", TOAST_SUCCESS_TYPE);
  };

  handleGridPriorityOrder = (data: any[]) => {
    const orderedData = data.map((rowData) => {
      let row = { ...rowData };
      if (row.id_alternative_drug === null) {
        this.props.alternativesList.some(alt => {
          if (row.alternative_rxcui === alt.alternative_rxcui) {
            row = {
              id_alternative_drug: alt.id_alternative_drug,
              alternative_rxcui: alt.alternative_rxcui,
              priority: alt.priority,
              label_name: alt.label_name,
              index: alt.index,
              key: alt.key,
            };
            // row.id_alternative_drug=alt.id_alternative_drug;
            // row.alternative_rxcui=alt.alternative_rxcui;
            // row.priority=alt.priority;
            // row.label_name=alt.label_name;
            // row.index=alt.index;
            // row.key=alt.key;
            return true;
          }
          return null;
        });
      }
      return row;
    });
    this.props.updateAlternatives({ data: orderedData });
  };

  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: true });
  };

  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: false });
  };

  handleSearch = (value) => {
    const payload = {
      apiPart: GET_ALL_MASTER_ALTERNATIVES_LIST_ONSEARCH,
      pathParams: this.state.selectedLob,
      keyVals: [{ key: "search_value", value }],
    };
    this.props.searchAlternatives(payload);
  };

  handleChange = (value) => {
    this.props.alternativesToAddArr.some((alternative) => {
      if (alternative.alternative_rxcui === value) {
        this.setState({
          addAlternative: value,
        });
        return true;
      }
      return null;
    });
  };

  async addAlternativeHandler() {
    const payload = {
      LOB_ID: this.state.selectedLob,
      messageBody: {},
    };
    const alternatives: any[] = [...this.props.alternativesList];
    if (
      alternatives.filter(
        (alternative: any) =>
          alternative.alternative_rxcui == this.state.addAlternative
      ).length > 0
    ) {
      this.showToaster("Alternative already exists", TOAST_WARNING_TYPE);
      return;
    }

    this.props.alternativesToAddArr.some((alt) => {
      const alternative = { ...alt };
      if (alternative.alternative_rxcui === this.state.addAlternative) {
        const nth = alternatives.length;
        alternatives.push({
          ...alternative,
          id_alternative_drug: null,
          priority: nth + 1,
          alternative_rxcui: alternative.alternative_rxcui.toString(),
        });

        payload.messageBody = {
          id_alternative_drug: null,
          alternative_rxcui: alternative.alternative_rxcui.toString(),
          priority: nth + 1,
          alternative_gpi: alternative.alternative_gpi,
          key: alternative.key,
          label_name: alternative.label_name,
          text: alternative.text,
          value: alternative.value,
        };
        return true;
      }
      return null;
    });

    await this.props.updateAlternatives({ data: alternatives });
    await this.props.addAlternative(payload);
  }

  /**
   * @function onColumnCellClick
   * the row data and the column key is available in the function
   * Can be used to perform delete action
   * @param item the data row
   * @key the column key
   */
  onAlternativeDeleteAction = (item: any, key: string) => {
    if (key === "delete") {
      // do action to remove item from grid and update data
      const alternativesList = this.props.alternativesList.filter(
        (alternative: any) =>
          alternative.id_alternative_drug !== item.id_alternative_drug
      );
      // .map((alternative: any, index: number) => {
      //   alternative["index"] = index + 1;
      //   alternative["key"] = (index + 1).toString();
      //   alternative["priority"] = index + 1;
      //   return alternative;
      // });
      const removedAlternativesList = this.props.alternativesList
        .filter(
          (alternative: any) =>
            alternative.id_alternative_drug === item.id_alternative_drug
        )
        .map((alternative: any) => alternative.id_alternative_drug);
      this.props.updateAlternatives({ data: alternativesList });
      this.setState({
        removedAlternativesList: [
          ...this.state.removedAlternativesList,
          ...removedAlternativesList,
        ],
      });
    }
  };

  showToaster = (message: string, type: string = TOAST_INFO_TYPE) => {
    this.props.postMessage({
      message,
      type,
    });
  };

  render() {
    const { formularyLobs, selectedLobText } = this.state;
    return (
      <div className="alternatives-wrapper">
        <div className="border br-5 mb-10">
          <div className="header">FORMULARY ALTERNATIVES</div>
          <div className="alternative-lob-wrapper">
            <label>
              SELECT A LINE OF BUSINESS <span className="asterisk">*</span>
            </label>
            <Box display="flex">
              <DropDownMap
                className="formulary-type-dropdown"
                placeholder="All"
                options={formularyLobs ? formularyLobs : []}
                onChange={this.lobSelectionChange}
                valueProp={"value"}
                dispProp={"text"}
                value={selectedLobText}
              />
              <Button label="Apply" onClick={this.onApplySelectedLob} />
            </Box>
          </div>
        </div>

        {/* GRID FOR SELECTING ALTERNATIVES TO APPLY */}
        {this.state.showAlternativesForSelectedLob && (
          <SelectedAlternatives
            onPageSize={this.onPageSizeDrugsList}
            pageSize={this.drugsPagination.limit}
            selectedCurrentPage={
              this.drugsPagination.index / this.drugsPagination.limit + 1
            }
            alternativeListTriDotClick={(item, data) => {
              this.alternativeListTriDotClick(item, data);
            }}
            isFetchingData={this.props.isLoading}
            totalRows={this.state.drugsListCount}
            applySortHandler={this.applyDrugsSortHandler}
            applyMultiSortHandler={this.applyDrugsMultiSortHandler}
            onPageChangeHandler={this.onDrugsListGridPageChangeHandler}
            onClearFilterHandler={this.onClearFilterHandlerDrugsList}
            applyFilter={this.onApplyDrugsFilterHandler}
            drugsList={this.state.drugsList}
            onApplyAlternatives={this.applySelectedAlternativeHandler}
            advanceSearchClickHandler={this.advanceSearchClickHandler}
            advanceSearchClosekHandler={this.advanceSearchClosekHandler}
            isSearchOpen={this.state.isSearchOpen}
          />
        )}

        {/* THE GRID FOR PRIORITIZING */}
        {this.state.applySelectedAlternative && (
          <PrioritizeAlternatives
            // data={this.state.alternativesList}
            data={
              this.props.alternativesList.length === 0
                ? []
                : this.props.alternativesList
            }
            loading={this.props.isLoading}
            handleGridPriorityOrder={this.handleGridPriorityOrder}
            onApplyPriorityGridAction={this.onApplyPriorityGridAction}
            addAlternative={this.state.addAlternative}
            alternativesToAddArr={this.props.alternativesToAddArr}
            pageSize={this.state.alternativesList.length + 100}
            handleSearch={(value) => this.handleSearch(value)}
            handleChange={(value) => this.handleChange(value)}
            addAlternativeHandler={this.addAlternativeHandler}
            onAlternativeDeleteAction={this.onAlternativeDeleteAction}
          />
        )}

        {/* GRID FOR SELECTING FORMULARIES TO SAVE WITH ALTERNATIVES */}
        {this.state.showSelectFormulariesGrid && (
          <SelectFormularies
            onPageSize={this.onPageSizeFormulariesList}
            pageSize={this.formulariesPagination.limit}
            selectedCurrentPage={
              this.formulariesPagination.index /
                this.formulariesPagination.limit +
              1
            }
            formulariesListTriDotClick={(item, data) => {
              this.formulariesListTriDotClick(item, data);
            }}
            isFetchingData={this.props.isLoading}
            totalRows={this.state.formulariesListCount}
            applySortHandler={this.applyFormulariesSortHandler}
            applyMultiSortHandler={this.applyFormulariesMultiSortHandler}
            onPageChangeHandler={this.onFormulariesListGridPageChangeHandler}
            onClearFilterHandler={this.onClearFilterHandlerFormulariesList}
            applyFilter={this.onApplyFormulariesFilterHandler}
            formulariesList={this.state.formulariesList}
            onSaveFormulary={this.onSaveFormulariesHandler}
            onCancelFormulary={this.onCancelFormulariesHandler}
          />
        )}
        {this.props.isLoading && <FrxLoader />}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoading: state.alternative.isLoading,
    formularyLobs: state.alternative.payload.lobs,
    drugsList: state.alternative.payload.drugs,
    alternativesList: state.alternative.payload.alternatives,
    alternativesToAddArr: state.alternative.payload.alternativesSearch,
    formulariesList: state.alternative.payload.formularies,
    formularySaved: state.alternative.payload.response,
    error: state.alternative.error,
    advanceSearchPayload: state.advancedSearch.advancedSearchBody,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialState: (payload) => dispatch(loadInitialState(payload)),
    updateAlternatives: (payload) => dispatch(updateAlternatives(payload)),
    fetchFormularyLobs: (apiPayload) =>
      dispatch(fetchFormularyLobs(apiPayload)),
    fetchDrugsList: (apiPayload) => dispatch(fetchDrugsList(apiPayload)),
    updateDrugsListAlternativeAndFetchAlternatives: (apiPayload) =>
      dispatch(updateDrugsListAlternativeAndFetchAlternatives(apiPayload)),
    updatePrioritiesListAndFetchFormulariesList: (apiPayload) =>
      dispatch(updatePrioritiesListAndFetchFormulariesList(apiPayload)),
    saveFormularyWithAddedAlternatives: (apiPayload) =>
      dispatch(saveFormularyWithAddedAlternatives(apiPayload)),
    searchAlternatives: (apiPayload) =>
      dispatch(searchAlternatives(apiPayload)),
    addAlternative: (apiPayload) => dispatch(addAlternative(apiPayload)),
    setAdvancedSearch: (searchPayload) =>
      dispatch(setAdvancedSearch(searchPayload)),
    postMessage: (message) => dispatch(postMessage(message)),
  };
};

export default connect(mapState, mapDispatch)(Alternatives);
