import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Container } from "@material-ui/core";

import CardListItem from "./FrxInfoCardListItem";

import "./FrxInfoCard.scss";

interface InfoCardProps {
  heading: string;
  onHeadingClick?: () => void;
  itemList: Array<{
    column1: string;
    column2: string;
    column2Tooltip?: string;
    column2Link?: boolean;
  }>;
}

class FrxInfoCard extends React.Component<InfoCardProps> {
  onHeadingClick = () => {
    console.log("invoked onHeadingClick");
    if (this.props.onHeadingClick) {
      this.props.onHeadingClick();
    }
  };

  render() {
    return (
      <Card variant="outlined" className="frx-info-card-root">
        <CardContent>
          {this.props.onHeadingClick ? (
            <span
              className="frx-info-card-root__heading frx-info-card-root__heading--clickable"
              onClick={() => this.onHeadingClick()}
            >
              {this.props.heading}
            </span>
          ) : (
            <span className="frx-info-card-root__heading">
              {this.props.heading}
            </span>
          )}
          <Container className="frx-info-card-root__content-list">
            {this.props.itemList.map((e: any) => {
              return (
                <CardListItem
                  column1={e.column1}
                  column2={e.column2}
                  column2Tooltip={e.column2Tooltip ? e.column2Tooltip : null}
                  column2Link={e.column2Link ? e.column2Link : null}
                />
              );
            })}
          </Container>
        </CardContent>
      </Card>
    );
  }
}

export default FrxInfoCard;
