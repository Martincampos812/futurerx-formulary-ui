import * as React from "react";
import "./FormularyTable.scss";
// antd
import {Tooltip} from "antd";
// components
import {NF, T1, PA, QL, MO} from "./FormularyTooltips";
import PaInformationPopup from "../pa-info/PAInfo";
import paInfoObject from "../../../../mocks/PaInfoMock";

export const FormularyTierColumn = (props: any) => {
  React.useEffect(() => {});

  return (
    <div className="formulary-table-custom">
      {props.data.tier === "NF" ? (
        <Tooltip
          placement="bottom"
          arrowPointAtCenter={true}
          overlayClassName="formulary-detailed-header-tooltip-tier"
          title={<NF />}
        >
          <div className="formulary-table-custom-cell">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="15"
                cy="15"
                r="14.5"
                fill="#E76262"
                stroke="#E76262"
              />
              <path
                d="M15.1758 19H13.418L9.99609 13.3867V19H8.23828V10.4688H9.99609L13.4238 16.0938V10.4688H15.1758V19ZM21.8438 15.5137H18.4688V19H16.7109V10.4688H22.2656V11.8926H18.4688V14.0957H21.8438V15.5137Z"
                fill="white"
              />
            </svg>
          </div>
        </Tooltip>
      ) : null}
      {props.data.tier === "T1" ? (
        <Tooltip
          placement="bottom"
          arrowPointAtCenter={true}
          overlayClassName="formulary-detailed-header-tooltip-tier"
          title={<T1 />}
        >
          <div className="formulary-table-custom-cell">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15" cy="15" r="15" fill="#707683" />
              <path
                d="M15.0234 11.8926H12.4102V19H10.6523V11.8926H8.07422V10.4688H15.0234V11.8926ZM19.9629 19H18.2695V12.4727L16.248 13.0996V11.7227L19.7812 10.457H19.9629V19Z"
                fill="white"
              />
            </svg>
          </div>
        </Tooltip>
      ) : null}
    </div>
  );
};

export const FormularyLimitColumn = (props: any) => {
  const [PaInfoPopup, setPaInfoPopup] = React.useState(false);
  React.useEffect(() => {});

  const limits = props.data.limits;

  const handlePaInfoPopup = () => {
    setPaInfoPopup(!PaInfoPopup);
  };

  return (
    <>
      {limits.map((limit, i) => (
        <div key={i + ""} className="formulary-table-custom">
          {limit.PA ? (
            <Tooltip
              placement="bottom"
              arrowPointAtCenter={true}
              overlayClassName="formulary-detailed-header-tooltip"
              title={<PA openPopup={PaInfoPopup} onClose={handlePaInfoPopup} />}
            >
              <div className="formulary-table-custom-cell">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handlePaInfoPopup}
                >
                  <circle cx="15" cy="15" r="14.5" stroke="#666666" />
                  <path
                    d="M10.5195 15.9941V19H8.76172V10.4688H12.0898C12.7305 10.4688 13.293 10.5859 13.7773 10.8203C14.2656 11.0547 14.6406 11.3887 14.9023 11.8223C15.1641 12.252 15.2949 12.7422 15.2949 13.293C15.2949 14.1289 15.0078 14.7891 14.4336 15.2734C13.8633 15.7539 13.0723 15.9941 12.0605 15.9941H10.5195ZM10.5195 14.5703H12.0898C12.5547 14.5703 12.9082 14.4609 13.1504 14.2422C13.3965 14.0234 13.5195 13.7109 13.5195 13.3047C13.5195 12.8867 13.3965 12.5488 13.1504 12.291C12.9043 12.0332 12.5645 11.9004 12.1309 11.8926H10.5195V14.5703ZM20.2812 17.2422H17.1992L16.6133 19H14.7441L17.9199 10.4688H19.5488L22.7422 19H20.873L20.2812 17.2422ZM17.6738 15.8184H19.8066L18.7344 12.625L17.6738 15.8184Z"
                    fill="#666666"
                  />
                </svg>
                <>
                  {PaInfoPopup ? (
                    <PaInformationPopup
                      paInfo={paInfoObject}
                      openPopup={PaInfoPopup}
                      onClose={handlePaInfoPopup}
                    />
                  ) : (
                    ""
                  )}
                </>
              </div>
            </Tooltip>
          ) : null}
          {limit.MO ? (
            <Tooltip
              placement="bottom"
              arrowPointAtCenter={true}
              overlayClassName="formulary-detailed-header-tooltip tooltip-mo"
              title={<MO />}
            >
              <div className="formulary-table-custom-cell">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="15" cy="15" r="14.5" stroke="#666666" />
                  <path
                    d="M9.05859 10.4688L11.25 16.6562L13.4297 10.4688H15.7383V19H13.9746V16.668L14.1504 12.6426L11.8477 19H10.6406L8.34375 12.6484L8.51953 16.668V19H6.76172V10.4688H9.05859ZM24.2812 14.9277C24.2812 15.7676 24.1328 16.5039 23.8359 17.1367C23.5391 17.7695 23.1133 18.2578 22.5586 18.6016C22.0078 18.9453 21.375 19.1172 20.6602 19.1172C19.9531 19.1172 19.3223 18.9473 18.7676 18.6074C18.2129 18.2676 17.7832 17.7832 17.4785 17.1543C17.1738 16.5215 17.0195 15.7949 17.0156 14.9746V14.5527C17.0156 13.7129 17.166 12.9746 17.4668 12.3379C17.7715 11.6973 18.1992 11.207 18.75 10.8672C19.3047 10.5234 19.9375 10.3516 20.6484 10.3516C21.3594 10.3516 21.9902 10.5234 22.541 10.8672C23.0957 11.207 23.5234 11.6973 23.8242 12.3379C24.1289 12.9746 24.2812 13.7109 24.2812 14.5469V14.9277ZM22.5 14.541C22.5 13.6465 22.3398 12.9668 22.0195 12.502C21.6992 12.0371 21.2422 11.8047 20.6484 11.8047C20.0586 11.8047 19.6035 12.0352 19.2832 12.4961C18.9629 12.9531 18.8008 13.625 18.7969 14.5117V14.9277C18.7969 15.7988 18.957 16.4746 19.2773 16.9551C19.5977 17.4355 20.0586 17.6758 20.6602 17.6758C21.25 17.6758 21.7031 17.4453 22.0195 16.9844C22.3359 16.5195 22.4961 15.8438 22.5 14.957V14.541Z"
                    fill="#666666"
                  />
                </svg>
              </div>
            </Tooltip>
          ) : null}
          {limit.QL ? (
            <Tooltip
              placement="bottomRight"
              arrowPointAtCenter={true}
              overlayClassName="formulary-detailed-header-tooltip"
              title={<QL />}
            >
              <div className="formulary-table-custom-cell">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="30" height="30" fill="white" />
                  <circle cx="15" cy="15" r="14.5" stroke="#666666" />
                  <path
                    d="M15.7578 14.9277C15.7578 15.7246 15.6289 16.418 15.3711 17.0078C15.1133 17.5938 14.7559 18.0645 14.2988 18.4199L15.7168 19.5332L14.5977 20.5234L12.7812 19.0645C12.5742 19.0996 12.3594 19.1172 12.1367 19.1172C11.4297 19.1172 10.7988 18.9473 10.2441 18.6074C9.68945 18.2676 9.25977 17.7832 8.95508 17.1543C8.65039 16.5215 8.49609 15.7949 8.49219 14.9746V14.5527C8.49219 13.7129 8.64258 12.9746 8.94336 12.3379C9.24805 11.6973 9.67578 11.207 10.2266 10.8672C10.7812 10.5234 11.4141 10.3516 12.125 10.3516C12.8359 10.3516 13.4668 10.5234 14.0176 10.8672C14.5723 11.207 15 11.6973 15.3008 12.3379C15.6055 12.9746 15.7578 13.7109 15.7578 14.5469V14.9277ZM13.9766 14.541C13.9766 13.6465 13.8164 12.9668 13.4961 12.502C13.1758 12.0371 12.7188 11.8047 12.125 11.8047C11.5352 11.8047 11.0801 12.0352 10.7598 12.4961C10.4395 12.9531 10.2773 13.625 10.2734 14.5117V14.9277C10.2734 15.7988 10.4336 16.4746 10.7539 16.9551C11.0742 17.4355 11.5352 17.6758 12.1367 17.6758C12.7266 17.6758 13.1797 17.4453 13.4961 16.9844C13.8125 16.5195 13.9727 15.8438 13.9766 14.957V14.541ZM18.8047 17.5879H22.5371V19H17.0469V10.4688H18.8047V17.5879Z"
                    fill="#666666"
                  />
                </svg>
              </div>
            </Tooltip>
          ) : null}
        </div>
      ))}
    </>
  );
};
