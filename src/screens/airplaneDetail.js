import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { render } from '@testing-library/react';
import refresh from '../images/refresh.png'

const Update = styled.button`
  background: transparent;
  border-radius: 5px;
  border: 2px solid #3399cc;
  color: #3399cc;
  padding: 7px;
  cursor: pointer
`

const Delete = styled.button`
  background: red;
  border-radius: 5px;
  border: 2px solid red;
  color: #fff;
  padding: 7px;
  cursor: pointer
`
export default class Maps extends React.Component {

    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 1
      };

      constructor(props) {
        super(props);
      this.state = {
          images: [],
          getImages: [],
          success: 'none', 
          showImages: 'none',
          showCurrentImage: 'block',
          noImage: "",
          showImage: "none",
          text: "block",
          message: '',
          imageAvailable: 0,
      }
    }

      componentDidMount() {
        const icao = this.props.location.state.flightid;
        axios.get('https://gentle-temple-27938.herokuapp.com/jetPhotos')
          .then(res => {
            const images = res.data;
            this.setState({ images:images });
          
          });


        //   retrieve images for the select ICAO
          axios.get('https://gentle-temple-27938.herokuapp.com/airplaneImages/'+icao)
          .then(res => {
            const getImages = res.data;
            this.setState({ getImages: getImages });
          });

          
      }

      //   add image to the database 
      addingImage(imageURL){
        const icao = this.props.location.state.flightid;

        this.setState({
            noImage: <img src={imageURL} width={200} style={{borderRadius: 0}} />,
            showImage: "block",
            text: "none",
            message: "Image successfully added! \nClick the refresh icon on the bottom right to reflect the changes.",
            success: 'flex'
        });
        // alert(imageURL);

        // send a POST request
        axios({
            method: 'post',
            url: 'https://gentle-temple-27938.herokuapp.com/jetPhotos',
            data: {
                username: 'Karabo Malete',
                airplane_icao: icao,
                airplane_image: imageURL
            }
        });

        setTimeout(() => {
            this.setState({
                success: "none"
            });
          }, 5000);
            }



             //   update plane image to the database 
        updateImage(imageURL, imageid){
        const icao = this.props.location.state.flightid;

        this.setState({
            noImage: <img src={imageURL} width={200} style={{borderRadius: 0}} />,
            showImage: "block",
            showCurrentImage: 'none',
            text: "none",
            message: "Image successfully updated! Click the refresh icon on the bottom right to reflect the changes.",
            success: 'flex'
        });


        // Update a image record
        axios({
            method: 'put',
            url: 'https://gentle-temple-27938.herokuapp.com/jetPhotos/'+imageid,
            data: {
                username: 'Karabo Malete',
                airplane_icao: icao,
                airplane_image: imageURL
            }
        });

        setTimeout(() => {
            this.setState({
                success: "none"
            });
          }, 5000);
            }

    //   create a function to display plane images
      getImages(){
        const showImages = this.state;
        const icao = this.props.location.state.flightid;
        let actionBtn = '';
        let imageid = '';
        // const addingImage = this.addingImage();
                return (
                    <div style={{marginTop: 100 }}>
                       
                        
                        <div><div style={{textAlign: "center", width: "100%"}}>
                            <b>Choose any image from below to send to our database</b>
                            </div>
                    <div style={{flexDirection: "row", width: "100%", alignItems: "center", display: "flex", justifyContent: "center"}}>
                        
                        {this.state.getImages.map(item => 
                         
                         <div style={{width: 200, float: "left", padding: 15}}>
                             
                             <img src={item[0]} width={200} style={{borderRadius: 3}} style={{cursor: "pointer"}} /><br />
                             {/* {item[0] != '' ? <Update onClick={() => {this.updateImage(item[0])}}>Update Image {this.state.imageAvailable}</Update>
                                :
                                <Update onClick={() => {this.addingImage(item[0])}}>Add Image</Update>
                                } */}


                        { this.state.images.filter(planeicao => planeicao.airplane_icao == icao).map(item => 
                            { item.airplane_icao == icao ? imageid = item._id
                                :
                                imageid = '';
                            }

                        )} 

                        {imageid.length >= 1 ? <Update onClick={() => {this.updateImage(item[0], imageid)}}>Update Image</Update> 
                        :
                        <Update onClick={() => {this.addingImage(item[0])}}>Add Image</Update>
                        }
                             
                         </div>   
                        )}
                        
                    </div>
                    </div>
                   
                    </div>
                )
            
      }

      addImage = () => {
          this.setState({showImages: "flex"})
      }

      
       deleteBtn = (imageid) => {
        const flightid = this.props.location.state.flightid;
        // alert(imageid)
        

        axios.delete('https://gentle-temple-27938.herokuapp.com/jetPhotos/'+imageid)
      .then(res => {
        this.setState({
            success: "flex", 
            message: "Image successfully deleted! Click the refresh icon on the bottom right to reflect the changes."
        });

        setTimeout(() => {
            this.setState({
                success: "none"
            });
          }, 5000);
      })

    }



    render() {
        const country = this.props.location.state.country;
        const planeIcao = this.props.location.state.flightid;
        const flight = this.props.location.state.flight;
        const longitude = this.props.location.state.longitude;
        const latitude = this.props.location.state.latitude;

        const success = this.state;
        let planeImage = '';
        let plane = '';
        const getImages = this.getImages();

    
        return (
            <div>
                { this.state.images.filter(icao => icao.airplane_icao == planeIcao).map(item =>  
                // <div>{item.airplane_icao}<br></br></div>
                    { item.airplane_icao == planeIcao ? planeImage = 
                    <div>
                         <label style={{display:this.state.showImage}}>{this.state.noImage}</label>
                        <img src={item.airplane_image} width={200} style={{borderRadius: 0, display: this.state.showCurrentImage}} />
                        <div style={{ padding: 0, flexDirection: "row", display: this.state.showCurrentImage, justifyContent: "center", alignItems: "center", marginTop: 10}}>
                        {/* <div style={{padding: 10, color: "grey"}}><Update>Update</Update></div> */}
                        </div>

                        <div style={{padding: 10, color: "grey"}}><Delete onClick={() => {this.deleteBtn(item._id)}}>Delete Image</Delete></div>
                        
                        
                    </div>
                    
                    :
                    planeImage = ''
                    }

                    
                )}

                

                {success && <div style={{position: "absolute", bottom: 20, width: "100%", display: this.state.success, alignItems: "center", justifyContent: "center"}}>
                <div style={{backgroundColor: "#66b266", width:400, borderRadius: 5, padding: 10, color: "#fff"}}>{this.state.message}</div>
                </div>}
                <div style={{position: "absolute", bottom: 20, textAlign: "right", width: "100%", color: "#3399cc"}}>
                    <label onClick={() => {window.location.reload()}} style={{fontSize: 25, cursor: "pointer", marginRight: 30}}>
                    <img src={refresh} width={20} style={{borderRadius: 3}} />
                        </label>
                </div>
            <div style={{ width: '100%', padding: 0, flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{width: "20%", padding: 10}}><b>Plane </b></div>
            <div style={{width: "20%", padding: 10}}><b>Destination </b></div>
            <div style={{width: "15%", padding: 10}}><b>Flight </b></div>
            <div style={{width: "15%", padding: 10}}><b>Airplane Icao </b></div>
            <div style={{width: "15%", padding: 10}}><b>Longitude </b></div>
            <div style={{width: "15%", padding: 10}}><b>Latitude </b></div>
            </div>

            <div style={{ width: '100%', padding: 0, flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{width: "20%", padding: 10, color: "grey", display: "flex", justifyContent: "center"}}>
                { planeImage != "" ? plane = planeImage
                :
                plane = <div style={{marginTop: 20, width: 200}}>
                    <label onClick={this.addImage} style={{borderRadius: 5, fontSize: 12, border: "thin solid silver", padding: 20, cursor: "pointer", textAlign: "center", display: this.state.text}}>
                        No image available
                    </label>
                       <label style={{display:this.state.showImage}}>{this.state.noImage}</label>
                    </div>
                }
            </div>
            <div style={{width: "20%", padding: 10, color: "grey"}}>{country}</div>
            <div style={{width: "15%", padding: 10, color: "grey"}}>{flight}</div>
            <div style={{width: "15%", padding: 10, color: "grey"}}>{planeIcao}</div>
            <div style={{width: "15%", padding: 10, color: "grey"}}>{longitude}</div>
            <div style={{width: "15%", padding: 10, color: "grey"}}>{latitude}</div>
            </div>

            {getImages}

              </div>
            
        )
    }
}
