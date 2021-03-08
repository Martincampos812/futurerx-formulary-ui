import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
import MyGreatPlace from './Marker';
import "./GoogleMap.scss";


interface GoogleMapProps {
    // children: React.ReactNode;
    // defaultCenter: any;
    coordinates?: any,
    defaultZoom: number;
    preffered?: any;
    // classes: Partial<Record<DialogClassKey, string>>;
    // onGoogleApiLoaded: (map: string, maps: string) => void;
}

const latLngs = [
    {
        address: "5357 Southwick Dr. Tampa, FL 33624", phone: "(813) 269-2814", workingHours: [
            {
                "day": "Mon",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Tue",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Wed",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Thu",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Fri",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Sat",
                "time": "9 AM - 12 PM EST"
            },
            {
                "day": "Sun",
                "time": "Closed"
            }
        ], coordinates: { lat: 27.964214, lng: -82.452453 }, pharmacy: 'Best Drug Store', index: ''
    },
    {
        address: "5357 Southwick Dr. Tampa, FL 33624", phone: "(813) 269-2814", workingHours: [
            {
                "day": "Mon",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Tue",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Wed",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Thu",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Fri",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Sat",
                "time": "9 AM - 12 PM EST"
            },
            {
                "day": "Sun",
                "time": "Closed"
            }
        ], coordinates: { lat: 27.964157, lng: - 82.452606 }, pharmacy: 'Best Drug Store', index: ''
    },
    {
        address: "5357 Southwick Dr. Tampa, FL 33624", phone: "(813) 269-2814", workingHours: [
            {
                "day": "Mon",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Tue",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Wed",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Thu",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Fri",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Sat",
                "time": "9 AM - 12 PM EST"
            },
            {
                "day": "Sun",
                "time": "Closed"
            }
        ], coordinates: { lat: 27.964034, lng: - 82.452467 }, pharmacy: 'Best Drug Store', index: ''
    },
    {
        address: "5357 Southwick Dr. Tampa, FL 33624", phone: "(813) 269-2814", workingHours: [
            {
                "day": "Mon",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Tue",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Wed",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Thu",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Fri",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Sat",
                "time": "9 AM - 12 PM EST"
            },
            {
                "day": "Sun",
                "time": "Closed"
            }
        ], coordinates: { lat: 27.963709, lng: - 82.451898 }, pharmacy: 'Best Drug Store', index: ''
    },
    {
        address: "5357 Southwick Dr. Tampa, FL 33624", phone: "(813) 269-2814", workingHours: [
            {
                "day": "Mon",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Tue",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Wed",
                "time": "9 AM - 5 PM EST"
            },
            {
                "day": "Thu",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Fri",
                "time": "9 AM - 7 PM EST"
            },
            {
                "day": "Sat",
                "time": "9 AM - 12 PM EST"
            },
            {
                "day": "Sun",
                "time": "Closed"
            }
        ], coordinates: { lat: 27.964705, lng: -82.452576 }, pharmacy: 'Best Drug Store', index: ''
    }
]
const userLocation = {
    "address": "9284 Angora St. Long Beach 90712",
    "phone": "(562) 895-8419",
    "coordinates": {
        "lat": 27.964157,
        "lng": -82.452606
    },
    "pharmacy": "Joanne Davis",
}
class GoogleMap extends Component<GoogleMapProps> {

    state = {
        defaultCenter:
            { lat: 27.964157, lng: -82.452606 },

        location:
            { lat: 27.904157, lng: -82.452658 },

    }


    async componentWillReceiveProps(nextprops) {
        await this.setState({ location: nextprops.defaultCenter })
    }



    renderMarkers = (map: any, maps: any) => {

    };


    render() {
        const {
            // defaultCenter,
            defaultZoom,
            // onGoogleApiLoaded
            coordinates,
            preffered
        } = this.props;

        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCYUqZqsAx14PqEFhy4O1YYGc-HEXe9YzI" }}
                defaultCenter={
                    this.state.defaultCenter
                }
                defaultZoom={18}
                defaultOptions={{ 'fullscreenControl': false, 'zoomControlOptions': false }}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
            >
                {(coordinates || latLngs).map((item: any) => (<MyGreatPlace lat={item.coordinates.lat} lng={item.coordinates.lng} text={item.pharmacy} data={{ pharmacy: item.pharmacy, address: item.address, phone: item.phone, time: item.workingHours.filter((_item: any) => _item.day === new Date().toString().substr(0, 3))[0].time }} isPreffered={false} />))}
                <MyGreatPlace lat={userLocation.coordinates.lat} lng={userLocation.coordinates.lng} text={userLocation.pharmacy} data={{ pharmacy: userLocation.pharmacy, address: userLocation.address, phone: userLocation.phone }} isPreffered={true} />
            </GoogleMapReact>
        );
    }
}

export default GoogleMap;
