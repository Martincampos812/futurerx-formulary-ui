import React, { useEffect, useState } from "react";
import STAlertDialog from "./STAlertDialog";
import { SUCCESS_MSG, ERROR_MSG } from "./PopupAlerts/Constents";
import Alerts from "./PopupAlerts/Alerts";
import {
  deleteGroupDescription,
  cloneGroupDescription,
  archiveGroupDescription,
  newVersionGroupDescription,
  cleanMessage,
  getPAGroupDetails,
} from "../../../../../../redux/slices/formulary/pagdm/pagdmSlice";
import {
  getPaGrouptDescriptions,
  getPaTypes,
  getPaGrouptDescriptionVersions,
  getPaGrouptDescriptionDetail,
  getPaGrouptDescription,
  postPAGroupDescriptionFormularies,
  postApplyPAGroupDescriptionFormularies,
} from "../../../../../../redux/slices/formulary/pa/paActionCreation";
import { connect } from "react-redux";
import DialogPopup from "../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FrxGridContainer from "../../../../../shared/FrxGrid/FrxGridContainer";
import { getCompareFormularyVersionHistoryColumn } from "../../../../../../utils/grid/columns";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { DatePicker } from "antd";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { formatTimeStr } from "antd/lib/statistic/utils";
import showMessage from "../../../../Utils/Toast";
import { KeyboardReturnOutlined } from "@material-ui/icons";
import { ToastContainer } from "react-toastify";
import "./PAGroupHeader.scss";

function mapStateToProps(state) {
  return {
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_id: state.application.formulary_id,
    saveGdm: state.savePaGdm,
    PaGDData: state.paReducer.description,
    version: state.paVersion.paVersion,
    client_id: state.application.clientId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPaGrouptDescriptions: (arg) => dispatch(getPaGrouptDescriptions(arg)), // Group List
    getPaTypes: (arg) => dispatch(getPaTypes(arg)), // File Type
    cleanMessage: (arg) => dispatch(cleanMessage(arg)),
    getPaGrouptDescriptionVersions: (arg) =>
      dispatch(getPaGrouptDescriptionVersions(arg)), //Version
    getPaGrouptDescriptionDetail: (arg) =>
      dispatch(getPaGrouptDescriptionDetail(arg)), // Group ID Detail
    getPaGrouptDescription: (a) => dispatch(getPaGrouptDescription(a)),
    deleteGroupDescription: (arg) => dispatch(deleteGroupDescription(arg)), // Delete
    cloneGroupDescription: (arg) => dispatch(cloneGroupDescription(arg)), // Clone
    archiveGroupDescription: (arg) => dispatch(archiveGroupDescription(arg)), // archive
    newVersionGroupDescription: (arg) =>
      dispatch(newVersionGroupDescription(arg)), // New Vesrion
    postPAGroupDescriptionFormularies: (arg) =>
      dispatch(postPAGroupDescriptionFormularies(arg)), // New Vesrion
    postApplyPAGroupDescriptionFormularies: (arg) =>
      dispatch(postApplyPAGroupDescriptionFormularies(arg)), // New Vesrion
    getPAGroupDetails: (a) => dispatch(getPAGroupDetails(a)),
  };
}

function PAGroupHeader(props: any) {
  const [open, setOpen] = React.useState(false);
  const [popupType, setPopUpType] = React.useState("clone");
  const [versionList, setVersion] = useState([{ value: "Version 1" }]);
  const [fomulariesList, setFormularies] = useState([{}]);
  const [placeHolder, setPlaceHolder] = React.useState("Version 1");
  const [panelColor, setPanelColor] = React.useState("");
  const versionListLength = versionList.length - 1;
  const [showViewAll, setShowViewAll] = React.useState(false);
  const [effectiveDate, setEffectiveDate] = React.useState("");
  const [selectedFormularies, updateSelectedFormularies] = React.useState([]);
  const [idField, setIdField] = React.useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedVersionId, setSelectedVersionId] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const getCompareFormularyViewAllGridData = [
    {
      //id: 1,
      //key: 1,
      drugName: "Drug 1",
      rxcui: "",
      ddid: "",
      gpi: "",
      trademark: "",
      baseTier: "1",
      referenceTier: "2",
      tierDifference: "Y",
      referenceCategory: "",
      categoryDifference: "",
      referenceClass: "",
      classDifference: "",
      paGroupDescriptionBase: "",
      paGroupDescriptionReference: "",
      paGroupDescriptionDifference: "",
    },
  ];
  const toggleShowViewAll = () => {
    let apiDetails = {};
    apiDetails["lob_type"] = props.formulary_lob_id;
    apiDetails["pathParams"] = "/" + props.saveGdm.current_group_id;

    if (props.formulary_lob_id == 1) {
      setIdField("formulary_id");
    } else if (props.formulary_lob_id !=1 ) {
      setIdField("formulary_id");
    }

    props.postPAGroupDescriptionFormularies(apiDetails).then((json) => {
      let tmp_array: any = [];
      let count = 1;
      json?.payload?.result?.map((obj) => {
        obj["id"] = count;
        obj["key"] = count;
        if (obj["is_editable"] == true) {
          tmp_array.push(obj);
        }
        count++;
      });
      setFormularies(tmp_array);
    });
    setShowViewAll(!showViewAll);
  };

  const handleEffectiveDate = (date) => {
    setEffectiveDate(date.format("yyyy-MM-D"));
  };

  useEffect(() => {
    setIsSetupComplete(props.isSetupComplete);
  }, []);

  useEffect(() => {
    setIsSetupComplete(props.isSetupComplete);
  }, [props.isSetupComplete]);

  useEffect(() => {
    debugger;
    let versions = props.version;

    if (props.isPopUpView && versions.length > 0) {

      versions = versions.filter((obj) => {

        if (obj.is_setup_complete) {
          return obj;
        }
      });
    }
    if (versions.length > 0) {
      debugger;
      const verLength = Object.keys(versions).length;
      let tmpVersion = versions.length > 0 &&
      versions.find((val) =>
                      val.id_pa_group_description === props.saveGdm.current_group_des_id);
      if (tmpVersion==null){
        tmpVersion =  versions[verLength - 1];
      }
      const isEditable = tmpVersion?.is_setup_complete;
      const value = tmpVersion?.value;
      setPanelColor(
        isEditable
          ? props.isPopUpView
            ? "-grey"
            : "-green"
          : props.isPopUpView
            ? "-grey"
            : "-orange"
      );
      setVersion(versions);
      //const latestVerion = verLength > 0 ? selectedVersion.split(" ")[1] : '';
      setSelectedVersion(tmpVersion.version_number);
      let selectedVersionId = tmpVersion["id_pa_group_description"];
      setSelectedVersionId(selectedVersionId);
      setIsSetupComplete(isEditable);
      // props.getPAGroupDetails({
      //   formulary_id: props.saveGdm.formulary_id,
      //   current_group_id:
      //     props.saveGdm.current_group_id,
      //   current_group_des_id:selectedVersionId
      // });

      setPlaceHolder(value);
    } else {
      setVersion([{ value: "Version 1" }]);
      setPlaceHolder("Version 1");
      setIsSetupComplete(false);
    }
    props.onChange("no");
  }, [props.saveGdm.current_group_id , props.version , props.editMode]);

  const handleClickOpen = (type) => {
    setOpen(true);
    setPopUpType(type);
    props.cleanMessage({
      error: "",
      success: "",
    });
  };

  const onChange = (e) => {
    const verLength = Object.keys(props.version).length;
    const selectedVersion = e.target.value;
    if (verLength > 0 && selectedVersion != "") {
      // const isEditable =
      //   props.version[Number(selectedVersion.split(" ")[1]) - 1]
      //     .is_setup_complete;
      // const latestVerion =
      //   verLength > 0
      //     ? props.version[Number(selectedVersion.split(" ")[1]) - 1]
      //         ?.id_pa_group_description
      //     : 0;

      const is_setup = props.version.find(
        (val) => val.value == selectedVersion
      );
      let isEditable = true;
      var latestVerion: any = 0;
      if (is_setup) {
        isEditable = is_setup.is_setup_complete;
        latestVerion = is_setup.id_pa_group_description;
      }
      // else {
      //   isEditable = props.version.find((val) => val.value == selectedVersion).is_setup_complete;
      //   latestVerion =
      //     verLength > 0
      //       ? props.version.find(
      //           (val) =>
      //             val.version_number == Number(selectedVersion.split(" ")[1])
      //         ).id_pa_group_description
      //       : 0;
      // }

      setIsSetupComplete(isEditable);
      setPanelColor(
        isEditable
          ? props.isPopUpView
            ? "-grey"
            : "-green"
          : props.isPopUpView
            ? "-grey"
            : "-orange"
      );
      setPlaceHolder(selectedVersion);
      let apiDetails = {};
      apiDetails["lob_type"] = props.formulary_lob_id;
      apiDetails["pathParams"] = "/" + latestVerion;
      props.getPaGrouptDescription(apiDetails);
      const latestVerionNo = verLength > 0 ? selectedVersion.split(" ")[1] : "";
      setSelectedVersion(latestVerionNo);
      setSelectedVersionId(latestVerion);
      props.getPAGroupDetails({
        formulary_id: props.saveGdm.formulary_id,
        current_group_id: props.saveGdm.current_group_id,
        current_group_des_id: latestVerion,
      });
    }
    props.onChange(selectedVersion);
  };

  const handleClose = () => {
    setOpen(false);
    props.cleanMessage({
      error: "",
      success: "",
    });
  };

  const onSelectedTableRowChanged = (selectedRowKeys) => {
    fomulariesList.map((obj) => (obj["applied_version"] = ""));
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      let tmp: any = selectedRowKeys.map((tierId) => {
        fomulariesList[tierId - 1]["applied_version"] = selectedVersion;
        return fomulariesList[tierId - 1][idField];
      });
      updateSelectedFormularies(tmp);
    }
  };
  const applyFormularies = (e: any) => {
    let apiDetails = {};

    if (effectiveDate == "") {
      showMessage("Effective Date is required", "info");
      return;
    }

    if (selectedFormularies.length == 0) {
      showMessage("Please select formulary", "info");
      return;
    }

    apiDetails["lob_type"] = props.formulary_lob_id;
    apiDetails["pathParams"] = "/" + props.saveGdm.current_group_id;

    apiDetails["messageBody"] = {};
    //var str = effectiveDate.format("yyyy/MM/D");
    apiDetails["messageBody"]["effective_date"] = effectiveDate;
    apiDetails["messageBody"]["formulary_ids"] = selectedFormularies;

    apiDetails["messageBody"]["id_pa_group_description"] =
      props.saveGdm.current_group_des_id;
    apiDetails["messageBody"]["is_select_all"] = false;
    apiDetails["messageBody"]["pa_group_description_formulary_ids"] = [];

    props.postApplyPAGroupDescriptionFormularies(apiDetails).then((json) => {

      if (json?.payload && json?.payload?.code === "200") {
        setShowViewAll(!showViewAll);
        showMessage("Success", "success");
      } else {
        showMessage("Failure", "error");
      }
    });
  };
  const deleteGroup = (e: any, param: any) => {
    let pathParams;
    if (param === "delete-version") {
      pathParams =
        props.saveGdm.current_group_des_id +
        "/CV?entity_id=" +
        props.formulary_id;
    } else if (param === "delete-full") {
      pathParams =
        props.saveGdm.current_group_id + "/GD?entity_id=" + props.formulary_id;
    } else {
      pathParams =
        props.saveGdm.current_group_id + "/GD?entity_id=" + props.formulary_id;
    }
    props
      .deleteGroupDescription({
        pathParams: pathParams,
        lob_type: props.formulary_lob_id,
      })
      .then((json) => {
        if (
          json?.payload?.success?.status &&
          json?.payload?.success?.status == 200
        ) {
          let apiDetails = {};
          apiDetails["lob_type"] = props.formulary_lob_id;
          apiDetails["pathParams"] =
            "/" + props.client_id + "?entity_id=" + props?.formulary_id;
          props.getPaGrouptDescriptions(apiDetails).then((json) => {
            if (json?.payload && json?.payload?.data?.length > 0) {
              const groupList = json?.payload?.data;
              const groupListLength = Object.keys(groupList).length;
              //const id_pa_group_description = groupListLength>0?groupList[0].id_base_pa_group_description:0;
              let id_pa_group_description =
                groupListLength > 0
                  ? groupList.filter((val) => val.is_archived === false)[0]
                    .id_base_pa_group_description
                  : 0;

              if (param === "delete-version" && versionListLength > 0) {
                id_pa_group_description = props.saveGdm.current_group_id;
              } else {
                id_pa_group_description =
                  groupListLength > 0
                    ? groupList.filter((val) => val.is_archived === false)[0]
                      .id_base_pa_group_description
                    : 0;
              }
              apiDetails["pathParams"] = "/" + id_pa_group_description;
              props.getPaGrouptDescriptionVersions(apiDetails).then((json) => {
                if (json?.payload && json?.payload?.data?.length > 0) {
                let response = json.payload.data;

                const verLength = Object.keys(response).length;
                const isEditable = response[verLength - 1].is_setup_complete;
                const latestVerion =
                  response[verLength - 1].id_pa_group_description;
                const value = response[verLength - 1].value;
                setIsSetupComplete(isEditable);
                setVersion(response);
                setPlaceHolder(value);

                setSelectedVersion(response[verLength - 1].version_number);
                props.getPAGroupDetails({
                  formulary_id: props.saveGdm.formulary_id,
                  current_group_id: id_pa_group_description,
                  current_group_des_id: latestVerion
                });
                let apiDetails = {};
                apiDetails["lob_type"] = props.formulary_lob_id;
                apiDetails["pathParams"] = "/" + latestVerion;
                props.getPaGrouptDescription(apiDetails);
                props.getPaTypes(props.saveGdm.formulary_id);
              }
              });
            }
          });
          showMessage(SUCCESS_MSG["delete"], "success");
        } else if (json?.payload?.status && json?.payload?.status != 200) {
          if (
            json?.payload?.data?.formularies &&
            json?.payload?.data?.formularies?.length > 0
          ) {
            let errs = "";
            json.payload.data.formularies.map((val) => {
              errs += "\n\n" + val.formuary_name + "\n\n";
            });
            showMessage(
              "Following Formularies are linked to current Group Description:\n" +
              errs,
              "error"
            );
          }
          showMessage(json.payload.data.message, "error");
        }

        setOpen(false);
      });
  };
  const cloneGroup = (e: any, param: any) => {
    props
      .cloneGroupDescription({
        current_group_des_id: props.saveGdm.current_group_des_id,
        pa_group_description_name: param.st_group_description_name,
        lob_type: props.formulary_lob_id, // clone page input
      })
      .then((json) => {
        if (
          json?.payload?.success?.status &&
          json?.payload?.success?.status == 200
        ) {
          let apiDetails = {};
          apiDetails["lob_type"] = props.formulary_lob_id;
          apiDetails["pathParams"] = "/" + props.client_id;
          props.getPaGrouptDescriptions(apiDetails);
          showMessage(SUCCESS_MSG["clone"], "success");
        } else if (json?.payload?.status && json?.payload?.status != 200) {
          showMessage(json.payload.data.message, "error");
        }
        setOpen(false);
      });
  };
  const archiveGroup = (e: any, param: any) => {
    let pathParams;
    if (param === "archive-version") {
      pathParams =
        props.saveGdm.current_group_des_id +
        "/CV?entity_id=" +
        props.formulary_id;
    } else if (param === "archive-full") {
      pathParams =
        props.saveGdm.current_group_id + "/GD?entity_id=" + props.formulary_id;
    } else {
      pathParams =
        props.saveGdm.current_group_id + "/GD?entity_id=" + props.formulary_id;
    }
    props
      .archiveGroupDescription({
        pathParams: pathParams,
        lob_type: props.formulary_lob_id,
      })
      .then((json) => {
        if (
          json?.payload?.success?.status &&
          json?.payload?.success?.status == 200
        ) {
          let apiDetails = {};
          apiDetails["lob_type"] = props.formulary_lob_id;
          apiDetails["pathParams"] = "/" + props.client_id;
          props.getPaGrouptDescriptions(apiDetails);

          apiDetails["pathParams"] = "/" + props.saveGdm.current_group_id;
          props.getPaGrouptDescriptionVersions(apiDetails).then((json) => {
            if (json?.payload && json?.payload?.data?.length > 0) {
              const response = json.payload.data;
              const verLength = Object.keys(response).length;
              const isEditable = response[verLength - 1].is_setup_complete;
              const latestVerion =
                response[verLength - 1].id_pa_group_description;
              const value = response[verLength - 1].value;
              setIsSetupComplete(isEditable);
              setSelectedVersion(response[verLength - 1].version_number);
              setVersion(response);
              setPlaceHolder(value);
              props.getPAGroupDetails({
                formulary_id: props.saveGdm.formulary_id,
                current_group_id: props.saveGdm.current_group_id,
                current_group_des_id: latestVerion
              });
              let apiDetails = {};
              apiDetails["lob_type"] = props.formulary_lob_id;
              apiDetails["pathParams"] = "/" + latestVerion;
              props.getPaGrouptDescription(apiDetails);
              props.getPaTypes(props.saveGdm.formulary_id);
              setVersion(json.payload.data);
              let v = props.version;
            }
          });

          showMessage(SUCCESS_MSG["archive"], "success");
        } else if (json?.payload?.status && json?.payload?.status != 200) {
          showMessage(json.payload.data.message, "error");
        }
        setOpen(false);
      });
  };

  const newVersionGroup = (e: any, param: any) => {


    props
      .newVersionGroupDescription({
        current_group_des_id: props.saveGdm.current_group_des_id,
        lob_type: props.formulary_lob_id,
      })
      .then((json) => {
        if (
          json?.payload?.success?.status &&
          json?.payload?.success?.status == 200
        ) {
          let apiDetails = {};
          apiDetails["lob_type"] = props.formulary_lob_id;
          apiDetails["pathParams"] = "/" + props.client_id;
          props.getPaGrouptDescriptions(apiDetails);

          apiDetails["pathParams"] = "/" + props.saveGdm.current_group_id;
          props.getPaGrouptDescriptionVersions(apiDetails).then((json) => {
            if (json?.payload && json?.payload?.data?.length > 0) {
              const response = json.payload.data;
              const verLength = Object.keys(response).length;
              const isEditable = response[verLength - 1].is_setup_complete;
              const latestVerion =
                response[verLength - 1].id_pa_group_description;
              const value = response[verLength - 1].value;
              setIsSetupComplete(isEditable);
              setVersion(response);
              setPlaceHolder(value);
              setSelectedVersion(response[verLength - 1].version_number);
              props.getPAGroupDetails({
                formulary_id: props.saveGdm.formulary_id,
                current_group_id: props.saveGdm.current_group_id,
                current_group_des_id: latestVerion
              });
              let apiDetails = {};
              apiDetails["lob_type"] = props.formulary_lob_id;
              apiDetails["pathParams"] = "/" + latestVerion;
              props.getPaGrouptDescription(apiDetails);
              props.getPaTypes(props.saveGdm.formulary_id);
              setOpen(false);
            }
          });
          showMessage(SUCCESS_MSG["newVersion"], "success");
        } else if (json?.payload?.status && json?.payload?.status != 200) {
          if (
            json?.payload?.data?.formularies &&
            json?.payload?.data?.formularies?.length > 0
          ) {
            let errs = "";
            json.payload.data.formularies.map((val) => {
              errs += "\n\n" + val.formuary_name + "\n\n";
            });
            showMessage(
              "Following Formularies are linked to current Group Description:\n" +
              errs,
              "error"
            );
          }
          showMessage(json.payload.data.message, "error");
        }

        setOpen(false);
      });
  };
  return (
    <div
      className={`version-wrapper version-wrapper${isSetupComplete === true
        ? props.isPopUpView
          ? "-grey"
          : "-green"
        : props.isPopUpView
          ? "-grey"
          : "-orange"
        }`}
    >
      <select
        name="group-description"
        id="group-description"
        className="formulary-type-dropdown formulary-versions"
        onChange={onChange}
        style={{ border: "none" }}
      >
        {/* <option value=""></option> */}
        {versionList.map((e, index) =>
          versionListLength === index ? (
            <option value={e.value} selected>
              {e.value}
            </option>
          ) : (
              <option value={e.value}>{e.value}</option>
            )
        )}
      </select>
      <div
        className="item item--version-history"
        onClick={props.isPopUpView ? () => { } : toggleShowViewAll}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8281 5.48992C10.8336 8.42555 8.43949 10.826 5.50387 10.8281C4.23597 10.829 3.07134 10.387 2.15613 9.64838C1.91815 9.4563 1.90036 9.09964 2.11662 8.88338L2.35868 8.64132C2.54364 8.45636 2.83892 8.43612 3.04384 8.59869C3.71813 9.13376 4.57147 9.45312 5.5 9.45312C7.68507 9.45312 9.45312 7.68472 9.45312 5.5C9.45312 3.31493 7.68472 1.54688 5.5 1.54688C4.45126 1.54688 3.49875 1.95441 2.79151 2.61963L3.88193 3.71005C4.09849 3.92661 3.94511 4.29688 3.63887 4.29688H0.515625C0.325768 4.29688 0.171875 4.14298 0.171875 3.95312V0.829877C0.171875 0.523639 0.542137 0.370262 0.758699 0.586803L1.81943 1.64753C2.77597 0.733391 4.07241 0.171875 5.5 0.171875C8.43928 0.171875 10.8227 2.55191 10.8281 5.48992ZM6.94134 7.18255L7.15238 6.9112C7.32722 6.68641 7.28673 6.36245 7.06193 6.18763L6.1875 5.5075V3.26562C6.1875 2.98085 5.95665 2.75 5.67187 2.75H5.32812C5.04335 2.75 4.8125 2.98085 4.8125 3.26562V6.18L6.21777 7.273C6.44256 7.44782 6.7665 7.40734 6.94134 7.18255Z"
            fill={
              isSetupComplete === true
                ? props.isPopUpView
                  ? "#8DD5A2"
                  : "#219653"
                : props.isPopUpView
                  ? "#8DD5A2"
                  : "#f65a1c"
            }
          />
        </svg>
        Version History
      </div>
      <div
        className="item item--version-history"
        onClick={props.isPopUpView ? () => { } : () => handleClickOpen("clone")}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7812 0C12.4544 0 13 0.545645 13 1.21875V8.53125C13 9.20436 12.4544 9.75 11.7812 9.75H4.46875C3.79564 9.75 3.25 9.20436 3.25 8.53125V1.21875C3.25 0.545645 3.79564 0 4.46875 0H11.7812ZM4.46875 10.5625C3.34872 10.5625 2.4375 9.65128 2.4375 8.53125V3.25H1.21875C0.545645 3.25 0 3.79564 0 4.46875V11.7812C0 12.4544 0.545645 13 1.21875 13H8.53125C9.20436 13 9.75 12.4544 9.75 11.7812V10.5625H4.46875Z"
            fill={
              isSetupComplete === true
                ? props.isPopUpView
                  ? "#8DD5A2"
                  : "#219653"
                : props.isPopUpView
                  ? "#8DD5A2"
                  : "#f65a1c"
            }
          />
        </svg>
        Clone
      </div>
      <div
        className="item item--version-history"
        onClick={
          props.isPopUpView ? () => { } : () => handleClickOpen("newVersion")
        }
      >
        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.61523 0C3.47441 0 0.927734 2.54668 0.927734 5.6875C0.927734 8.82832 3.47441 11.375 6.61523 11.375C9.75605 11.375 12.3027 8.82832 12.3027 5.6875C12.3027 2.54668 9.75605 0 6.61523 0ZM9.05273 5.99219C9.05273 6.04805 9.00703 6.09375 8.95117 6.09375H7.02148V8.02344C7.02148 8.0793 6.97578 8.125 6.91992 8.125H6.31055C6.25469 8.125 6.20898 8.0793 6.20898 8.02344V6.09375H4.2793C4.22344 6.09375 4.17773 6.04805 4.17773 5.99219V5.38281C4.17773 5.32695 4.22344 5.28125 4.2793 5.28125H6.20898V3.35156C6.20898 3.2957 6.25469 3.25 6.31055 3.25H6.91992C6.97578 3.25 7.02148 3.2957 7.02148 3.35156V5.28125H8.95117C9.00703 5.28125 9.05273 5.32695 9.05273 5.38281V5.99219Z"
            fill={
              isSetupComplete === true
                ? props.isPopUpView
                  ? "#8DD5A2"
                  : "#219653"
                : props.isPopUpView
                  ? "#8DD5A2"
                  : "#f65a1c"
            }
          />
        </svg>
        New Version
      </div>
      <div
        className="item item--version-history"
        onClick={props.isPopUpView ? () => { } : () => handleClickOpen("delete")}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 5.5C11 6.95869 10.4205 8.35764 9.38909 9.38909C8.35764 10.4205 6.95869 11 5.5 11C4.04131 11 2.64236 10.4205 1.61091 9.38909C0.579463 8.35764 0 6.95869 0 5.5C0 4.04131 0.579463 2.64236 1.61091 1.61091C2.64236 0.579463 4.04131 0 5.5 0C6.95869 0 8.35764 0.579463 9.38909 1.61091C10.4205 2.64236 11 4.04131 11 5.5ZM8.14962 3.33713C8.21417 3.27258 8.25043 3.18503 8.25043 3.09375C8.25043 3.00247 8.21417 2.91492 8.14962 2.85037C8.08508 2.78583 7.99753 2.74957 7.90625 2.74957C7.81497 2.74957 7.72742 2.78583 7.66288 2.85037L5.5 5.01394L3.33713 2.85037C3.30516 2.81841 3.26722 2.79306 3.22546 2.77577C3.18371 2.75847 3.13895 2.74957 3.09375 2.74957C3.04855 2.74957 3.00379 2.75847 2.96204 2.77577C2.92028 2.79306 2.88234 2.81841 2.85037 2.85037C2.81841 2.88234 2.79306 2.92028 2.77577 2.96204C2.75847 3.00379 2.74957 3.04855 2.74957 3.09375C2.74957 3.13895 2.75847 3.18371 2.77577 3.22546C2.79306 3.26722 2.81841 3.30516 2.85037 3.33713L5.01394 5.5L2.85037 7.66288C2.78583 7.72742 2.74957 7.81497 2.74957 7.90625C2.74957 7.99753 2.78583 8.08508 2.85037 8.14962C2.91492 8.21417 3.00247 8.25043 3.09375 8.25043C3.18503 8.25043 3.27258 8.21417 3.33713 8.14962L5.5 5.98606L7.66288 8.14962C7.69484 8.18159 7.73278 8.20694 7.77454 8.22423C7.81629 8.24153 7.86105 8.25043 7.90625 8.25043C7.95145 8.25043 7.99621 8.24153 8.03796 8.22423C8.07972 8.20694 8.11766 8.18159 8.14962 8.14962C8.18159 8.11766 8.20694 8.07972 8.22423 8.03796C8.24153 7.99621 8.25043 7.95145 8.25043 7.90625C8.25043 7.86105 8.24153 7.81629 8.22423 7.77454C8.20694 7.73278 8.18159 7.69484 8.14962 7.66288L5.98606 5.5L8.14962 3.33713Z"
            fill={
              isSetupComplete === true
                ? props.isPopUpView
                  ? "#8DD5A2"
                  : "#219653"
                : props.isPopUpView
                  ? "#8DD5A2"
                  : "#f65a1c"
            }
          />
        </svg>
        Delete
      </div>
      <div
        className="item  item--version-history"
        onClick={
          props.isPopUpView ? () => { } : () => handleClickOpen("archive")
        }
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.6875 9.625C0.6875 10.0053 0.994727 10.3125 1.375 10.3125H9.625C10.0053 10.3125 10.3125 10.0053 10.3125 9.625V3.4375H0.6875V9.625ZM4.125 5.07031C4.125 4.92852 4.24102 4.8125 4.38281 4.8125H6.61719C6.75898 4.8125 6.875 4.92852 6.875 5.07031V5.24219C6.875 5.38398 6.75898 5.5 6.61719 5.5H4.38281C4.24102 5.5 4.125 5.38398 4.125 5.24219V5.07031ZM10.3125 0.6875H0.6875C0.307227 0.6875 0 0.994727 0 1.375V2.40625C0 2.59531 0.154687 2.75 0.34375 2.75H10.6562C10.8453 2.75 11 2.59531 11 2.40625V1.375C11 0.994727 10.6928 0.6875 10.3125 0.6875Z"
            fill={
              isSetupComplete === true
                ? props.isPopUpView
                  ? "#8DD5A2"
                  : "#219653"
                : props.isPopUpView
                  ? "#8DD5A2"
                  : "#f65a1c"
            }
          />
        </svg>
        Archive
      </div>
      {open ? (
        <STAlertDialog
          popuptitle={props.popuptitle}
          openPopup={open}
          closePopup={handleClose}
          popupType={popupType}
        >
          <Alerts
            closePopup={handleClose}
            popupType={popupType}
            deleteGroup={deleteGroup}
            cloneGroup={cloneGroup}
            archiveGroup={archiveGroup}
            newVersionGroup={newVersionGroup}
            popuptitle={props.popuptitle}
          />
        </STAlertDialog>
      ) : (
          <ToastContainer />
        )}

      <DialogPopup
        showCloseIcon={true}
        positiveActionText="Save"
        negativeActionText=""
        title="APPLY NEW VERSION TO FORMULARY"
        handleClose={toggleShowViewAll}
        handleAction={applyFormularies}
        showActions={true}
        height="80%"
        width="80%"
        open={showViewAll}
      >
        <div className="inner-container pa-new-group-form">
          <Grid container spacing={2} className="date-picker-container">
            <Grid xs={6}>
              <div className="label">
                Effective Date<span className="astrict">*</span>
              </div>
              <div className="calender">
                <DatePicker
                  onChange={handleEffectiveDate}
                  placeholder="MM/DD/YYYY"
                  format="MM/DD/YYYY"
                  name="effective_date"
                />
              </div>
            </Grid>
          </Grid>

          <FrxDrugGridContainer
            isDataLoaded
            isPinningEnabled={false}
            enableSearch={false}
            enableColumnDrag
            onSearch={() => { }}
            fixedColumnKeys={[]}
            pagintionPosition="topRight"
            gridName="DRUG GRID"
            enableSettings={false}
            columns={getCompareFormularyVersionHistoryColumn()}
            scroll={{ x: 2000, y: 377 }}
            isFetchingData={false}
            enableResizingOfColumns
            data={fomulariesList}
            rowSelection={{
              columnWidth: 50,
              fixed: true,
              type: "checkbox",
              onChange: onSelectedTableRowChanged,
            }}
          />
        </div>
      </DialogPopup>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PAGroupHeader);
