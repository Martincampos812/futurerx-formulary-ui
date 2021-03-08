import { TabInfo } from "../../../../../models/tab.model";

export const onClickTab = (stateTabs: any[], selectedTabIndex: number) => {
  let activeTabIndex = 0;

  const tabs = stateTabs.map((tab: TabInfo, index: number) => {
    if (index === selectedTabIndex) {
      activeTabIndex = index;
    }
    return tab;
  });

  return { tabs, activeTabIndex };
};

export const checkIfTABApplicableByCode = (drug: any, codeValue: string) => {
  let breadCrumbInfo: any[] = drug?.bread_crumb_info;
  let ddObj = breadCrumbInfo.find((e) => e.code_value === "DRGDT")?.children;
  let ddObjOther;
  if (ddObj) {
    ddObjOther = ddObj.find((e) => e.code_value === codeValue);
  }

  return ddObj && ddObjOther;
};