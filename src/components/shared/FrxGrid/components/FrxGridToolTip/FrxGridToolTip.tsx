import * as React from "react";

const FrxGridToolTip = (props: any) => {
  console.log("tooltip props ", props);
  React.useEffect(() => {
    console.log("tier data", props.data)
  })
  return (
    <>
     <div className="frx-grid-cell__tooltip--innercontent">
        <span className="frx-grid-cell__tooltip--innercontent__druglabel">
            {props.data.drugLabel}
        </span>
      </div>
      <div className="frx-grid-cell__tooltip--innerdata">
        {props.tooltipMock1.map((e: any, i: number) => (
          <div key={i + ""} className="frx-grid-cell__tooltip--innerdata-block">
            <span className="frx-grid-cell__tooltip--innerdata-block__label">
              {e.label}
            </span>
            <span className="frx-grid-cell__tooltip--innerdata-block__labelvalue">
              {e.labelValue}
            </span>
          </div>
        ))}
        <br />
        {props.tooltipMock2.map((e: any, i: number) => (
          <div key={i + ""} className="frx-grid-cell__tooltip--innerdata-block">
            <span className="frx-grid-cell__tooltip--innerdata-block__label">
              {e.label}
            </span>
            <span className="frx-grid-cell__tooltip--innerdata-block__labelvalue">
              {e.labelValue}
            </span>
          </div>
        ))}
        <br />
        {props.tooltipMock3.map((e: any, i: number) => (
          <div key={i + ""} className="frx-grid-cell__tooltip--innerdata-block">
            <span className="frx-grid-cell__tooltip--innerdata-block__label">
              {e.label}
            </span>
            <span className="frx-grid-cell__tooltip--innerdata-block__labelvalue">
              {e.labelValue}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default FrxGridToolTip;
