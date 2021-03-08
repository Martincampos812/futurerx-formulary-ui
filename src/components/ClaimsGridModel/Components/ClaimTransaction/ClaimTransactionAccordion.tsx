import * as React from "react";
import "./ClaimTransaction.scss";
import {
  accordionDataReqHeader,
  accordionDataReqInsurance,
  accordionDataReqPatient,
  accordionDataReqPharmacy,
  accordionDataReqClaim,
  accordionDataReqPrescriber,
  accordionDataReqCordination,
  accordionDataReqWorkers,
  accordionDataReqDur,
  accordionDataReqPricing,
  accordionDataReqCoupon,
  accordionDataReqCompound,
  accordionDataReqPriorAuth,
  accordionDataReqClinical,
  accordionDataReqAdditional,
  accordionDataReqFacility,
  accordionDataReqNarrative,
  accordionDataResHeader,
  accordionDataResMessage,
  accordionDataResInsurance,
  accordionDataResInsuranceAddi,
  accordionDataResPatient,
  accordionDataResStatus,
  accordionDataResClaim,
  accordionDataResPricing,
  accordionDataResDur,
  accordionDataResPriorAuth,
  accordionDataResOtherPayers,
  accordionDataResIntermediary,
  accordionDataResOtherRelated
} from "../../../../mocks/ClaimGridModelMock";

export interface ClaimTransactionAccordionProps {
    title: string;
    content: string;
    expand: boolean;
    onClick: any;
    claimStatus:string
}

const accordionDataHeadings = [
  {
    label: "Segment Number",
  },
  {
    label: "Segment Name",
  },
  {
    label: "Submitted Value",
  },
  {
    label: "Required",
  },
]

class ClaimTransactionAccordion extends React.Component<ClaimTransactionAccordionProps> {
    render() {
      const { title, content, expand, onClick, claimStatus } = this.props;
      
      return (
        <div className="accordion-root">
          {claimStatus === "Rejected" ? (
          <>
            {title === "Transaction Header Segment" || 
            title === "Insurance Segment" || 
            title === "Response Header Segment" ||
            title === "Response Message Segment" ||
            title === "Response Insurance Segment" ? (
            <dt className={expand ? 'title is-expanded' : 'title'} onClick={onClick}>
              {title} 
              <svg className="accordion-root__rejected-icon" width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4.5" cy="4.5" r="4.5" fill="#E76262"/>
              </svg>
            </dt>
            ) : (
              <dt className={expand ? 'title is-expanded' : 'title'} onClick={onClick}>
                {title} 
              </dt>
            )}
          </>
          ) : (
            <dt className={expand ? 'title is-expanded' : 'title'} onClick={onClick}>
            {title}
            </dt>
          )}
          <dd className={expand ? 'content is-expanded' : 'content'} onClick={onClick}>
            <div className="accordion-root__table">
            <div className="accordion-root__table--header">
            {accordionDataHeadings.map((label, i) => 
                <div key={i + ""} className="fields">
                    <header>{label.label}</header>
                </div>
            )}
            </div>
            {title === "Transaction Header Segment" ? (
            <>
            {accordionDataReqHeader.map((label, i) => 
                <div key={i + ""} className="accordion-root__table__data">
                  {this.props.claimStatus === "Rejected" ? (
                  <>
                    <span className={i===0 || i===2 ? "value-error" : ""}>{label.segmentNumber}</span>
                    <span className={i===0 || i===2 ? "value-error" : ""}>{label.segmentValue}</span>
                    <span className={i===0 || i===2 ? "value-error" : ""}>{label.submittedValue}</span>
                    <span>{label.required}</span>
                  </>
                  ) : (
                    <>
                    <span>{label.segmentNumber}</span>
                    <span>{label.segmentValue}</span>
                    <span>{label.submittedValue}</span>
                    <span>{label.required}</span>
                    </>
                  )}
                </div>  
            )}
            </>
            ) : title === "Insurance Segment" ? (
              <>
              {accordionDataReqInsurance.map((label, i) => 
                  <div key={i + ""} className="accordion-root__table__data">
                      {this.props.claimStatus === "Rejected" ? (
                  <>
                    <span className={i===1 ? "value-error" : ""}>{label.segmentNumber}</span>
                    <span className={i===1 ? "value-error" : ""}>{label.segmentValue}</span>
                    <span className={i===1 ? "value-error" : ""}>{label.submittedValue}</span>
                    <span>{label.required}</span>
                  </>
                  ) : (
                    <>
                    <span>{label.segmentNumber}</span>
                    <span>{label.segmentValue}</span>
                    <span>{label.submittedValue}</span>
                    <span>{label.required}</span>
                    </>
                  )}
                  </div>  
              )}
              </>
              ): title === "Patient Segment" ? (
                <>
                {accordionDataReqPatient.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) :  title === "Pharmacy Provider Segment" ? (
                <>
                {accordionDataReqPharmacy.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ): title === "Claim Segment" ? (
                <>
                {accordionDataReqClaim.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ): title === "Prescriber Segment" ? (
                <>
                {accordionDataReqPrescriber.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) : title === "Coordination Of Benefits/Other Payments" ? (
                <>
                {accordionDataReqCordination.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ):  title === "Workers Compensation Segment" ? (
                <>
                {accordionDataReqWorkers.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ):title === "DUR/PPS Segment" ? (
                <>
                {accordionDataReqDur.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ):title === "Pricing Segment" ? (
                <>
                {accordionDataReqPricing.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ):title === "Coupon Segment" ? (
                <>
                {accordionDataReqCoupon.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ):title === "Compound Segment" ? (
                <>
                {accordionDataReqCompound.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ):title === "Prior Authorization Segment" ? (
                <>
                {accordionDataReqPriorAuth.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ):title === "Clinical Segment" ? (
                <>
                {accordionDataReqClinical.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ):title === "Additional Documentation Segment" ? (
                <>
                {accordionDataReqAdditional.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ):title === "Facility Segment" ? (
                <>
                {accordionDataReqFacility.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ):title === "Narrative Segment" ? (
                <>
                {accordionDataReqNarrative.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
                // Accordion Response //
              ): title === "Response Header Segment" ? (
                <>
                {accordionDataResHeader.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        {this.props.claimStatus === "Rejected" ? (
                  <>
                    <span className={i===0 ? "value-error" : ""}>{label.segmentNumber}</span>
                    <span className={i===0 ? "value-error" : ""}>{label.segmentValue}</span>
                    <span className={i===0 ? "value-error" : ""}>{label.submittedValue}</span>
                    <span>{label.required}</span>
                  </>
                  ) : (
                    <>
                    <span>{label.segmentNumber}</span>
                    <span>{label.segmentValue}</span>
                    <span>{label.submittedValue}</span>
                    <span>{label.required}</span>
                    </>
                  )}
                    </div>  
                )}
                </>
              ) : title === "Response Message Segment" ? (
                <>
                {accordionDataResMessage.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                  {this.props.claimStatus === "Rejected" ? (
                  <>
                    <span className={i===1 ? "value-error" : ""}>{label.segmentNumber}</span>
                    <span className={i===1 ? "value-error" : ""}>{label.segmentValue}</span>
                    <span className={i===1 ? "value-error" : ""}>{label.submittedValue}</span>
                    <span>{label.required}</span>
                  </>
                  ) : (
                    <>
                    <span>{label.segmentNumber}</span>
                    <span>{label.segmentValue}</span>
                    <span>{label.submittedValue}</span>
                    <span>{label.required}</span>
                    </>
                  )}
                    </div>  
                )}
                </>
              ) : title === "Response Insurance Segment" ? (
                <>
                {accordionDataResInsurance.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        {this.props.claimStatus === "Rejected" ? (
                  <>
                    <span className={i===0 ? "value-error" : ""}>{label.segmentNumber}</span>
                    <span className={i===0 ? "value-error" : ""}>{label.segmentValue}</span>
                    <span className={i===0 ? "value-error" : ""}>{label.submittedValue}</span>
                    <span>{label.required}</span>
                  </>
                  ) : (
                    <>
                    <span>{label.segmentNumber}</span>
                    <span>{label.segmentValue}</span>
                    <span>{label.submittedValue}</span>
                    <span>{label.required}</span>
                    </>
                  )}
                    </div>  
                )}
                </>
              ) : title === "Response Insurance Additional Information Segment" ? (
                <>
                {accordionDataResInsuranceAddi.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) : title === "Response Patient Segment" ? (
                <>
                {accordionDataResPatient.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) : title === "Response Status Segment" ? (
                <>
                {accordionDataResStatus.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) : title === "Response Claim Segment" ? (
                <>
                {accordionDataResClaim.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) : title === "Response Pricing Segment" ? (
                <>
                {accordionDataResPricing.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) : title === "Response DUR/PPS Segment" ? (
                <>
                {accordionDataResDur.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) : title === "Response Prior Authorization Segment" ? (
                <>
                {accordionDataResPriorAuth.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) : title === "Response Other Payers Segment" ? (
                <>
                {accordionDataResOtherPayers.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) : title === "Response Intermediary Segment" ? (
                <>
                {accordionDataResIntermediary.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) : title === "Response Other Related Benefit Detail Segment" ? (
                <>
                {accordionDataResOtherRelated.map((label, i) => 
                    <div key={i + ""} className="accordion-root__table__data">
                        <span>{label.segmentNumber}</span>
                        <span>{label.segmentValue}</span>
                        <span>{label.submittedValue}</span>
                        <span>{label.required}</span>
                    </div>  
                )}
                </>
              ) : ""}

            </div>
            {/* <div>{content}</div> */}
          </dd>
        </div>
      ); 
    }
}
export default ClaimTransactionAccordion;