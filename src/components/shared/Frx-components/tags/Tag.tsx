import React from "react";
import "./Tag.css";
export default function Tag(props: any) {
  const {Customclass, tagValue} = props;
  return (
    <div className={`Tag ${Customclass}`} {...props}>
      {tagValue}
    </div>
  );
}
