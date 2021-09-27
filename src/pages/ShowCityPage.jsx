import React from 'react'
import CityModel from '../models/CityModel'

class ShowCityPage extends React.Component {
    state = {
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


    render() {
        return (
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
        )
    }
}

export default ShowCityPage