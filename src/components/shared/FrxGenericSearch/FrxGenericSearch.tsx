import {Box, Button, Chip, Grid, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {Checkbox, Input, Select, DatePicker, Tag} from "antd";

import React, {Component} from "react";
import {connect} from "react-redux";
import {
  getUserPrefs,
  setUserPrefs,
} from "../../../redux/slices/users/UserPrefsActionCreator";
import CustomDatePicker from "../Frx-components/date-picker/CustomDatePicker";
import "./FrxGenericSearch.scss";

declare type searchType =
  | "TEXT"
  | "DROPDOWN"
  | "DATE"
  | "MULTIDROPDOWN"
  | "SEARCHDROPDOWN"
  | "CLEAR";
interface option {
  id: number;
  item: any;
  displayOption: string;
  parentValue?: string;
  onClick?: any;
}

interface SearchOption {
  id: number;
  row: number;
  searchType: string;
  isRequired: boolean;
  pixelWidth: number;
  placeholder: string;
  name: string;
  options?: option[];
  filteredOptions?: option[];
  className?: string;
  preficxIcon?: any;
  value?: any;
  isError?: boolean;
  smallDropDown?: boolean;
  errorTxt?: string;
  getSuggestions?: any;
  suggestions?: any;
  nameSpace: string;
  parent?: number;
}

function mapDispatchToProps(dispatch) {
  return {
    setPrefs: (member_id, data) => {
      dispatch(setUserPrefs({member_id: member_id, data: data}));
    },
    getPrefs: (member_id) => {
      dispatch(getUserPrefs(member_id));
    },
  };
}

// Get state as props
const mapStateToProps = (state) => {
  return {
    userPrefs: state.user_prefs,
  };
};

interface Props {
  searchOptions: SearchOption[];
  onSearch: any;
  setPrefs: any;
  getPrefs: any;
  userPrefs: any;
}

interface State {
  searchOptions: SearchOption[];
}

const {Option} = Select;

class GenericSearch extends Component<Props, State> {
  state = {
    searchOptions: [],
  };
  tagRender = (props) => {
    const {label, value, closable, onClose} = props;

    return (
      <Tag
        color="#ECF5FA"
        closable={closable}
        onClose={onClose}
        closeIcon={
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 0.5C2.24303 0.5 0 2.74303 0 5.5C0 8.25697 2.24303 10.5 5 10.5C7.75697 10.5 10 8.25697 10 5.5C10 2.74303 7.75697 0.5 5 0.5ZM6.81034 6.76659C6.84756 6.80195 6.87732 6.8444 6.89787 6.89144C6.91842 6.93849 6.92935 6.98917 6.93001 7.0405C6.93067 7.09183 6.92104 7.14278 6.9017 7.19033C6.88236 7.23789 6.85369 7.28109 6.81739 7.31739C6.78109 7.35369 6.73789 7.38236 6.69033 7.4017C6.64278 7.42104 6.59183 7.43067 6.5405 7.43001C6.48917 7.42935 6.43849 7.41842 6.39144 7.39787C6.3444 7.37732 6.30195 7.34756 6.26659 7.31034L5 6.04399L3.73341 7.31034C3.6607 7.37942 3.56387 7.41737 3.46358 7.41608C3.36328 7.4148 3.26746 7.37439 3.19654 7.30346C3.12561 7.23254 3.0852 7.13672 3.08392 7.03642C3.08263 6.93613 3.12058 6.8393 3.18966 6.76659L4.45601 5.5L3.18966 4.23341C3.12058 4.1607 3.08263 4.06387 3.08392 3.96358C3.0852 3.86328 3.12561 3.76746 3.19654 3.69654C3.26746 3.62561 3.36328 3.5852 3.46358 3.58392C3.56387 3.58263 3.6607 3.62058 3.73341 3.68966L5 4.95601L6.26659 3.68966C6.3393 3.62058 6.43613 3.58263 6.53642 3.58392C6.63672 3.5852 6.73254 3.62561 6.80346 3.69654C6.87439 3.76746 6.9148 3.86328 6.91608 3.96358C6.91737 4.06387 6.87942 4.1607 6.81034 4.23341L5.54399 5.5L6.81034 6.76659Z"
              fill="#1077B0"
            />
          </svg>
        }
        style={{marginRight: 3}}
      >
        {value}
      </Tag>
    );
  };
  componentDidMount = () => {
    setTimeout(() => {
      var temp: any = this.props.searchOptions.map((item: any) => {
        return item.searchType === "TEXT"
          ? {
              ...item,
              suggestions: this.props.userPrefs.prefs
                ?.filter((_item: any) => _item.namespace === item.nameSpace)[0]
                ?.preferences?.filter(
                  (_item: any) => _item.column === item.name
                )[0]?.value,
            }
          : item;
      });
      this.setState({
        searchOptions: temp,
      });
    }, 2000);
    this.setState({
      searchOptions: this.props.searchOptions,
    });
    this.props.getPrefs("john");
  };

  setValue = (item: SearchOption) => {
    let temp: any = this.state.searchOptions;
    temp[item.id - 1] = item;
    this.setState({
      searchOptions: temp,
    });
  };

  onClear = (item: SearchOption) => {
    let temp: any = this.state.searchOptions.map((_item: any) =>
      item.value
        ? item.value.includes(_item.id)
          ? {..._item, value: undefined}
          : _item
        : {..._item, value: undefined}
    );
    this.setState({
      searchOptions: temp,
    });
  };
  getSearchComponent = (item: SearchOption) => {
    var _temp: SearchOption = item;
    switch (item.searchType) {
      case "TEXT":
        return (
          <Autocomplete
            className="search--input"
            openOnFocus={true}
            autoSelect={true}
            id="tags-filled"
            freeSolo
            value={item.value ? item.value : undefined}
            placeholder={item.placeholder}
            onChange={(e: any) => {
              let val: any = e.target.value;
              console.log(val);
              this.setValue({...item, value: val});
            }}
            renderOption={(option) => {
              return (
                <>
                  <span>{option}</span>
                </>
              );
            }}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({index})}
                />
              ))
            }
            renderInput={(params) => (
              <div className="search--input--box">
                <TextField
                  {...params}
                  label=""
                  margin="normal"
                  variant="outlined"
                  value={item.value}
                  placeholder={item.placeholder}
                />
              </div>
            )}
            onSelect={(e: any) => {
              let val: any = e.target.value;
              console.log(val);
              this.setValue({...item, value: val});
            }}
            componentName={item.name}
            options={item.suggestions ? item.suggestions : []}
          />
        );
      case "SEARCHDROPDOWN":
        return (
          <Input.Group
            className="FrxGenericSearch-root-search--input"
            compact
            style={{width: item.pixelWidth, marginRight: 10}}
          >
            <Input
              className="search-dropdown-prefix"
              placeholder="Search Drug"
              name={item.name}
              prefix={
                item.preficxIcon ? (
                  item.preficxIcon
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7ZM7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5C8.61495 13.5 10.0923 12.911 11.2291 11.9362L14.6464 15.3536C14.8417 15.5488 15.1583 15.5488 15.3536 15.3536C15.5488 15.1583 15.5488 14.8417 15.3536 14.6464L11.9362 11.2291C12.911 10.0923 13.5 8.61495 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5Z"
                      fill="#999999"
                    />
                  </svg>
                )
              }
            />
            <Select
              showSearch
              className="search-dropdown-select"
              placeholder="Search Drug"
              optionFilterProp="children"
              value={item.value ? item.value : undefined}
              dropdownClassName="GenericSearch-dropdown-select_dropdown"
              onChange={(e: any) => {
                this.setValue({...item, value: e});
              }}
              onSearch={(e: any) => {
                var input = e;
                console.log(e);

                if (input.trim() !== "") {
                  this.setValue({
                    ...item,
                    filteredOptions: (item.options || []).filter((i: any) =>
                      i.displayOption
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    ),
                  });
                } else {
                  this.setValue({...item, filteredOptions: []});
                }
              }}
              suffixIcon={null}
              dropdownAlign={
                item.options
                  ? item.options.length > 8
                    ? {}
                    : {offset: [0, 0]}
                  : {offset: [0, 0]}
              }
              filterOption={false}
              defaultOpen={false}
              notFoundContent={null}
            >
              {item.filteredOptions
                ? item.filteredOptions.map((_item: any) => (
                    <option value={_item.id}>{_item.displayOption}</option>
                  ))
                : ""}
            </Select>
          </Input.Group>
        );
      case "DATE":
        return (
          <CustomDatePicker
            style={{width: item.pixelWidth, marginRight: 10}}
            onChange={(date: any, dateString: any) => {
              this.setValue({...item, value: date});
            }}
            value={item.value}
            placeholder={item.placeholder}
            className="FrxGenericSearch-root__form__datepicker"
          />
        );

      case "DROPDOWN":
        return (
          <Select
            placeholder={item.placeholder}
            value={item.value ? item.value : undefined}
            onChange={(e: any) => {
              this.setValue({...item, value: e});
            }}
            onSelect={(_item: any) => {
              var temp: any = (item.options || []).filter(
                (__item: any) => __item.id === _item
              )[0];
              if (temp?.onClick) {
                temp.onClick();
              }
            }}
            getPopupContainer={(trigger: any) => trigger.parentNode}
            style={{width: item.pixelWidth, marginRight: 10}}
            dropdownClassName={
              item.options
                ? item.options.length > 8 && !item.smallDropDown
                  ? "GenericSearch-dropdown-select_dropdown_big"
                  : "GenericSearch-dropdown-select_dropdown"
                : "GenericSearch-dropdown-select_dropdown"
            }
            className={
              item.options
                ? item.options.length > 8 && !item.smallDropDown
                  ? "FrxGenericsearch__drop-down_big"
                  : "FrxGenericsearch__drop-down"
                : "FrxGenericsearch__drop-down"
            }
            dropdownAlign={
              item.options
                ? item.options.length > 8 && !item.smallDropDown
                  ? {}
                  : {offset: [0, 0]}
                : {offset: [0, 0]}
            }
            suffixIcon={
              <svg
                className="ant-select-suffix"
                width="6"
                height="3"
                viewBox="0 0 6 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                  fill="#999999"
                />
              </svg>
            }
          >
            {(item.options || [])
              .filter((_item: any) => {
                if (item.parent) {
                  var parentElement: any = this.state.searchOptions.filter(
                    (__item: any) => __item.id === item.parent
                  )[0];
                  var parentValue: any =
                    parentElement.searchType === "DROPDOWN"
                      ? parentElement.options.filter(
                          (_item_: any) => _item_.id === parentElement.value
                        )[0]
                      : parentElement.value;
                  if (parentValue) {
                    return _item.parentValue === parentValue.item;
                  } else {
                    return false;
                  }
                } else {
                  return true;
                }
              })
              .map((option: any) => (
                <option
                  value={option.id}
                  onClick={option.onClick ? option.onClick : () => {}}
                >
                  {option.displayOption}
                </option>
              ))}
          </Select>
        );
      case "MULTIDROPDOWN":
        return (
          <Select
            mode="multiple"
            placeholder={item.placeholder}
            value={item.value ? item.value : undefined}
            onChange={(e: any) => {
              this.setValue({...item, value: e});
            }}
            onSelect={(_item: any) => {
              var temp: any = (item.options || []).filter(
                (__item: any) => __item.id === _item
              )[0];
              if (temp?.onClick) {
                temp.onClick();
              }
            }}
            style={{width: item.pixelWidth, marginRight: 10}}
            dropdownClassName="GenericSearch_multidropdown"
            className={
              item.options
                ? item.options.length > 8
                  ? "FrxGenericsearch__drop-down_big"
                  : "FrxGenericsearch__drop-down"
                : "FrxGenericsearch__drop-down"
            }
            dropdownAlign={
              item.options
                ? item.options.length > 8
                  ? {}
                  : {offset: [0, 0]}
                : {offset: [0, 0]}
            }
            suffixIcon={
              <svg
                className="ant-select-suffix"
                width="6"
                height="3"
                viewBox="0 0 6 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                  fill="#999999"
                />
              </svg>
            }
          >
            {(item.options || []).map((option: any) => (
              <option
                value={option.id}
                onClick={option.onClick ? option.onClick : () => {}}
              >
                {option.displayOption}
              </option>
            ))}
          </Select>
        );
      case "MULTIDROPDOWNTAG":
        return (
          <Select
            mode="multiple"
            showArrow
            placeholder={item.placeholder}
            value={item.value ? item.value : undefined}
            onChange={(e: any) => {
              this.setValue({...item, value: e});
            }}
            tagRender={this.tagRender}
            onSelect={(_item: any) => {
              var temp: any = (item.options || []).filter(
                (__item: any) => __item.id === _item
              )[0];
              if (temp?.onClick) {
                temp.onClick();
              }
            }}
            style={{width: item.pixelWidth, marginRight: 10}}
            dropdownClassName="GenericSearch_multidropdowntag"
            className={
              item.options
                ? item.options.length > 8
                  ? "FrxGenericsearch__multitagdrop-down_big"
                  : "FrxGenericsearch__multitagdrop-down"
                : "FrxGenericsearch__multitagdrop-down"
            }
            dropdownAlign={
              item.options
                ? item.options.length > 8
                  ? {}
                  : {offset: [0, 0]}
                : {offset: [0, 0]}
            }
            suffixIcon={
              <span>
                <svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.273249 0.255719C0.649125 -0.0722496 1.17242 -0.097987 1.63192 0.255719L5.00102 3.0111L8.37012 0.255719C8.82962 -0.097987 9.35378 -0.0722496 9.72707 0.255719C10.1029 0.582952 10.0788 1.13594 9.72707 1.44332C9.37706 1.7507 5.6795 4.75389 5.6795 4.75389C5.59145 4.83173 5.48591 4.89364 5.36919 4.93592C5.25248 4.97821 5.12697 5 5.00016 5C4.87335 5 4.74784 4.97821 4.63112 4.93592C4.51441 4.89364 4.40887 4.83173 4.32082 4.75389C4.32082 4.75389 0.624986 1.7507 0.273249 1.44332C-0.0793515 1.13594 -0.102628 0.582952 0.273249 0.255719Z"
                    fill="white"
                  />
                </svg>
              </span>
            }
          >
            {(item.options || []).map((option: any) => (
              <option
                value={option.displayOption}
                onClick={option.onClick ? option.onClick : () => {}}
              >
                <div className="GenericSearch_multidropdown_label_item">
                  <span>
                    {option.displayOption}
                    <svg
                      width="10"
                      height="11"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 0.5C2.24303 0.5 0 2.74303 0 5.5C0 8.25697 2.24303 10.5 5 10.5C7.75697 10.5 10 8.25697 10 5.5C10 2.74303 7.75697 0.5 5 0.5ZM6.81034 6.76659C6.84756 6.80195 6.87732 6.8444 6.89787 6.89144C6.91842 6.93849 6.92935 6.98917 6.93001 7.0405C6.93067 7.09183 6.92104 7.14278 6.9017 7.19033C6.88236 7.23789 6.85369 7.28109 6.81739 7.31739C6.78109 7.35369 6.73789 7.38236 6.69033 7.4017C6.64278 7.42104 6.59183 7.43067 6.5405 7.43001C6.48917 7.42935 6.43849 7.41842 6.39144 7.39787C6.3444 7.37732 6.30195 7.34756 6.26659 7.31034L5 6.04399L3.73341 7.31034C3.6607 7.37942 3.56387 7.41737 3.46358 7.41608C3.36328 7.4148 3.26746 7.37439 3.19654 7.30346C3.12561 7.23254 3.0852 7.13672 3.08392 7.03642C3.08263 6.93613 3.12058 6.8393 3.18966 6.76659L4.45601 5.5L3.18966 4.23341C3.12058 4.1607 3.08263 4.06387 3.08392 3.96358C3.0852 3.86328 3.12561 3.76746 3.19654 3.69654C3.26746 3.62561 3.36328 3.5852 3.46358 3.58392C3.56387 3.58263 3.6607 3.62058 3.73341 3.68966L5 4.95601L6.26659 3.68966C6.3393 3.62058 6.43613 3.58263 6.53642 3.58392C6.63672 3.5852 6.73254 3.62561 6.80346 3.69654C6.87439 3.76746 6.9148 3.86328 6.91608 3.96358C6.91737 4.06387 6.87942 4.1607 6.81034 4.23341L5.54399 5.5L6.81034 6.76659Z"
                        fill="#1077B0"
                      />
                    </svg>
                  </span>
                </div>
              </option>
            ))}
          </Select>
        );

      case "CLEAR":
        return (
          <Button
            className="clear"
            style={{width: item.pixelWidth}}
            onClick={() => {
              this.onClear(item);
            }}
          >
            <svg
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
            <span>Clear</span>
          </Button>
        );
    }
  };

  updateSearch = () => {
    this.props.onSearch(
      this.state.searchOptions
        .filter(
          (item: any) => item.value !== undefined && item.searchType !== "CLEAR"
        )
        .map((item: any) => {
          return item.searchType === "DROPDOWN"
            ? {
                key: item.name,
                value: (item.filteredOptions || item.options || []).filter(
                  (_item: any) =>
                    item.value !== undefined && _item.id === item.value
                )[0].item,
              }
            : {key: item.name, value: item.value};
        })
    );

    var promise = new Promise((resolve, reject) => {
      var preferences: any = this.state.searchOptions
        .filter((item: any) => item.searchType === "TEXT")
        .map((item: any) => {
          if (item.value === undefined || item.value === "") {
            return {
              column: item.name,
              value: item.suggestions ? item.suggestions : [],
            };
          } else if (item.suggestions?.includes(item.value)) {
            return {
              column: item.name,
              value: item.suggestions ? item.suggestions : [],
            };
          } else {
            return {
              column: item.name,
              value: item.suggestions
                ? [...item.suggestions.slice(-9), item.value]
                : [item.value],
            };
          }
        });
      console.log(preferences);

      if (
        preferences.length ===
        this.state.searchOptions.filter(
          (item: any) => item.searchType === "TEXT"
        ).length
      ) {
        resolve(preferences);
      }
    });
    promise.then((preferences: any) => {
      console.log(preferences);

      var temp: any = this.state.searchOptions[0];
      var data: any = {
        namespace: temp.nameSpace,
        preferences: preferences,
      };

      this.props.setPrefs("john", data);
    });
  };
  clearAll = () => {};

  getData = () => {};

  render() {
    return (
      <div className="FrxGenericSearch-root">
        <Grid container className="row">
          {this.state.searchOptions
            .filter((item: any) => item.row === 1)
            .map((item: any) => (
              <Grid item className={item.className ? item.className : ""}>
                {this.getSearchComponent(item)}
              </Grid>
            ))}
        </Grid>
        <Grid container className="row">
          {this.state.searchOptions
            .filter((item: any) => item.row === 2)
            .map((item: any) => (
              <Grid item className={item.className ? item.className : ""}>
                {this.getSearchComponent(item)}
              </Grid>
            ))}
        </Grid>
        <Grid container className="row">
          {this.state.searchOptions
            .filter((item: any) => item.row === 3)
            .map((item: any) => (
              <Grid item className={item.className ? item.className : ""}>
                {this.getSearchComponent(item)}
              </Grid>
            ))}
        </Grid>
        <Box component="div" display="inline" className="searchButton">
          <Button
            variant="contained"
            color="inherit"
            onClick={this.updateSearch}
          >
            Search
          </Button>
        </Box>
      </div>
    );
  }
}

const FrxGenericSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericSearch);

export default FrxGenericSearch;
