import React from "react";
import { Select } from "antd";

import FrxDialogPopup from "../../../../shared/FrxDialogPopup/FrxDialogPopup";
import FrxTree, { ConnectedColors, NodeIcon } from "../../../../shared/FrxTree";
import TreeList from "../../../../shared/FrxTree/components/TreeList";

import TagTooltip from "./components/TagTooltip";
import AccessManagementModal from "./components/AccessManagementModal";
import EnhancedOptionsSelection from './components/EnhancedOptionsSelection';

import "./styles.scss";

const { Option } = Select;
const marginLeft = 19;

const TAGS = [
  {
    id: 1,
    title: "Admin",
    administeredBy: "FutureRx@Futurerx.com",
    moduleProvidedBy: "FutureRx@Futurerx.com",
    participants: ["starcompany@star.com", "careservices@care.com"],
  },
  {
    id: 2,
    title: "Formulary",
    administeredBy: "FutureRx@Futurerx.com",
    moduleProvidedBy: "FutureRx@Futurerx.com",
    participants: ["starcompany@star.com", "careservices@care.com"],
  },
  {
    id: 3,
    title: "Benefits",
    administeredBy: "FutureRx@Futurerx.com",
    moduleProvidedBy: "FutureRx@Futurerx.com",
    participants: ["starcompany@star.com", "careservices@care.com"],
  },
  {
    id: 4,
    title: "PA",
    administeredBy: "FutureRx@Futurerx.com",
    moduleProvidedBy: "FutureRx@Futurerx.com",
    participants: ["starcompany@star.com", "careservices@care.com"],
  },
  {
    id: 5,
    title: "Claims",
    administeredBy: "FutureRx@Futurerx.com",
    moduleProvidedBy: "FutureRx@Futurerx.com",
    participants: ["starcompany@star.com", "careservices@care.com"],
  },
];

class FormularyAssignment extends React.Component<any, any> {
  state = {
    modalStatus: false,
    type: "",
    modalTitle: "",
  };

  handleOpenModal = () => {
    this.setState({
      modalStatus: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalStatus: false,
      type: "",
    });
  };

  renderNodeModals = (type) => {
    this.setState(
      {
        type,
        modalTitle:
          type === "1"
            ? "ADJUDICATION PACKAGE"
            : "HISTORICAL CLAIM PROCESSING WINDOW",
      },
      () => {
        this.handleOpenModal();
      }
    );
  };

  renderNodeModalsBody = () => {
    return <AccessManagementModal/>;
  };

  handleTooltipEditButtonClick = (id: any) => {
    const modalTitle = TAGS.find((t) => t.id === id)?.title;
    this.setState(
      {
        modalTitle,
      },
      () => {
        this.handleOpenModal();
      }
    );
  };

  renderNodeTags = (data: any = {}) => {
    const tags = TAGS.map((tag, key) => (
      <TagTooltip
        key={key}
        {...tag}
        onEditClick={(id) => this.handleTooltipEditButtonClick(id)}
      >
        <div key="tag" className="tree-node-tag">
          {tag.title}
        </div>
      </TagTooltip>
    ));

    return <div className="tree-node-tag-list">{tags}</div>;
  };

  render() {
    /**
     * {
     *  id: "string",
     *  key: "string",
     *  title: "string",
     *  styles: { color:"" },
     *  value: string | React Component,
     *
     * }
     */
    const data = [
      {
        id: "1",
        key: "1",
        title: "Future Rx",
        tags: this.renderNodeTags(),
        styles: { color: "#684999", marginLeft: "0" },
        value: "",
        children: [
          {
            id: "1.1",
            key: "1.1",
            title: "Health Net Community Solutions  |  HCN123",
            tags: this.renderNodeTags(),
            styles: { color: "#F65A1C", marginLeft: "0" },
            value: "",
            children: [
              {
                id: "1.1.1",
                key: "1.1.1",
                title: "HCN PPO  |  HNC3245943303A1",
                tags: this.renderNodeTags(),
                styles: { color: "#1FBBC4", marginLeft: "0" },
                value: "",
                children: [
                  {
                    id: "1.1.1.1",
                    key: "1.1.1.1",
                    title: "Choice Enhanced  |  76-41165CPDC",
                    tags: this.renderNodeTags(),
                    styles: { color: "#80C483", marginLeft: "0" },
                    value: "",
                    children: [
                      {
                        id: "1.1.1.1.1",
                        key: "1.1.1.1.1",
                        title: "Colorado  |  77701000A2654DC",
                        tags: this.renderNodeTags(),
                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: "",
                        children: [
                          {
                            id: "1.1.1.1.1.1",
                            key: "1.1.1.1.1.1",
                            title: "Choice Enhanced C1  |  11AB30001PPO2C1",
                            tags: this.renderNodeTags(),
                            styles: { color: "#F89090", marginLeft: "0" },
                            value: "",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "1.1.1.2",
                    key: "1.1.1.2",
                    title: "Choice Standard  |  76-411365CPHC",
                    tags: this.renderNodeTags(),
                    styles: { color: "#80C483", marginLeft: "0" },
                    value: "",
                    children: [
                      {
                        id: "1.1.1.2.1",
                        key: "1.1.1.2.1",
                        title: "Colorado  |  77701000A2654DC",
                        tags: this.renderNodeTags(),
                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: "",
                      },
                      {
                        id: "1.1.1.2.2",
                        key: "1.1.1.2.2",
                        title: "Colorado  |  77701000A2654DC",
                        tags: this.renderNodeTags(),
                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: "",
                        children: [
                          {
                            id: "1.1.1.2.2.1",
                            key: "1.1.1.2.2.1",
                            title:
                              "Choice Enanced Dakota County  |  11AB130003PPODC",
                            tags: this.renderNodeTags(),
                            styles: { color: "#F89090", marginLeft: "0" },
                            value: <EnhancedOptionsSelection/>,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "1.1.2",
                key: "1.1.2",
                title: "HCN EPO  |  HNC3245943303A1",
                tags: this.renderNodeTags(),
                styles: { color: "#1FBBC4", marginLeft: "0" },
                value: "",
                children: [
                  {
                    id: "1.1.2.1",
                    key: "1.1.2.1",
                    title: "Choice Standard  |  76-411365CPHC",
                    tags: this.renderNodeTags(),
                    styles: { color: "#80C483", marginLeft: "0" },
                    value: "",
                    children: [
                      {
                        id: "1.1.2.1.1",
                        key: "1.1.2.1.1",
                        title: "Florida  |  77701000A2654FL",
                        tags: this.renderNodeTags(),
                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: "",
                      },
                      {
                        id: "1.1.2.1.2",
                        key: "1.1.2.1.2",
                        title: "North Carolina  |  77701000A2654NC",
                        tags: this.renderNodeTags(),
                        styles: { color: "#F4AF64", marginLeft: "0" },
                        value: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    return (
      <div className="module-management-container formulary-tree-container">
        <div className="identificationTable">
          <TreeList />
        </div>
        <div className="formulary-tree">
          <FrxTree
            checkable={true}
            connectorColor={ConnectedColors.Grey}
            nodeIcon={NodeIcon.Expandable}
            data={data}
          />
          <FrxDialogPopup
            showCloseIcon={true}
            positiveActionText="Save"
            negativeActionText=""
            title=""
            handleClose={this.handleCloseModal}
            handleAction={() => console.log("no action")}
            open={this.state.modalStatus}
            showActions={true}
            className="modules-modal-container"
          >
            {this.renderNodeModalsBody()}
          </FrxDialogPopup>
        </div>
      </div>
    );
  }
}


export default FormularyAssignment;
