import React, {Component} from "react";

import "./Attribute.scss";

interface Props {
  name: any;
  children?: any;
}
interface State {}

class Attribute extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="Attribute" {...this.props}>
        {this.props.name}
        {this.props.children}
      </div>
    );
  }
}

export default Attribute;
