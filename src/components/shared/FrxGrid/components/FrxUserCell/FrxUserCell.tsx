// React imports
import React, { Fragment } from "react";
import "./FrxUserCell.scss"
interface FrxUserCellProps {
    data?: any;
    title?: any;
    img?: any;
}

interface FrxUserCellState {
}

class FrxUserCell extends React.Component<FrxUserCellProps, FrxUserCellState> {
    
    render() {
        console.log(this.props.data);
        
        let { user, user_img } = this.props.data ? this.props.data.children.props.dataRow : { user: '', user_img: '' }
        return (
            <Fragment>
                <img src={this.props.img ? this.props.img : require("../../../../../mocks/" + user_img)} alt={user} />
                {this.props.title?this.props.title:user}
            </Fragment>
        );
    }
}

export default FrxUserCell;
