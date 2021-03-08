import React from "react";
// import Header from "components/Header";
import Tree from "./Tree";
// import ExternalInfo from "components/ExternalInfo";

const treeData: any = [
  {
    key: "0",
    label: "Category 1",
    icon: "fa fa-folder",
    title: "Category 1",
    children: [
      {
        key: "0-0",
        label: "Class A",
        icon: "fa fa-folder",
        title: "Class A",
        children: [
          {
            key: "0-1-1",
            label: "Drug A",
            icon: "fa fa-file",
            title: "Drug A",
          },
          {
            key: "0-1-2",
            label: "Drug B",
            icon: "fa fa-file",
            title: "Drug",
          },
        ],
      },
      {
        key: "0-1",
        label: "Class B",
        icon: "fa fa-folder",
        title: "Class B",
        children: [
          {
            key: "0-1-1",
            label: "Drug A",
            icon: "fa fa-file",
            title: "Drug A",
          },
          {
            key: "0-1-2",
            label: "Drug B",
            icon: "fa fa-file",
            title: "Drug",
          },
        ],
      },
    ],
  },
  {
    key: "1",
    label: "Category 2",
    icon: "fa fa-desktop",
    title: "Desktop Folder",
    children: [],
  },
];

const TreeList = () => {
  return (
    <>
      {/* <Header title="Tree Data Visualization" />
      <ExternalInfo page="treeList" /> */}

      <div className="row">
        <div className="col text-center">
          <h2>Tree Visualization component</h2>
          <p className="mt-3">
            <div className="row mt-3 d-flex justify-content-center">
              <div className="col-lg-8 text-left text-dark">
                <Tree data={treeData} />
              </div>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default TreeList;
