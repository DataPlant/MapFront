import React, { PureComponent } from 'react';
import ReactMapGL from 'react-map-gl';
import { Container, Col, Row } from 'reactstrap';
import Geocoder from 'react-mapbox-gl-geocoder';
import axios from 'axios'
import CityModel from '../models/CityModel';
import SelectDropdown from './SelectDropdown';

const mapStyle = {
    width: '100%',
    height: 600
}
const params = {
  country: "us"
}

const mapboxApiKey = 'pk.eyJ1IjoiZGF0YXBsYW50IiwiYSI6ImNrdHVrcXp2bTIxazcycXJvajM0MHVzaWIifQ.yFSzFBs2wuE4B-Qad8-WHg';

class MapView extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 45.50884,
        longitude: -73.58781,
        zoom: 15
      },
      address: '',
      title: '',
      notes: '',
      image: '',
      images: [],
      city: '',
      cities: [],
    };
  }

  componentDidMount() {
    CityModel.all().then((data) => {
        this.setState({ cities: data });
    });
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleImageChange = e => {
    e.preventDefault();
    this.state.images.push(this.state.image)
  }
  onSelected = (viewport, inputValue) => {      
    this.setState({
      viewport,
      address: inputValue,
    })
    console.log(this.state.viewport)
  }
  postData = () => {
    this.state.address.context.forEach((item, i) => {
      item.id = i;
    });
    const passObj = {
      address: this.state.address.place_name,
      location: this.state.address.center,
      title: this.state.title,
      notes: this.state.notes,
      images: this.state.images,
      city: this.state.city,
      // city: this.state.address.context.find(function(item, index) {
      //   if(item.id === 2)
      //     return true;
      // })
    }
    axios
      .post('http://localhost:4000/pins', passObj)
  }

  render() {
    const { viewport } = this.state;
    
    console.log(this.state.address)
    return(
      <Container fluid={true}>
        <Row>
          <Col><h2>Search an Address</h2></Col>
        </Row>
        <Row className="py-4">
          <Col xs={2}>
            <Geocoder
                mapboxApiAccessToken={mapboxApiKey}
                onSelected={this.onSelected}
                viewport={viewport}
                hideOnSelect={true}
                value=""
                queryParams={params}
                inputValue=''
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ReactMapGL
              mapboxApiAccessToken={mapboxApiKey}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              {...viewport}
              {...mapStyle}
              onViewportChange={(viewport) => this.setState({viewport})}
            >
            </ReactMapGL>
          </Col>
        </Row>

        <form onSubmit={this.postData}>
          <input id='imgInput' className="input" placeholder="Upload Image" type='search' name='image' onChange={this.handleInputChange}></input>
          <button onClick={this.handleImageChange}>Upload Image</button>
          <br/>
          <input className="input" placeholder="Pin Title" type='text' name='title' onChange={this.handleInputChange}></input>
          <br/>
          <input className="input" placeholder="Notes" type='text' name='notes' onChange={this.handleInputChange}></input>
          <br/>
          <button type='submit'>Create</button>
          <select className="input" name='city' value={this.state.city} onChange={this.handleInputChange}>
            <option value='' selected>Select City</option>
            <SelectDropdown cities={this.state.cities} />
          </select>
        </form>
      </Container>
   );
  }
}

export default MapView;