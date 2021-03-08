import React, { useState, useEffect, useRef } from "react";
import Chevron from "./Chevron";
import { Checkbox } from "antd";
import "./PureAccordion.scss";

interface HeaderType {
  baseFormulary: number | null;
  referenceFormulary: number | null;
  baseOnly: number | null;
  referenceOnly: number | null;
  nonMatch: number | null;
}
interface PureAccordionProps {
  tableType: "COMPARE" | "VIEW";
  title: string;
  titleBG: string;
  content: () => JSX.Element;
  headerData: HeaderType;
  showCheckbox: boolean;
  toggleAllAccordion: boolean;
}

function PureAccordion(props: PureAccordionProps) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const elementContent = useRef<HTMLDivElement>(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    if (null !== elementContent.current) {
      setHeightState(
        setActive === "active"
          ? "0px"
          : `${elementContent.current.scrollHeight}px`
      );
    }
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  function toggleAccordionAll() {
    if (props.toggleAllAccordion) {
      setActiveState("active");
      if (null !== elementContent.current) {
        setHeightState(`${elementContent.current.scrollHeight}px`);
      }
      setRotateState("accordion__icon rotate");
    } else {
      setActiveState("");
      if (null !== elementContent.current) {
        setHeightState("0px");
      }
      setRotateState("accordion__icon");
    }
  }

  useEffect(() => {
    toggleAccordion(); // mount
    return () => {};
  }, []);

  useEffect(() => {
    toggleAccordionAll(); // update
    return () => {};
  }, [props.toggleAllAccordion]);

  switch (props.tableType) {
    case "COMPARE":
      return (
        <div className="accordion__section">
          <div className={`accordion ${setActive}`}>
            <div
              style={{
                backgroundColor: props.titleBG,
              }}
              className="title__header_container"
              onClick={toggleAccordion}
            >
              {props.showCheckbox ? (
                <Checkbox
                  onChange={() => console.log(props.title)}
                  disabled={false}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              ) : null}
              <p className="accordion__title">{props.title}</p>
              <Chevron
                className={`${setRotate}`}
                width={10}
                height={10}
                fill={"#323C47"}
                toggleAccordion={toggleAccordion}
              />
            </div>
            <div
              className={
                props.headerData.baseFormulary === null
                  ? "cell-font-style"
                  : "bg-white cell-font-style"
              }
            >
              <span>{props.headerData.baseFormulary}</span>
            </div>
            <div
              className={
                props.headerData.referenceFormulary === null
                  ? "cell-font-style"
                  : "bg-white cell-font-style"
              }
            >
              <span>{props.headerData.referenceFormulary}</span>
            </div>
            <div
              className={
                props.headerData.baseOnly === null
                  ? "cell-font-style"
                  : "bg-white cell-font-style"
              }
            >
              <span>{props.headerData.baseOnly}</span>
            </div>
            <div
              className={
                props.headerData.referenceOnly === null
                  ? "cell-font-style"
                  : "bg-white cell-font-style"
              }
            >
              <span>{props.headerData.referenceOnly}</span>
            </div>
            <div
              className={
                props.headerData.nonMatch === null
                  ? "cell-font-style no-border"
                  : "bg-white cell-font-style no-border"
              }
            >
              <span>{props.headerData.nonMatch}</span>
            </div>
          </div>
          <div
            ref={elementContent}
            style={{ maxHeight: `${setHeight}` }}
            className="accordion__content"
          >
            <div className="accordion__text">{props.content()}</div>
          </div>
        </div>
      );
    case "VIEW":
      return (
        <div className="accordion__section-view">
          <div className={`accordion ${setActive}`}>
            <div
              style={{
                backgroundColor: props.titleBG,
              }}
              className="title__header_container"
              onClick={toggleAccordion}
            >
              {props.showCheckbox ? (
                <Checkbox
                  onChange={() => console.log(props.title)}
                  disabled={false}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              ) : null}
              <p className="accordion__title">{props.title}</p>
              <Chevron
                className={`${setRotate}`}
                width={10}
                height={10}
                fill={"#323C47"}
                toggleAccordion={toggleAccordion}
              />
            </div>
            <div
              className={
                props.headerData.baseFormulary === null
                  ? "cell-font-style"
                  : "bg-white cell-font-style"
              }
            >
              <span>{props.headerData.baseFormulary}</span>
            </div>
          </div>
          <div
            ref={elementContent}
            style={{ maxHeight: `${setHeight}` }}
            className="accordion__content"
          >
            <div className="accordion__text">{props.content()}</div>
          </div>
        </div>
      );
    default:
      return <h1>NOT MATCHED</h1>;
  }
}

export default PureAccordion;
