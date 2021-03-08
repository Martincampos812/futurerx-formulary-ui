import React from "react";
import Grid from "@material-ui/core/Grid";
import { Checkbox } from "antd";

class SupplementalBenefits extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      checkedOptions: [],
    };
  }

  componentDidMount() {
    const checkedIds: number[] = [];

    this.props.SupplementalBenefits.forEach((checkedOption) => {
      checkedIds.push(checkedOption.id_supplemental_benefit);
    });

    this.props.supplementalOptions.forEach((allOption) => {
      if (checkedIds.includes(allOption.id_supplemental_benefit)) {
        allOption["isChecked"] = true;
      }
    });

    this.setState({
      checkedOptions: this.props.supplementalOptions,
    });
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={11}>
          <Grid container>
            {this.state.checkedOptions
              .filter(
                (e) => e.is_custom === false && e.supplemental_benefit !== "N/A"
              )
              .map((el, idx) => {
                return (
                  <Grid item xs={4} key={idx}>
                    <Checkbox
                      className="custom-checkbox mb-16 checkbox-antd"
                      checked={el.isChecked}
                      disabled
                    >
                      {el.supplemental_benefit}
                    </Checkbox>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default SupplementalBenefits;
