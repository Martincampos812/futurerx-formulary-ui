import React, { Component } from "react";
import { Tree } from "antd";

import "./DrugCategory.scss";
import { getCategoryClasses } from "../../../../../redux/slices/formulary/categoryClass/categoryClassActionCreation";
import { connect } from "react-redux";
import * as commonConstants from "../../../../../api/http-commons";
import * as categoryConstants from "../../../../../api/http-category-class";
import getLobCode from "../../../Utils/LobUtils";
import SearchBox from "../../../../shared/Frx-components/search-box/SearchBox";

function mapDispatchToProps(dispatch) {
  return {
    getCategoryClasses: (a) => dispatch(getCategoryClasses(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id,
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
  };
};

interface Props {
  formulary_id: any;
  formulary: any;
  formulary_lob_id: any;
  formulary_type_id: any;
  nodeId: any;
  advancedSearchBody: any;
  initialValues: any;
  getCategoryClasses: (a) => any;
  onChildDataUpdated: (nodeId, childData) => void;
}
interface State {
  searchValue: string;
  expandedKeys: string[];
  checkedKeys: string[];
  selectedKeys: string[];
  autoExpandParent: boolean;
  lobCode: string;
  searchData: any[];
  treeClosed: boolean;
  drugCategory: any[];
  choosenElements: any[];
  currentItems: any[];
}

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

class DrugCategory extends Component<Props, State> {
  state = {
    drugCategory: Array(),//[
      /*{
        title: "category 1",
        // (
        //   <span>
        //     <input type="radio" />
        //     category 1
        //   </span>
        // )
        key: "0-0",

        children: [
          {
            title: (
              <span>
                <input
                  type="radio"
                  name="radiobutton"
                  value="class A"
                  onChange={(e) => this.setCategoryClass(e, '')}
                  style={{ marginRight: "5px" }}
                />
                <label htmlFor=""> class A</label>
              </span>
            ),
            key: "0-0-0",
            children: [
              {
                title: "Drug 1",
                key: "0-0-0-1",
              },
              {
                title: "Drug 2",
                key: "0-0-0-2",
              },
            ],
          },
          {
            title: (
              <span>
                <input
                  type="radio"
                  name="radiobutton"
                  value="class B"
                  style={{ marginRight: "5px" }}
                />
                <label htmlFor="">Class B</label>
              </span>
            ),
            key: "0-0-1",
            children: [
              {
                title: "Drug 1",
                key: "0-0-1-1",
              },
              {
                title: "Drug 2",
                key: "0-0-1-2",
              },
            ],
          },
        ],
      },
      {
        title: "category 2",
        key: "0-1",
        children: [],
      },
    ],*/
    searchValue: '',
    expandedKeys: [],
    checkedKeys: [],
    selectedKeys: [],
    autoExpandParent: true,
    lobCode: '',
    searchData: Array(),
    treeClosed: false,
    currentItems: Array(),
    choosenElements: Array(),
  };

  componentDidMount = () => {
    if(this.props.initialValues && this.props.initialValues.length > 0){
      this.state.choosenElements = this.props.initialValues;
    }
    let resultData = this.getResult(this.state.choosenElements);
    this.props.onChildDataUpdated(this.props.nodeId, resultData);
    let lobCode = getLobCode(this.props.formulary_lob_id);
    this.setState({
      lobCode: lobCode,
    });
  }

  getResult = (rawData) => {
    let result = { drug_categories: Array(), drug_classes: Array() };
    if (rawData.length > 0) {
      rawData.map(data => {
        let classValue = data.substring(data.lastIndexOf("[") + 1, (data.lastIndexOf("]")));
        let category = data.substring(0, (data.lastIndexOf("[")));
        category = category.trim();
        classValue = classValue.trim();

        result.drug_categories.push(category);
        result.drug_classes.push(classValue);
      });
    }
    return result;
  }

  onSearch = (e) => {
    if (e.target.value) {
      this.state.treeClosed = false;

      let apiDetails = {};
      apiDetails['apiPart'] = categoryConstants.SEARCH;
      apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.lobCode;
      apiDetails['keyVals'] = [{ key: commonConstants.KEY_SEARCH_VALUE, value: e.target.value }, { key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
      this.state.searchValue = e.target.value;
      const searchData = this.props.getCategoryClasses(apiDetails).then((json => {
        //debugger;
        if (json.payload && json.payload.data) {
          let tmpData = json.payload.data;
          let count = 0;
          let categoryDataArray = Array();
          Object.keys(tmpData).map(category => {
            let categoryData =  {
              title: category,
              key: "0-"+count,
              children: Array()
            }

            let classCount = 0;

            Object.keys(tmpData[category]).map(classValue => {
              let classData = {
                title: (
                  <span>
                    <input
                      type="radio"
                      name="radiobutton"
                      value={classValue}
                      onChange={(e) => this.setCategoryClass(e, category, classValue)}
                      style={{ marginRight: "5px" }}
                    />
                    <label htmlFor=""> {classValue}</label>
                  </span>
                ),
                key: "0-0-"+classCount,
                children: Array()
              }
              
              let drugCount = 0;
              tmpData[category][classValue].map(drug => {
                let drugData = {
                  title: drug['name'],
                  key: "0-0-0-"+drugCount,
                }
                classData.children.push(drugData);
                drugCount++;
              })
              categoryData.children.push(classData);
              classCount++;
            })
            categoryDataArray.push(categoryData);
            count++;
          })

          
          this.setState({
            drugCategory: categoryDataArray,
          });
        }
      }))
    }
    else{
      this.setState({searchValue: ""});
    }
  };

  onClearSearch = () => {
    this.setState({
      searchValue: '',
      treeClosed: true,
      currentItems: Array(),
    });
  };

  setCategoryClass = (e, category, classValue) => {
    console.log('Set category class called');
    let categoryItem = category + '[' + classValue + ']';
    let tobeRemoved = Array();
    if (this.state.currentItems.length > 0) {
      tobeRemoved = this.state.currentItems.filter(item => item !== categoryItem);
    }
    this.state.currentItems = Array();
    this.state.currentItems.push(categoryItem);
    let newChoosenItems = Array.from(new Set([...this.state.choosenElements, ...[categoryItem]])).filter(item => !tobeRemoved.includes(item));
    let resultData = this.getResult(newChoosenItems);
    this.props.onChildDataUpdated(this.props.nodeId, resultData);
    this.setState({
      choosenElements: newChoosenItems
    });
  }

  removeSearchElement = (element) => {
    let currentChosenElements = this.state.choosenElements.filter(item => item !== element);
    let resultData = this.getResult(currentChosenElements);
    this.props.onChildDataUpdated(this.props.nodeId, resultData);
    if (!this.state.treeClosed) {
      this.setState({
        currentItems: this.state.currentItems.filter(item => item !== element),
        choosenElements: currentChosenElements,
      });
    } else {
      this.setState({
        choosenElements: currentChosenElements,
      });
    }
  }


  render() {
    const { drugCategory } = this.state;
    return (
      <div className="__root-alternative-drug">
        <div className="search-box-container">
          <SearchBox
            iconPosition="left"
            onChange={this.onSearch}
            value={this.state.searchValue}
            placeholder="Search by drug category"
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
              //   checkable
              //   onExpand={this.onExpand}
              // expandedKeys={expandedKeys}
              //   autoExpandParent={autoExpandParent}
              //   onCheck={this.onCheck}
              //   checkedKeys={checkedKeys}
              //   onSelect={this.onSelect}
              //   selectedKeys={selectedKeys}
              selectable={false}
              treeData={drugCategory}
            />
            <div className="search-tree-list__hide-label-action">
              <span className="__expand-all">
                <p>Expand All</p>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrugCategory);
