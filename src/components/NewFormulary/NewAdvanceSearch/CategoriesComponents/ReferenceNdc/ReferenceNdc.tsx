import React, { useState, Component } from "react";
import TreeNodeTitle from "../../components/TreeComponents/TreeNodeTitle/TreeNodeTitle";
import SearchBox from "../../../../shared/Frx-components/search-box/SearchBox";
import { TreeSelect, Tree } from "antd";
import "./ReferenceNdc.scss";
import { getIntelliscenseSearch } from "../../../../../redux/slices/formulary/categoryClass/categoryClassActionCreation";
import { connect } from "react-redux";
import * as commonConstants from "../../../../../api/http-commons";
import getLobCode from "../../../Utils/LobUtils";

const { SHOW_PARENT } = TreeSelect;

function mapDispatchToProps(dispatch) {
  return {
    getIntelliscenseSearch: (a) => dispatch(getIntelliscenseSearch(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id
  };
};


let treeData = [
  {
    title: (
      <TreeNodeTitle
        groupTitle="GPI 14"
        title="Amikacin Sulfate Inj 1 GM/4ML (250 MG/ML) (99999-9999-99)"
      />
    ),
    value: "0-0",
    key: "0-0",
    lable: "Gpi 14",

    children: [],
  },
];

const RemoveIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
    >
      <path
        d="M8 0.805714L7.19429 0L4 3.19429L0.805714 0L0 0.805714L3.19429 4L0 7.19429L0.805714 8L4 4.80571L7.19429 8L8 7.19429L4.80571 4L8 0.805714Z"
        fill="white"
      />
    </svg>
  </span>
);

const ClearIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
    >
      <path
        d="M6.5 0C2.91594 0 0 2.91594 0 6.5C0 10.0841 2.91594 13 6.5 13C10.0841 13 13 10.0841 13 6.5C13 2.91594 10.0841 0 6.5 0ZM8.85344 8.14656C8.90182 8.19253 8.94051 8.24772 8.96723 8.30888C8.99395 8.37003 9.00816 8.43592 9.00901 8.50265C9.00986 8.56938 8.99735 8.63561 8.97221 8.69743C8.94706 8.75925 8.9098 8.81541 8.86261 8.86261C8.81541 8.9098 8.75925 8.94706 8.69743 8.97221C8.63561 8.99735 8.56938 9.00986 8.50265 9.00901C8.43592 9.00816 8.37003 8.99395 8.30888 8.96723C8.24772 8.94051 8.19253 8.90182 8.14656 8.85344L6.5 7.20719L4.85344 8.85344C4.75891 8.94325 4.63303 8.99258 4.50265 8.99091C4.37227 8.98924 4.2477 8.9367 4.1555 8.8445C4.0633 8.7523 4.01076 8.62773 4.00909 8.49735C4.00742 8.36697 4.05675 8.24109 4.14656 8.14656L5.79281 6.5L4.14656 4.85344C4.05675 4.75891 4.00742 4.63303 4.00909 4.50265C4.01076 4.37227 4.0633 4.2477 4.1555 4.1555C4.2477 4.0633 4.37227 4.01076 4.50265 4.00909C4.63303 4.00742 4.75891 4.05675 4.85344 4.14656L6.5 5.79281L8.14656 4.14656C8.24109 4.05675 8.36697 4.00742 8.49735 4.00909C8.62773 4.01076 8.7523 4.0633 8.8445 4.1555C8.9367 4.2477 8.98924 4.37227 8.99091 4.50265C8.99258 4.63303 8.94325 4.75891 8.85344 4.85344L7.20719 6.5L8.85344 8.14656Z"
        fill="#C4C4C4"
      />
    </svg>
  </span>
);

const HideIcon = (props) => (
  <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="12"
      viewBox="0 0 15 12"
      fill="none"
    >
      <path
        d="M7.50019 9.37502C5.72246 9.37502 4.2834 7.999 4.15097 6.25525L1.69238 4.35517C1.36918 4.76064 1.07176 5.18931 0.831756 5.65806C0.778141 5.76412 0.750206 5.88129 0.750206 6.00013C0.750206 6.11897 0.778141 6.23615 0.831756 6.3422C2.10277 8.82212 4.61902 10.5 7.50019 10.5C8.1309 10.5 8.73933 10.4063 9.32574 10.2549L8.10957 9.31384C7.90871 9.35264 7.70475 9.37312 7.50019 9.37502ZM14.8554 10.7367L12.2643 8.73423C13.0514 8.07093 13.6987 7.25774 14.1686 6.34197C14.2222 6.23591 14.2502 6.11874 14.2502 5.9999C14.2502 5.88106 14.2222 5.76388 14.1686 5.65783C12.8976 3.17791 10.3814 1.50002 7.50019 1.50002C6.29351 1.50148 5.10643 1.80526 4.04738 2.38361L1.06566 0.0790001C1.02678 0.0487441 0.982317 0.0264463 0.934814 0.013381C0.887311 0.000315696 0.837699 -0.00326106 0.788813 0.00285514C0.739927 0.00897133 0.692725 0.0246606 0.649905 0.0490263C0.607085 0.0733921 0.569486 0.105957 0.539256 0.144859L0.0791778 0.737125C0.0181462 0.815637 -0.00920164 0.915176 0.00314901 1.01385C0.0154997 1.11252 0.0665374 1.20225 0.145037 1.2633L13.9347 11.921C13.9736 11.9513 14.0181 11.9736 14.0656 11.9866C14.1131 11.9997 14.1627 12.0033 14.2116 11.9972C14.2605 11.9911 14.3077 11.9754 14.3505 11.951C14.3933 11.9266 14.4309 11.8941 14.4611 11.8552L14.9214 11.2629C14.9825 11.1844 15.0098 11.0848 14.9974 10.9861C14.985 10.8875 14.9339 10.7977 14.8554 10.7367ZM10.5494 7.40861L9.62832 6.69658C9.70589 6.47239 9.74703 6.23722 9.75019 6.00002C9.75477 5.65273 9.67783 5.30922 9.52556 4.99706C9.37329 4.68491 9.14993 4.41282 8.87343 4.20264C8.59693 3.99247 8.27499 3.85007 7.93348 3.78689C7.59196 3.72371 7.24038 3.7415 6.90699 3.83884C7.04832 4.03035 7.12477 4.262 7.12519 4.50002C7.1217 4.57922 7.10959 4.65781 7.0891 4.73439L5.36387 3.40103C5.96316 2.90022 6.71919 2.62559 7.50019 2.62502C7.94347 2.62477 8.38246 2.7119 8.79204 2.88142C9.20163 3.05094 9.57378 3.29953 9.88723 3.61298C10.2007 3.92643 10.4493 4.29858 10.6188 4.70817C10.7883 5.11775 10.8754 5.55673 10.8752 6.00002C10.8752 6.50697 10.7512 6.97947 10.5494 7.40884V7.40861Z"
        fill="#707683"
      />
    </svg>
  </span>
);

interface Props {
  formulary_id: any;
  formulary: any;
  formulary_lob_id: any;
  formulary_type_id: any;
  nodeId: any;
  initialValues: any;
  getIntelliscenseSearch: (a) => any;
  onChildDataUpdated: (nodeId,childData) => void;
}
interface State {
  searchValue: string;
  expandedKeys: string[];
  checkedKeys: string[];
  selectedKeys: string[];
  autoExpandParent: boolean;
  lobCode: string;
  searchData: any[];
  searchNames: any[];
  choosenElements: any[];
  currentItems: any[];
  treeClosed: boolean;
}

class ReferenceNdc extends Component<Props, State> {
  state = {
    searchValue: '',
    expandedKeys: [],
    checkedKeys: [],
    selectedKeys: [],
    autoExpandParent: true,
    lobCode: '',
    searchData: Array(),
    searchNames: Array(),
    choosenElements: Array(),
    treeClosed: false,
    currentItems: Array(),
  }

  componentDidMount = () => {
    if(this.props.initialValues && this.props.initialValues.length > 0){
      this.state.choosenElements = this.props.initialValues;
    }
    this.props.onChildDataUpdated(this.props.nodeId, {'reference_ndcs': this.state.choosenElements});
    let lobCode = getLobCode(this.props.formulary_lob_id);
    this.setState({
      lobCode: lobCode,
    });
  }


  onExpand = (expandedKeys) => {
    console.log("onExpand", expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys: expandedKeys,
      autoExpandParent: false
    });
  };

  onSearch = (e) => {
    if (e.target.value) {
      this.state.treeClosed = false;
      let requests = Array();
      let apiDetails = {};
      apiDetails['apiPart'] = commonConstants.SEARCH_NDC;
      apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.lobCode + "/" + "F";
      if (this.state.lobCode === 'MCR') {
        apiDetails['pathParams'] = apiDetails['pathParams'] + "/" + (this.props.formulary_type_id === 1 ? 'MC' : 'MMP');
      } else {
        apiDetails['pathParams'] = apiDetails['pathParams'] + "/" + this.state.lobCode;
      }
      apiDetails['keyVals'] = [{ key: commonConstants.KEY_SEARCH_VALUE, value: e.target.value }];
      requests.push({ key: 'ndc', apiDetails: apiDetails });

      this.state.searchValue = e.target.value;
      const drugGridData = this.props.getIntelliscenseSearch(requests).then((json => {
        //debugger;
        if (json.payload && json.payload.data && Array.isArray(json.payload.data) && json.payload.data.length > 0) {
          let tmpData = json.payload.data;
          var data: any[] = [];
          var count = 0;
          var gridData = tmpData.map(function (el) {
            var element = Object.assign({}, el);
            data.push(element)
            let gridItem = {
              title: (
                <TreeNodeTitle
                  groupTitle=""
                  title={element['value']}
                />
              ),
              value: element['value'],
              key: count,
              lable: "",

              children: [],
            };
            count++;
            return gridItem;
          })
          this.setState({
            searchData: data,
            searchNames: gridData
          });
        } else {
          this.setState({
            searchData: [],
            searchNames: []
          });
        }
      }))
    }
    else{
      this.setState({searchValue: ""});
    }
  };

  onCheck = (checkedKeys) => {
    console.log("onCheck", checkedKeys);
    let checkedItems = checkedKeys.map(item => {
      return this.state.searchData[item]['value'];
    });
    let tobeRemoved = Array();
    if(this.state.currentItems.length > 0){
      tobeRemoved = this.state.currentItems.filter(item => !checkedItems.includes(item));
    }
    this.state.currentItems = checkedItems;
    this.state.choosenElements = Array.from(new Set([...this.state.choosenElements ,...checkedItems])).filter(item => !tobeRemoved.includes(item));
    this.props.onChildDataUpdated(this.props.nodeId, {'reference_ndcs': this.state.choosenElements});
    this.setState({
      checkedKeys: checkedKeys,
    });
  };

  onSelect = (selectedKeys, info) => {
    console.log("onSelect", info);
    this.setState({
      selectedKeys: selectedKeys,
    });
  };

  onClearSearch = () => {
    if (this.state.checkedKeys.length > 0) {
      this.state.checkedKeys.map(item => {
        if (!this.state.choosenElements.includes(this.state.searchData[item]['value']))
          this.state.choosenElements.push(this.state.searchData[item]['value'])
      });
      this.state.checkedKeys = [];
      this.props.onChildDataUpdated(this.props.nodeId, {'reference_ndcs': this.state.choosenElements});
    }
    this.setState({
      searchValue: '',
      treeClosed: true,
      currentItems: Array(),
    });
  };

  removeSearchElement = (element) => {
    let currentChosenElements = this.state.choosenElements.filter(item => item !== element);
    this.props.onChildDataUpdated(this.props.nodeId, {'reference_ndcs': currentChosenElements});
    if (!this.state.treeClosed) {
      this.setState({
        checkedKeys: this.state.checkedKeys.filter(item => this.state.searchData[item]['value'] !== element),
        choosenElements: currentChosenElements,
      });
    } else {
      this.setState({
        choosenElements: currentChosenElements,
      });
    }
  }

  render() {
    return (
      <div className="__root-alternative-drug">
        <div className="search-box-container">
          <SearchBox
            iconPosition="left"
            onChange={this.onSearch}
            value={this.state.searchValue}
            placeholder="Search by reference ndc"
            style={{ paddingLeft: "30px" }}
          />
          <ClearIcon
            className="search-box-container__clear-action"
            onClick={this.onClearSearch}
          />
        </div>
        <div className="search-tag-list">
          {this.state.choosenElements.map((ndc, index) => {
            return <div className="search-tag-list__item">
              {ndc} <RemoveIcon className="search-tag-list__remove-action" onClick={() => this.removeSearchElement(ndc)} />
            </div>
          })}
        </div>

        {this.state.searchValue.length > 0 && (
          <div className="search-tree-list scroll-bar">
            <Tree
              checkable={true}
              onExpand={this.onExpand}
              expandedKeys={this.state.expandedKeys}
              autoExpandParent={this.state.autoExpandParent}
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              onSelect={this.onSelect}
              selectedKeys={this.state.selectedKeys}
              treeData={this.state.searchNames}
              style={{
                width: "100%"
              }}
            />
            <div className="search-tree-list__hide-label-action">
              <HideIcon onClick={this.onClearSearch} />
              <span className="search-tree-list__hide-label-action-text" onClick={this.onClearSearch}>
                Hide labels
            </span>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferenceNdc);
