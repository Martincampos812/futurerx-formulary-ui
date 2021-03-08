import * as React from "react";
import FrxBreadcrumbItem from "./FrxBreadCrumbItem";

const FrxBreadCrumb = props => {
  let children: any = React.Children.toArray(props.children);

  children = children.map((child, index) => (
    <FrxBreadcrumbItem key={`breadcrumb_item${index}`}>
      {child}
    </FrxBreadcrumbItem>
  ));

  const lastIndex = children.length - 1;

  children = children.reduce((acc, child, index) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(child, "");
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return <div className="frx-breadcrumb">{children}</div>;
};

export default FrxBreadCrumb;
