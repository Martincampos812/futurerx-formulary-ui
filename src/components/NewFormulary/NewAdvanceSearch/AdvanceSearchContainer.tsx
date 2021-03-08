import React, { Component } from "react";
import "./AdvanceSearchContainer.scss";
import Grid from "@material-ui/core/Grid";
import { Button, Input, Box } from "@material-ui/core";
import FrxDialogPopup from "../../shared/FrxDialogPopup/FrxDialogPopup";
import {
  getCategoryList,
  getAdditionalCriteriaSectionList,
} from "./advanceSearchMock";
import ListItemContainer from "./components/ListItemContainer/ListItemContainer";
import FileType from "./CategoriesComponents/FileTypes/FileType";
import Tire from "./CategoriesComponents/Tire/Tire";
import UmFilter from "./CategoriesComponents/UmFilter/UmFilter";
import DrugCategory from "./CategoriesComponents/DrugCategory/DrugCategory";
import GpiLableSearch from "./CategoriesComponents/Gpi/GpiLableSearch";
import ReferenceNdc from "./CategoriesComponents/ReferenceNdc/ReferenceNdc";

import { setAdvancedSearch } from "../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { setAdditionalCriteria } from "../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";
import { connect } from "react-redux";

import AdditionalCriteriaContainer from "./AdditionalCriteriaContainer/AdditionalCriteriaContainer";

function mapDispatchToProps(dispatch) {
  return {
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a)),
    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
    listItemStatus: state?.advancedSearch?.listItemStatus,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,

    additionalCriteria: state?.additionalCriteria,
  };
};

interface Props {
  openPopup: boolean;
  onClose: () => void;
  setAdvancedSearch: (a) => void;
  setAdditionalCriteria: (a) => void;
  advancedSearchBody: any;
  populateGrid: any;
  closeDialog: any;
  listItemStatus: any;
  formulary_lob_id: any;

  // additional Criteria
  isAdvanceSearch: boolean;
  additionalCriteria: any;
  fileType?: any;
  editable?: boolean;
}
interface State {}

/**
 * @class AdvanceSearchContainer
 * Advance Search - UI + Functionality + Redux State Anil, Harish
 * Additional Criteria - UI + Functionality + Redux State Santosh
 * @author Anil, Harish, SantoshJS
 */
class AdvanceSearchContainer extends Component<Props, State> {
  state = {
    categories: getCategoryList(), //[],
    selectedCategory: 0,
    selectedCateoryList: Array(),
    additionalFilter: {
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
      is_st: false,
      is_pgc: false,
      is_user_defined1: false,
      is_user_defined2: false,
      is_user_defined3: false,
      is_user_defined4: false,
      is_user_defined5: false,
      is_vbid: false,
      is_no_tier: false,
      tiers: Array(),
    },
    additionalFilterNonMcr: {
      is_al: false,
      is_all_tiers: false,
      is_gl: false,
      is_icdl: false,
      is_pa: false,
      is_st: false,
      is_pn: false,
      is_pr: false,
      is_ps: false,
      is_pt: false,
      is_ql: false,
      is_frf: false,
      is_other1: false,
      is_other2: false,
      is_other3: false,
      is_other4: false,
      is_other5: false,
      is_no_tier: false,
      tiers: Array(),
    },
    nodeList: Array(),
    idCount: 0,

    // State for additional criteria
    // isAdvanceSearch: true,
    criteriaList: getAdditionalCriteriaSectionList(),
    additionalCriteriaArray: [],
  };

  onClose = () => {
    this.setState({ open: !this.props.openPopup });
  };
  action = () => {
    console.log("nothing for now");
  };

  componentDidMount = () => {
    if (
      this.props.advancedSearchBody &&
      this.props.advancedSearchBody.additional_filter
    ) {
      let keystoSet = Object.keys(
        this.props.advancedSearchBody.additional_filter
      ).filter(
        (key) =>
          !["is_all_tiers", "is_no_tier", "tiers"].includes(key) &&
          this.props.advancedSearchBody.additional_filter[key]
      );
      let selectedCateoryList = [...this.state.selectedCateoryList];
      if (keystoSet.length > 0) {
        if (keystoSet.includes("is_pa") || keystoSet.includes("is_st")) {
          this.state.idCount++;
          this.state.nodeList.push({
            type: "filetype",
            id: this.state.idCount,
            childData: {},
            isIncluded: false,
          });
          selectedCateoryList.push({
            id: this.state.idCount,
            type: 4,
            content: (
              <ListItemContainer
                title={"File Type"}
                onParentDataUpdated={this.onParentDataUpdated}
                nodeId={this.state.idCount}
              >
                <FileType fileFiltersChanged={this.fileFiltersChanged} />
              </ListItemContainer>
            ),
          });
        }

        this.state.idCount++;
        this.state.nodeList.push({
          type: "um_filter",
          id: this.state.idCount,
          childData: {},
          isIncluded: false,
        });
        selectedCateoryList.push({
          id: this.state.idCount,
          type: 6,
          content: (
            <ListItemContainer
              title={"UM Filter"}
              onParentDataUpdated={this.onParentDataUpdated}
              nodeId={this.state.idCount}
            >
              <UmFilter umFiltersChanged={this.umFiltersChanged} />
            </ListItemContainer>
          ),
        });
      }

      keystoSet = Object.keys(
        this.props.advancedSearchBody.additional_filter
      ).filter(
        (key) =>
          ["is_all_tiers", "is_no_tier"].includes(key) &&
          this.props.advancedSearchBody.additional_filter[key]
      );
      if (
        keystoSet.length > 0 ||
        this.props.advancedSearchBody.additional_filter["tiers"].length > 0
      ) {
        this.state.idCount++;
        this.state.nodeList.push({
          type: "tier",
          id: this.state.idCount,
          childData: {},
          isIncluded: false,
        });
        selectedCateoryList.push({
          id: this.state.idCount,
          type: 5,
          content: (
            <ListItemContainer
              title={"Tier"}
              onParentDataUpdated={this.onParentDataUpdated}
              nodeId={this.state.idCount}
            >
              <Tire tierChanged={this.tierChanged} />
            </ListItemContainer>
          ),
        });
      }

      let payload = {
        advancedSearchBody: this.props.advancedSearchBody,
        populateGrid: this.props.populateGrid,
        closeDialog: this.props.closeDialog,
        listItemStatus: Object.assign({}, this.props.listItemStatus),
      };
      console.log("State count:" + this.state.idCount);
      if (this.props.advancedSearchBody.covered) {
        this.appendNonGenericSections(
          this.props.advancedSearchBody.covered,
          selectedCateoryList,
          true,
          payload
        );
      }
      console.log("State count:" + this.state.idCount);
      if (this.props.advancedSearchBody.not_covered) {
        this.appendNonGenericSections(
          this.props.advancedSearchBody.not_covered,
          selectedCateoryList,
          false,
          payload
        );
      }

      this.props.setAdvancedSearch(payload);
      this.setState({
        selectedCateoryList: selectedCateoryList,
      });
    }
  };

  appendNonGenericSections = (
    refList,
    selectedCateoryList,
    included,
    payload
  ) => {
    let gpiHandled = false;
    let categoryHandled = false;
    Object.keys(refList).map((key) => {
      let values = Array();
      if (key === "reference_ndcs") {
        values = refList["reference_ndcs"];
        if (values.length > 0) {
          this.state.idCount++;
          this.state.nodeList.push({
            type: "ndc",
            id: this.state.idCount,
            childData: {},
            isIncluded: included,
          });
          payload.listItemStatus[this.state.idCount] = included;
          selectedCateoryList.push({
            id: this.state.idCount,
            type: 2,
            isIncluded: included,
            content: (
              <ListItemContainer
                title={"Reference NDC"}
                onParentDataUpdated={this.onParentDataUpdated}
                nodeId={this.state.idCount}
              >
                <ReferenceNdc
                  nodeId={this.state.idCount}
                  onChildDataUpdated={this.onChildDataUpdated}
                  initialValues={values}
                />
              </ListItemContainer>
            ),
          });
        }
      } else if (
        key === "gpis" ||
        key === "drug_label_names" ||
        key === "rxcuis" ||
        key === "ddids"
      ) {
        if (!gpiHandled) {
          values = [];
          if (refList["gpis"] && refList["gpis"].length > 0) {
            refList["gpis"].map((dataItem) => {
              values.push(dataItem + "[gpi]");
            });
          }

          if (
            refList["drug_label_names"] &&
            refList["drug_label_names"].length > 0
          ) {
            refList["drug_label_names"].map((dataItem) => {
              values.push(dataItem + "[drug_label]");
            });
          }

          if (refList["rxcuis"] && refList["rxcuis"].length > 0) {
            refList["rxcuis"].map((dataItem) => {
              values.push(dataItem + "[rxcui]");
            });
          }

          if (refList["ddids"] && refList["ddids"].length > 0) {
            refList["ddids"].map((dataItem) => {
              values.push(dataItem + "[ddid]");
            });
          }
          if (values.length > 0) {
            this.state.idCount++;
            this.state.nodeList.push({
              type: "gpi",
              id: this.state.idCount,
              childData: {},
              isIncluded: included,
            });
            payload.listItemStatus[this.state.idCount] = included;
            selectedCateoryList.push({
              id: this.state.idCount,
              type: 1,
              isIncluded: included,
              content: (
                <ListItemContainer
                  title={
                    this.props.formulary_lob_id === 1
                      ? "GPI/Generic Name/Label Name/ RXCUI"
                      : "GPI/Generic Name/Label Name/ DDID"
                  }
                  onParentDataUpdated={this.onParentDataUpdated}
                  nodeId={this.state.idCount}
                >
                  <GpiLableSearch
                    nodeId={this.state.idCount}
                    onChildDataUpdated={this.onChildDataUpdated}
                    initialValues={values}
                    fileKey={this.props.fileType}
                  />
                </ListItemContainer>
              ),
            });
          }
          gpiHandled = true;
        }
      } else if (key === "drug_categories" || key === "drug_classes") {
        if (!categoryHandled) {
          values = [];
          if (
            refList["drug_categories"] &&
            refList["drug_categories"].length > 0 &&
            refList["drug_classes"] &&
            refList["drug_classes"].length > 0
          ) {
            for (
              let index = 0;
              index < refList["drug_categories"].length;
              index++
            ) {
              if (index < refList["drug_classes"].length) {
                values.push(
                  refList["drug_categories"][index] +
                    "[" +
                    refList["drug_classes"][index] +
                    "]"
                );
              }
            }
          }
          if (values.length > 0) {
            this.state.idCount++;
            this.state.nodeList.push({
              type: "cat_class",
              id: this.state.idCount,
              childData: {},
              isIncluded: included,
            });
            payload.listItemStatus[this.state.idCount] = included;
            selectedCateoryList.push({
              id: this.state.idCount,
              type: 3,
              isIncluded: included,
              content: (
                <ListItemContainer
                  title={"Drug Category/Class"}
                  onParentDataUpdated={this.onParentDataUpdated}
                  nodeId={this.state.idCount}
                >
                  <DrugCategory
                    nodeId={this.state.idCount}
                    onChildDataUpdated={this.onChildDataUpdated}
                    initialValues={values}
                  />
                </ListItemContainer>
              ),
            });
          }
          categoryHandled = true;
        }
      }
    });
  };

  umFiltersChanged = (umFilters) => {
    /*Object.keys(this.state.additionalFilter).map(filterKey => {
      if (filterKey !== 'tiers' && filterKey !== 'is_all_tiers' && filterKey !== 'is_no_tier') {
        this.state.additionalFilter[filterKey] = false;
      }
    });*/
    if (this.props.formulary_lob_id === 1) {
      this.state.additionalFilter = {
        is_all_tiers: this.state.additionalFilter["is_all_tiers"],
        is_no_tier: this.state.additionalFilter["is_no_tier"],
        tiers: this.state.additionalFilter["tiers"],
        is_add: false,
        is_exd: false,
        is_fff: false,
        is_frf: false,
        is_hi: false,
        is_ibf: false,
        is_lis: false,
        is_non_frf: false,
        is_otc: false,
        is_pa: false,
        is_st: false,
        is_pgc: false,
        is_user_defined1: false,
        is_user_defined2: false,
        is_user_defined3: false,
        is_user_defined4: false,
        is_user_defined5: false,
        is_vbid: false,
      };
    } else {
      this.state.additionalFilterNonMcr = {
        is_al: false,
        is_all_tiers: this.state.additionalFilterNonMcr["is_all_tiers"],
        is_gl: false,
        is_icdl: false,
        is_pa: false,
        is_st: false,
        is_pn: false,
        is_pr: false,
        is_ps: false,
        is_pt: false,
        is_ql: false,
        is_frf: false,
        is_other1: false,
        is_other2: false,
        is_other3: false,
        is_other4: false,
        is_other5: false,
        is_no_tier: this.state.additionalFilterNonMcr["is_no_tier"],
        tiers: this.state.additionalFilterNonMcr["tiers"],
      };
    }
    if (umFilters.length > 0) {
      umFilters.map((umItem) => {
        if (!umItem.key.startsWith("NA")) {
          if (this.props.formulary_lob_id === 1) {
            this.state.additionalFilter[umItem.key] = true;
          } else {
            this.state.additionalFilterNonMcr[umItem.key] = true;
          }
        }
      });
    }
  };

  fileFiltersChanged = (filters) => {
    /*Object.keys(this.state.additionalFilter).map(filterKey => {
      if (filterKey !== 'tiers' && filterKey !== 'is_all_tiers' && filterKey !== 'is_no_tier') {
        this.state.additionalFilter[filterKey] = false;
      }
    });*/
    if (this.props.formulary_lob_id === 1) {
      this.state.additionalFilter = {
        is_all_tiers: this.state.additionalFilter["is_all_tiers"],
        is_no_tier: this.state.additionalFilter["is_no_tier"],
        tiers: this.state.additionalFilter["tiers"],
        is_add: false,
        is_exd: false,
        is_fff: false,
        is_frf: false,
        is_hi: false,
        is_ibf: false,
        is_lis: false,
        is_non_frf: false,
        is_otc: false,
        is_pa: false,
        is_st: false,
        is_pgc: false,
        is_user_defined1: false,
        is_user_defined2: false,
        is_user_defined3: false,
        is_user_defined4: false,
        is_user_defined5: false,
        is_vbid: false,
      };
    } else {
      this.state.additionalFilterNonMcr = {
        is_al: false,
        is_all_tiers: this.state.additionalFilterNonMcr["is_all_tiers"],
        is_gl: false,
        is_icdl: false,
        is_pa: false,
        is_st: false,
        is_pn: false,
        is_pr: false,
        is_ps: false,
        is_pt: false,
        is_ql: false,
        is_frf: false,
        is_other1: false,
        is_other2: false,
        is_other3: false,
        is_other4: false,
        is_other5: false,
        is_no_tier: this.state.additionalFilterNonMcr["is_no_tier"],
        tiers: this.state.additionalFilterNonMcr["tiers"],
      };
    }
    if (filters.length > 0) {
      filters.map((item) => {
        item.types.map((type) => {
          if (!type["key"].startsWith("NA")) {
            if (this.props.formulary_lob_id === 1) {
              this.state.additionalFilter[type["key"]] = type["isChecked"];
            } else {
              this.state.additionalFilterNonMcr[type["key"]] =
                type["isChecked"];
            }
          }
        });
      });
    }
  };

  tierChanged = (tiers) => {
    console.log("Selected tiers:" + JSON.stringify(tiers));
    if (this.props.formulary_lob_id === 1) {
      this.state.additionalFilter.tiers = Array();
    } else {
      this.state.additionalFilterNonMcr.tiers = Array();
    }
    let isAllTier: boolean = true;
    tiers.map((tier) => {
      if (tier.key != -1) {
        isAllTier = isAllTier && tier["isChecked"];
        if (tier.isChecked) {
          if (this.props.formulary_lob_id === 1) {
            this.state.additionalFilter.tiers.push(tier.key);
          } else {
            this.state.additionalFilterNonMcr.tiers.push(tier.key);
          }
        }
      } else {
        if (tier.isChecked) {
          if (this.props.formulary_lob_id === 1) {
            this.state.additionalFilter.is_no_tier = true;
          } else {
            this.state.additionalFilterNonMcr.is_no_tier = true;
          }
          isAllTier = true;
        } else {
          if (this.props.formulary_lob_id === 1) {
            this.state.additionalFilter.is_no_tier = false;
          } else {
            this.state.additionalFilterNonMcr.is_no_tier = false;
          }
        }
      }
    });

    if (this.props.formulary_lob_id === 1) {
      this.state.additionalFilter.is_all_tiers = isAllTier;
    } else {
      this.state.additionalFilterNonMcr.is_all_tiers = isAllTier;
    }
  };

  onChildDataUpdated = (id, data) => {
    let updatedNode = this.state.nodeList.filter((node) => node.id === id);
    if (updatedNode && updatedNode.length > 0) {
      let node = updatedNode[0];
      node.childData = data;
    }
    console.log("onChildDataUpdated:" + JSON.stringify(this.state.nodeList));
  };

  onParentDataUpdated = (id, isIncluded) => {
    let updatedNode = this.state.nodeList.filter((node) => node.id === id);
    console.log("Id:" + id + " isIncluded:" + isIncluded);
    let currentProps = Object.assign({}, this.props.listItemStatus);
    if (updatedNode && updatedNode.length > 0) {
      console.log("Entered");
      let node = updatedNode[0];
      node.isIncluded = isIncluded;

      let filteredList = this.state.selectedCateoryList.filter(
        (uiItem) => uiItem.id === id
      );
      let uiNode = filteredList[0];
      uiNode.isIncluded = isIncluded;
      currentProps[id] = isIncluded;

      filteredList = this.state.selectedCateoryList.filter(
        (uiItem) => uiItem.type === uiNode.type
      );

      if (filteredList.length > 1) {
        filteredList = filteredList.filter((uiItem) => uiItem.id !== id);
        uiNode = filteredList[0];
        uiNode.isIncluded = !isIncluded;

        currentProps[uiNode.id] = !isIncluded;

        updatedNode = this.state.nodeList.filter(
          (node) => node.id === uiNode.id
        );
        updatedNode[0].isIncluded = !isIncluded;
      }
    }
    let payload = {
      advancedSearchBody: this.props.advancedSearchBody,
      populateGrid: this.props.populateGrid,
      closeDialog: this.props.closeDialog,
      listItemStatus: currentProps,
    };
    this.props.setAdvancedSearch(payload);
    this.setState({
      idCount: this.state.idCount,
    });
    console.log("onParentDataUpdated:" + JSON.stringify(this.state.nodeList));
  };

  onCategrorySelect = (selectedCat) => {
    console.log("{selsectedCate}:", selectedCat);

    this.setState({ selectedCategory: selectedCat });
    //    (selectedCat){
    //      case 1:return (<ListItemContainer
    //      title={"GPI/Generic Name/Label Name/ RXCUI"}
    //    />)
    //    case 4: return (<ListItemContainer title={"File Type"}>
    //    <FileType />
    //  </ListItemContainer>)
    //    default: return "Please Drag and Drop here"
    //    }

    let isFound = false;
    let filteredList = Array();
    let payload = {
      advancedSearchBody: this.props.advancedSearchBody,
      populateGrid: this.props.populateGrid,
      closeDialog: this.props.closeDialog,
      listItemStatus: Object.assign({}, this.props.listItemStatus),
    };
    switch (selectedCat) {
      case 1:
        filteredList = this.state.selectedCateoryList.filter(
          (uiItem) => uiItem.type === 1
        );
        if (filteredList.length === 0) {
          this.state.idCount++;
          this.state.nodeList.push({
            type: "gpi",
            id: this.state.idCount,
            childData: {},
            isIncluded: true,
          });
          payload.listItemStatus[this.state.idCount] = true;
          this.props.setAdvancedSearch(payload);
          this.setState({
            selectedCateoryList: [
              ...this.state.selectedCateoryList,
              {
                id: this.state.idCount,
                type: 1,
                isIncluded: true,
                content: (
                  <ListItemContainer
                    title={
                      this.props.formulary_lob_id === 1
                        ? "GPI/Generic Name/Label Name/ RXCUI"
                        : "GPI/Generic Name/Label Name/ DDID"
                    }
                    onParentDataUpdated={this.onParentDataUpdated}
                    nodeId={this.state.idCount}
                  >
                    <GpiLableSearch
                      nodeId={this.state.idCount}
                      onChildDataUpdated={this.onChildDataUpdated}
                      initialValues={[]}
                      fileKey={this.props.fileType}
                    />
                  </ListItemContainer>
                ),
              },
            ],
          });
        } else if (filteredList.length === 1) {
          let currentItem = filteredList[0];
          let includedStatus = !currentItem.isIncluded;
          this.state.idCount++;
          this.state.nodeList.push({
            type: "gpi",
            id: this.state.idCount,
            childData: {},
            isIncluded: includedStatus,
          });
          payload.listItemStatus[this.state.idCount] = includedStatus;
          this.props.setAdvancedSearch(payload);
          this.setState({
            selectedCateoryList: [
              ...this.state.selectedCateoryList,
              {
                id: this.state.idCount,
                type: 1,
                isIncluded: includedStatus,
                content: (
                  <ListItemContainer
                    title={
                      this.props.formulary_lob_id === 1
                        ? "GPI/Generic Name/Label Name/ RXCUI"
                        : "GPI/Generic Name/Label Name/ DDID"
                    }
                    onParentDataUpdated={this.onParentDataUpdated}
                    nodeId={this.state.idCount}
                  >
                    <GpiLableSearch
                      nodeId={this.state.idCount}
                      onChildDataUpdated={this.onChildDataUpdated}
                      initialValues={[]}
                      fileKey={this.props.fileType}
                    />
                  </ListItemContainer>
                ),
              },
            ],
          });
        }
        break;
      case 2:
        filteredList = this.state.selectedCateoryList.filter(
          (uiItem) => uiItem.type === 2
        );
        if (filteredList.length === 0) {
          this.state.idCount++;
          this.state.nodeList.push({
            type: "ndc",
            id: this.state.idCount,
            childData: {},
            isIncluded: true,
          });
          payload.listItemStatus[this.state.idCount] = true;
          this.props.setAdvancedSearch(payload);
          this.setState({
            selectedCateoryList: [
              ...this.state.selectedCateoryList,
              {
                id: this.state.idCount,
                type: 2,
                isIncluded: true,
                content: (
                  <ListItemContainer
                    title={"Reference NDC"}
                    onParentDataUpdated={this.onParentDataUpdated}
                    nodeId={this.state.idCount}
                  >
                    <ReferenceNdc
                      nodeId={this.state.idCount}
                      onChildDataUpdated={this.onChildDataUpdated}
                      initialValues={[]}
                    />
                  </ListItemContainer>
                ),
              },
            ],
          });
        } else if (filteredList.length === 1) {
          let currentItem = filteredList[0];
          let includedStatus = !currentItem.isIncluded;
          this.state.idCount++;
          this.state.nodeList.push({
            type: "ndc",
            id: this.state.idCount,
            childData: {},
            isIncluded: includedStatus,
          });
          payload.listItemStatus[this.state.idCount] = includedStatus;
          this.props.setAdvancedSearch(payload);
          this.setState({
            selectedCateoryList: [
              ...this.state.selectedCateoryList,
              {
                id: this.state.idCount,
                type: 2,
                isIncluded: includedStatus,
                content: (
                  <ListItemContainer
                    title={"Reference NDC"}
                    onParentDataUpdated={this.onParentDataUpdated}
                    nodeId={this.state.idCount}
                  >
                    <ReferenceNdc
                      nodeId={this.state.idCount}
                      onChildDataUpdated={this.onChildDataUpdated}
                      initialValues={[]}
                    />
                  </ListItemContainer>
                ),
              },
            ],
          });
        }
        break;

      case 3:
        filteredList = this.state.selectedCateoryList.filter(
          (uiItem) => uiItem.type === 3
        );
        if (filteredList.length === 0) {
          this.state.idCount++;
          this.state.nodeList.push({
            type: "cat_class",
            id: this.state.idCount,
            childData: {},
            isIncluded: true,
          });
          payload.listItemStatus[this.state.idCount] = true;
          this.props.setAdvancedSearch(payload);
          this.setState({
            selectedCateoryList: [
              ...this.state.selectedCateoryList,
              {
                id: this.state.idCount,
                type: 3,
                isIncluded: true,
                content: (
                  <ListItemContainer
                    title={"Drug Category/Class"}
                    onParentDataUpdated={this.onParentDataUpdated}
                    nodeId={this.state.idCount}
                  >
                    <DrugCategory
                      nodeId={this.state.idCount}
                      onChildDataUpdated={this.onChildDataUpdated}
                      initialValues={[]}
                    />
                  </ListItemContainer>
                ),
              },
            ],
          });
        } else if (filteredList.length === 1) {
          let currentItem = filteredList[0];
          let includedStatus = !currentItem.isIncluded;
          this.state.idCount++;
          this.state.nodeList.push({
            type: "cat_class",
            id: this.state.idCount,
            childData: {},
            isIncluded: includedStatus,
          });
          payload.listItemStatus[this.state.idCount] = includedStatus;
          this.props.setAdvancedSearch(payload);
          this.setState({
            selectedCateoryList: [
              ...this.state.selectedCateoryList,
              {
                id: this.state.idCount,
                type: 3,
                isIncluded: includedStatus,
                content: (
                  <ListItemContainer
                    title={"Drug Category/Class"}
                    onParentDataUpdated={this.onParentDataUpdated}
                    nodeId={this.state.idCount}
                  >
                    <DrugCategory
                      nodeId={this.state.idCount}
                      onChildDataUpdated={this.onChildDataUpdated}
                      initialValues={[]}
                    />
                  </ListItemContainer>
                ),
              },
            ],
          });
        }
        break;
      case 4:
        isFound =
          this.state.selectedCateoryList.filter((uiItem) => uiItem.type === 4)
            .length > 0;
        if (!isFound) {
          this.state.idCount++;
          this.state.nodeList.push({
            type: "filetype",
            id: this.state.idCount,
            childData: {},
            isIncluded: false,
          });
          this.setState({
            selectedCateoryList: [
              ...this.state.selectedCateoryList,
              {
                id: this.state.idCount,
                type: 4,
                content: (
                  <ListItemContainer
                    title={"File Type"}
                    onParentDataUpdated={this.onParentDataUpdated}
                    nodeId={this.state.idCount}
                  >
                    <FileType fileFiltersChanged={this.fileFiltersChanged} />
                  </ListItemContainer>
                ),
              },
            ],
          });
        }
        break;

      case 5:
        isFound =
          this.state.selectedCateoryList.filter((uiItem) => uiItem.type === 5)
            .length > 0;
        if (!isFound) {
          this.state.idCount++;
          this.state.nodeList.push({
            type: "tier",
            id: this.state.idCount,
            childData: {},
            isIncluded: false,
          });
          this.setState({
            selectedCateoryList: [
              ...this.state.selectedCateoryList,
              {
                id: this.state.idCount,
                type: 5,
                content: (
                  <ListItemContainer
                    title={"Tier"}
                    onParentDataUpdated={this.onParentDataUpdated}
                    nodeId={this.state.idCount}
                  >
                    <Tire tierChanged={this.tierChanged} />
                  </ListItemContainer>
                ),
              },
            ],
          });
        }
        break;
      case 6:
        isFound =
          this.state.selectedCateoryList.filter((uiItem) => uiItem.type === 6)
            .length > 0;
        if (!isFound) {
          this.state.idCount++;
          this.state.nodeList.push({
            type: "um_filter",
            id: this.state.idCount,
            childData: {},
            isIncluded: false,
          });
          this.setState({
            selectedCateoryList: [
              ...this.state.selectedCateoryList,
              {
                id: this.state.idCount,
                type: 6,
                content: (
                  <ListItemContainer
                    title={"UM Filter"}
                    onParentDataUpdated={this.onParentDataUpdated}
                    nodeId={this.state.idCount}
                  >
                    <UmFilter umFiltersChanged={this.umFiltersChanged} />
                  </ListItemContainer>
                ),
              },
            ],
          });
        }
        break;
      /*case 7:
        this.state.idCount++;
        this.state.nodeList.push({type: 'alternative_drugs', id: this.state.idCount, childData: [], isIncluded: false});
        this.setState({
          selectedCateoryList: [
            ...this.state.selectedCateoryList,
            {
              id: this.state.idCount,
              content:<ListItemContainer title={"Alternative Drugs"} onParentDataUpdated={this.onParentDataUpdated} nodeId={this.state.idCount}>
              <AlternativeDrug />
            </ListItemContainer>
            },
          ],
        });*/
      // return (
      //   <ListItemContainer title={"Alternative Drugs"}>

      //   </ListItemContainer>
      // );

      default:
        console.log("do nothig");
    }
  };

  handleOnClick = () => {
    console.log("expand all clicked");
  };

  // onRenderCateory = (selectedCategory) => {
  //   switch (selectedCategory) {
  //     case 1:
  //       return (
  //         <ListItemContainer title={"GPI/Generic Name/Label Name/ RXCUI"} />
  //       );
  //     case 2:
  //       return <ListItemContainer title={"Reference NDC"} />;

  //     case 3:
  //       return (
  //         <ListItemContainer title={"Drug Category/Class"}>
  //           <DrugCategory onCkick={this.handleOnClick} />
  //         </ListItemContainer>
  //       );
  //     case 4:
  //       return (
  //         <ListItemContainer title={"File Type"}>
  //           <FileType />
  //         </ListItemContainer>
  //       );

  //     case 5:
  //       return (
  //         <ListItemContainer title={"File Type"}>
  //           <Tire />
  //         </ListItemContainer>
  //       );

  //     case 6:
  //       return (
  //         <ListItemContainer title={"UM Filter"}>
  //           <UmFilter />
  //         </ListItemContainer>
  //       );

  //     case 7:
  //       return <ListItemContainer title={"Alternative Drugs"} />;

  //     default:
  //       return (
  //         <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
  //           please select category
  //         </div>
  //       );
  //   }
  // };

  onDelete = (idx, id) => {
    console.log("Delete index:" + idx + " Id:" + id);
    const currentSelecteCategories = this.state.selectedCateoryList.filter(
      (category, index) => category.id !== id
    );
    let currentNodeList = this.state.nodeList.filter((node) => node.id !== id);
    let currentProps = Object.assign({}, this.props.listItemStatus);
    delete currentProps["" + id];
    let payload = {
      advancedSearchBody: this.props.advancedSearchBody,
      populateGrid: this.props.populateGrid,
      closeDialog: this.props.closeDialog,
      listItemStatus: {},
    };
    this.props.setAdvancedSearch(payload);
    payload = {
      advancedSearchBody: this.props.advancedSearchBody,
      populateGrid: this.props.populateGrid,
      closeDialog: this.props.closeDialog,
      listItemStatus: currentProps,
    };
    this.props.setAdvancedSearch(payload);
    this.setState({
      selectedCateoryList: currentSelecteCategories,
      nodeList: currentNodeList,
    });
  };
  onClear = () => {
    if (this.props.formulary_lob_id === 1) {
      this.state.additionalFilter = {
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
        is_st: false,
        is_pgc: false,
        is_user_defined1: false,
        is_user_defined2: false,
        is_user_defined3: false,
        is_user_defined4: false,
        is_user_defined5: false,
        is_vbid: false,
        is_no_tier: false,
        tiers: Array(),
      };
    } else {
      this.state.additionalFilterNonMcr = {
        is_al: false,
        is_all_tiers: false,
        is_gl: false,
        is_icdl: false,
        is_pa: false,
        is_st: false,
        is_pn: false,
        is_pr: false,
        is_ps: false,
        is_pt: false,
        is_ql: false,
        is_frf: false,
        is_other1: false,
        is_other2: false,
        is_other3: false,
        is_other4: false,
        is_other5: false,
        is_no_tier: false,
        tiers: Array(),
      };
    }
    let payload = {
      advancedSearchBody: {},
      populateGrid: false,
      closeDialog: false,
      listItemStatus: {},
    };
    if (this.props.formulary_lob_id === 1) {
      payload.advancedSearchBody[
        "additional_filter"
      ] = this.state.additionalFilter;
    } else {
      payload.advancedSearchBody[
        "additional_filter"
      ] = this.state.additionalFilterNonMcr;
    }
    payload.advancedSearchBody["covered"] = {};
    payload.advancedSearchBody["not_covered"] = {};
    payload.advancedSearchBody["is_advance_search"] = false;
    payload.populateGrid = true;
    this.props.setAdvancedSearch(payload);
    this.setState({ selectedCateoryList: [], nodeList: [] });
  };

  handleDrag = (e, catid) => {
    console.log("[onDrag]:e:", e, "catid:", catid);
    // this.onCategrorySelect(catid);
  };
  handleDrop = (e) => {
    console.log("[onDrop]", e);
  };
  allowDrop = (e) => {
    e.preventDefault();
  };

  applySearch = () => {
    let payload = {
      advancedSearchBody: {},
      populateGrid: false,
      closeDialog: true,
      listItemStatus: {},
    };
    if (this.props.formulary_lob_id === 1) {
      payload.advancedSearchBody[
        "additional_filter"
      ] = this.state.additionalFilter;
    } else {
      payload.advancedSearchBody[
        "additional_filter"
      ] = this.state.additionalFilterNonMcr;
    }
    payload.advancedSearchBody["covered"] = {};
    payload.advancedSearchBody["not_covered"] = {};
    if (this.state.nodeList.length > 0) {
      this.state.nodeList.map((node) => {
        if (node.isIncluded) {
          payload.advancedSearchBody["covered"] = Object.assign(
            payload.advancedSearchBody["covered"],
            node.childData
          );
        } else {
          payload.advancedSearchBody["not_covered"] = Object.assign(
            payload.advancedSearchBody["not_covered"],
            node.childData
          );
        }
      });
    }
    payload.advancedSearchBody["is_advance_search"] = true;
    payload.populateGrid = true;

    this.props.setAdvancedSearch(payload);
  };

  handleChildDataSave = (additionalCriteria) => {
    console.log(additionalCriteria);
    // const additionalCriteriaArray: any[] = [
    //   ...this.state.additionalCriteriaArray,
    //   additionalCriteria,
    // ];

    // for (let index = 0; index < additionalCriteriaArray.length; index++) {
    //   const criteria = additionalCriteriaArray[index];
    //   console.log(criteria, index);
    // }

    // let arrayIndex: number = 0;
    // this.state.additionalCriteriaArray.forEach((criteria, index) => {
    //   const sequence = index + 1;
    //   if (criteria["sequence"] === sequence) {
    //     arrayIndex = index;
    //   }
    // });
    // additionalCriteriaArray[arrayIndex] = additionalCriteria;
    // console.log(additionalCriteriaArray);

    let tempAddCriteriaArr: any[] = [...this.state.additionalCriteriaArray];
    if (this.state.additionalCriteriaArray.length > 0) {
      let replaceCriteria = false;
      let rIndex = 0;
      tempAddCriteriaArr.forEach((e, i) => {
        if (e.sequence === additionalCriteria.sequence) {
          replaceCriteria = true;
          rIndex = i;
        }
      });

      if (replaceCriteria) {
        tempAddCriteriaArr[rIndex] = additionalCriteria;
      } else {
        tempAddCriteriaArr = [
          ...this.state.additionalCriteriaArray,
          additionalCriteria,
        ];
      }
    } else {
      tempAddCriteriaArr = [
        ...this.state.additionalCriteriaArray,
        additionalCriteria,
      ];
    }

    this.setState({
      additionalCriteriaArray: tempAddCriteriaArr,
    });
  };

  handleAdditionalCriteriaApply = () => {
    let payload = {
      isNewAdditionalCriteria: this.props.additionalCriteria
        .isNewAdditionalCriteria,
      additionalCriteriaBody: [],
      additionalCriteriaObject: this.props.additionalCriteria
        .additionalCriteriaObject,
      populateGrid: this.props.additionalCriteria.populateGrid,
      closeDialog: this.props.additionalCriteria.closeDialog,
      listItemStatus: this.props.additionalCriteria.listItemStatus,
    };

    payload.additionalCriteriaBody = this.state.additionalCriteriaArray;
    console.log("FINAL PAYLOAD DATA: ", payload);
    this.props.setAdditionalCriteria(payload);
    this.props.onClose();
  };

  render() {
    const { selectedCateoryList, criteriaList } = this.state;

    const { isAdvanceSearch } = this.props;

    return (
      <div className="AdvanceSearchContainer___root">
        <FrxDialogPopup
          positiveActionText="Apply"
          negativeActionText=""
          // negativeActionText="Close"
          title={isAdvanceSearch ? "Advance Search" : "Additional Criteria"}
          handleClose={
            // isAdvanceSearch
            // ?
            this.props.onClose
            // : this.handleAdditionalCriteriaClose
          }
          handleAction={
            isAdvanceSearch
              ? this.action
              : this.props.editable
              ? () => {}
              : this.handleAdditionalCriteriaApply
          }
          open={this.props.openPopup}
          showActions={isAdvanceSearch ? false : true}
          showCloseIcon={isAdvanceSearch ? false : true}
          className={
            // "new-advane-search-popup  member-notes-popup-root __root-additional-criteria-popup"
            isAdvanceSearch
              ? "new-advane-search-popup  member-notes-popup-root __root-additional-criteria-popup"
              : "root-additional-criteria member-notes-popup-root __root-additional-criteria-popup"
          }
          height="100%"
          width="100%"
          // popupMaxWidth={isAdvanceSearch ? false : "lg"}
          fullScreen={isAdvanceSearch ? false : true}
        >
          {isAdvanceSearch ? (
            <Grid
              container
              spacing={0}
              className="drug-grid-popup-root__dialog"
            >
              <Grid
                xs={3}
                className="member-notes-popup-root__dialog__categories"
                alignContent="flex-start"
                key={0}
                item
              >
                {/* <SearchCategory
                handleListItemClick={this.onCategrorySelect}
                categoriesData={this.state.categories}
                // activeCategoryIndex={this.state.activeCategoryIndex}
              /> */}

                {this.state.categories.map((category) => (
                  <div
                    key={category.id}
                    className="category-list"
                    onClick={() => this.onCategrorySelect(category.id)}
                    style={{ cursor: "pointer" }}
                    draggable="true"
                    onDrag={(e) => {
                      this.handleDrag(e, category.id);
                    }}
                  >
                    <span
                      className="icon-container"
                      // onClick={() => this.onCategrorySelect(category.id)}
                    >
                      <svg
                        width="14"
                        height="13"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.208 6.41113L11.2142 4.83769C11.1976 4.82457 11.1775 4.81641 11.1564 4.81415C11.1353 4.81189 11.114 4.81563 11.0949 4.82492C11.0758 4.83422 11.0598 4.8487 11.0485 4.86671C11.0373 4.88472 11.0314 4.90553 11.0314 4.92675V5.93769H7.56269V2.46894H8.57519C8.66894 2.46894 8.72206 2.35956 8.66425 2.28613L7.08925 0.292376C7.07882 0.278884 7.06545 0.267962 7.05014 0.260446C7.03484 0.252931 7.01802 0.249023 7.00097 0.249023C6.98392 0.249023 6.9671 0.252931 6.95179 0.260446C6.93649 0.267962 6.92311 0.278884 6.91269 0.292376L5.33769 2.28613C5.32456 2.30281 5.31641 2.32285 5.31415 2.34395C5.31189 2.36505 5.31562 2.38637 5.32492 2.40545C5.33421 2.42453 5.3487 2.4406 5.36671 2.45183C5.38472 2.46306 5.40553 2.46899 5.42675 2.46894H6.43769V5.93769H2.96894V4.92519C2.96894 4.83144 2.85956 4.77831 2.78613 4.83613L0.792376 6.41113C0.778884 6.42155 0.767962 6.43493 0.760446 6.45023C0.752931 6.46554 0.749023 6.48236 0.749023 6.49941C0.749023 6.51646 0.752931 6.53328 0.760446 6.54858C0.767962 6.56389 0.778884 6.57726 0.792376 6.58769L2.78456 8.16269C2.858 8.2205 2.96738 8.16894 2.96738 8.07363V7.06269H6.43612V10.5314H5.42362C5.32987 10.5314 5.27675 10.6408 5.33456 10.7143L6.90956 12.7064C6.95487 12.7643 7.04237 12.7643 7.08612 12.7064L8.66112 10.7143C8.71894 10.6408 8.66737 10.5314 8.57206 10.5314H7.56269V7.06269H11.0314V8.07519C11.0314 8.16894 11.1408 8.22206 11.2142 8.16425L13.2064 6.58925C13.2199 6.57868 13.2308 6.56522 13.2383 6.54987C13.2459 6.53452 13.2499 6.51767 13.25 6.50056C13.2502 6.48346 13.2465 6.46654 13.2392 6.45106C13.2319 6.43558 13.2213 6.42193 13.208 6.41113Z"
                          fill="#707683"
                        />
                      </svg>
                    </span>
                    <div className="category-text">
                      {this.props.formulary_lob_id !== 1 && category.id === 1
                        ? "GPI/Generic Name/Label Name/ DDID"
                        : category.category}
                    </div>
                  </div>
                ))}
              </Grid>
              <Grid
                className="form-wrapper-root member-notes-popup-root__dialog__category-notes scroll-bar"
                item
                xs={9}
                onDrop={(e) => this.handleDrop(e)}
                onDragOver={this.allowDrop}
              >
                <Box className="right-content">
                  {/* <div className="formWrappers">ListItemContainer</div> */}
                  {/* <ListItemContainer
                  title={"GPI/Generic Name/Label Name/ RXCUI"}
                />
                <ListItemContainer title={"File Type"}>
                  <FileType />
                </ListItemContainer> */}
                  {selectedCateoryList.length == 0 ? (
                    <div className="empty-message">
                      <p> Please Select Category</p>
                    </div>
                  ) : (
                    selectedCateoryList.map((renderCatory, idx) => (
                      <div className="__render-categoy ">
                        <span>
                          <svg
                            width="6"
                            height="16"
                            viewBox="0 0 6 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M2.97993 9.87637C3.03294 9.8763 3.08544 9.88669 3.13443 9.90695C3.18341 9.9272 3.22792 9.95692 3.2654 9.9944C3.30289 10.0319 3.33261 10.0764 3.35286 10.1254C3.37312 10.1744 3.38351 10.2269 3.38344 10.2799L3.38344 14.4768L4.99511 12.8652C5.07069 12.7896 5.17319 12.7471 5.28008 12.7471C5.38696 12.7471 5.48947 12.7896 5.56504 12.8652C5.64062 12.9407 5.68308 13.0432 5.68308 13.1501C5.68308 13.257 5.64062 13.3595 5.56504 13.4351L3.28531 15.7148C3.20974 15.7904 3.10723 15.8329 3.00035 15.8329C2.89346 15.8329 2.79096 15.7904 2.71538 15.7148L2.70747 15.7069C2.7031 15.7029 2.69881 15.6988 2.6946 15.6946C2.6904 15.6904 2.68629 15.6861 2.68229 15.6817L0.435649 13.4351C0.360071 13.3595 0.317612 13.257 0.317612 13.1501C0.317612 13.0432 0.360071 12.9407 0.435649 12.8652C0.511227 12.7896 0.613732 12.7471 0.720615 12.7471C0.827498 12.7471 0.930004 12.7896 1.00558 12.8652L2.57642 14.436L2.57642 10.2799C2.57635 10.2269 2.58674 10.1744 2.607 10.1254C2.62725 10.0764 2.65697 10.0319 2.69445 9.9944C2.73194 9.95692 2.77645 9.9272 2.82543 9.90695C2.87442 9.88669 2.92692 9.8763 2.97993 9.87637ZM2.57642 1.56447L2.57642 5.72042C2.57642 5.82744 2.61893 5.93007 2.6946 6.00574C2.77028 6.08142 2.87291 6.12393 2.97993 6.12393C3.08695 6.12393 3.18958 6.08142 3.26526 6.00574C3.34093 5.93007 3.38344 5.82744 3.38344 5.72042V1.52347L4.99519 3.13522C5.07077 3.2108 5.17328 3.25326 5.28016 3.25326C5.38704 3.25326 5.48955 3.2108 5.56513 3.13522C5.6407 3.05964 5.68316 2.95714 5.68316 2.85025C5.68316 2.74337 5.6407 2.64087 5.56513 2.56529L3.28539 0.285557C3.20982 0.209979 3.10731 0.167521 3.00043 0.16752C2.89355 0.16752 2.79104 0.20998 2.71546 0.285558L2.712 0.289021C2.70599 0.294347 2.70014 0.299858 2.69445 0.305547C2.68876 0.311237 2.68325 0.317089 2.67793 0.323093L0.435731 2.56529C0.360153 2.64087 0.317694 2.74337 0.317694 2.85025C0.317694 2.95714 0.360153 3.05964 0.435731 3.13522C0.511309 3.2108 0.613814 3.25326 0.720698 3.25326C0.827581 3.25326 0.930086 3.2108 1.00566 3.13522L2.57642 1.56447Z"
                              fill="#707683"
                            />
                          </svg>
                        </span>
                        {renderCatory["content"]}
                        <span>
                          <svg
                            width="13"
                            height="15"
                            viewBox="0 0 13 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() =>
                              this.onDelete(idx, renderCatory["id"])
                            }
                            // onClick={this.onDelete(idx)}
                            style={{ cursor: "pointer" }}
                          >
                            <path
                              d="M1.75065 13.0417C1.75065 13.9125 2.46315 14.625 3.33398 14.625H9.66732C10.5382 14.625 11.2507 13.9125 11.2507 13.0417V3.54167H1.75065V13.0417ZM12.0423 1.16667H9.27148L8.47982 0.375H4.52148L3.72982 1.16667H0.958984V2.75H12.0423V1.16667Z"
                              fill="#C4C4C4"
                            />
                          </svg>
                        </span>
                      </div>
                    ))
                  )}

                  {/* <Box
                  display="flex"
                  justifyContent="flex-end"
                  className="button-wrapper"
                >
                  <Button
                    className="Button advanced-grid-search__btn-clear"
                    // onClick={this.clearSelected}
                  >
                    <svg
                      className="advanced-grid-search__btn-clear--clearicon"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.5 17C13.1944 17 17 13.1945 17 8.5C17 3.80554 13.1944 0 8.5 0C3.8056 0 0 3.80554 0 8.5C0 13.1945 3.8056 17 8.5 17ZM8.5 16C12.6422 16 16 12.6421 16 8.5C16 4.35791 12.6422 1 8.5 1C4.35785 1 1 4.35791 1 8.5C1 12.6421 4.35785 16 8.5 16Z"
                        fill="#666666"
                      />
                      <path
                        d="M5.31803 5.31802C5.12277 5.51328 5.12277 5.82986 5.31803 6.02513L7.7929 8.5L5.31803 10.9749C5.12277 11.1701 5.12277 11.4867 5.31803 11.682C5.51329 11.8772 5.82987 11.8772 6.02514 11.682L8.50001 9.20711L10.9749 11.682C11.1701 11.8772 11.4867 11.8772 11.682 11.682C11.8773 11.4867 11.8773 11.1701 11.682 10.9749L9.20712 8.5L11.682 6.02513C11.8773 5.82986 11.8773 5.51328 11.682 5.31802C11.4867 5.12276 11.1701 5.12276 10.9749 5.31802L8.50001 7.79289L6.02513 5.31802C5.82987 5.12276 5.51329 5.12276 5.31803 5.31802Z"
                        fill="#666666"
                      />
                    </svg>
                    <span onClick={this.onClear}>Clear</span>
                  </Button>
                  <button className="Button member-notes-popup-root__dialog__category-notes_form__submit-btn">
                    Apply Search
                  </button>
                </Box> */}
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  className="button-wrapper"
                >
                  <Button
                    className="Button advanced-grid-search__btn-clear"
                    onClick={this.onClear}
                  >
                    <svg
                      className="advanced-grid-search__btn-clear--clearicon"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.5 17C13.1944 17 17 13.1945 17 8.5C17 3.80554 13.1944 0 8.5 0C3.8056 0 0 3.80554 0 8.5C0 13.1945 3.8056 17 8.5 17ZM8.5 16C12.6422 16 16 12.6421 16 8.5C16 4.35791 12.6422 1 8.5 1C4.35785 1 1 4.35791 1 8.5C1 12.6421 4.35785 16 8.5 16Z"
                        fill="#666666"
                      />
                      <path
                        d="M5.31803 5.31802C5.12277 5.51328 5.12277 5.82986 5.31803 6.02513L7.7929 8.5L5.31803 10.9749C5.12277 11.1701 5.12277 11.4867 5.31803 11.682C5.51329 11.8772 5.82987 11.8772 6.02514 11.682L8.50001 9.20711L10.9749 11.682C11.1701 11.8772 11.4867 11.8772 11.682 11.682C11.8773 11.4867 11.8773 11.1701 11.682 10.9749L9.20712 8.5L11.682 6.02513C11.8773 5.82986 11.8773 5.51328 11.682 5.31802C11.4867 5.12276 11.1701 5.12276 10.9749 5.31802L8.50001 7.79289L6.02513 5.31802C5.82987 5.12276 5.51329 5.12276 5.31803 5.31802Z"
                        fill="#666666"
                      />
                    </svg>
                    <span onClick={this.onClear}>Clear</span>
                  </Button>
                  <button
                    className="Button member-notes-popup-root__dialog__category-notes_form__submit-btn"
                    onClick={this.applySearch}
                  >
                    Apply Search
                  </button>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <AdditionalCriteriaContainer
              criteriaList={criteriaList}
              handleChildDataSave={this.handleChildDataSave}
              editable={this.props.editable}
            />
          )}
        </FrxDialogPopup>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvanceSearchContainer);
