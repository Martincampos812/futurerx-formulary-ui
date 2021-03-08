import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLanguageDescriptorList, createLanguageDescriptorList,getLanguageDescriptorTable, getLanguageDescriptorTableValues, saveLanguageDescriptorTable } from "./plainLanguageDescriptorService";


 
export interface plainLanguageDescriptorDropDownListResult {
  list: any[];
  active: any;
}
export interface createPlainLanguageDescriptorDropDownListResult {
  code: any;
  message: string;
}
export interface PlainLanguageDescriptorTableValuesResult {
  classes: any[];
  categories: any[];
  lang_descriptor_id: any
}
export interface PlainLanguageDescriptorTableLayoutResult {
  table:any[]
}

export interface PlainLanguageDescriptorTableLayout {
  class:{label:any, description:any},
  category:{label:any, description:any},
}

interface PlainLanguageDescriptorState {
  dropdown_list: any[];
  active_lang_descriptor:any;
  table:PlainLanguageDescriptorTableValuesResult;    
  isLoading: boolean;
  create_list_name_value: string;
  error: string | null;
}

const plainLanguageDescriptorInitialState: PlainLanguageDescriptorState = {
  dropdown_list: [],
  table: {categories:[],classes:[],lang_descriptor_id:""},
  isLoading: true,
  error: null,
  create_list_name_value:"",
  active_lang_descriptor:""
};


function startLoading(state: PlainLanguageDescriptorState) {
  state.isLoading = true;
}

function loadingFailed(state: PlainLanguageDescriptorState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const table = createSlice({
  name: "plain_language_descriptor",
  initialState: plainLanguageDescriptorInitialState,
  reducers: {
    getPlainLanguageDescriptorDropDownListStart: startLoading,
    getPlainLanguageDescriptorDropDownListSuccess(state, { payload }: PayloadAction< plainLanguageDescriptorDropDownListResult >) {
      const { list,active } = payload;
      state.dropdown_list = list;
      state.active_lang_descriptor = active;
      state.isLoading = false;
      state.error = null;
    },
    getPlainLanguageDescriptorTableSuccess(state, { payload }: PayloadAction< PlainLanguageDescriptorTableLayoutResult >) {
      const { table } = payload;
      let categories = table.map(x=>({lang_descriptor_category_id: 0,classes:x.classes, category_name: x.category_name, description: ""}))
      let classes = table.map(x=>({lang_descriptor_class_id: 0, class_name: (x.classes[0]||{}).class_name, description: ""}))
      state.table = {categories,classes, lang_descriptor_id:""}
      state.isLoading = false;
      state.error = null;
    },
    getPlainLanguageDescriptorDropDownListFailure: loadingFailed,
    addPlainLanguageDescriptorDropDownList(state, {payload}:PayloadAction< createPlainLanguageDescriptorDropDownListResult >){
      state.dropdown_list.push(payload);
      state.create_list_name_value = ""
      state.isLoading = false;
      state.error = null;
    },
    setPlainLanguageDescriptorDropDownListValue(state, {payload}:PayloadAction< string >){
      state.create_list_name_value = payload;
      state.isLoading = false;
      state.error = null;
    },
    changeCategoryDescription(state, {payload}:PayloadAction< any >){
      state.table.categories[payload.index].description = payload.value
      state.table.categories[payload.index].is_updated = true
      state.table.categories[payload.index].lang_descriptor_category_id = state.table.categories[payload.index].lang_descriptor_category_id !=0? state.table.categories[payload.index].lang_descriptor_category_id : 0
    },
    changeClassDescription(state, {payload}:PayloadAction< any >){
      state.table.classes[payload.index].description = payload.value
      state.table.classes[payload.index].is_updated = true
      state.table.classes[payload.index].lang_descriptor_class_id = state.table.classes[payload.index].lang_descriptor_class_id !=0? state.table.classes[payload.index].lang_descriptor_class_id : 0
    },
    clearPlainLanguageDescriptorTableValues(state){
      state.table.categories.map(x=>x.description = "")
      state.table.classes.map(x=>x.description = "")
    },
    setActiveLangDescriptor(state,{payload}:PayloadAction< Number >){
      state.active_lang_descriptor = payload
    },
    setPlainLanguageDescriptorTableValues(state, {payload}:PayloadAction< PlainLanguageDescriptorTableValuesResult >){
      const {categories, classes, lang_descriptor_id } = payload
      state.table.lang_descriptor_id = lang_descriptor_id
      categories.forEach(c=>{
        var obj = state.table.categories.find(x=>x.category_name==c.category_name)
        if(obj){
          obj.description = c.description
          obj.lang_descriptor_category_id = c.lang_descriptor_category_id
        }
      })
      classes.forEach(c=>{
        var obj = state.table.classes.find(x=>x.class_name==c.class_name)
        if(obj){
          obj.description = c.description
          obj.lang_descriptor_class_id = c.lang_descriptor_class_id
        }
      })
      // categories.map(c=>{
      //   var obj = state.table.find(x=>x.category.label == c.category_name)
      //   if(obj){
      //     obj.description = c.description
      //   }
      // })
      // state.table.categories[payload.index].description = payload.value
    }
  },
});

export const {
  getPlainLanguageDescriptorDropDownListStart,
  getPlainLanguageDescriptorDropDownListSuccess,
  getPlainLanguageDescriptorDropDownListFailure,
  setPlainLanguageDescriptorDropDownListValue,
  getPlainLanguageDescriptorTableSuccess,
  setPlainLanguageDescriptorTableValues,
  clearPlainLanguageDescriptorTableValues,
  changeCategoryDescription,
  addPlainLanguageDescriptorDropDownList,
  changeClassDescription,
  setActiveLangDescriptor
} = table.actions;

export default table.reducer;

export const fetchPlainLanguageDescriptorDropDownList = createAsyncThunk(
  "plain_language_descriptor_dropdown_list",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    try {
      dispatch(getPlainLanguageDescriptorDropDownListStart());
      const legends = await getLanguageDescriptorList(arg);
      dispatch(getPlainLanguageDescriptorDropDownListSuccess(legends));
      const arr = await getLanguageDescriptorTable(arg);
      dispatch(getPlainLanguageDescriptorTableSuccess(arr));
      const obj = await getLanguageDescriptorTableValues(legends.active);
      dispatch(setPlainLanguageDescriptorTableValues(obj));
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      dispatch(getPlainLanguageDescriptorDropDownListFailure(err.toString()));
    }
  }
);

export const createPlainLanguageDescriptorDropDownList = createAsyncThunk(
  "create_plain_language_descriptor_dropdown_list",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    try {
      dispatch(getPlainLanguageDescriptorDropDownListStart());
      const legends = await createLanguageDescriptorList(arg);
      dispatch(addPlainLanguageDescriptorDropDownList(arg));

    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      dispatch(getPlainLanguageDescriptorDropDownListFailure(err.toString()));
    }
  }
);
export const setTableValues = createAsyncThunk(
  "create_plain_language_descriptor_dropdown_list",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    try {
      dispatch(getPlainLanguageDescriptorDropDownListStart());
      dispatch(setActiveLangDescriptor(arg));
      const legends = await getLanguageDescriptorTableValues(arg);
      dispatch(clearPlainLanguageDescriptorTableValues());
      dispatch(setPlainLanguageDescriptorTableValues(legends));
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      dispatch(getPlainLanguageDescriptorDropDownListFailure(err.toString()));
    }
  }
);

export const setPlainLanguageDescriptorListName = createAsyncThunk(
  "set_plain_language_descriptor_dropdown_list_name",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    try {
      dispatch(setPlainLanguageDescriptorDropDownListValue(arg));
     
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      dispatch(getPlainLanguageDescriptorDropDownListFailure(err.toString()));
    }
  }
);

export const getPlainLanguageDescriptorTable = createAsyncThunk(
  "get_plain_language_descriptor_dropdown_table",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    try {
      dispatch(getPlainLanguageDescriptorDropDownListStart());
      const arr = await getLanguageDescriptorTable(arg);
      dispatch(getPlainLanguageDescriptorTableSuccess(arr));

     
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      dispatch(getPlainLanguageDescriptorDropDownListFailure(err.toString()));
    }
  }
);

export const saveTable = createAsyncThunk(
  "get_plain_language_descriptor_dropdown_table",
  async (arg: any, { dispatch }) => {
    // console.log("***** fetchFormularies ");
    try {
      dispatch(getPlainLanguageDescriptorDropDownListStart());
      const arr = await saveLanguageDescriptorTable(arg);
      dispatch(setTableValues(arg.lang_descriptor_id))

     
    } catch (err) {
      // console.log("***** fetchFormularies - ERROR ");
      dispatch(getPlainLanguageDescriptorDropDownListFailure(err.toString()));
    }
  }
);
