import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";

const DragBox = (props) => {
  const { criteria, onCriteriaSelect, isReadOnly, editable } = props;
  const [{ isDragging }, drag] = useDrag({
    item: { id: `${props.nodeId}`, type: "ListItem" },
    end: (item: { id: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        isReadOnly || editable || onCriteriaSelect(criteria.id);
        // onCriteriaSelect(criteria.id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={drag}
      key={criteria.id}
      id={criteria.id}
      className={
        isReadOnly
          ? "__root-additional-criteria-read-only-child-accordion-section-content-left-inner-spacing-flex"
          : "__root-additional-criteria-child-accordion-section-content-left-inner-spacing-flex"
      }
    >
      <svg
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.208 6.41113L11.2142 4.83769C11.1976 4.82457 11.1775 4.81641 11.1564 4.81415C11.1353 4.81189 11.114 4.81563 11.0949 4.82492C11.0758 4.83422 11.0598 4.8487 11.0485 4.86671C11.0373 4.88472 11.0314 4.90553 11.0314 4.92675V5.93769H7.56269V2.46894H8.57519C8.66894 2.46894 8.72206 2.35956 8.66425 2.28613L7.08925 0.292376C7.07882 0.278884 7.06545 0.267962 7.05014 0.260446C7.03484 0.252931 7.01802 0.249023 7.00097 0.249023C6.98392 0.249023 6.9671 0.252931 6.95179 0.260446C6.93649 0.267962 6.92311 0.278884 6.91269 0.292376L5.33769 2.28613C5.32456 2.30281 5.31641 2.32285 5.31415 2.34395C5.31189 2.36505 5.31562 2.38637 5.32492 2.40545C5.33421 2.42453 5.3487 2.4406 5.36671 2.45183C5.38472 2.46306 5.40553 2.46899 5.42675 2.46894H6.43769V5.93769H2.96894V4.92519C2.96894 4.83144 2.85956 4.77831 2.78613 4.83613L0.792376 6.41113C0.778884 6.42155 0.767962 6.43493 0.760446 6.45023C0.752931 6.46554 0.749023 6.48236 0.749023 6.49941C0.749023 6.51646 0.752931 6.53328 0.760446 6.54858C0.767962 6.56389 0.778884 6.57726 0.792376 6.58769L2.78456 8.16269C2.858 8.2205 2.96738 8.16894 2.96738 8.07363V7.06269H6.43612V10.5314H5.42362C5.32987 10.5314 5.27675 10.6408 5.33456 10.7143L6.90956 12.7064C6.95487 12.7643 7.04237 12.7643 7.08612 12.7064L8.66112 10.7143C8.71894 10.6408 8.66737 10.5314 8.57206 10.5314H7.56269V7.06269H11.0314V8.07519C11.0314 8.16894 11.1408 8.22206 11.2142 8.16425L13.2064 6.58925C13.2199 6.57868 13.2308 6.56522 13.2383 6.54987C13.2459 6.53452 13.2499 6.51767 13.25 6.50056C13.2502 6.48346 13.2465 6.46654 13.2392 6.45106C13.2319 6.43558 13.2213 6.42193 13.208 6.41113Z"
          fill="#707683"
        />
      </svg>
      <label htmlFor={criteria.id} className="font-styling">
        {criteria.criteria}
      </label>
    </div>
  );
};

export default DragBox;
