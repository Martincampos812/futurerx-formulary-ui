import React from 'react';
import { FormControl, TextField, InputLabel, TextareaAutosize, Grid, Chip, Button, Box } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { DatePicker, Space } from 'antd';
import "antd/dist/antd.css";
import { Autocomplete } from '@material-ui/lab';
import moment from 'moment';
import './FrxSearchForm.scss';
//components
import CustomDatePicker from "../Frx-components/date-picker/CustomDatePicker";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);

interface FormProps {
    formList: any;
    searchPlaceholderText: string
}


class DiagnosisSearchForm extends React.Component<FormProps> {
    state = {
        autocompleteLabel: '',
        autocompleteList: [],
        autocompletePlacholder: '',
        textAreaLabel: '',
        textAreaPlaceHolder: '',
        datePickerLabel: '',
        datePickerPlaceHolder: '',
        searchIcon: true,
        userInput: ""
    }

    componentDidMount() {
        this.props.formList.forEach((element: any) => {
            if (element.type == "autocomplete") {
                this.setState({
                    autocompleteLabel: element.fieldLabel,
                    autocompletePlacholder: element.placeholder,
                    autocompleteList: element.list
                })
            }

            if (element.type == "textarea") {
                this.setState({
                    textAreaLabel: element.fieldLabel,
                    textAreaPlaceHolder: element.placeholder
                })
            }

            if (element.type == "datepicker") {
                this.setState({
                    datePickerLabel: element.fieldLabel,
                    datePickerPlaceHolder: element.placeholder
                })
            }
        });
    }

    onChange(date: any, dateString: any) {
        console.log(date, dateString);
    }

    searchIconHide() {
        this.setState({ searchIcon: false })
    }

    render() {

        let currentDate = new Date();
        return (
            <>
                <Grid container className="frx-search-form-root">
                    <Grid item className="frx-search-form-root__form">
                        <div className="frx-search-form-root__form__fields">
                            <span className="frx-search-form-root__form__field-name">{this.state.autocompleteLabel}</span>
                            <Autocomplete
                                multiple
                                className="frx-search-form-root__form__search-field"
                                openOnFocus={true}
                                autoSelect={true}
                                id="tags-filled"
                                freeSolo
                                options={this.state.autocompleteList.map((option) => option)}
                                renderOption={option => {
                                    return (
                                        <>
                                            <span>{option}</span>
                                            <svg className="frx-search-form-root__form__search-field--checkicon" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.99896 7.58793L2.30502 4.894L2.19896 4.78793L2.09289 4.894L1.15956 5.82733L1.05349 5.9334L1.15956 6.03946L4.89289 9.7728L4.99896 9.87886L5.10502 9.7728L13.105 1.7728L13.2111 1.66673L13.105 1.56067L12.1717 0.627332L12.0656 0.521266L11.9596 0.627332L4.99896 7.58793Z" fill="white" stroke="white" stroke-width="0.3" />
                                            </svg>
                                        </>
                                    )
                                }}
                                renderTags={(value: string[], getTagProps) =>
                                    value.map((option: string, index: number) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <div className="frx-search-form-root__form__search-field--container">
                                        <TextField onClick={() => this.searchIconHide()} {...params} label="" margin="normal" variant="outlined" value={this.state.userInput} placeholder={this.props.searchPlaceholderText} />
                                        {this.state.searchIcon ? (
                                            <svg
                                                className="frx-search-form-root__form__search-field--container__search-icon"
                                                width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.8096 11.2393L11.0832 8.70813C10.9602 8.59389 10.7934 8.53042 10.6184 8.53042H10.1726C10.9274 7.63422 11.3758 6.50698 11.3758 5.28073C11.3758 2.36364 8.82994 0 5.68792 0C2.54589 0 0 2.36364 0 5.28073C0 8.19783 2.54589 10.5615 5.68792 10.5615C7.00872 10.5615 8.22287 10.1451 9.18817 9.44439V9.85822C9.18817 10.0207 9.25654 10.1756 9.37959 10.2898L12.106 12.821C12.363 13.0597 12.7787 13.0597 13.033 12.821L13.8069 12.1025C14.0639 11.8639 14.0639 11.478 13.8096 11.2393ZM5.68792 8.53042C3.75457 8.53042 2.18766 7.07822 2.18766 5.28073C2.18766 3.48579 3.75184 2.03105 5.68792 2.03105C7.62126 2.03105 9.18817 3.48325 9.18817 5.28073C9.18817 7.07568 7.624 8.53042 5.68792 8.53042Z" fill="#C4C4C4" />
                                            </svg>
                                        ) : null}
                                    </div>
                                )}
                            />
                        </div>
                        <div className="frx-search-form-root__form__fields">
                            <span className="frx-search-form-root__form__field-name">{this.state.textAreaLabel}</span>
                            <TextareaAutosize
                                className="frx-search-form-root__form__text-area"
                                aria-label="minimum height" rowsMin={5} placeholder={this.state.textAreaPlaceHolder} />
                        </div>
                        <div className="frx-search-form-root__form__fields date-picker-field">
                            <span className="frx-search-form-root__form__field-name">{this.state.datePickerLabel}</span>
                            <DatePicker
                                panelRender={panelNode => {
                                    return (
                                        <div>
                                            <span
                                                className="frx-date-picker__panel"
                                            >
                                                Pick a date
                                      <svg className="frx-date-picker__panel-close-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99419 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600273 0.000414325C0.460452 0.00581497 0.32782 0.0637772 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.352901 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99419 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z" fill="#666666" />
                                                </svg>
                                            </span>
                                            {panelNode}
                                        </div>
                                    );
                                }}
                                suffixIcon={
                                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z" fill="#C4C4C4" />
                                    </svg>
                                }
                                className="frx-search-form-root__form__datepicker"
                                dropdownClassName="date-picker" onChange={this.onChange} placeholder={this.state.datePickerPlaceHolder} />
                        </div>
                    </Grid>
                </Grid>
                <Grid container className="frx-search-form-root__buttons_root">
                    <Box component="div" display="inline">
                        <Button
                            variant="outlined"
                            onClick={e => { }}
                        >
                            Cancel
                            </Button>
                    </Box>
                    <Box component="div" display="inline">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={e => { }}
                        >
                            Save
                            </Button>
                    </Box>
                </Grid>
            </>
        );
    }
}

export default DiagnosisSearchForm;