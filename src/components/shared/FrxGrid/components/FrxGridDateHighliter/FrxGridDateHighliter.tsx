/**
 * Component to render each cell in grid except settings column
 * @author Deepak_T
 * @version 1.0.0
 */

import { Tooltip } from "@material-ui/core";
import * as React from "react";
// import ToolTip from '../../../Frx-components/tooltips/ToolTip';

import "./FrxGridDateHighliter.scss";

export interface FrxGridDateHighliterProps {
  data: any;
}

class FrxGridDateHighliter extends React.Component<FrxGridDateHighliterProps> {
  render() {
    const {
      data,
    } = this.props;
    console.log(data);
    
    return (
      <Tooltip
        arrow={true}
        placement="bottom"
        classes={{ tooltip: 'FrxGridDateHighliter-tooltip', arrow: 'FrxGridDateHighliter-arrow' }}
        title={<div className="FrxGridDateHighliter-root">
          <div className="tooltip-data">
            <div>Updated by:</div>
            <div>George smith</div>
          </div>
          <div className="tooltip-data">
            <div>Term date:</div>
            <div>{data.text}</div>
          </div>
          <div className="tooltip-data">
            <div>Term note:</div>
            <div>{data.showText}</div>
          </div>
        </div>}>

        {data.showText && data.showText !== '' ?
          data.hideHighlight ? <span>{data.text}</span> : <div className="FrxGridDateHighliter-root">
            <div className="data">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" fill="#E76262" />
              </svg>
              {data.text}
            </div>
          </div> : <span></span>
        }

      </Tooltip>
    );
  }
}

export default FrxGridDateHighliter;
