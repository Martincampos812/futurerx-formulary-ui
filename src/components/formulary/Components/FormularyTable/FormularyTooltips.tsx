import * as React from "react";
import "./FormularyTable.scss";
// components
import PaInformationPopup from "../pa-info/PAInfo";
import paInfoObject from "../../../../mocks/PaInfoMock";
export const NF = (props: any) => {
  return (
    <div>
      <label>Non-formulary</label>
    </div>
  );
};

export const T1 = (props: any) => {
  return (
    <div>
      <label>Tier 1</label>
    </div>
  );
};

export const PA = (props: any) => {
  return (
    <div className="formulary-detailed-header-tooltip-limit tooltip-pa">
      <label>Prior Authorization Always Required</label>
      <p>
        Click
        <svg
          onClick={props.onClose}
          className="formulary-detailed-header-tooltip-limit-PAbtn"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="30" fill="white" />
          <circle cx="15" cy="15" r="14.5" stroke="#666666" />
          <path
            d="M10.5195 15.9941V19H8.76172V10.4688H12.0898C12.7305 10.4688 13.293 10.5859 13.7773 10.8203C14.2656 11.0547 14.6406 11.3887 14.9023 11.8223C15.1641 12.252 15.2949 12.7422 15.2949 13.293C15.2949 14.1289 15.0078 14.7891 14.4336 15.2734C13.8633 15.7539 13.0723 15.9941 12.0605 15.9941H10.5195ZM10.5195 14.5703H12.0898C12.5547 14.5703 12.9082 14.4609 13.1504 14.2422C13.3965 14.0234 13.5195 13.7109 13.5195 13.3047C13.5195 12.8867 13.3965 12.5488 13.1504 12.291C12.9043 12.0332 12.5645 11.9004 12.1309 11.8926H10.5195V14.5703ZM20.2812 17.2422H17.1992L16.6133 19H14.7441L17.9199 10.4688H19.5488L22.7422 19H20.873L20.2812 17.2422ZM17.6738 15.8184H19.8066L18.7344 12.625L17.6738 15.8184Z"
            fill="#666666"
          />
        </svg>
        to view PA criteria.
      </p>
      {props.PaInfoPopup ? (
        <PaInformationPopup
          paInfo={paInfoObject}
          openPopup={props.openPopup}
          onClose={props.onClose}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export const QL = (props: any) => {
  return (
    <div className="formulary-detailed-header-tooltip-limit">
      <label>Quantity Limit Restriction Applies</label>
      <p>Limited to 30 capsules per 30 days.</p>
    </div>
  );
};

export const MO = (props: any) => {
  return (
    <div className="formulary-detailed-header-tooltip-limit-mo">
      <label>Available mail-order</label>
    </div>
  );
};

// export const QL = (props: any) => {
//   return (
//     <div className="formulary-detailed-header-tooltip-limit">
//       <label>Quantity Limit Restriction Applies</label>
//       <p>Limited to 30 capsules per 30 days.</p>
//     </div>
//   );
// };

// export const MO = (props: any) => {
//   return (
//     <div className="formulary-detailed-header-tooltip-limit-mo">
//       <label>Available mail-order</label>
//     </div>
//   );
// };
