import React from 'react'
import CityModel from '../models/CityModel'
import ReactMapGL from 'react-map-gl';
import { Container, Col, Row } from 'reactstrap';

const mapStyle = {
    width: '100%',
    height: 600
}
const mapboxApiKey = 'pk.eyJ1IjoiZGF0YXBsYW50IiwiYSI6ImNrdHVrcXp2bTIxazcycXJvajM0MHVzaWIifQ.yFSzFBs2wuE4B-Qad8-WHg';
class ShowCityPage extends React.Component {
    state = {
        viewport: {
            latitude: 38.898538,
            longitude: -77.019643,
            zoom: 15
        },
        cityname: '',
        headerimg: '',
        pins: []
    }

    componentDidMount() {
        const cityId = this.props.match.params.id
        console.log(cityId);

        CityModel.show(cityId).then((data) => {
            console.log('data in city show page');
            console.log(data);

            this.setState({
                cityname: data.cityname,
                headerimg: data.headerimg,
                pins: data.pins,
            })
        })
    }

    showPosts() {
        const getPins = this.state.pins.map((pin) => {
            return (
                <div>
                    <h4>{pin.title}</h4>
                    {/* <img className="show-img" src={pin.img}></img> */}
                    <p>{pin.notes}</p>
                </div>
            )
        })
        return getPins
    }

// renderCities() {
//     const citiesData = this.props.cities.map((cityObj, idx) => {
//       return (
//         <Link to={`/cities/${cityObj._id}`}>
//           <Pins key={idx} cityObj={cityObj} />
//         </Link>
//       );
//     });

//     return citiesJSX;
//   }

//   render() {
//     return (
//       <div>

//         {this.renderCities()}
//       </div>

//     )
//   }
// }
    render() {
        const { viewport } = this.state;
        return (
            <Container fluid={true}>
                <Row>
                    <Col>
                        <ReactMapGL
                            mapboxApiAccessToken={mapboxApiKey}
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                            {...viewport}
                            {...mapStyle}
                            onViewportChange={(viewport) => this.setState({ viewport })}
                        >
                        </ReactMapGL>
                    </Col>
                </Row>
                <div className="show-page">

                    <h1>{this.state.cityname}</h1>
                    <img
                        id="show-img"
                        src={this.state.headerimg}
                        alt="city picture"
                    />
                    <br />
                    <br />

                    <h3><em>{this.state.cityname}</em></h3>
                    <hr />
                    <br />
                    {this.showPosts()}
                </div>
            </Container>

        )
    }
}

export default ShowCityPage

