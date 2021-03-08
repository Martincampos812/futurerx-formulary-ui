import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { memberSummarySlice } from "../slices/member-summary/MemberSummarySlice";
import { userPrefsSlice } from "../slices/users/UserPrefsSlice";
import { formularySummarySlice } from "../slices/formulary/formularySummarySlice";
import { combineReducers } from "redux";
import applicationReducer from "../slices/formulary/application/applicationSlice";
import setupReducer from "../slices/formulary/setup/setupSlice";
import setupOptionsReducer from "../slices/formulary/setup/setupOptionsSlice";
import dashboardReducer from "../slices/formulary/dashboard/dashboardSlice";
import tableReducer from "../slices/formulary/marketing_materials/tableSlice";
import stcReducer from "../slices/formulary/SearchToolConfiguration/stcSlice";
import plainLanguageDescriptorReducer from "../slices/formulary/marketing_materials/plainLanguageDescriptorSlice";
import importReducder from "../slices/formulary/import_export/formularyImportSlice";
import messagingReducer from "../slices/formulary/messaging/messagingSlice";
import { gridSettingsSlice } from "../slices/formulary/gridHandler/gridSettingsSlice";
import { tierSlice } from "../slices/formulary/tier/tierSlice";
import { categoryClassSlice } from "../slices/formulary/categoryClass/categoryClassSlice";
import { switchSlice } from "../slices/formulary/switch/switchSlice";
import advancedSearchReducer from "../slices/formulary/advancedSearch/advancedSearchSlice";
import additionalCriteriaReducer from "../slices/formulary/advancedSearch/additionalCriteriaSlice";
import headerReducer from "../slices/formulary/header/headerSlice";
import gdmReducer from "../slices/formulary/gdm/gdmSlice";
import gdmPaReducer from "../slices/formulary/pagdm/pagdmSlice";
import {
  stepTherapySlice,
  stVersionSlice
} from "../slices/formulary/stepTherapy/stepTherapySlice";
import { paSlice, paVersionSlice } from "../slices/formulary/pa/paSlice";
import { hpmsSlice } from "../slices/formulary/hpms/hpmsSlice";
import { nocReportSlice } from "../slices/formulary/nocReport/nocReportSlice";
import { costShareDetailsSlice } from "../slices/formulary/cost-ShareDetails/costShareDetailsSlice";
import { webAnalyticalSlice } from "../slices/formulary/webAnalytical/webAnalyticalSlice";
import { qlSlice } from "../slices/formulary/ql/qlSlice";
import { formularyVersionHistorySlice } from "../slices/formulary/version-history/version-history.slice";
import maintenanceReducer from "../slices/maintenance/maintenanceSlice";
import { slice as umCriteriaSlice } from "../slices/formulary/umCriteria/slice";
import configurationLegendsReducer from "../slices/formulary/marketingMaterial/marketingMaterialSlice";
import alternativeReducer from "../slices/alternatives/alternativeSlice";
import validationReducer from "../slices/formulary/validation/validationSlice";
import workflowIntegrationReducer from "../slices/workflow/workflowIntegrationSlice";

const memberSummaryReducer = memberSummarySlice.reducer;
const userPrefsReducer = userPrefsSlice.reducer;
const gridSettingsReducer = gridSettingsSlice.reducer;
const tierSliceReducer = tierSlice.reducer;
const paSliceReducer = paSlice.reducer;
const switchReducer = switchSlice.reducer;
const stepTherapy = stepTherapySlice.reducer;
const stVerion = stVersionSlice.reducer;
const paVersion = paVersionSlice.reducer;
const categoryClass = categoryClassSlice.reducer;
const umCriteriaReducer = umCriteriaSlice.reducer;
const nocReport = nocReportSlice.reducer;
const costShareDetails = costShareDetailsSlice.reducer;
const webAnalytical = webAnalyticalSlice.reducer;
const pa = paSlice.reducer;
const ql = qlSlice.reducer;
const hpms = hpmsSlice.reducer;
const formularyVersionHistoryReducer = formularyVersionHistorySlice.reducer;

const reducer = combineReducers({
  application: applicationReducer,
  setup: setupReducer,
  setupOptions: setupOptionsReducer,
  dashboard: dashboardReducer,
  workflow: workflowIntegrationReducer,
  messaging: messagingReducer,
  maintenance: maintenanceReducer,
  member_summary: memberSummaryReducer,
  user_prefs: userPrefsReducer,
  tierSliceReducer: tierSliceReducer,
  switchReducer: switchReducer,
  gridSettings: gridSettingsReducer,
  header: headerReducer,
  saveGdm: gdmReducer,
  savePaGdm: gdmPaReducer,
  stepTherapyReducer: stepTherapy,
  advancedSearch: advancedSearchReducer,
  stVerion: stVerion,
  paReducer: pa,
  qlReducer: ql,
  paVersion: paVersion,
  categoryClass: categoryClass,
  additionalCriteria: additionalCriteriaReducer,
  formularyVersionHistory: formularyVersionHistoryReducer,
  umCriteriaReducer: umCriteriaReducer,
  alternative: alternativeReducer,
  validation: validationReducer,
  marketing_materials_table: tableReducer,
  plain_language_descriptor: plainLanguageDescriptorReducer,
  nocReportReducer: nocReport,
  costShareDetailsReducer: costShareDetails,
  webAnalyticalReducer: webAnalytical,
  SearchToolConfiguration: stcReducer,
  configurationLegends: configurationLegendsReducer,
});

const middleware = [
  ...getDefaultMiddleware()
  /*YOUR CUSTOM MIDDLEWARES HERE*/
];

// The store is configured with the state and the corresponding reducers.
const store = configureStore({
  /*reducer: {
    application: applicationReducer,
    setup: setupReducer,
    setupOptions: setupOptionsReducer,
    dashboard: dashboardReducer,
    workflow: workflowIntegrationReducer,
    import: importReducder,
    messaging: messagingReducer,
    maintenance: maintenanceReducer,
    member_summary: memberSummaryReducer,
    user_prefs: userPrefsReducer,
    tierSliceReducer: tierSliceReducer,
    switchReducer: switchReducer,
    gridSettings: gridSettingsReducer,
    header: headerReducer,
    saveGdm: gdmReducer,
    savePaGdm: gdmPaReducer,
    stepTherapyReducer: stepTherapy,
    advancedSearch: advancedSearchReducer,
    stVerion: stVerion,
    paReducer: pa,
    qlReducer: ql,
    hpmsReducer: hpms,
    paVersion: paVersion,
    categoryClass: categoryClass,
    additionalCriteria: additionalCriteriaReducer,
    formularyVersionHistory: formularyVersionHistoryReducer,
  }*/
  reducer,
  middleware
});

export type AppState = ReturnType<typeof reducer>;

export default store;

// Type of the state.

interface FRX_STATE {
  members: Map<string, any>;
  current_member_key: string;

  member_id: string;
  member_summary: {
    first_name: string;
    lastname_name: string;
    nickname?: string;
  };
  clinical_diagnosis_history: {
    list: Array<any>;
  };
  claims: {
    yearly_data: {};
  };
}
