import React from "react";
import Grid from "@material-ui/core/Grid";
import PanelHeader from "../NewFormulary/DrugDetails/components/FormularyConfigure/components/PanelHeader";
import { Checkbox } from "antd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const MedicaidInfo = () => {
  return (
    <div className="medicare-information-container__wrapper setup-label">
      <Grid container>
        <Grid item xs={6}>
          <div className="group">
            <label className="mb-16">
              Formulary Basics <span className="astrict">*</span>
            </label>
            <div className="radio-group field-group__radio-group">
              <RadioGroup
                className="radio-group-custom mr-80"
                aria-label={"abridged"}
                name={"abridged"}
                // value={state.abridged}
                // onClick={onAbridgedHandler}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Plan Defined Preffered Drug List"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="State Mandated Drug List"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="State Mandated Drug List With Exceptions"
                />
              </RadioGroup>
            </div>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div className="field-group group setup-panel">
            <PanelHeader
              title="Does the Formulary have carve out?"
              tooltip="Does the Formulary have carve out?"
              required={true}
            />
            <div className="radio-group field-group__radio-group">
              <RadioGroup
                className="radio-group-custom mr-80"
                aria-label={"abridged"}
                name={"abridged"}
                // value={state.abridged}
                // onClick={onAbridgedHandler}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </div>
          </div>
          <div className="checkbox-ul medicare-information-container__checkbox-ul">
            {/* {getCheckboxData()} */}
            <div className="checkbox-wrapper">
              <Checkbox className="custom-checkbox checkbox-antd">Hepatitis C</Checkbox>
              <Checkbox className="custom-checkbox checkbox-antd">Hemophilia</Checkbox>
              <Checkbox className="custom-checkbox checkbox-antd">Mental Health</Checkbox>
            </div>
            <div className="checkbox-wrapper">
              <Checkbox className="custom-checkbox checkbox-antd">HIV</Checkbox>
              <Checkbox className="custom-checkbox checkbox-antd">MAT</Checkbox>
            </div>
            <div className="checkbox-wrapper other-checkbox-wrapper">
              <Checkbox
                className="custom-checkbox checkbox-antd"
                //    onChange={onMedicaidOtherCheck}
              >
                Other
              </Checkbox>
              {/* {render_other_txt_boxes()} */}
              {/* {
                    other_txt_box_length > 0 ?
                      <div onClick={add_more_boxes}>
                        <span> + add more </span>
                      </div> : ""
                  } */}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MedicaidInfo;
