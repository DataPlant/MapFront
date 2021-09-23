import React, { PureComponent } from 'react';
import ReactMapGL from 'react-map-gl';
import { Container, Col, Row } from 'reactstrap';
import Geocoder from 'react-mapbox-gl-geocoder';


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
      address: ''
    };

  }
  onSelected = (viewport, inputValue) => {      
    this.setState({
      viewport,
      address: inputValue,
    })
    console.log(this.state.viewport)
  }

  render() {
    const { viewport } = this.state;
    console.log(this.state.address)
    return(
      <Container fluid={true}>
        <Row>
          <Col><h2>Mapbox Tutorial</h2></Col>
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
      </Container>
   );
  }
}

export default MapView;