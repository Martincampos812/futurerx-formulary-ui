import React, { Component } from "react";
import { connect } from "react-redux";
import PosSettings from "../../../DrugDetails/components/POS/PosSettings";

import { setAdditionalCriteria } from "../../../../../redux/slices/formulary/advancedSearch/additionalCriteriaSlice";

import { getDrugDetailsPOSSettings } from "../../../../../redux/slices/formulary/drugDetails/pos/posActionCreation";
import { getDrugDetailsPRSettings } from "../../../../../redux/slices/formulary/drugDetails/pr/prActionCreation";
import {
  POS_SETTINGS_LIST,
  PR_SETTINGS_LIST,
} from "../../../../../api/http-commons";

import { getICDReplaceSrch } from "../../../../../redux/slices/formulary/drugDetails/icd/icdActionCreation";
import { getPNReplaceSrch } from "../../../../../redux/slices/formulary/drugDetails/pn/pnActionCreation";
import {
  getPTReplaceSrch,
  getPCHLSearch,
} from "../../../../../redux/slices/formulary/drugDetails/pt/ptActionCreation";

import * as apiConstants from "../../../../../api/http-drug-details";

import POSCriteria from "../CriteriaComponents/POSCriteria";
import PRCriteria from "../CriteriaComponents/PRCriteria";
import GenderCriteria from "../CriteriaComponents/GenderCriteria";
import ICDCriteria from "../CriteriaComponents/ICDCriteria";
import AgeCriteria from "../CriteriaComponents/AgeCriteria";
import PNCriteria from "../CriteriaComponents/PNCriteria";
import PTCriteria from "../CriteriaComponents/PTCriteria";
import PCHLCriteria from "../CriteriaComponents/PCHLCriteria";

function mapDispatchToProps(dispatch) {
  return {
    getPOSSettings: (a) => dispatch(getDrugDetailsPOSSettings(a)),
    getPRSettings: (a) => dispatch(getDrugDetailsPRSettings(a)),
    setAdditionalCriteria: (a) => dispatch(setAdditionalCriteria(a)),

    getICDSearch: (a) => dispatch(getICDReplaceSrch(a)),
    getPNSearch: (a) => dispatch(getPNReplaceSrch(a)),
    getPTSearch: (a) => dispatch(getPTReplaceSrch(a)),

    getPCHLSearch: (a) => dispatch(getPCHLSearch(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    additionalCriteriaBody: state?.additionalCriteria?.additionalCriteriaBody,
    populateGrid: state?.additionalCriteria?.populateGrid,
    closeDialog: state?.additionalCriteria?.closeDialog,
    listItemStatus: state?.additionalCriteria?.listItemStatus,
  };
};

interface Props {
  title: string;
  nodeId: any;
  listItemStatus: any;
  onParentDataUpdated: (nodeId, isIncluded) => void;
}
/**
 * @class ListItem
 * @author SantoshJS
 */
class ListItem extends Component<any, any> {
  state = {
    nodeId: null,

    cardCode: 0,
    cardName: null,
    isIncluded: null,

    payload: null,
    isReadOnly: false,

    // AL
    alSettings: {
      min_age_condition: "",
      min_age_limit: "",
      max_age_condition: "",
      max_age_limit: "",
    },
    alSettingsStatus: { type: "covered", covered: true },

    // GL
    glSettings: [
      { id: 1, isChecked: false, gl_type_name: "Female", gl_code: "F" },
      { id: 2, isChecked: false, gl_type_name: "Male", gl_code: "M" },
      { id: 3, isChecked: false, gl_type_name: "Unknown", gl_code: "U" },
    ],
    glSettingsStatus: { type: "covered", covered: true },

    // ICD
    icdSettings: { look_back_days: "", icds: [] },
    icdSettingsStatus: { type: "covered", covered: true },
    icdResults: {
      data: [],
      value: undefined,
    },

    // PN
    pnSettings: [],
    pnSettingsStatus: { type: "covered", covered: true },
    pnResults: { data: [], value: undefined },

    // PT
    ptSettings: [],
    ptSettingsStatus: { type: "covered", covered: true },
    ptResults: { data: [], value: undefined },

    // POS
    posSettings: [],
    posSettingsStatus: {
      type: "covered",
      covered: true,
    },
    isSelectAllPOS: false,

    // PR
    prSettings: [],
    prSettingsStatus: {
      type: "covered",
      covered: true,
    },
    isSelectAllPR: false,

    // PCHL
    pchlSettings: {
      lookback_name: "",
      id_lookback_level: "",
      lookback_drug: [],
      lookback_period: "",
      number_of_fills: "",
      number_of_days_supply_per_fill: "",
    },

    pchlSettingsStatus: {
      type: "covered",
      covered: true,
    },
    pchlResults: { data: [], value: undefined },
  };

  componentDidMount() {
    this.setState({
      nodeId: this.props.nodeId,
      cardCode: this.props.card.cardCode,
      cardName: this.props.card.cardName,
      isIncluded: this.props.card.isIncluded,
      payload: this.props.payload,
      isReadOnly: this.props?.isReadOnly,
    });

    this.initializePreData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { nodeId } = this.props;

    const updatedPayload = this.state.payload;
    const { cardCode, cardName, isIncluded } = this.state;

    const isCriteriaObject = cardCode === 1 || cardCode === 3 ? true : false;
    // age & icd are object
    // gender, pn, pt, pos, pr, pchl are array
    this.props.handleGlobalState(
      nodeId,
      cardCode,
      cardName,
      isIncluded,
      updatedPayload,
      isCriteriaObject
    );
  }

  initializePreData = () => {
    const COVERED = "covered";
    const NOT_COVERED = "not-covered";
    const {
      payload,
      card: { cardCode, isIncluded },
    } = this.props;
    switch (cardCode) {
      case 1:
        let { alSettings } = this.state;
        if (payload !== null && Object.keys(payload).length) {
          alSettings = { ...payload };
        }
        const alSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };
        this.setState({
          alSettings,
          alSettingsStatus,
        });
        break;
      case 2:
        let { glSettings } = this.state;

        if (payload !== null) {
          if (payload.length > 0) {
            const gender: string[] = payload;
            glSettings.forEach((s) => {
              if (gender.includes(s.gl_code)) {
                s["isChecked"] = true;
              } else {
                s["isChecked"] = false;
              }
            });
          }
        }
        const glSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        this.setState({
          glSettings,
          glSettingsStatus,
        });
        break;
      case 3:
        let { icdSettings } = this.state;
        let icdData: any[] = [];
        let icdValue: string[] | undefined = [];
        if (payload !== null && Object.keys(payload).length) {
          icdSettings = { ...payload };
          if (payload.icds !== "") {
            if (payload.icds.length > 0) {
              payload.icds.forEach((ele: any) => {
                icdData.push(ele);
                if (icdValue) icdValue.push(ele.text);
              });
            }
          }
        }
        const icdSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        if (icdValue.length === 0) icdValue = undefined;
        this.setState({
          icdSettings,
          icdSettingsStatus,
          icdResults: {
            data: icdData,
            value: icdValue,
          },
        });
        break;
      case 4:
        let { pnSettings } = this.state;
        let pnDdata: any[] = [];
        let pnValue: string[] | undefined = [];

        if (payload !== null) {
          pnSettings = { ...payload };
          if (payload.length > 0) {
            payload.forEach((ele: any) => {
              pnDdata.push(ele);
              if (pnValue) pnValue.push(ele.text);
            });
          }
        }
        const pnSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        if (pnValue.length === 0) pnValue = undefined;
        this.setState({
          pnSettings,
          pnSettingsStatus,
          pnResults: {
            data: pnDdata,
            value: pnValue,
          },
        });
        break;
      case 5:
        let { ptSettings } = this.state;
        let ptData: any[] = [];
        let ptValue: string[] | undefined = [];

        if (payload !== null) {
          ptSettings = { ...payload };
          if (payload.length > 0) {
            payload.forEach((ele: any) => {
              ptData.push(ele);
              if (ptValue) ptValue.push(ele.text);
            });
          }
        }
        const ptSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        if (ptValue.length === 0) ptValue = undefined;
        this.setState({
          ptSettings,
          ptSettingsStatus,
          ptResults: {
            data: ptData,
            value: ptValue,
          },
        });
        break;

      case 6:
        this.initializePOSSettingsListApi();
        const posSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };
        this.setState({
          posSettingsStatus,
        });
        break;

      case 7:
        this.initializePRSettingsListApi();
        const prSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };
        this.setState({
          prSettingsStatus,
        });
        break;

      case 8:
        let { pchlSettings } = this.state;
        let pchlData: any[] = [];
        let pchlValue: string[] | undefined = [];

        if (payload !== null) {
          pchlSettings = { ...payload };
          if (payload?.lookback_drug?.length > 0) {
            payload.lookback_drug.forEach((ele: any) => {
              pchlData.push(ele);
              if (pchlValue) pchlValue.push(ele.text);
            });
          }
        }
        const pchlSettingsStatus = {
          type: isIncluded ? COVERED : NOT_COVERED,
          covered: isIncluded,
        };

        if (pchlValue.length === 0) pchlValue = undefined;
        this.setState({
          pchlSettings,
          pchlSettingsStatus,
          pchlResults: {
            data: pchlData,
            value: pchlValue,
          },
        });
        break;
      default:
        break;
    }
  };

  initializePOSSettingsListApi = () => {
    const { payload } = this.props;
    let apiDetails = {};
    apiDetails["apiPart"] = POS_SETTINGS_LIST;
    this.props.getPOSSettings(apiDetails).then((json) => {
      let posSettings =
        json.payload && json.payload.data ? json.payload.data : [];
      if (payload !== null) {
        if (payload.length > 0) {
          const place_of_services: number[] = payload;
          posSettings.forEach((s) => {
            if (place_of_services.includes(s.id_place_of_service_type)) {
              s["isChecked"] = true;
            } else {
              s["isChecked"] = false;
            }
          });
        }
      } else {
        posSettings.forEach((s) => {
          s["isChecked"] = false;
        });
      }
      this.setState({
        posSettings,
      });
    });
  };

  initializePRSettingsListApi = () => {
    const { payload } = this.props;
    let apiDetails = {};
    apiDetails["apiPart"] = PR_SETTINGS_LIST;

    this.props.getPRSettings(apiDetails).then((json) => {
      let prSettings =
        json.payload && json.payload.data ? json.payload.data : [];
      if (payload !== null) {
        if (payload.length > 0) {
          const patient_residences: number[] = payload;
          prSettings.forEach((s) => {
            if (patient_residences.includes(s.id_patient_residence_type)) {
              s["isChecked"] = true;
            } else {
              s["isChecked"] = false;
            }
          });
        }
      } else {
        prSettings.forEach((s) => {
          s["isChecked"] = false;
        });
      }
      this.setState({
        prSettings,
      });
    });
  };

  ///////////////////// AL START

  handleALMinConChange = (value) => {
    let alSettings = { ...this.state.alSettings };
    alSettings.min_age_condition = value;
    let payload = { ...alSettings };
    this.setState({
      alSettings,
      payload,
    });
  };

  handleALMaxConChange = (value) => {
    let alSettings = { ...this.state.alSettings };
    alSettings.max_age_condition = value;
    let payload = { ...alSettings };
    this.setState({
      alSettings,
      payload,
    });
  };

  handleALChange = (event) => {
    let alSettings = {
      ...this.state.alSettings,
      [event.target.name]: event.target.value.toString(),
    };

    let payload = { ...alSettings };
    this.setState({
      alSettings,
      payload,
    });
  };

  handleALStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let alSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    let isIncluded = alSettingsStatus.covered;
    this.setState({ alSettingsStatus, isIncluded });
  };

  ///////////////////// GL START

  serviceSettingsCheckedGL = (e) => {
    const glSettings = [...this.state.glSettings];
    const { nodeId, additionalCriteriaSequenceId } = this.props;
    const payload: string[] = [];

    glSettings.forEach((s: any) => {
      if (
        s.id + "" + nodeId + "" + additionalCriteriaSequenceId ===
        e.target.id
      ) {
        s.isChecked = e.target.checked;
      }
    });

    glSettings.forEach((s: any) => {
      if (s.isChecked === true) {
        payload.push(s.gl_code);
      }
    });

    this.setState({
      glSettings,
      payload,
    });
  };

  handleGLStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let glSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    let isIncluded = glSettingsStatus.covered;
    this.setState({ glSettingsStatus, isIncluded });
  };

  ///////////////////// ICD START

  handleICDOnChange = (event) => {
    let icdSettings = { ...this.state.icdSettings };

    if (event.target.name === "look_back_days")
      icdSettings.look_back_days = event.target.value.toString();
    let payload = { ...icdSettings };
    this.setState({
      icdSettings,
      payload,
    });
  };

  handleICDChange = (value: any[]) => {
    debugger;
    let icdSettings: any = { ...this.state.icdSettings };

    let icds: any[] = [];
    this.state.icdResults.data.forEach((icd: any) => {
      value.forEach((v) => {
        if (typeof v === "number")
          if (icd["key"] === v) {
            icds.push(icd);
          }
      });
    });

    icdSettings.icds = icds;
    const payload: any = { ...icdSettings };
    this.setState({
      icdSettings,
      payload,
    });
  };

  handleICDSearch = (input) => {
    let apiDetails = {};
    apiDetails["apiPart"] = apiConstants.GET_ICD_DRUGS_REPLACE;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      { key: apiConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: apiConstants.SEARCHKEY, value: input },
    ];
    this.props.getICDSearch(apiDetails).then((json) => {
      let response = json.payload && json.payload.data ? json.payload.data : [];
      const data = [...response].slice(0, 8);

      // ADDED to set state with newData instead of data . Also added value in icdResultsobject state
      // const newData = [...this.state.pnResults.data, ...data].filter(
      //   (item: any, index, self) => {
      //     return self.findIndex((val: any) => val.key === item.key) === index;
      //   }
      // );

      // const newValue = newData.map((d) => d.value);
      // console.log("newData", newData, newValue);

      this.setState({
        icdResults: {
          data,
        },
      });
    });
  };

  handleICDStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let icdSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    let isIncluded = icdSettingsStatus.covered;
    this.setState({ icdSettingsStatus, isIncluded });
  };

  ///////////////////// PN START

  handlePNChange = (value: any[]) => {
    let pnSettings: any[] = [...this.state.pnSettings];

    // let pns: any[] = [];
    // const pnResults = { ...this.state.pnResults };
    // const pnResultsData = [...pnResults.data];
    // pnResultsData.forEach((pn: any) => {
    //   value.forEach((v) => {
    //     if (pn["value"] === v) {
    //       pnSettings.push(pn);
    //     }
    //   });
    // });
    this.state.pnResults.data.forEach((pn: any) => {
      value.forEach((v) => {
        if (pn["key"] === v) {
          pnSettings.push(pn);
        }
      });
    });

    // console.log("modified pn results", pnResultsData, pnSettings);
    const payload: any = [...pnSettings];
    this.setState({
      pnSettings,
      payload,
    });
  };

  handlePNSearch = (input) => {
    let apiDetails = {};
    apiDetails["apiPart"] = apiConstants.GET_PN_DRUGS_REPLACE;
    // apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      // { key: apiConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: apiConstants.SEARCHKEY, value: input },
    ];
    this.props.getPNSearch(apiDetails).then((json) => {
      let response = json.payload && json.payload.data ? json.payload.data : [];
      const data = [...response].slice(0, 8);

      // console.log("after search ", [...this.state.pnResults.data, ...data]);

      // // ADDED to set state with newData instead of data . Also added value in pnResults state
      // const newData = [...this.state.pnResults.data, ...data].filter(
      //   (item: any, index, self) => {
      //     return self.findIndex((val: any) => val.key === item.key) === index;
      //   }
      // );

      // const newValue = newData.map((d) => d.value);
      // console.log("newData", newData, newValue);

      this.setState({
        pnResults: {
          data,
          // data: newData,
          // value: newValue,
        },
      });
    });
  };

  handlePNStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let pnSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    let isIncluded = pnSettingsStatus.covered;
    this.setState({ pnSettingsStatus, isIncluded });
  };

  ///////////////////// PT START

  handlePTChange = (value: any[]) => {
    let ptSettings: any[] = [...this.state.ptSettings];

    // let icds: any[] = [];
    this.state.ptResults.data.forEach((pt: any) => {
      value.forEach((v) => {
        if (pt["key"] === v) {
          ptSettings.push(pt);
        }
      });
    });

    const payload: any = [...ptSettings];
    this.setState({
      ptSettings,
      payload,
    });
  };

  handlePTSearch = (input) => {
    let apiDetails = {};
    apiDetails["apiPart"] = apiConstants.GET_PT_DRUGS_REPLACE;
    // apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [
      // { key: apiConstants.KEY_ENTITY_ID, value: this.props?.formulary_id },
      { key: apiConstants.SEARCHKEY, value: input },
    ];
    this.props.getPTSearch(apiDetails).then((json) => {
      let response = json.payload && json.payload.data ? json.payload.data : [];
      const data = [...response].slice(0, 8);
      this.setState({
        ptResults: {
          data,
        },
      });
    });
  };

  handlePTStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;

    let ptSettingsStatus = {
      type: key,
      covered: isCovered,
    };

    let isIncluded = ptSettingsStatus.covered;
    this.setState({ ptSettingsStatus, isIncluded });
  };

  ///////////////////// POS START

  serviceSettingsCheckedPOS = (e) => {
    const posSettings = [...this.state.posSettings];
    const { nodeId, additionalCriteriaSequenceId } = this.props;
    const payload: string[] = [];

    posSettings.forEach((s: any) => {
      if (
        s.id_place_of_service_type +
          "" +
          nodeId +
          "" +
          additionalCriteriaSequenceId ===
        e.target.id
      ) {
        s.isChecked = e.target.checked;
      }
    });

    posSettings.forEach((s: any) => {
      if (s.isChecked === true) {
        payload.push(s.id_place_of_service_type);
      }
    });

    this.setState({
      posSettings,
      payload,
    });
  };

  handlePOSSelectAll = () => {
    const { posSettings, isSelectAllPOS } = this.state;
    const payload: string[] = [];

    posSettings.forEach((s: any) => {
      s.isChecked = !isSelectAllPOS;
    });

    posSettings.forEach((s: any) => {
      if (s.isChecked === true) {
        payload.push(s.id_place_of_service_type);
      }
    });

    this.setState({
      posSettings,
      isSelectAllPOS: !isSelectAllPOS,
      payload,
    });
  };

  handlePOSStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let posSettingsStatus = {
      type: key,
      covered: isCovered,
    };
    let isIncluded = posSettingsStatus.covered;
    this.setState({ posSettingsStatus, isIncluded });
  };

  ///////////////////// PR START

  serviceSettingsCheckedPR = (e) => {
    const prSettings = [...this.state.prSettings];
    const { nodeId, additionalCriteriaSequenceId } = this.props;
    const payload: string[] = [];

    prSettings.forEach((s: any) => {
      if (
        s.id_patient_residence_type +
          "" +
          nodeId +
          "" +
          additionalCriteriaSequenceId ===
        e.target.id
      ) {
        s.isChecked = e.target.checked;
      }
    });

    prSettings.forEach((s: any) => {
      if (s.isChecked === true) {
        payload.push(s.id_patient_residence_type);
      }
    });

    this.setState({
      prSettings,
      payload,
    });
  };

  handlePRSelectAll = () => {
    const { prSettings, isSelectAllPR } = this.state;
    const payload: string[] = [];

    prSettings.forEach((s: any) => {
      s.isChecked = !isSelectAllPR;
    });

    prSettings.forEach((s: any) => {
      if (s.isChecked === true) {
        payload.push(s.id_patient_residence_type);
      }
    });

    this.setState({
      prSettings,
      isSelectAllPR: !isSelectAllPR,
      payload,
    });
  };

  handlePRStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let prSettingsStatus = {
      type: key,
      covered: isCovered,
    };
    let isIncluded = prSettingsStatus.covered;
    this.setState({ prSettingsStatus, isIncluded });
  };

  ///////////////////// PCHL START

  handlePCHLChange = (value: any[]) => {
    let lookback_drug: any[] = [...this.state.pchlSettings.lookback_drug];

    this.state.pchlResults.data.forEach((pchl: any) => {
      value.forEach((v) => {
        if (pchl["id"] === v) {
          lookback_drug.push(pchl);
        }
      });
    });

    const payload: any = {
      ...this.state.pchlSettings,
      lookback_drug: lookback_drug,
    };
    this.setState({
      pchlSettings: payload,
      payload,
    });
  };

  handlePCHLSearch = (input) => {
    let apiDetails = {};
    apiDetails["apiPart"] = apiConstants.GET_PCHL_DRUGS_ONSEARCH;
    apiDetails["pathParams"] = this.props?.formulary_id;
    apiDetails["keyVals"] = [{ key: apiConstants.SEARCHKEY, value: input }];
    this.props.getPCHLSearch(apiDetails).then((json) => {
      let response = json.payload && json.payload.data ? json.payload.data : [];
      const data = [...response].slice(0, 8);
      this.setState({
        pchlResults: {
          data,
        },
      });
    });
  };

  handlePCHLOnChange = (event) => {
    let pchlSettings =
      typeof event === "string"
        ? { ...this.state.pchlSettings, id_lookback_level: event.toString() }
        : {
            ...this.state.pchlSettings,
            [event.target.name]: event.target.value.toString(),
          };

    let payload = { ...pchlSettings };
    this.setState({
      pchlSettings,
      payload,
    });
  };

  handlePCHLStatus = (key: string) => {
    const COVERED = "covered";
    const isCovered: boolean = key === COVERED ? true : false;
    let pchlSettingsStatus = {
      type: key,
      covered: isCovered,
    };
    let isIncluded = pchlSettingsStatus.covered;
    this.setState({ pchlSettingsStatus, isIncluded });
  };

  ///////////////////// RENDER()

  render() {
    const {
      // Current Criteria
      nodeId,
      // cardCode,
      cardName,
      isIncluded,
      payload,

      isReadOnly,

      // AL
      alSettings,
      alSettingsStatus,

      // GL
      glSettings,
      glSettingsStatus,

      // ICD
      icdSettings,
      icdSettingsStatus,
      icdResults,

      // PN
      pnSettingsStatus,
      pnResults,

      // PT
      ptSettingsStatus,
      ptResults,

      // POS
      posSettings,
      prSettings,
      isSelectAllPOS,

      // PR
      posSettingsStatus,
      prSettingsStatus,
      isSelectAllPR,

      // PCHL
      pchlSettings,
      pchlSettingsStatus,
      pchlResults,
    } = this.state;
    const {
      additionalCriteriaSequenceId,
      card: { cardCode },
      editable,
      deleteIconHandler,
    } = this.props;

    const isCriteriaObject = cardCode === 1 || cardCode === 3 ? true : false;
    switch (cardCode) {
      case 1:
        return (
          <AgeCriteria
            alSettingsServies={{
              alSettings,
              alSettingsStatus,
            }}
            handleStatus={this.handleALStatus}
            handleAgeCriteriaMinConChange={this.handleALMinConChange}
            handleAgeCriteriaMaxConChange={this.handleALMaxConChange}
            handleAgeCriteriaChange={this.handleALChange}
            deleteIconHandler={
              editable || isReadOnly
                ? null
                : () =>
                    deleteIconHandler(
                      nodeId,
                      cardCode,
                      cardName,
                      isIncluded,
                      payload,
                      isCriteriaObject
                    )
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
            isReadOnly={isReadOnly}
            editable={editable}
          />
        );
      case 2:
        return (
          <GenderCriteria
            glSettingsServies={{
              glSettings,
              glSettingsStatus,
            }}
            handleStatus={this.handleGLStatus}
            serviceSettingsChecked={this.serviceSettingsCheckedGL}
            deleteIconHandler={
              editable || isReadOnly
                ? null
                : () =>
                    deleteIconHandler(
                      nodeId,
                      cardCode,
                      cardName,
                      isIncluded,
                      payload,
                      isCriteriaObject
                    )
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
            isReadOnly={isReadOnly}
            editable={editable}
            additionalCriteriaSequenceId={additionalCriteriaSequenceId}
          />
        );
      case 3:
        return (
          <ICDCriteria
            icdSettingsServies={{
              icdSettings,
              icdSettingsStatus,
              icdResults,
            }}
            handleStatus={this.handleICDStatus}
            handleICDChange={this.handleICDChange}
            handleICDSearch={this.handleICDSearch}
            handleICDOnChange={this.handleICDOnChange}
            deleteIconHandler={
              editable || isReadOnly
                ? null
                : () =>
                    deleteIconHandler(
                      nodeId,
                      cardCode,
                      cardName,
                      isIncluded,
                      payload,
                      isCriteriaObject
                    )
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
            isReadOnly={isReadOnly}
            editable={editable}
          />
        );
      case 4:
        return (
          <PNCriteria
            pnSettingsServies={{
              pnSettingsStatus,
              pnResults,
            }}
            handleStatus={this.handlePNStatus}
            handlePNChange={this.handlePNChange}
            handlePNSearch={this.handlePNSearch}
            deleteIconHandler={
              editable || isReadOnly
                ? null
                : () =>
                    deleteIconHandler(
                      nodeId,
                      cardCode,
                      cardName,
                      isIncluded,
                      payload,
                      isCriteriaObject
                    )
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
            isReadOnly={isReadOnly}
            editable={editable}
          />
        );
      case 5:
        return (
          <PTCriteria
            ptSettingsServies={{
              ptSettingsStatus,
              ptResults,
            }}
            handleStatus={this.handlePTStatus}
            handlePTChange={this.handlePTChange}
            handlePTSearch={this.handlePTSearch}
            deleteIconHandler={
              editable || isReadOnly
                ? null
                : () =>
                    deleteIconHandler(
                      nodeId,
                      cardCode,
                      cardName,
                      isIncluded,
                      payload,
                      isCriteriaObject
                    )
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
            isReadOnly={isReadOnly}
            editable={editable}
          />
        );
      case 6:
        return (
          <POSCriteria
            posSettingsServies={{
              posSettings,
              posSettingsStatus,
            }}
            handleStatus={this.handlePOSStatus}
            serviceSettingsChecked={this.serviceSettingsCheckedPOS}
            selectAllHandler={{
              isSelectAll: isSelectAllPOS,
              handleSelectAll: this.handlePOSSelectAll,
            }}
            deleteIconHandler={
              editable || isReadOnly
                ? null
                : () =>
                    deleteIconHandler(
                      nodeId,
                      cardCode,
                      cardName,
                      isIncluded,
                      payload,
                      isCriteriaObject
                    )
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
            isReadOnly={isReadOnly}
            editable={editable}
            additionalCriteriaSequenceId={additionalCriteriaSequenceId}
          />
        );
      case 7:
        return (
          <PRCriteria
            prSettingsServies={{
              prSettings,
              prSettingsStatus,
            }}
            handleStatus={this.handlePRStatus}
            serviceSettingsChecked={this.serviceSettingsCheckedPR}
            selectAllHandler={{
              isSelectAll: isSelectAllPR,
              handleSelectAll: this.handlePRSelectAll,
            }}
            deleteIconHandler={
              editable || isReadOnly
                ? null
                : () =>
                    deleteIconHandler(
                      nodeId,
                      cardCode,
                      cardName,
                      isIncluded,
                      payload,
                      isCriteriaObject
                    )
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
            isReadOnly={isReadOnly}
            editable={editable}
            additionalCriteriaSequenceId={additionalCriteriaSequenceId}
          />
        );
      case 8:
        return (
          <PCHLCriteria
            pchlSettingsServies={{
              pchlSettings,
              pchlSettingsStatus,
              pchlResults,
            }}
            handleStatus={this.handlePCHLStatus}
            handlePCHLChange={this.handlePCHLChange}
            handlePCHLSearch={this.handlePCHLSearch}
            handlePCHLCriteriaChange={this.handlePCHLOnChange}
            deleteIconHandler={
              editable || isReadOnly
                ? null
                : () =>
                    deleteIconHandler(
                      nodeId,
                      cardCode,
                      cardName,
                      isIncluded,
                      payload,
                      isCriteriaObject
                    )
            }
            isAdditionalCriteria={true}
            nodeId={nodeId}
            isReadOnly={isReadOnly}
            editable={editable}
          />
        );
      default:
        return null;
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
