import React from "react";
import Chip from '@material-ui/core/Chip';
import "./FrxBasicList.scss";
import { Tooltip } from "antd";

interface Props {
  title: string;
  description?: string;
  date: string;
  isShowDescription: boolean;
  isShowChip?: boolean;
}

class BasicListItem extends React.Component<Props, any> {


  render() {
    const isDescr = this.props.isShowDescription;
    const { date, description } = this.props;
    return (
      <div className={(isDescr) ? "frx-basic-list-item-root" : "frx-basic-list-item-root columns2"}>
        <span className="column title" >
          {this.props.title}
        </span>
        {isDescr ?
          <span className="column long">
            {this.props.description}
          </span>
          : null
        }
        <span className="column right">
          {!this.props.isShowChip ? date : (
            <React.Fragment>
              <Chip className="chip"
                label={(
                  <svg
                    className="red-dot"
                    width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4" cy="4" r="4" fill="#E76262" />
                  </svg>
                )}
                variant="outlined" />
              <Tooltip
                className="tooltip"
                overlayClassName="frx-basic-list-item-root__tooltip"
                arrowPointAtCenter={true}
                placement="top"
                title={(
                  <div>
                    <p className="frx-basic-list-item-root__tooltip--info">Updated by:<span>George Smith</span></p>
                    <p className="frx-basic-list-item-root__tooltip--info">Term date:<span>{date}</span></p>
                    <p className="frx-basic-list-item-root__tooltip--info">Term note:<span>{description ? description : 'Member now has access to the internet'}</span></p>
                  </div>
                )}
              >
                <span className="column right chip-label">{date}</span>
              </Tooltip>
            </React.Fragment>
          )}
        </span>
      </div>
    );
  }
}



export default BasicListItem;