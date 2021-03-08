import React from "react";
import BasicListItem from "./FrxBasicListItem";

import "./FrxBasicList.scss";

interface Props {
  rows: Array<{
    title: string;
    description?: string;
    date: string;
    isShowChip?: boolean;
  }>;
  isShowDescription?: boolean;
  queryString?: string;
  isShowChip?: boolean;
}

interface State {
  filteredRows: Array<{
    title: string;
    description?: string;
    date: string;
    isShowChip?: boolean;
  }>;
}

class FrxBasicList extends React.Component<Props, State> {
  queryString: string | undefined = "";

  state: State = {
    filteredRows: []
  };

  // filter by query string
  filterByQueryString = () => {
    if (this.props.queryString === undefined || this.props.queryString === "") {
      this.queryString = this.props.queryString;
      this.setState({ filteredRows: this.props.rows });
    } else {
      // filter the rows by query string and set state
      this.queryString = this.props.queryString;
      let filterRows = this.props.rows.filter(item => {
        return (
          item &&
          item.description &&
          (item.description
            .toLowerCase()
            .includes(this.queryString!.toLowerCase()) ||
            item.title.toLowerCase().includes(this.queryString!.toLowerCase()))
        );
      });
      this.setState({ filteredRows: filterRows });
    }
  };

  componentDidMount() {
    this.filterByQueryString();
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.isRowsSame(prevProps.rows, this.props.rows) &&
      this.queryString === this.props.queryString
    ) {
      console.log("FrxBasicList :: componentDidUpdate : props are same");
      return;
    }
    this.filterByQueryString();
  }

  isRowsSame = (
    oldRows: Array<{
      title: string;
      description?: string;
      date: string;
      isShowChip?: boolean;
    }>,
    newRows: Array<{
      title: string;
      description?: string;
      date: string;
      isShowChip?: boolean;
    }>
  ) => {
    if (oldRows === undefined && newRows === undefined) {
      return true;
    }
    if (oldRows === undefined || newRows === undefined) {
      return false;
    }
    if (oldRows.length !== newRows.length) {
      return false;
    }
    for (let i = 0; i < oldRows.length; i++) {
      if (
        oldRows[i].title !== newRows[i].title ||
        oldRows[i].date !== newRows[i].date ||
        oldRows[i].description !== newRows[i].description
      ) {
        return false;
      }
    }
    return true;
  };

  render() {
    return (
      <div className="frx-basic-list-root scroll-bar">
        {this.state.filteredRows.map((row, i) => {
          return (
            <BasicListItem
              key={i + ""}
              title={row.title}
              description={row.description}
              date={row.date}
              isShowDescription={this.props.isShowDescription ? true : false}
              isShowChip={row.isShowChip ? true : false}
            />
          );
        })}
      </div>
    );
  }
}

export default FrxBasicList;
