import { Grid, Input } from "@material-ui/core";
import React from "react";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import RadioButton from "../../../../../../shared/Frx-components/radio-button/RadioButton";
import './OverridePopup.scss';
import { connect } from "react-redux";

import { getCategoryClasses } from "../../../../../../../redux/slices/formulary/categoryClass/categoryClassActionCreation";
import * as commonConstants from "../../../../../../../api/http-commons";
import * as categoryConstants from "../../../../../../../api/http-category-class";
import getLobCode from "../../../../../Utils/LobUtils";

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
        formulary_type_id: state?.application?.formulary_type_id
    };
};

class OverridePopup extends React.Component<any, any> {
    state = {
        isNewCatSelcted: true,
        lobCode: '',
        treeData: {},
        isNewCategory: false,
        searchValue: '',
        categories: Array(),
        categoryText: '',
        classText: '',
    }
    componentDidMount() {
        let lob = getLobCode(this.props.formulary_lob_id);
        this.setState({
            lobCode: lob,
        });
    }
    handleCategoryClick = () => {
        this.props.onOverrideCategoryClass(null, null);
        this.state.categories = Array();
        this.state.searchValue = '';
        this.state.categoryText = '';
        this.state.classText = '';
        this.setState({
            isNewCatSelcted: !this.state.isNewCatSelcted,
        });
    }
    setCategoryClass = (event, category) => {
        this.props.onOverrideCategoryClass(category, event.target.value);
    }
    handleNewCategorySelection = (event) => {
        let newCategory = event.target.value === 'Yes';
        this.props.onOverrideCategoryClass(null, null);
        this.state.categories = Array();
        this.state.searchValue = '';
        this.state.categoryText = '';
        this.state.classText = '';
        this.setState({
            isNewCategory: newCategory,
        });
    }
    handleSearchTextChanged = (event) => {
        if (event.target.value) {
            let apiDetails = {};
            apiDetails['apiPart'] = categoryConstants.SEARCH;
            apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.lobCode;
            apiDetails['keyVals'] = [{ key: commonConstants.KEY_SEARCH_VALUE, value: event.target.value }, { key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
            const searchData = this.props.getCategoryClasses(apiDetails).then((json => {
                //debugger;
                if (json.payload && json.payload.data) {
                    let tmpData = json.payload.data;
                    this.setState({
                        treeData: tmpData,
                    });
                }
            }))
        }
    }

    handleInputEntered = (event, type) => {
        if (event.target.value) {
            switch (type) {
                case 'category':
                    this.props.onOverrideCategory(event.target.value,true);
                    this.setState({categoryText: event.target.value});
                    break;
                case 'class':
                    this.props.onOverrideClass(event.target.value);
                    this.setState({classText: event.target.value});
                    break;
            }
        }
        else{
            switch (type) {
                case 'category':
                    this.props.onOverrideCategory(event.target.value,true);
                    this.setState({categoryText: ""});
                    break;
                case 'class':
                    this.props.onOverrideClass(event.target.value);
                    this.setState({classText: ""});
                    break;
            }
        }
    }

    onDropdownSearchValueChanged = (value) => {
        if (value) {
            let apiDetails = {};
            apiDetails['apiPart'] = categoryConstants.DROPDOWN_SEARCH;
            apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.lobCode;
            apiDetails['keyVals'] = [{ key: commonConstants.KEY_SEARCH_VALUE, value: value }, { key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
            const searchData = this.props.getCategoryClasses(apiDetails).then((json => {
                //debugger;
                if (json.payload && json.payload.data) {
                    let tmpData = json.payload.data;
                    let keys = tmpData.map(item => item['value']);
                    this.setState({
                        categories: keys,
                    });
                }
            }))
        }
    }

    onDropdownSelected = (value, event) => {
        this.props.onOverrideCategory(value);
        this.setState({
            searchValue: value,
        });
    }

    render() {
        return (
            <div className="override-container">
                {this.state.isNewCatSelcted ? (
                    <Grid className="override-wrapper" container spacing={1}>
                        <Grid item sm={4}>
                            <div className="version-grid-date-wrapper">
                                <div className="form">
                                    <label>
                                        SEARCH
                        </label>
                                    <Input
                                        className='override-search__input'
                                        placeholder='Search Category, Class, or Drug'
                                        type='text'
                                        disableUnderline={true}
                                        onChange={this.handleSearchTextChanged}
                                    />
                                    <div>
                                        <label className="label-wrapper">
                                            or
                        </label>
                                        <div className="formulary-info-field__value">
                                            <a className="input-link" onClick={(e) => this.handleCategoryClick()}>
                                                Create New Category/Class
                        </a>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </Grid>

                        <Grid className="set-treeview-magin" item sm={7}>
                            <div className="version-grid-date-wrapper">
                                <label>
                                    Category And Class Selection
                    </label>
                            </div>
                            <div className="treeview-container">
                                <ul style={{ listStyleType: 'none' }}>
                                    {Object.keys(this.state.treeData).map((category, categoryIndex) => {
                                        return <div>
                                            <li>{category}</li>
                                            <ul style={{ listStyleType: 'none' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    {Object.keys(this.state.treeData[category]).map((classVal, classIndex) => {
                                                        return <li>
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                <input type="radio" value={classVal} name="classSelect" onChange={(e) => this.setCategoryClass(e, category)} />
                                                                <span style={{ marginLeft: 10 }}>{classVal}</span>
                                                            </div>
                                                            <ul style={{ listStyleType: 'none' }}>
                                                                {this.state.treeData[category][classVal].map((drug) => <li>{drug.name}</li>)}
                                                            </ul>
                                                        </li>
                                                    })}
                                                </div>
                                            </ul>
                                        </div>
                                    })}
                                </ul>
                            </div>
                        </Grid>

                    </Grid>
                ) :

                    <Grid container spacing={1}>
                        <Grid item sm={12}>
                            <div className="back-arrow">
                                &lt;
                </div>
                            <div className="formulary-info-field__value">
                                <a className="input-link" onClick={(e) => this.handleCategoryClick()}>
                                    Existing Classes
                </a>
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <div className="version-grid-date-wrapper">
                                <div className="form set-margin">
                                    <label className="set-label-margin">
                                        Will this new class be assigned to an existing category?
                </label>
                                    <br />
                                    <div className="set-radio-dimension">
                                        <RadioButton label="Yes" value="Yes" name="override-radio" onChange={(e) => this.handleNewCategorySelection(e)} />
                                    </div>
                                    <div className="set-radio-dimension">
                                        <RadioButton label="No" value="No" name="override-radio" onChange={(e) => this.handleNewCategorySelection(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <br />
                        <Grid item sm={12}>
                            <div className="version-grid-date-wrapper set-top-margin">
                                <div className="form">
                                    <label>
                                        Category
                    </label>
                                    {this.state.isNewCategory ? <DropDown className="version-grid-dropdown set-input-control-dimenion" value={this.state.searchValue} placeholder="Select Existing Category" options={this.state.categories} showSearch={true} onSearch={this.onDropdownSearchValueChanged} onSelect={this.onDropdownSelected} />
                                        : <Input
                                            className='override-search__input set-input-control-dimenion'
                                            placeholder='Custom Category'
                                            type='text'
                                            disableUnderline={true}
                                            onChange={(e) => this.handleInputEntered(e, 'category')}
                                            value={this.state.categoryText}
                                        />}
                                </div>
                                <div className="form">
                                    <label>
                                        Class Name
                    </label>
                                    <Input
                                        className='override-search__input set-input-control-dimenion'
                                        placeholder='Custom Class Name'
                                        type='text'
                                        disableUnderline={true}
                                        onChange={(e) => this.handleInputEntered(e, 'class')}
                                        value={this.state.classText}
                                    />
                                </div>
                            </div>
                        </Grid>

                    </Grid>


                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverridePopup);