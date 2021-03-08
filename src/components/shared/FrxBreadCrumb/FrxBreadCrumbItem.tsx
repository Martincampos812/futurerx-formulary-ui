import * as React from "react";
import { Component } from "react";
const FrxBreadcrumbItem = ({ children, ...props }) => (
  <span className="frx-breadcrumb-item breadcrumb-item" {...props}>
    {children}
  </span>
);

export default FrxBreadcrumbItem;
