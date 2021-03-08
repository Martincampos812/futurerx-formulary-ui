import React, { Component } from 'react'
import { searchOptions, pharmacyData } from '../../mocks/bestprice-search-mock';
import FrxDrugSearchForm from '../shared/FrxDrugSearchForm/FrxDrugSearchForm'
import FrxSearchResults from '../shared/FrxSearchResults/FrxSearchResults'
import LocationSearch from "../../components/user-details/location-search/LocationSearch";

import './BestPrice.scss';


interface Props {

}
interface State {
    searchResults: any;
    locationSearchPopup: boolean;
}

export default class BestPrice extends Component<Props, State>{
    state = {
        searchResults: [],
        locationSearchPopup: false
    }
    onSearch = (searchList: any) => {
        if (searchList.length < 1) {
            this.setState({ searchResults: [] })
        } else {
            var _temp: any = []
            searchList.map((item: any) => {
                var _ser = {
                    ...searchOptions().filter((_item: any) => _item.title === item.searchTxt)[0],
                    qty: parseFloat(item.qty ? item.qty : '0').toFixed(),
                    days: item.days,
                    generic: item.generic
                }
                _temp = [..._temp, _ser]
            })
            this.setState({
                searchResults: _temp
            })
        }
    }

    handleLocationPopup = () => {
        this.setState({
            locationSearchPopup: !this.state.locationSearchPopup
        })
    }

    render() {
        const { locationSearchPopup } = this.state;
        return (<div className="best-price-root">
            <div className="bestPrice-root">
                <div className="header">
                    <div className="title">BEST PRICE SEARCH - find the best possible drug prices</div>
                    <div className="sub-heading">
                        <span>Near Member:</span>
                        <span onClick={this.handleLocationPopup}>Tampa, FL 33601</span>
                        {locationSearchPopup ? (
                            <LocationSearch
                                handleLocationPopup={this.handleLocationPopup}
                                locationSearchPopup={locationSearchPopup}
                            />
                        ) : ""}
                    </div>
                </div>
                <div className="content">
                    <FrxDrugSearchForm options={searchOptions()} onSearch={this.onSearch} />
                </div>
            </div>
            {this.state.searchResults.length > 0 && <div className="results">
                <FrxSearchResults searchResults={this.state.searchResults} />
            </div>}
        </div>)
    }
}