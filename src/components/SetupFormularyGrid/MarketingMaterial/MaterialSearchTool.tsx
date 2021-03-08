import React, { Fragment } from "react";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import RadioButton from "../../shared/Frx-components/radio-button/RadioButton";
import CustomAccordion from "../../shared/Frx-components/accordion/CustomAccordion";
import "./MaterialSearchTool.scss";
import PanelHeader from "../../NewFormulary/DrugDetails/components/FormularyConfigure/components/PanelHeader";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import Button from "../../shared/Frx-components/button/Button";
import MaterialIconPopup from "./MaterialIconPopup";
import MaterialIconList from "./MaterialIconList";
import {
  getMarketingIcons,
  fetchMarketingLegends,
  fetchMarketingConfigurations,
  onChangeLegendsConfiguration,
  submitMarketingLegends,
  onChangeMarketingConfigurations,
  submitMarketingConfigurations,
  onEditIcon,
} from "../../../redux/slices/formulary/marketingMaterial/marketingMaterialSlice";
import { connect } from "react-redux";

const MARKETING_ICONS_BASE_URL =
  "https://frx-document-delivery.s3.amazonaws.com/";

interface Props {
  onClose: any;
  openPopup: boolean;
  className?: string;
  mode?: "single" | "multi";
  selectedItem?: any;
  type: string;
}

interface State {
  materialPopupInd: boolean;
  show: boolean;
  configurationLegends: any;
}

const mapStateToProps = (state) => {
  return {
    marketingIcons: state.configurationLegends?.marketingIcons,
    configurationLegendsCount:
      state?.configurationLegends?.marketing_material_legends_count,
    configurationLegendsList:
      state?.configurationLegends?.marketing_material_legends_list,
    location_home: state?.application?.location_home,
    mode_lob: state.application.current_lob,
    formulary: state.application.formulary,
    marketingConfigurations:
      state.configurationLegends?.marketing_configuration,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getMarketingIcons: (a) => dispatch(getMarketingIcons(a)),
    fetchMarketingConfigs: (a) => dispatch(fetchMarketingConfigurations(a)),
    fetchMarketingLegends: (a) => dispatch(fetchMarketingLegends(a)),
    onChangeLegendsConfiguration: (a) =>
      dispatch(onChangeLegendsConfiguration(a)),
    submitMarketingLegends: (a) => dispatch(submitMarketingLegends(a)),
    onChangMarketingConfigurations: (a) =>
      dispatch(onChangeMarketingConfigurations(a)),
    submitMarketingConfigurations: (a) =>
      dispatch(submitMarketingConfigurations(a)),
    onEditIcon: (a) => dispatch(onEditIcon(a)),
  };
}
class MaterialSearchTool extends React.Component<any, any> {
  state = {
    materialPopupInd: false,
    show: false,
    configurationLegends: [],
  };

  componentDidMount() {
    const { id_base_formulary } = this.props.formulary
      ? this.props.formulary
      : "";
    this.props.fetchMarketingConfigs(id_base_formulary);
    this.props.fetchMarketingLegends(id_base_formulary);
    this.props.getMarketingIcons(id_base_formulary);
  }

  onClose = () => {
    console.log("close");
    this.setState({ materialPopupInd: false });
    return true;
  };

  closeClaimsResult = () => {
    this.setState({ materialPopupInd: false });
  };

  handleIconClick = (item, index) => {
    this.props.onEditIcon({ legend: item, index: index });
    this.setState({ materialPopupInd: true });
  };

  processCloseActions = () => {
    this.setState({ show: true });
  };

  handleLegendsChange = (event: any, index: number) => {
    this.props.onChangeLegendsConfiguration({
      name: event.target.name,
      value: event.target.value,
      index: index,
    });
  };

  handleConfigurationsChange = (event: any) => {
    this.props.onChangMarketingConfigurations({
      name: event.target.name,
      value: event.target.checked,
    });
  };

  handleSubmitLegends = (event: any) => {
    const params = {
      base_formulary_id: this.props.formulary.id_base_formulary,
      definitions: this.props.configurationLegendsList.filter(
        (item) => item.is_updated
      ),
    };
    this.props.submitMarketingLegends(params);
  };

  handleSubmitConfiguration = (event: any) => {
    this.props.submitMarketingConfigurations(
      this.props.marketingConfigurations
    );
  };

  render() {
    return (
      <div className="material-search-wrapper">
        <div className="m-t-20 m-b-20">
          <CustomAccordion name="Marketing Materials and Search Tool Legend Configuration">
            <Container>
              <div className="material-search-grid-container">
                <div className="plain-category formulary-criteria">
                  <div className="material-search-headings plain-border-bottm">
                    FORMULARY CRITERIA
                  </div>
                </div>
                <div className="plain-category legend-abbrevation">
                  <div className="material-search-headings plain-border-bottm">
                    legend abbreviation
                  </div>
                </div>
                <div className="plain-category legend-display-text">
                  <div className="material-search-headings plain-border-bottm">
                    legend display text<span> hidden span</span>
                  </div>
                </div>
                <div className="plain-category material-special-characters">
                  <div className="material-search-headings plain-border-bottm special-character-heading">
                    special characters
                    <PanelHeader
                      className="field-group__label-special-character"
                      tooltip="special characters"
                    />
                  </div>
                </div>
                <div className="plain-category material-dms">
                  <div className="material-search-headings plain-border-bottm">
                    DMS<i> hidden span dms</i>
                  </div>
                </div>
                <div className="plain-category material-dms">
                  <div className="material-search-headings plain-border-bottm">
                    search tool<i> hidden span</i>
                  </div>
                </div>
                <div className="plain-category">
                  <div className="material-search-headings plain-border-bottm">
                    icon selection
                  </div>
                  {/* <div className="plain-border-bottm plain-img plain-height">
                    <svg
                      onClick={(e) => this.handleIconClick()}
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="28" height="28" rx="3" fill="#209890" />
                      <path
                        d="M13.9305 10.8867H11.7137V17H10.4881V10.8867H8.29082V9.89062H13.9305V10.8867ZM19.4113 14.0068C19.4113 15.029 19.2193 15.8005 18.8352 16.3213C18.4543 16.8389 17.8732 17.0977 17.092 17.0977C16.3238 17.0977 15.7443 16.8454 15.3537 16.3408C14.9663 15.833 14.7678 15.0827 14.758 14.0898V12.8594C14.758 11.8372 14.9484 11.0706 15.3293 10.5596C15.7134 10.0485 16.2977 9.79297 17.0822 9.79297C17.8602 9.79297 18.4396 10.042 18.8205 10.54C19.2046 11.0381 19.4016 11.7835 19.4113 12.7764V14.0068ZM18.2248 12.6787C18.2248 12.0114 18.1337 11.5231 17.9514 11.2139C17.7691 10.9014 17.4794 10.7451 17.0822 10.7451C16.6949 10.7451 16.41 10.8932 16.2277 11.1895C16.0454 11.4824 15.9494 11.9414 15.9396 12.5664V14.1777C15.9396 14.8418 16.0324 15.3366 16.218 15.6621C16.4035 15.9876 16.6949 16.1504 17.092 16.1504C17.4729 16.1504 17.7544 16.0007 17.9367 15.7012C18.119 15.3984 18.215 14.9264 18.2248 14.2852V12.6787Z"
                        fill="white"
                      />
                    </svg>
                    <span className="material-write-icon">
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.31944 1.95083L11.4074 4.06489C11.4954 4.15395 11.4954 4.29926 11.4074 4.38833L6.35185 9.50707L4.2037 9.74848C3.91667 9.78129 3.67361 9.5352 3.70602 9.24457L3.94444 7.06957L9 1.95083C9.08796 1.86177 9.23148 1.86177 9.31944 1.95083ZM13.0694 1.41411L11.9398 0.270361C11.588 -0.0858886 11.0162 -0.0858886 10.662 0.270361L9.84259 1.10005C9.75463 1.18911 9.75463 1.33442 9.84259 1.42349L11.9306 3.53755C12.0185 3.62661 12.162 3.62661 12.25 3.53755L13.0694 2.70786C13.4213 2.34927 13.4213 1.77036 13.0694 1.41411ZM8.88889 8.11489V10.5008H1.48148V3.00083H6.80093C6.875 3.00083 6.94444 2.97036 6.99769 2.9188L7.92361 1.9813C8.09954 1.80317 7.97454 1.50083 7.72685 1.50083H1.11111C0.497685 1.50083 0 2.00473 0 2.62583V10.8758C0 11.4969 0.497685 12.0008 1.11111 12.0008H9.25926C9.87269 12.0008 10.3704 11.4969 10.3704 10.8758V7.17739C10.3704 6.92661 10.0718 6.80239 9.89583 6.97817L8.96991 7.91567C8.91898 7.96957 8.88889 8.03989 8.88889 8.11489Z"
                          fill="#1D54B4"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="plain-border-bottm plain-img plain-height">
                    <svg
                      onClick={(e) => this.handleIconClick()}
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="29" height="29" rx="14.5" fill="#3EB7B0" />
                      <path
                        d="M7.42246 14.3584V17H6.18711V9.89062H8.90684C9.70111 9.89062 10.331 10.0973 10.7965 10.5107C11.2652 10.9242 11.4996 11.471 11.4996 12.1514C11.4996 12.848 11.2701 13.39 10.8111 13.7773C10.3554 14.1647 9.71575 14.3584 8.89219 14.3584H7.42246ZM7.42246 13.3672H8.90684C9.34629 13.3672 9.68158 13.2646 9.91269 13.0596C10.1438 12.8512 10.2594 12.5518 10.2594 12.1611C10.2594 11.777 10.1422 11.471 9.90781 11.2432C9.67344 11.012 9.35117 10.8932 8.94102 10.8867H7.42246V13.3672ZM15.7939 15.3447H13.04L12.4639 17H11.1797L13.8652 9.89062H14.9736L17.6641 17H16.375L15.7939 15.3447ZM13.3867 14.3486H15.4473L14.417 11.3994L13.3867 14.3486ZM21.5971 17H20.4154V11.292L18.6723 11.8877V10.8867L21.4457 9.86621H21.5971V17Z"
                        fill="white"
                      />
                    </svg>
                    <span className="material-write-icon">
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.31944 1.95083L11.4074 4.06489C11.4954 4.15395 11.4954 4.29926 11.4074 4.38833L6.35185 9.50707L4.2037 9.74848C3.91667 9.78129 3.67361 9.5352 3.70602 9.24457L3.94444 7.06957L9 1.95083C9.08796 1.86177 9.23148 1.86177 9.31944 1.95083ZM13.0694 1.41411L11.9398 0.270361C11.588 -0.0858886 11.0162 -0.0858886 10.662 0.270361L9.84259 1.10005C9.75463 1.18911 9.75463 1.33442 9.84259 1.42349L11.9306 3.53755C12.0185 3.62661 12.162 3.62661 12.25 3.53755L13.0694 2.70786C13.4213 2.34927 13.4213 1.77036 13.0694 1.41411ZM8.88889 8.11489V10.5008H1.48148V3.00083H6.80093C6.875 3.00083 6.94444 2.97036 6.99769 2.9188L7.92361 1.9813C8.09954 1.80317 7.97454 1.50083 7.72685 1.50083H1.11111C0.497685 1.50083 0 2.00473 0 2.62583V10.8758C0 11.4969 0.497685 12.0008 1.11111 12.0008H9.25926C9.87269 12.0008 10.3704 11.4969 10.3704 10.8758V7.17739C10.3704 6.92661 10.0718 6.80239 9.89583 6.97817L8.96991 7.91567C8.91898 7.96957 8.88889 8.03989 8.88889 8.11489Z"
                          fill="#1D54B4"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="plain-border-bottm plain-img plain-height">
                    <svg
                      onClick={(e) => this.handleIconClick()}
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.7427 0.878206C15.1416 0.415614 15.8584 0.415614 16.2573 0.878206L21.9503 7.48006C22.0456 7.59052 22.1639 7.67881 22.2969 7.73873L30.1907 11.2954C30.7281 11.5375 30.9405 12.1894 30.6491 12.7016L26.2768 20.386C26.207 20.5088 26.1639 20.6449 26.1505 20.7855L25.3065 29.6224C25.2492 30.2223 24.6782 30.6356 24.0904 30.5027L15.7206 28.6099C15.5754 28.577 15.4246 28.577 15.2794 28.6099L6.90958 30.5027C6.32179 30.6356 5.75083 30.2223 5.69353 29.6224L4.84951 20.7855C4.83609 20.6449 4.79304 20.5088 4.7232 20.386L0.350911 12.7016C0.0594538 12.1894 0.271947 11.5375 0.80928 11.2954L8.70315 7.73873C8.83614 7.67881 8.95441 7.59052 9.04967 7.48006L14.7427 0.878206Z"
                        fill="#A6D268"
                      />
                    </svg>
                    <span className="material-write-icon">
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.31944 1.95083L11.4074 4.06489C11.4954 4.15395 11.4954 4.29926 11.4074 4.38833L6.35185 9.50707L4.2037 9.74848C3.91667 9.78129 3.67361 9.5352 3.70602 9.24457L3.94444 7.06957L9 1.95083C9.08796 1.86177 9.23148 1.86177 9.31944 1.95083ZM13.0694 1.41411L11.9398 0.270361C11.588 -0.0858886 11.0162 -0.0858886 10.662 0.270361L9.84259 1.10005C9.75463 1.18911 9.75463 1.33442 9.84259 1.42349L11.9306 3.53755C12.0185 3.62661 12.162 3.62661 12.25 3.53755L13.0694 2.70786C13.4213 2.34927 13.4213 1.77036 13.0694 1.41411ZM8.88889 8.11489V10.5008H1.48148V3.00083H6.80093C6.875 3.00083 6.94444 2.97036 6.99769 2.9188L7.92361 1.9813C8.09954 1.80317 7.97454 1.50083 7.72685 1.50083H1.11111C0.497685 1.50083 0 2.00473 0 2.62583V10.8758C0 11.4969 0.497685 12.0008 1.11111 12.0008H9.25926C9.87269 12.0008 10.3704 11.4969 10.3704 10.8758V7.17739C10.3704 6.92661 10.0718 6.80239 9.89583 6.97817L8.96991 7.91567C8.91898 7.96957 8.88889 8.03989 8.88889 8.11489Z"
                          fill="#1D54B4"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="plain-border-bottm plain-img plain-height">
                    <svg
                      onClick={(e) => this.handleIconClick()}
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="28" height="28" rx="3" fill="#209890" />
                      <path
                        d="M13.9305 10.8867H11.7137V17H10.4881V10.8867H8.29082V9.89062H13.9305V10.8867ZM17.9904 17H16.8088V11.292L15.0656 11.8877V10.8867L17.8391 9.86621H17.9904V17Z"
                        fill="white"
                      />
                    </svg>
                    <span className="material-write-icon">
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.31944 1.95083L11.4074 4.06489C11.4954 4.15395 11.4954 4.29926 11.4074 4.38833L6.35185 9.50707L4.2037 9.74848C3.91667 9.78129 3.67361 9.5352 3.70602 9.24457L3.94444 7.06957L9 1.95083C9.08796 1.86177 9.23148 1.86177 9.31944 1.95083ZM13.0694 1.41411L11.9398 0.270361C11.588 -0.0858886 11.0162 -0.0858886 10.662 0.270361L9.84259 1.10005C9.75463 1.18911 9.75463 1.33442 9.84259 1.42349L11.9306 3.53755C12.0185 3.62661 12.162 3.62661 12.25 3.53755L13.0694 2.70786C13.4213 2.34927 13.4213 1.77036 13.0694 1.41411ZM8.88889 8.11489V10.5008H1.48148V3.00083H6.80093C6.875 3.00083 6.94444 2.97036 6.99769 2.9188L7.92361 1.9813C8.09954 1.80317 7.97454 1.50083 7.72685 1.50083H1.11111C0.497685 1.50083 0 2.00473 0 2.62583V10.8758C0 11.4969 0.497685 12.0008 1.11111 12.0008H9.25926C9.87269 12.0008 10.3704 11.4969 10.3704 10.8758V7.17739C10.3704 6.92661 10.0718 6.80239 9.89583 6.97817L8.96991 7.91567C8.91898 7.96957 8.88889 8.03989 8.88889 8.11489Z"
                          fill="#1D54B4"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="plain-border-bottm plain-img plain-height">
                    <svg
                      onClick={(e) => this.handleIconClick()}
                      width="35"
                      height="36"
                      viewBox="0 0 35 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="-1.00195"
                        y="18.001"
                        width="26.1633"
                        height="26.1633"
                        rx="3"
                        transform="rotate(-45 -1.00195 18.001)"
                        fill="#C73D90"
                      />
                      <path
                        d="M12.442 19.1689C12.442 18.8564 12.3313 18.6156 12.11 18.4463C11.8919 18.277 11.4964 18.1061 10.9234 17.9336C10.3505 17.7611 9.89479 17.569 9.55625 17.3574C8.90846 16.9505 8.58457 16.4199 8.58457 15.7656C8.58457 15.1927 8.81732 14.7207 9.28281 14.3496C9.75156 13.9785 10.3587 13.793 11.1041 13.793C11.5989 13.793 12.04 13.8841 12.4273 14.0664C12.8147 14.2487 13.1191 14.5091 13.3404 14.8477C13.5618 15.1829 13.6725 15.5557 13.6725 15.9658H12.442C12.442 15.5947 12.3248 15.305 12.0904 15.0967C11.8593 14.8851 11.5273 14.7793 11.0943 14.7793C10.6907 14.7793 10.3766 14.8656 10.152 15.0381C9.9306 15.2106 9.81992 15.4515 9.81992 15.7607C9.81992 16.0212 9.94036 16.2393 10.1812 16.415C10.4221 16.5876 10.8193 16.7568 11.3727 16.9229C11.926 17.0856 12.3704 17.2728 12.7057 17.4844C13.041 17.6927 13.2867 17.9336 13.443 18.207C13.5992 18.4772 13.6773 18.7946 13.6773 19.1592C13.6773 19.7516 13.4495 20.2236 12.9937 20.5752C12.5413 20.9235 11.926 21.0977 11.148 21.0977C10.6337 21.0977 10.1601 21.0033 9.72715 20.8145C9.29746 20.6224 8.96217 20.3587 8.72129 20.0234C8.48366 19.6882 8.36484 19.2975 8.36484 18.8516H9.60019C9.60019 19.2552 9.73366 19.5677 10.0006 19.7891C10.2675 20.0104 10.65 20.1211 11.148 20.1211C11.5777 20.1211 11.9 20.0348 12.1148 19.8623C12.3329 19.6865 12.442 19.4554 12.442 19.1689ZM19.998 14.8867H17.7812V21H16.5557V14.8867H14.3584V13.8906H19.998V14.8867ZM25.6254 21H20.8451V20.1846L23.2133 17.6016C23.5551 17.2207 23.7976 16.9033 23.9408 16.6494C24.0873 16.3923 24.1605 16.1351 24.1605 15.8779C24.1605 15.5394 24.0645 15.266 23.8725 15.0576C23.6837 14.8493 23.4281 14.7451 23.1059 14.7451C22.7217 14.7451 22.4239 14.8623 22.2123 15.0967C22.0007 15.3311 21.8949 15.6517 21.8949 16.0586H20.7084C20.7084 15.6257 20.8061 15.2367 21.0014 14.8916C21.1999 14.5433 21.4815 14.2731 21.8461 14.0811C22.2139 13.889 22.6371 13.793 23.1156 13.793C23.8057 13.793 24.3493 13.9671 24.7465 14.3154C25.1469 14.6605 25.3471 15.139 25.3471 15.751C25.3471 16.1058 25.2462 16.4785 25.0443 16.8691C24.8458 17.2565 24.5186 17.6976 24.0629 18.1924L22.3246 20.0527H25.6254V21Z"
                        fill="white"
                      />
                    </svg>
                    <span className="material-write-icon material-icon-left">
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.31944 1.95083L11.4074 4.06489C11.4954 4.15395 11.4954 4.29926 11.4074 4.38833L6.35185 9.50707L4.2037 9.74848C3.91667 9.78129 3.67361 9.5352 3.70602 9.24457L3.94444 7.06957L9 1.95083C9.08796 1.86177 9.23148 1.86177 9.31944 1.95083ZM13.0694 1.41411L11.9398 0.270361C11.588 -0.0858886 11.0162 -0.0858886 10.662 0.270361L9.84259 1.10005C9.75463 1.18911 9.75463 1.33442 9.84259 1.42349L11.9306 3.53755C12.0185 3.62661 12.162 3.62661 12.25 3.53755L13.0694 2.70786C13.4213 2.34927 13.4213 1.77036 13.0694 1.41411ZM8.88889 8.11489V10.5008H1.48148V3.00083H6.80093C6.875 3.00083 6.94444 2.97036 6.99769 2.9188L7.92361 1.9813C8.09954 1.80317 7.97454 1.50083 7.72685 1.50083H1.11111C0.497685 1.50083 0 2.00473 0 2.62583V10.8758C0 11.4969 0.497685 12.0008 1.11111 12.0008H9.25926C9.87269 12.0008 10.3704 11.4969 10.3704 10.8758V7.17739C10.3704 6.92661 10.0718 6.80239 9.89583 6.97817L8.96991 7.91567C8.91898 7.96957 8.88889 8.03989 8.88889 8.11489Z"
                          fill="#1D54B4"
                        />
                      </svg>
                    </span>
                  </div> */}
                </div>
                {this.props.configurationLegendsList.length > 0 &&
                  this.props.configurationLegendsList.map(
                    (item: any, index: number) => {
                      return (
                        <>
                          <div className="plain-category formulary-criteria">
                            <div className="plain-border-bottm plain-text plain-height">
                              {item.formulary_criteria}
                            </div>
                          </div>
                          <div className="plain-category legend-abbrevation">
                            <div className="plain-border-bottm plain-input plain-height">
                              <input
                                type="text"
                                name="abbreviation"
                                value={item.abbreviation}
                                onChange={(e) =>
                                  this.handleLegendsChange(e, index)
                                }
                              />
                            </div>
                          </div>
                          <div className="plain-category legend-display-text">
                            <div className="plain-border-bottm plain-input plain-height">
                              <input
                                type="text"
                                name="display_text"
                                value={item.display_text}
                                onChange={(e) =>
                                  this.handleLegendsChange(e, index)
                                }
                              />
                            </div>
                          </div>
                          <div className="plain-category material-special-characters">
                            <div className="plain-border-bottm plain-input plain-height">
                              <input
                                type="text"
                                name="special_character"
                                value={item.special_character}
                                onChange={(e) =>
                                  this.handleLegendsChange(e, index)
                                }
                              />
                            </div>
                          </div>
                          <div className="plain-category material-dms">
                            <div className="plain-border-bottm plain-input plain-height">
                              <DropDown
                                className="material-dms-dropd-down"
                                name="supress_dms"
                                value={item.supress_dms}
                                onChange={(e) =>
                                  this.handleLegendsChange(
                                    {
                                      target: { name: "supress_dms", value: e },
                                    },
                                    index
                                  )
                                }
                                options={["S", "N"]}
                              />
                            </div>
                          </div>
                          <div className="plain-category material-dms">
                            <div className="plain-border-bottm plain-input plain-height">
                              <DropDown
                                className="material-dms-dropd-down"
                                value={item.supress_search_tool}
                                onChange={(e) =>
                                  this.handleLegendsChange(
                                    {
                                      target: {
                                        name: "supress_search_tool",
                                        value: e,
                                      },
                                    },
                                    index
                                  )
                                }
                                options={["S", "N"]}
                              />
                            </div>
                          </div>
                          <div className="plain-category">
                            <div className="plain-border-bottm plain-img plain-height">
                              <img
                                src={MARKETING_ICONS_BASE_URL + item.icon_url}
                              />
                              {/* <svg
                              onClick={(e) => this.handleIconClick()}
                              width="29"
                              height="29"
                              viewBox="0 0 29 29"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="28"
                                height="28"
                                rx="3"
                                fill="#209890"
                              />
                              <path
                                d="M13.9305 10.8867H11.7137V17H10.4881V10.8867H8.29082V9.89062H13.9305V10.8867ZM19.4113 14.0068C19.4113 15.029 19.2193 15.8005 18.8352 16.3213C18.4543 16.8389 17.8732 17.0977 17.092 17.0977C16.3238 17.0977 15.7443 16.8454 15.3537 16.3408C14.9663 15.833 14.7678 15.0827 14.758 14.0898V12.8594C14.758 11.8372 14.9484 11.0706 15.3293 10.5596C15.7134 10.0485 16.2977 9.79297 17.0822 9.79297C17.8602 9.79297 18.4396 10.042 18.8205 10.54C19.2046 11.0381 19.4016 11.7835 19.4113 12.7764V14.0068ZM18.2248 12.6787C18.2248 12.0114 18.1337 11.5231 17.9514 11.2139C17.7691 10.9014 17.4794 10.7451 17.0822 10.7451C16.6949 10.7451 16.41 10.8932 16.2277 11.1895C16.0454 11.4824 15.9494 11.9414 15.9396 12.5664V14.1777C15.9396 14.8418 16.0324 15.3366 16.218 15.6621C16.4035 15.9876 16.6949 16.1504 17.092 16.1504C17.4729 16.1504 17.7544 16.0007 17.9367 15.7012C18.119 15.3984 18.215 14.9264 18.2248 14.2852V12.6787Z"
                                fill="white"
                              />
                            </svg> */}
                              <span
                                className="material-write-icon"
                                onClick={(e) =>
                                  this.handleIconClick(item, index)
                                }
                              >
                                <svg
                                  width="14"
                                  height="12"
                                  viewBox="0 0 14 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.31944 1.95083L11.4074 4.06489C11.4954 4.15395 11.4954 4.29926 11.4074 4.38833L6.35185 9.50707L4.2037 9.74848C3.91667 9.78129 3.67361 9.5352 3.70602 9.24457L3.94444 7.06957L9 1.95083C9.08796 1.86177 9.23148 1.86177 9.31944 1.95083ZM13.0694 1.41411L11.9398 0.270361C11.588 -0.0858886 11.0162 -0.0858886 10.662 0.270361L9.84259 1.10005C9.75463 1.18911 9.75463 1.33442 9.84259 1.42349L11.9306 3.53755C12.0185 3.62661 12.162 3.62661 12.25 3.53755L13.0694 2.70786C13.4213 2.34927 13.4213 1.77036 13.0694 1.41411ZM8.88889 8.11489V10.5008H1.48148V3.00083H6.80093C6.875 3.00083 6.94444 2.97036 6.99769 2.9188L7.92361 1.9813C8.09954 1.80317 7.97454 1.50083 7.72685 1.50083H1.11111C0.497685 1.50083 0 2.00473 0 2.62583V10.8758C0 11.4969 0.497685 12.0008 1.11111 12.0008H9.25926C9.87269 12.0008 10.3704 11.4969 10.3704 10.8758V7.17739C10.3704 6.92661 10.0718 6.80239 9.89583 6.97817L8.96991 7.91567C8.91898 7.96957 8.88889 8.03989 8.88889 8.11489Z"
                                    fill="#1D54B4"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </>
                      );
                    }
                  )}
              </div>
              <br />
              <Button
                label="Save"
                className="sub-btn"
                style={{ float: "right" }}
                onClick={this.handleSubmitLegends}
              />
            </Container>
          </CustomAccordion>
          <MaterialIconPopup
            className="frx-claims-result-root"
            open={this.state.materialPopupInd}
            positiveActionText="Upload Icon"
            title="available icons"
            ulpoadIconBtnText="Select"
            showCloseIcon={true}
            showActions={false}
            handleClose={() => {
              this.onClose();
            }}
            handleAction={() => {
              this.processCloseActions();
            }}
          >
            <MaterialIconList handleClose={this.onClose} />
          </MaterialIconPopup>
          <CustomAccordion name="Brand and Generic Display">
            <Container>
              <label className="all-label material-radio">
                Do you want to include the generic name of a drug next to the
                brand name?
              </label>
              <div className="root-container material-radio">
                <RadioButton
                  label="Yes"
                  name="display_generic"
                  checked={
                    this.props.marketingConfigurations?.display_generic === true
                  }
                  onChange={this.handleConfigurationsChange}
                />
                <RadioButton
                  label="No"
                  name="display_generic"
                  checked={
                    this.props.marketingConfigurations?.display_generic ===
                    false
                  }
                  onChange={this.handleConfigurationsChange}
                />
              </div>
              <label className="all-label material-radio">
                Do you want to include the brand name of a drug next to the
                generic name?
              </label>
              <div className="root-container material-radio">
                <RadioButton
                  label="Yes"
                  name="display_brand"
                  checked={
                    this.props.marketingConfigurations?.display_brand === true
                  }
                  onChange={this.handleConfigurationsChange}
                />
                <RadioButton
                  label="No"
                  name="display_brand"
                  checked={
                    this.props.marketingConfigurations?.display_brand === false
                  }
                  onChange={this.handleConfigurationsChange}
                />
              </div>
              <br />
              <Button
                label="Save"
                className="sub-btn"
                style={{ float: "right" }}
                onClick={this.handleSubmitConfiguration}
              />
            </Container>
          </CustomAccordion>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialSearchTool);
