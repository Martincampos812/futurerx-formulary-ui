import React from 'react';
import AdvancedSearch from './search/AdvancedSearch';
import Button from '../../../../../shared/Frx-components/button/Button';

export default class TT extends React.Component<any,any>{
    state={
        isSearchOpen: false
    }
    handleOpenSearchClick = (event) =>{
        event.stopPropagation();
        this.setState({isSearchOpen: !this.state.isSearchOpen})
    }
    handleCloseSearchPopup = () =>{
        this.setState({isSearchOpen: !this.state.isSearchOpen})
    }
    render(){
        return (
            <div className="bordered">
                <Button onClick={this.handleOpenSearchClick}>Advanced Search</Button>
                {this.state.isSearchOpen ? (
                    <AdvancedSearch
                            category="Grievances"
                            openPopup={this.state.isSearchOpen}
                            onClose={this.handleCloseSearchPopup}/>
                ) : (
                    null
                )}
            </div>
        )
    }
}