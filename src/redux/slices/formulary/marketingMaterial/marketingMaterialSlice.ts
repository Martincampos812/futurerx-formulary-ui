import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMarketingIconsList,
  getFormularySelectedLimitations,
  getMarketingConfigurations,
  getMarketingLegends,
  updateMarketingLegends,
  updateMarketingConfigurations,
  uploadMarketingIcon,
  submitMarketingIcon
} from "./marketingMaterialService";

interface mmstState {
  marketing_material_legends_count: number;
  marketing_material_legends_list: any[];
  isLoading: boolean;
  error: string | null;
  marketing_configuration: any;
  marketingIcons: any;
  selectedLegendConfig: any;
  icon_url: string;
}

const mmstInitialState: mmstState = {
  marketing_material_legends_count: 0,
  marketing_material_legends_list: [],
  isLoading: true,
  error: null,
  marketing_configuration: null,
  marketingIcons: [],
  selectedLegendConfig: null,
  icon_url: ''
};

const marketingMaterialSearchTool = createSlice({
  name: "marketingMaterialSearchTool",
  initialState: mmstInitialState,
  reducers: {
    setMarketingIcons(state, { payload }) {
      state.marketingIcons = payload;
    },
    getMarketingLegendsStart(state: mmstState) {
      state.isLoading = true;
    },
    getMarketingLegendsSuccess(state, { payload }) {
      const { list, count } = payload;
      state.marketing_material_legends_list = list;
      state.marketing_material_legends_count = count;
      state.isLoading = false;
      state.error = null;
    },
    getMarketingLegendsFailure(state: mmstState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getMarketingConfigurationsSuccess(state, { payload }) {
      state.marketing_configuration = payload;
    },
    updateMarketingLegendsState(state, { payload }) {
      state.marketing_material_legends_list[payload.index][payload.name] = payload.value;
      state.marketing_material_legends_list[payload.index].is_updated = true;
    },
    updateMarketingConfigurationsState(state, { payload }) {
      state.marketing_configuration[payload.name] = !state.marketing_configuration[payload.name];
    },
    onEditIconDialog(state, { payload }) {
      state.selectedLegendConfig = payload;
    },
    onSelectIcon(state, { payload }) {
      state.marketing_material_legends_list = state.marketing_material_legends_list.map((item, index) => {
        if (index === state.selectedLegendConfig.index) {
          item.icon_url = payload.icon_url;
          item.icon_id = payload.icon_id;
        }
        return item;
      });
    },
    onUploadICon(state, { payload }) {
      state.icon_url = payload;
    }
  },
});

export const {
  setMarketingIcons,
  getMarketingLegendsStart,
  getMarketingLegendsSuccess,
  getMarketingLegendsFailure,
  getMarketingConfigurationsSuccess,
  updateMarketingLegendsState,
  updateMarketingConfigurationsState,
  onEditIconDialog,
  onSelectIcon,
  onUploadICon
} = marketingMaterialSearchTool.actions;

export default marketingMaterialSearchTool.reducer;

export const getMarketingIcons = createAsyncThunk("marketingMaterialSearchTool",
  async (arg: any, { dispatch }) => {
    try {
      // dispatch(getMarketingLegendsStart());
      const icons = await getMarketingIconsList(arg);
      dispatch(setMarketingIcons(icons.result));
    } catch (err) {
      // dispatch(getMarketingLegendsFailure(err.toString()));
    }
  }
);

export const fetchMarketingLegends = createAsyncThunk("marketingMaterialSearchTool",
  async (arg: any, { dispatch }) => {
    try {
      dispatch(getMarketingLegendsStart());
      const legendsResult = await getMarketingLegends(arg);
      const limitations = await getFormularySelectedLimitations(arg);
      const result = limitations.map((tier, index) => {
        const tierDefsReq = legendsResult.filter(tierA => tierA.formulary_criteria === tier.code_name);
        let tierDef: any;
        if (tierDefsReq.length) {
          tierDef = tierDefsReq[0];
        }
        if (tierDef) {
          tier.formulary_criteria = tierDef.formulary_criteria;
          tier.legend_id = tierDef.legend_id;
          tier.abbreviation = tierDef.abbreviation;
          tier.display_text = tierDef.display_text;
          tier.icon_id = tierDef.icon_id;
          tier.icon_url = tierDef.icon_url ? tierDef.icon_url : tier.icon_url;
          tier.special_character = tierDef.special_character ? tierDef.special_character : '';
          tier.supress_dms = tierDef.supress_dms;
          tier.supress_search_tool = tierDef.supress_search_tool;
        } else {
          tier.formulary_criteria = tier.code_name;
          tier.display_text = tier.code_name;
          tier.legend_id = 0;
          tier.abbreviation = '';
          tier.special_character = '';
          tier.supress_dms = false;
          tier.supress_search_tool = false;
        }
        return tier;
      });
      dispatch(getMarketingLegendsSuccess({ list: result, count: result.length }));
    } catch (err) {
      dispatch(getMarketingLegendsFailure(err.toString()));
    }
  }
);

export const fetchMarketingConfigurations = createAsyncThunk("marketingMaterialSearchTool",
  async (arg: any, { dispatch }) => {
    try {
      const configurations = await getMarketingConfigurations(arg);
      dispatch(getMarketingConfigurationsSuccess(configurations));
    } catch (err) {
      dispatch(getMarketingLegendsFailure(err.toString()));
    }
  }
);

export const onChangeLegendsConfiguration = (arg: any) => (dispatch) => {
  dispatch(updateMarketingLegendsState(arg));
};

export const submitMarketingLegends = createAsyncThunk("marketingMaterialSearchTool", async (arg: any, dispatch) => {
  try {
    const legendsResult = await updateMarketingLegends(arg);
  } catch (err) { }
});

export const onChangeMarketingConfigurations = (arg: any) => (dispatch) => {
  dispatch(updateMarketingConfigurationsState(arg));
};

export const submitMarketingConfigurations = createAsyncThunk("marketingMaterialSearchTool", async (arg: any, dispatch) => {
  try {
    const legendsResult = await updateMarketingConfigurations(arg);
  } catch (err) { }
});

export const onEditIcon = (arg: any) => (dispatch) => {
  dispatch(onEditIconDialog(arg));
};

export const setSelectedIconFromList = (arg: any) => (dispatch) => {
  dispatch(onSelectIcon(arg));
};

export const uploadMarketingIconFile = createAsyncThunk("marketingMaterialSearchTool", async (arg: any, { dispatch }) => {
  try {
    const result = await uploadMarketingIcon(arg);
    dispatch(onUploadICon(result.upload_files[0]));
  } catch (err) { }
});

export const submitMarketingIconToList = createAsyncThunk("marketingMaterialSearchTool", async (arg: any, { dispatch }) => {
  try {
    const result = await submitMarketingIcon(arg);
    dispatch(onSelectIcon({ icon_url: arg.icon_url, icon_id: result.icon_id }))
  } catch (err) { }
});