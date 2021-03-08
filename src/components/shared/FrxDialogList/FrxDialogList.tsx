import List from "@material-ui/core/List";
import { Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import DialogListItem from "./FrxDialogListItem";
import { DialogListItemModel } from "../../../models/dialog-list-item.model";
import ListSubheader from "@material-ui/core/ListSubheader";
import { DialogClassKey } from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { TabModel } from "../../../models/tab.model";
import Searchform from "../FrxSearchForm/FrxSearchForm";
import { FormModel } from "../../../models/form-model";
import Grid from "@material-ui/core/Grid";
import FrxMiniTabs from '../FrxMiniTabs/FrxMiniTabs';
import './FrxDialogList.scss'

const styles = (theme: Theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

interface DialogListProps {
  classes: Partial<Record<DialogClassKey, string>>;
  items: DialogListItemModel[];
  title: string;
  selectedTab: number;
  showTabs: boolean;
  tabs: TabModel[];
  type: string;
  formList: FormModel[];
  onChangeTab: (tab: TabModel) => void;

  miniTabs: any;
  activeMiniTabIndex: number;
  onClickMiniTab: (selectedTabIndex: number) => void;

}

class DialogList extends React.Component<DialogListProps> {
  renderListItems = () => {
    const { items } = this.props;
    return items.map((item: DialogListItemModel, index: number) => {
      return (
        <DialogListItem
          type="member notification"
          showActions
          key={item.id}
          {...item}
          showDivider={index < items.length - 1}
        />
      );
    });
  };

  /**
   * @function handleToggleTab
   * to switch views
   * @param tab the selected tab
   * @author Deepak_T
   */
  handleToggleTab = (tab: TabModel) => {
    this.props.onChangeTab(tab);
  };

  /**
   * @function renderTabs
   * to render the tabs required for the view
   * @author Deepak_T
   */
  renderTabs = () => {
    const { tabs } = this.props;
    return tabs.map((tab: TabModel) => {
      return (
       // <FrxMiniTabs tabList={this.props.miniTabs} activeTabIndex={this.props.activeMiniTabIndex} onClickTab={this.props.onClickMiniTab} />

        <Button
          key={tab.id}
          onClick={() => this.handleToggleTab(tab)}
          color={tab.isSelected ? "primary" : "secondary"}
        >
          {tab.text}
        </Button>
      );
    });
  };

  render() {
    const { classes, title, showTabs, selectedTab, type } = this.props;
    console.log("this.props dia", this.props);
    return (
      <>
        {showTabs ? (
          <div className="action">
          <div className="action-bar">{this.renderTabs()}</div>
          </div>
          // <Grid item xs={6}>
          // <div className="action-bar">
          //               </div>
        ) : null}
        {/* <FrxMiniTabs tabList={this.props.miniTabs} activeTabIndex={this.props.activeMiniTabIndex} onClickTab={this.props.onClickMiniTab} /> */}
        {selectedTab === 0 && type === "member notifications" ? (
          <List
            subheader={<ListSubheader>{title}</ListSubheader>}
            className={classes.root}
          >
            {this.renderListItems()}
          </List>
        ) : null}
        {selectedTab === 1 && type === "member notifications" ? (
					<Searchform 
					searchPlaceholderText={'Search Member Notifications'} formList={this.props.formList} />
        ) : null}
        {selectedTab === 0 && type === "barriers" ? (
          <List
            subheader={<ListSubheader>{title}</ListSubheader>}
            className={classes.root}
          >
            {this.renderListItems()}
          </List>
        ) : null}
        {selectedTab === 1 && type === "barriers" ? (
					<Searchform 
					searchPlaceholderText={'Search Barrier Description'}
					formList={this.props.formList} />
        ) : null}
        {selectedTab === 0 && type === "clinical history" ? (
          <List
            subheader={<ListSubheader>{title}</ListSubheader>}
            className={classes.root}
          >
            {this.renderListItems()}
          </List>
        ) : null}
        {selectedTab === 1 && type === "clinical history" ? (
					<Searchform
					searchPlaceholderText={'Search Diagnosis Code'}
					 formList={this.props.formList} />
        ) : null}
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DialogList);
