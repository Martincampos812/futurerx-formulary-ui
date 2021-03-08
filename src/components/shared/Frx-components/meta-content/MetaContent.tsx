import React, { Component } from "react";
import './MetaContent.scss';

export interface MetaContentProps {
  label: string;
  value?: string;
}

export interface MetaContentState {}

class MetaContent extends Component<MetaContentProps, MetaContentState> {
  render() {
    const { label, value } = this.props; 
    
    return (
      <div className="meta-content">
        <span className="meta-content__key">{label} :</span>
        <span className="meta-content__value">{value || ""}</span>
      </div>
    );
  }
}

export default MetaContent;
