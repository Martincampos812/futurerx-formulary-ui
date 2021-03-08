import React, { Component } from 'react';

import { Container, Tooltip } from '@material-ui/core';

import './FrxSearchResults.scss';
import FrxMiniTabs from '../FrxMiniTabs/FrxMiniTabs';
import MapView from '../../BestPrice/MapView';
import BestPharmacy from '../../BestPrice/BestPharmacy';
import TabletDetailsPopup from '../../BestPrice/TabletDetailsPopup';
import TabletDetailsInfoPopup from '../../BestPrice/TabletDetailsInfoPopup';
import { pharmacyData, getHoverData } from '../../../mocks/bestprice-search-mock';

interface Props {
    searchResults: any;
}
interface State {
    selectedTabIndex: number;
    mapData: any;
    mapLocationData: any;
    openPopupTabFirst: boolean;
    openPopupTabSecond: boolean;
    preferedNetwork: any;
    popupData: any;
    _mapData: any;
    _pharmacyData: any;
    _mapPointData: any;
    selectePharmacy: any;
}



export default class FrxSearchResults extends Component<Props, State> {
    state = {
        selectedTabIndex: 0,
        mapData: [],
        mapLocationData: [],
        preferedNetwork: {},
        openPopupTabFirst: false,
        openPopupTabSecond: false,
        popupData: [],
        _mapData: [],
        _pharmacyData: {},
        _mapPointData: [],
        selectePharmacy: undefined
    }

    componentDidMount() {
        let temp: any = this.props.searchResults.map((item: any) => item.results)[0].filter((item: any) => item.highlight === true)[0]
        this.setState({
            mapData: this.props.searchResults.map((item: any) => { return { drugName: item.title, qty: item.qty, capacity: item.capacity, type: item.type, store: item.results.filter((item: any) => item.highlight === true)[0] } }).map((item: any) => { return { ...item, bestPrice: item.store.bestPrice } }),
            mapLocationData: this.props.searchResults.map((item: any) => { return item.results }),
            preferedNetwork: this.props.searchResults.filter((item: any) => item.highlight === true).map((item: any) => { return { ['Pharmacy Name']: item.title, ['Address']: item.address, ['Phone #']: item.phone, ['Fax #']: item.fax } }),
            _pharmacyData: pharmacyData().filter((item: any) => item.pharmacy === temp.pharmacy)[0],
            _mapPointData: [].concat.apply([], this.props.searchResults.map((item: any) => { return item.results }).map((item: any) => item.map((_item: any) => pharmacyData().filter((__item: any) => _item.pharmacy === __item.pharmacy)[0])))
        })
    }

    openTabone = (data: any) => {
        this.setState({
            openPopupTabFirst: true,
            popupData: data,
            _mapData: data.results.map((item: any) => { return { ...pharmacyData().filter((_item: any) => _item.pharmacy === item.pharmacy)[0], bestPrice: item.bestPrice } })
        })
    }
    openTabtwo = (data: any) => {
        this.setState({
            openPopupTabSecond: true,
            popupData: data,
            _mapData: data.results.map((item: any) => { return { ...pharmacyData().filter((_item: any) => _item.pharmacy === item.pharmacy)[0], bestPrice: item.bestPrice } })
        })
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            mapData: newProps.searchResults.map((item: any) => { return { drugName: item.title, qty: item.qty, capacity: item.capacity, type: item.type, store: item.results.filter((item: any) => item.highlight === true)[0] } }).map((item: any) => { return { ...item, bestPrice: item.store.bestPrice } }),
            mapLocationData: this.props.searchResults.map((item: any) => { return item.results }),
            preferedNetwork: this.props.searchResults.filter((item: any) => item.highlight === true).map((item: any) => { return { ['Pharmacy Name']: item.title, ['Address']: item.address, ['Phone #']: item.phone, ['Fax #']: item.fax } }),
            _mapPointData: [].concat.apply([], this.props.searchResults.map((item: any) => { return item.results }).map((item: any) => item.map((_item: any) => pharmacyData().filter((__item: any) => _item.pharmacy === __item.pharmacy)[0])))
        })
    }
    /**
    * @function onClickTab
    * to handle the tab changes from FrxMiniTabs
    *
    * @author virinchi_u
    */

    onClickTab = (selectedTabIndex: number) => {
        this.setState({ selectedTabIndex })
    }

    render() {
        let { selectedTabIndex, popupData, _mapData, _pharmacyData } = this.state
        let { searchResults } = this.props
        let temp: any = popupData;
        let hoverData: any = getHoverData()
        return (
            <div>
                {this.state.openPopupTabFirst ? (<TabletDetailsPopup
                    mapData={_mapData}
                    description={'Diclofenac is used to treat mild to moderate pain, or signs and symptoms of osteoarthritis or rheumatoid arthritis. Voltaren is also indicated for the treatment of ankylosing spondylitis. The Cataflam brand of this medicine is also used to treat menstrual cramps.'}
                    title={`${temp.title}`}
                    subTitle={`${temp.title} - ${temp.capacity}, ${temp.qty} ${temp.type} ${temp.days ? ", " + temp.days + ' days' : ''}`}
                    isOpen={this.state.openPopupTabFirst}
                    onClose={() => { this.setState({ openPopupTabFirst: false, popupData: {} }) }}

                />) : ""}
                {this.state.openPopupTabSecond ? (<TabletDetailsInfoPopup
                    mapData={_mapData}
                    description={'Diclofenac is used to treat mild to moderate pain, or signs and symptoms of osteoarthritis or rheumatoid arthritis. Voltaren is also indicated for the treatment of ankylosing spondylitis. The Cataflam brand of this medicine is also used to treat menstrual cramps.'}
                    title={`${temp.title}`}
                    subTitle={`${temp.title} - ${temp.capacity}, ${temp.qty} ${temp.type} ${temp.days ? ", " + temp.days + ' days' : ''}`}
                    isOpen={this.state.openPopupTabSecond}
                    onClose={() => { this.setState({ openPopupTabSecond: false, popupData: {} }) }}
                />) : ""}
                <Container className="searchResults-root">
                    <div className="header">
                        <div className="heading">BEST PRICE RESULTS</div>
                    </div>
                    <div className="content">
                        <FrxMiniTabs tabList={[
                            {
                                id: 1,
                                text: "Cost Effective"
                            },
                            {
                                id: 2,
                                text: "Best Pharmacy"
                            },
                            {
                                id: 3,
                                text: "Map View"
                            }
                        ]}
                            activeTabIndex={selectedTabIndex}
                            onClickTab={this.onClickTab}
                        />
                        {
                            selectedTabIndex === 0 && <>
                                <div className="grid">
                                    {searchResults.map((item: any) => (<Container className="searchTab">
                                        <div className="header">
                                            <span onClick={() => { item.title.includes('Diclofenac') ? this.openTabone(item) : this.openTabtwo(item) }}>{`${item.title} - ${item.capacity} - ${item.qty} ${item.type}`}</span>
                                            <span>{item.subTitle}</span>
                                        </div>
                                        <div className="content">
                                            <div className="table-title"><span>pharmacy</span><span>best price</span></div>
                                            {item.results.map((_item: any, index: number) => (
                                                <div className={_item.highlight ? 'row highlight' : 'row'}>
                                                    <span className="left">
                                                        {_item.highlight && <Tooltip title={'Preferred Network Pharmacy'} arrow={true} placement="top-start" classes={{ tooltip: 'FrxSearchResults-tooltip', arrow: 'FrxSearchResults-arrow' }}>
                                                            <span className="before">P</span>
                                                        </Tooltip>}

                                                        {_item.pharmacy.length >= 23 ? <Tooltip title={_item.pharmacy} arrow={true} placement="top-start" classes={{ tooltip: 'FrxSearchResults-tooltip', arrow: 'FrxSearchResults-arrow' }}>
                                                            <span onClick={() => {
                                                                this.setState({
                                                                    selectePharmacy: index,
                                                                    selectedTabIndex: 2
                                                                })
                                                            }}>{_item.pharmacy}</span>
                                                        </Tooltip> : <span onClick={() => {
                                                            console.log(index);

                                                            this.setState({
                                                                selectePharmacy: index,
                                                                selectedTabIndex: 2
                                                            })
                                                        }}>{_item.pharmacy}</span>}
                                                    </span>
                                                    <span className="right">
                                                        <span>
                                                            {_item.bestPrice}
                                                        </span>
                                                        <Tooltip title={hoverData[_item.tag]} arrow={true} placement="top-start" classes={{ tooltip: 'FrxSearchResults-tooltip', arrow: 'FrxSearchResults-arrow' }}>
                                                            <span>
                                                                {_item.tag}
                                                            </span>
                                                        </Tooltip>

                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Container>))}
                                </div>
                            </>
                        }
                        {
                            selectedTabIndex === 1 && <BestPharmacy drugList={this.state.mapData} pharmacyData={_pharmacyData} />
                        }
                        {
                            selectedTabIndex === 2 && <MapView drugData={this.state.mapData} selectedPharmacy={this.state.selectePharmacy} mapData={this.state._mapPointData} selectedMapData={this.state.preferedNetwork} preffered={[].concat.apply([], searchResults.map((item: any) => item.results)).filter((item: any) => item.highlight === true).map((item: any) => item.pharmacy)} />
                        }
                    </div>

                </Container>
            </div>
        )
    }
}