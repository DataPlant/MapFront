import React from 'react'
import PinModel from '../models/PinModel'

class ShowPinPage extends React.Component {
    state = {
        address: '',
        location: [],
        title: '',
        notes: '',
        images: [],
        city: '',
    }

    componentDidMount() {
        const pinId = this.props.match.params.id
        console.log(pinId);

        PinModel.show(pinId).then((data) => {
            console.log('data in pin show page');
            console.log(data);

            this.setState({
                address: data.address,
                location: data.location,
                title: data.title,
                notes: data.notes,
                images: data.images,
                city: data.city,
            })
        })

    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h4>{this.state.city}</h4>
                {/* <img
                    id="show-img"
                    src={this.state.headerimg}
                    alt="city picture"
                /> */}
                <br />
                <li>{this.state.address}</li>
                <p>{this.state.notes}</p>
            </div>
        )
    }
}

export default ShowPinPage