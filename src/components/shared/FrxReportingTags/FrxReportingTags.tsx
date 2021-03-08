import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Select } from "antd";
import FrxMiniTagContainer from "./FrxMiniTagContainer";
import * as _ from "lodash";

interface TagModule {
  id: number;
  name: string;
  description: string;
  categories: any[];
}
interface FrxReportingTagsProps {
  availableTags: TagModule[];
  displayedTags: TagModule[];

  removeTag: (tag) => void;
  addTag: (tag) => void;
}

interface FrxReportingTagsState {
  value: string | undefined;
}
class FrxReportingTags extends Component<
  FrxReportingTagsProps,
  FrxReportingTagsState
> {
  state = {
    value: undefined,
  };

  handleChange = (value) => {
    const tagModule: TagModule = JSON.parse(value);

    this.props.addTag(tagModule);
    this.setState({
      value: tagModule.name,
    });
  };

  getFilteredAvailableTags = () => {
    let filteredAvailableTags: TagModule[] = [];
    if (this.props.displayedTags.length !== 0) {
      this.props.availableTags.map((aTag) => {
        const filteredDTag = this.props.displayedTags.find(
          (dTag) => dTag.id === aTag.id
        );
        if (!filteredDTag) {
          filteredAvailableTags.push(aTag);
        }
      });
    } else {
      filteredAvailableTags = this.props.availableTags;
    }
    return filteredAvailableTags;
  };

  getAvailableTags = () => {
    const availableTags = this.getFilteredAvailableTags();

    return availableTags.map((tag: TagModule) => {
      return (
        <FrxMiniTagContainer
          addIcon={true}
          tag={tag}
          onClickAdd={this.props.addTag}
          onClickRemove={this.props.removeTag}
        />
      );
    });
  };
  getDisplayedTags = () => {
    const displayedTags = this.props.displayedTags;
    return displayedTags.map((tag) => {
      return (
        <FrxMiniTagContainer
          addIcon={false}
          tag={tag}
          onClickAdd={this.props.addTag}
          onClickRemove={this.props.removeTag}
        />
      );
    });
  };

  render() {
    const { Option } = Select;
    // const { availableTags } = this.props;
    return (
      <Grid container spacing={2} className="__root-frx-reporting-tags">
        <Grid item xs={6}>
          <p className="header-font m-b-10">AVAILABLE TAGS</p>
          <p className="header-text">
            Select columns to display on the grid. Tap apply when finished.
          </p>
          <div className="bordered">
            <Select
              showSearch
              value={this.state.value}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={true}
              // onSearch={this.handleSearch}
              onChange={this.handleChange}
              notFoundContent={"Tag Not Found"}
              style={{ width: "100%" }}
              placeholder="Select..."
            >
              {this.getFilteredAvailableTags().map((tag) => (
                <Option key={tag.id} value={JSON.stringify(tag)}>
                  {`${tag.name} - ${tag.categories.map((cat) => ` ${cat}`)}`}
                </Option>
              ))}
            </Select>
            <div className="max-height-mini">{this.getAvailableTags()}</div>
          </div>
        </Grid>

        <Grid item xs={6}>
          <p className="header-font">DISPLAYED TAGS</p>
          <br />
          <div className="bordered max-height">{this.getDisplayedTags()}</div>
        </Grid>
      </Grid>
    );
  }
}

export default FrxReportingTags;
