import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import marker from '../images/airplane.png'
const AnyReactComponent = ({ text }) => <div style={{backgroundColor: "#000", color: "#fff", marginBottom: 8}}><label style={{backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 5, borderRadius: 5}}>{text}</label></div>;
export default class Maps extends React.Component {

    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 1
      };

      state = {
          flights: [],
      }

      componentDidMount() {
        axios.get('https://gentle-temple-27938.herokuapp.com/allFlights')
          .then(res => {
            const flights = res.data;
            this.setState({ flights:flights });
          })
      }


      
    render() {
        return (
            <div style={{ height: '100vh', width: '100%'}}>
                {/* <Marker /> */}
                {/* { this.state.flights.map(item => <div>{item[0]} | {item[1]} | {item[2]} | {item[3]} | {item[4]} | {item[5]} | {item[6]}<br /></div>)} */}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCOlDs0H56Q6YH1ZeNwqTU7CT7g-CMGsWY" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    >

                    { this.state.flights.map(item =>
                        
                        <Link 
                        to={{
                            pathname: "/airplaneDetail",
                            state: { fromHome: true, country: item[2], flightid: item[0], flight: item[1], longitude: item[3], latitude: item[4] },
                          }}
                            key={1}
                            text={item[2]}
                            lat={item[4]}
                            lng={item[3]} 
                            style={{textDecoration: "none"}}
                          >
                              <AnyReactComponent text={item[1]} />
                        
                                {/* <Marker /> */}
                                <img src={marker} width={20} style={{transform:"rotate("+item[5]+"deg)"}} />
                        </Link>
                    
                    )}
                    </GoogleMapReact>
            </div>
        )
    }
}
