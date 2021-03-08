// React imports
import React, { Fragment } from "react";
import "./FrxImageCell.scss";
import tierWarning from '../../../../../assets/icons/tierWarning.svg';
import tierSuccess from '../../../../../assets/icons/tierSuccess.svg';
interface FrxImageCellProps {
  data?: any;
  title?: any;
  img?: any;
}

interface FrxImageCellState {}

class FrxImageCell extends React.Component<
  FrxImageCellProps,
  FrxImageCellState
> {
  render() {
    return (
      <Fragment>
        <img
          src={this.props.img === 'tierWarning' ? tierWarning : tierSuccess}
          alt={"image"}
        />
      </Fragment>
    );
  }
}

export default FrxImageCell;
