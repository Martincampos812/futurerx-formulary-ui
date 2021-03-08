import React from "react";

// import styles
import "./styles.scss";

const defaultData = [
  {
    id: "1",
    color: "#684999",
    title: "Future Rx",
  },
  {
    id: "2",
    color: "#F65A1C",
    title: "Customer",
  },
  {
    id: "3",
    color: "#1FBBC4",
    title: "Client",
  },
  {
    id: "4",
    color: "#80C483",
    title: "Carrier",
  },
  {
    id: "5",
    color: "#F4AF64",
    title: "Account",
  },
  {
    id: "6",
    color: "#F89090",
    title: "Group",
  },
];

const expectationLevelData = [
  {
    id: "1",
    color: "#2055B5",
    title: "Default",
  },
  {
    id: "2",
    color: "#92B2EB",
    title: "Linked to Default",
  },
  {
    id: "3",
    color: "#E76262",
    title: "Custom",
  },
  {
    id: "4",
    color: "#F89090",
    title: "Linked to Custom ",
  },
  {
    id: "5",
    color: "#707683",
    title: "Not Used",
  },
];


export default class TreeList extends React.Component<any, any> {
  render() {
    const { type = "default" } = this.props;
    const data = type === "default" ? defaultData : expectationLevelData;
    
    return (
      <div className="tree-list-container">
        <ul>
          {data.map((dataTree: any, key: any) => {
            return (
              <li key={key}>
                <div
                  className="tree-list-circle"
                  style={{ backgroundColor: dataTree.color }}
                ></div>
                {dataTree.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
