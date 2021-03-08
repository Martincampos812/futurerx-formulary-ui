import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Theme, withStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import {Tooltip} from "antd";
import React from "react";
import './FrxInfoCard.scss'

interface InfoCardItemProps {
  column1: string;
  column2: string;
  column2Tooltip?: any;
  column2Link?: boolean;
}

class FrxInfoCardListItem extends React.Component<InfoCardItemProps> {
  render() {
    return (
        <Grid className="frx-info-card-list-item-root"
          container
          direction="row"
          justify="space-between"
          alignItems="stretch">
            <span className="frx-info-card-list-item-root__column">{this.props.column1}</span>
            {
              this.props.column2Tooltip ? (
                <Tooltip 
                  placement="bottom"
                  arrowPointAtCenter={true}
                  overlayClassName="frx-info-card-list-item-root__tooltip-list"
                  title={
                    (
                      <TootlTipComponent
                        tooltipContent={this.props.column2Tooltip}
                      />)
                    } >

                    <span className="frx-info-card-list-item-root__column frx-info-card-list-item-root__column2 frx-info-card-list-item-root__column--hyperlink">{this.props.column2}</span>

                  </Tooltip>
                ) 
                : (
                  <span className={`frx-info-card-list-item-root__column frx-info-card-list-item-root__column2 ${this.props.column2Link ? "frx-info-card-list-item-root__column--hyperlink" : ""}`}>{this.props.column2}</span>
                )
            }
        </Grid>
    );
  }
}


const TootlTipComponent = (props: any) => {
  return (
    <ListItem className="frx-info-card-list-item-root__tooltip-list--block">
      <div>
        {props.tooltipContent.map((item: any) => {
          return (
            <div className="frx-info-card-list-item-root__tooltip-list--block__innercontent">
              <h4 className="frx-info-card-list-item-root__tooltip-list--block__innercontent__header">{item.title}</h4>
              {item.list.map((e: any) => {
                return (
                  <ListItem>
                    <ListItemText>
                      <div className="frx-info-card-list-item-root__tooltip-block">
                        <span className="frx-info-card-list-item-root__tooltip-list--block__innercontent__label">{e.field}</span>
                        <span
                        className={e.field === "NPI" || e.field === "NCPDP#" ? "hyperlink-text" : "frx-info-card-list-item-root__tooltip-list--block__innercontent__labelvalue"}
                        //  className="frx-info-card-list-item-root__tooltip-list--block__innercontent__labelvalue"
                        >{e.value}</span>
                      </div>
                    </ListItemText>
                  </ListItem>
                )
              })}
            </div>
          )
        })}
      </div>
    </ListItem>
  )
}

export default FrxInfoCardListItem;