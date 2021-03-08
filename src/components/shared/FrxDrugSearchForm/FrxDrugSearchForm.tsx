import { Box, Button, Grid, Tooltip } from "@material-ui/core";
import { Checkbox, Input, Select } from "antd";
import { filter } from "lodash";

import React, { Component } from 'react';
import './FrxDrugSearchForm.scss';

interface DrugSearchForm {
    index: string;
    searchTxt: string;
    qty: string;
    days: string;
    generic: boolean;
    showGeneric: boolean;
}
interface DrugSearchFormError {
    isSearchError: boolean;
    isQtyError: boolean;
    isDaysError: boolean;
    isGenericError: boolean;
}

interface Props {
    options: any;
    onSearch: any;
}
interface State {
    forms: DrugSearchForm[];
    index: number;
    filteredOptions: any;
    onSearch: boolean;
    errors: DrugSearchFormError[];
}

export default class FrxDrugSearchForm extends Component<Props, State> {
    state = {
        forms: [{
            index: '',
            searchTxt: '',
            qty: '',
            days: '',
            generic: false,
            showGeneric: false,
        }],
        index: 0,
        filteredOptions: [],
        onSearch: false,
        errors: [{
            isSearchError: false,
            isQtyError: false,
            isDaysError: false,
            isGenericError: false
        }]
    }
    componentDidMount() {
        // this.handleAddForm()
    }
    onClear = () => {
        this.setState({
            forms: this.state.forms.map((item: any) => {
                return {
                    index: '',
                    searchTxt: '',
                    qty: '',
                    days: '',
                    generic: false,
                    showGeneric: false
                }
            }),
            onSearch: false
        })
        this.props.onSearch([])
    }
    onSearch = () => {
        var temp: any = this.state.forms.filter((item: any) => item.searchTxt === '' || item.qty === '')
        if (temp.length > 0) {
            this.state.forms.map((item: any, index: number) => {
                var _error_temp: any = this.state.errors
                _error_temp[index] = {
                    isSearchError: item.searchTxt === '',
                    isQtyError: item.qty === '',
                    isDaysError: false,
                    isGenericError: false
                }
                this.setState({
                    errors: _error_temp
                })
            })
        } else {
            this.state.forms.map((item: any, index: number) => {
                var _error_temp: any = this.state.errors
                _error_temp[index] = {
                    isSearchError: item.searchTxt === '',
                    isQtyError: item.qty === '',
                    isDaysError: false,
                    isGenericError: false
                }
                this.setState({
                    errors: _error_temp
                })
            })
            this.props.onSearch(this.state.forms.filter((item: any) => item.searchTxt !== '').map((item: any) => { return item }))
            this.setState({
                onSearch: true
            })
        }

    }

    handleAddForm = () => {
        if (this.state.forms.length <= 2) {
            var temp: any = this.state.forms
            temp.push({
                index: '',
                searchTxt: '',
                qty: '',
                days: '',
                generic: false,
                showGeneric: false
            })
            this.setState({
                forms: temp,
                errors: [...this.state.errors, {
                    isSearchError: false,
                    isQtyError: false,
                    isDaysError: false,
                    isGenericError: false
                }]
            })
        }
    }
    handleRemoveForm = (index: number) => {
        if (this.state.forms.length > 1) {
            setTimeout(() => {
                this.setState({
                    forms: this.state.forms.filter((item: any, _index: number) => _index !== index),
                    errors: this.state.errors.filter((item: any, _index: number) => _index !== index)
                })
            })
        }
    }
    getSearchField = (index: any) => {
        const { forms, filteredOptions, errors } = this.state
        const { options } = this.props
        return (<Grid container className="form-row">
            <Grid item className="drugName">
                <Box component="span" display="block">
                    <div className="FrxDrugSearch-root-search--input">
                        <Input.Group compact>
                            <Input
                                className={errors[index].isSearchError ? 'drugName-search-prefix error' : 'drugName-search-prefix'}
                                onChange={(e: any) => {
                                }}
                                value={''}
                                placeholder="Search Drug"
                                name="searchText"
                                prefix={
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z" fill="#999999" />
                                    </svg>

                                }
                            />
                            <Select
                                showSearch
                                className={errors[index].isSearchError ? 'drugName-search-select error' : 'drugName-search-select'}
                                placeholder="Search Drug"
                                optionFilterProp="children"
                                value={forms[index].searchTxt !== '' ? forms[index].searchTxt : undefined}
                                onChange={(e: any) => {
                                    this.setState({
                                        forms: forms.map((item: any, _index: number) => _index === index ? { ...item, searchTxt: e, showGeneric: options.filter((i: any) => i.title === e)[0].genericAvailable ? true : false } : item),
                                    })
                                }}
                                onSearch={(e: any) => {
                                    var input = e
                                    if (input.trim() !== '') {
                                        this.setState({
                                            filteredOptions: options.filter((i: any) => i.title.toLowerCase().startsWith(input.toLowerCase()))
                                        })
                                    } else {
                                        this.setState({ filteredOptions: [] })
                                    }
                                }}
                                suffixIcon={null}
                                filterOption={false}
                                defaultOpen={false}
                                notFoundContent={null}
                                dropdownAlign={{ offset: [0, 0] }}
                                dropdownClassName="drug-search-select-drpDwn"
                            >
                                {filteredOptions.length > 0 ? filteredOptions.slice(0, 6).map((item: any) => (<option value={item.title}>{`${item.title} - ${item.capacity} - ${item.type}`}</option>)) : ''}
                            </Select>
                        </Input.Group>
                    </div>
                </Box>
            </Grid>
            <Grid item className="qty">
                <Box component="span" display="block" >
                    <Input
                        className={errors[index].isQtyError ? 'drugName-search-qty--input error' : 'drugName-search-qty--input'}
                        onChange={(e: any) => {
                            let val: any = e.target.value
                            this.setState({ forms: forms.map((item: any, _index: number) => _index === index ? { ...item, qty: val } : item) })
                        }}
                        value={forms[index].qty}
                        placeholder="Qty"
                        name="searchText"
                    />
                </Box>
            </Grid>
            <Grid item className="days">
                <Box component="span" display="block" >
                    <Input
                        className="drugName-search-days--input"
                        onChange={(e: any) => {
                            let val: any = e.target.value
                            this.setState({ forms: forms.map((item: any, _index: number) => _index === index ? { ...item, days: val } : item) })
                        }}
                        value={forms[index].days}
                        placeholder="Days"
                        name="searchText"

                    />
                </Box>
            </Grid>
            {
                forms[index].showGeneric && <Grid item className="generic">
                    <Box component="span" display="block" >
                        <Checkbox checked={forms[index].generic} onChange={(e: any) => {
                            this.setState({ forms: forms.map((item: any, _index: number) => _index === index ? { ...item, generic: e.target.checked } : item) })
                        }} className="generic--checkbox">Generic</Checkbox>
                    </Box>
                </Grid>
            }
            <Grid item className="delete">
                <Box component="span" display="block" onClick={() => { this.handleRemoveForm(index) }}>
                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
                    </svg>
                </Box>
            </Grid>
        </Grid >)
    }
    render() {
        const { forms, onSearch } = this.state
        return (
            <div className="drugsearch-form-root">
                <div className="FrxDrugSearch-root" >
                    <Grid container className="form-head" >
                        <Grid item className="drugName">
                            <Box component="span" display="block" className="label">
                                DRUG LABEL
                            </Box>

                        </Grid>
                        <Grid item className="qty">
                            <Box component="span" display="block" className="label">
                                QTY
                    </Box>

                        </Grid>
                        <Grid item className="days">
                            <Box component="span" display="block" className="label">
                                DAYS
                    </Box>

                        </Grid>
                        <Grid item className="generic">
                            <Box component="span" display="block" className="label">

                            </Box>

                        </Grid>
                        <Grid item className="delete">
                            <Box component="span" display="block" className="label">

                            </Box>

                        </Grid>
                    </Grid>
                    {forms.map((item: any, index: number) => this.getSearchField(index))}
                </div>
                <div className="sectionb">
                    <div className="options">
                        {forms.length < 3 && <><Button className="addForm" onClick={this.handleAddForm}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                                <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                            </svg>
                            <span className="addForm--text">Add Drug</span>
                        </Button>
                            <div className="info">
                                <Tooltip title="Add up to 3 drugs." classes={{ tooltip: 'drugsearch-tooltip', arrow: 'drugsearch-tooltip-arrow' }} arrow={true} placement="top-start">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.33301 3.66659H7.66634V4.99992H6.33301V3.66659ZM6.33301 6.33325H7.66634V10.3333H6.33301V6.33325ZM6.99967 0.333252C3.31967 0.333252 0.333008 3.31992 0.333008 6.99992C0.333008 10.6799 3.31967 13.6666 6.99967 13.6666C10.6797 13.6666 13.6663 10.6799 13.6663 6.99992C13.6663 3.31992 10.6797 0.333252 6.99967 0.333252ZM6.99967 12.3333C4.05967 12.3333 1.66634 9.93992 1.66634 6.99992C1.66634 4.05992 4.05967 1.66659 6.99967 1.66659C9.93967 1.66659 12.333 4.05992 12.333 6.99992C12.333 9.93992 9.93967 12.3333 6.99967 12.3333Z" fill="#1D54B4" />
                                    </svg>
                                </Tooltip>
                            </div></>}
                    </div>
                    <div className="btn-grp">
                        {onSearch && <Button
                            className="clear"
                            onClick={this.onClear}
                        >
                            <svg className="btn-clear--clearicon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17C13.1944 17 17 13.1945 17 8.5C17 3.80554 13.1944 0 8.5 0C3.8056 0 0 3.80554 0 8.5C0 13.1945 3.8056 17 8.5 17ZM8.5 16C12.6422 16 16 12.6421 16 8.5C16 4.35791 12.6422 1 8.5 1C4.35785 1 1 4.35791 1 8.5C1 12.6421 4.35785 16 8.5 16Z" fill="#666666" />
                                <path d="M5.31803 5.31802C5.12277 5.51328 5.12277 5.82986 5.31803 6.02513L7.7929 8.5L5.31803 10.9749C5.12277 11.1701 5.12277 11.4867 5.31803 11.682C5.51329 11.8772 5.82987 11.8772 6.02514 11.682L8.50001 9.20711L10.9749 11.682C11.1701 11.8772 11.4867 11.8772 11.682 11.682C11.8773 11.4867 11.8773 11.1701 11.682 10.9749L9.20712 8.5L11.682 6.02513C11.8773 5.82986 11.8773 5.51328 11.682 5.31802C11.4867 5.12276 11.1701 5.12276 10.9749 5.31802L8.50001 7.79289L6.02513 5.31802C5.82987 5.12276 5.51329 5.12276 5.31803 5.31802Z" fill="#666666" />
                            </svg>
                            <span>Clear</span>
                        </Button>}
                        <Button
                            className="search"
                            onClick={e => this.onSearch()}
                        >
                            Search
                </Button>
                    </div>
                </div>
            </div>
        )
    }
}

