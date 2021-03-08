import React from "react";
import { useDrop } from "react-dnd";

const DropBox = (props) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "ListItem",
    drop: () => ({ name: "criteriadrop" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const selectedCriteriaList: any[] = props.selectedCriteriaList;

  return (
    <div ref={drop} className="drop-box-container">
      {selectedCriteriaList.length === 0 ? (
        <div className="text-center">
          <p>
            Drag the file type(s) from the list on the left to create a filter.
          </p>
        </div>
      ) : (
        selectedCriteriaList.map((criteriaObject, idx) => (
          <div key={criteriaObject.id}>{criteriaObject["render"]}</div>
        ))
      )}
    </div>
  );
};

export default DropBox;
