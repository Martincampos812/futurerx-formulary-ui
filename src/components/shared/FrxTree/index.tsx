import React, { Component } from "react";
import TreeNode from "./components/TreeNode";
import TreeNodeLink from "./components/TreeNodeLink";
import TreeNodesList from "./components/TreeNodesList";

import "./styles.scss";

interface FrxTreeNode {
  id: number | string;
  key: number | string;
  title: string;
  styles: FrxTreeNodeStyles;
  value: string | React.ReactNode;
  children?: FrxTreeNode[] | undefined;
}

interface FrxTreeNodeStyles {
  color: "string";
  marginLeft: "string";
}

export enum ConnectedColors {
  Default,
  Grey,
}

export enum NodeIcon {
  Default,
  Expandable,
}

export interface FrxTreeProps {
  data: any[];
  checkable?: boolean;
  connectorColor?: ConnectedColors;
  nodeIcon?: NodeIcon;
}

export interface FrxTreeState {}

class FrxTree extends Component<FrxTreeProps, FrxTreeState> {
  render() {
    const {
      data,
      checkable = false,
      connectorColor = ConnectedColors.Default,
      nodeIcon = ConnectedColors.Default,
    } = this.props;

    return (
      <div>
        <TreeNodesList 
          checkable={checkable}
          data={data}
          connectedLinesColor={connectorColor} 
          nodeIcon={nodeIcon} 
        />
      </div>
    );
  }
}

export default FrxTree;
