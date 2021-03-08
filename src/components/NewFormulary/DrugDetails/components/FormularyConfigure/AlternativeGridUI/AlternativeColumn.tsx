import React from "react";
import "./AlternativeColumn.scss";

function AlternativeColumn({ id, alternative }) {
  return (
    <span key={id} className="__root_alternative_column" title={alternative}>
      {alternative.length > 40
        ? alternative.substring(0, 40) + "..."
        : alternative}
    </span>
  );
}

export default AlternativeColumn;
